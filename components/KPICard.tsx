import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Zap, Layers, Cpu, BarChart3, TrendingUp } from 'lucide-react';

interface KPICardProps {
  title: string;
  metricKey: 'cpu' | 'ram' | 'gpu' | 'total';
  totalValue: number;
}

const iconMap = {
  cpu: Zap,
  ram: Layers,
  gpu: Cpu,
  total: BarChart3,
};

export const KPICard: React.FC<KPICardProps> = ({ title, metricKey, totalValue }) => {
  const { hoveredData } = useDashboard();
  const Icon = iconMap[metricKey];
  
  // Show hovered value if available, otherwise show totalValue
  const displayValue = hoveredData ? hoveredData[metricKey] : totalValue;
  const isPeek = !!hoveredData;

  return (
    <div className={`rounded-[32px] p-8 flex flex-col justify-between h-full w-full border border-borderPrimary bg-[#0a0d17]/80 backdrop-blur-xl transition-all duration-500 group relative overflow-hidden ${
      isPeek ? 'shadow-[0_0_20px_rgba(124,58,237,0.15)]' : 'shadow-xl'
    }`}>
      {/* Background Decorative Gradient */}
      <div className={`absolute top-[-20%] right-[-10%] w-32 h-32 rounded-full blur-[60px] pointer-events-none transition-all duration-700 ${
        isPeek ? 'bg-accentPrimary/10' : 'bg-white/5'
      }`} />

      {/* Top Row: Title and Icon */}
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-textTertiary uppercase tracking-[0.15em]">
            {title}
          </span>
          <span className={`text-[8px] font-black uppercase tracking-widest mt-1 transition-all ${
            isPeek ? 'text-white opacity-100' : 'text-textTertiary opacity-40'
          }`}>
            {isPeek ? 'Live Peek' : 'Overall Total'}
          </span>
        </div>
        <div className={`p-2.5 rounded-xl transition-all duration-500 ${
          isPeek ? 'bg-accentPrimary/20 text-accentPrimary rotate-12' : 'bg-white/5 text-textTertiary'
        }`}>
          <Icon size={18} />
        </div>
      </div>

      {/* Value Section */}
      <div className="flex items-center z-10">
        <h2 className={`text-4xl font-black transition-all duration-300 tracking-tighter ${
          isPeek ? 'text-white scale-105' : 'text-textPrimary'
        }`}>
          ${displayValue?.toLocaleString()}
        </h2>
      </div>
    </div>
  );
};