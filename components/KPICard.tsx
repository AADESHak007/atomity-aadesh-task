import React from 'react';
import { useDashboard } from '../context/DashboardContext';

interface KPICardProps {
  title: string;
  metricKey: 'cpu' | 'ram' | 'gpu' | 'total';
  totalValue: number;
}

export const KPICard: React.FC<KPICardProps> = ({ title, metricKey, totalValue }) => {
  const { hoveredData } = useDashboard();
  
  // Show hovered value if available, otherwise show totalValue
  const displayValue = hoveredData ? hoveredData[metricKey] : totalValue;

  return (
    <div className="rounded-[32px] p-6 flex flex-col justify-center items-center h-full w-full shadow-xl border border-borderPrimary bg-bgPrimary transition-all duration-300">
      <h3 className="text-[10px] uppercase tracking-widest mb-3 font-semibold text-textTertiary text-center opacity-70">
        {title} {hoveredData ? '(PEEK)' : '(TOTAL)'}
      </h3>
      <p className={`text-2xl font-black transition-all duration-200 ${hoveredData ? 'text-white scale-110' : 'text-accentPrimary'}`}>
        ${displayValue?.toLocaleString()}
      </p>
    </div>
  );
};