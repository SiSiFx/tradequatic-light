import { useEffect, useRef } from 'react';

interface PriceChartProps {
  data: {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[];
}

export function PriceChart({ data }: PriceChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    // Here we would normally initialize a charting library
    // For now, we'll just show a placeholder
    const ctx = chartRef.current;
    ctx.innerHTML = `
      <div class="flex items-center justify-center h-full">
        <p class="text-gray-500 dark:text-gray-400">Chart visualization will be implemented with a proper charting library</p>
      </div>
    `;
  }, [data]);

  return (
    <div ref={chartRef} className="w-full h-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
      {!data.length && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      )}
    </div>
  );
}