import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock database - In production, use PostgreSQL
const users = new Map();

// Mock user for demo
users.set('demo@tradequantic.ai', {
  id: uuidv4(),
  email: 'demo@tradequantic.ai',
  name: 'Utilisateur Demo',
  password: bcrypt.hashSync('demo123', 10),
  plan: 'free',
  strategiesUsed: 1,
  maxStrategies: 3,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        error: 'Tous les champs sont requis'
      });
    }

    if (users.has(email)) {
      return res.status(400).json({
        success: false,
        error: 'Un utilisateur avec cet email existe déjà'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const user = {
      id: userId,
      email,
      name,
      password: hashedPassword,
      plan: 'free',
      strategiesUsed: 0,
      maxStrategies: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.set(email, user);

    const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      data: {
        token,
        user: userWithoutPassword
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création du compte'
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email et mot de passe requis'
      });
    }

    const user = users.get(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Email ou mot de passe incorrect'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Email ou mot de passe incorrect'
      });
    }

    const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, { expiresIn: '7d' });

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        token,
        user: userWithoutPassword
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la connexion'
    });
  }
});

// Get Profile
router.get('/profile', authenticateToken, (req, res) => {
  try {
    const user = Array.from(users.values()).find(u => u.id === req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors du chargement du profil'
    });
  }
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Token d\'accès requis'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Token invalide'
      });
    }
    req.user = user;
    next();
  });
}

export default router; 