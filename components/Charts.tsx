'use client';

import { BarChart, Bar, XAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { tokens } from '../app/tokens';
import { useDashboard } from '../context/DashboardContext';
import { ArrowLeft } from 'lucide-react';

interface ChartsProps {
  data: any[];
}

export const Charts = ({ data }: ChartsProps) => {
  const { drillDown, setHoveredData, goBack, level, clusterId, nsId } = useDashboard();

  return (
    <div className="w-full h-full flex flex-col p-2">
      {/* Synchronization & Navigation Hub */}
      <div className="w-full flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-4">
          {level !== 'clusters' && (
            <button 
              onClick={goBack}
              className="p-2 bg-white/5 hover:bg-accentPrimary/20 rounded-full border border-borderPrimary transition-all group"
            >
              <ArrowLeft size={18} className="text-textSecondary group-hover:text-accentPrimary" />
            </button>
          )}
          <div className="flex flex-col">
            <h2 className="text-sm font-black text-textPrimary uppercase tracking-tighter flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accentPrimary animate-pulse" />
              {level} VIEW
            </h2>
            <p className="text-[9px] font-bold text-textTertiary uppercase tracking-[0.2em]">
              <span className={level === 'clusters' ? 'text-accentPrimary' : ''}>CLUSTERS</span>
              {clusterId && (
                <span className="mx-2 opacity-30">/</span>
              )}
              {clusterId && (
                <span className={level === 'namespaces' ? 'text-accentPrimary' : ''}>{clusterId}</span>
              )}
              {nsId && (
                <span className="mx-2 opacity-30">/</span>
              )}
              {nsId && (
                <span className={level === 'pods' ? 'text-accentPrimary' : ''}>{nsId}</span>
              )}
            </p>
          </div>
        </div>
        
        <div className="text-[10px] font-mono text-accentPrimary/50 uppercase">
          Synced Status: Live
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col justify-center items-center min-h-0">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }} barGap={0}>
          <CartesianGrid vertical={false} strokeDasharray="8 8" stroke={tokens.colors.chartGrid} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: tokens.colors.textTertiary, fontWeight: 'bold', fontSize: 11, dy: 10 }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} 
            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', fontSize: '12px' }}
            itemStyle={{ color: '#02b32e' }}
          />
          <Bar
            dataKey="total"
            fill={tokens.colors.accentPrimary}
            radius={[12, 12, 12, 12]}
            barSize={70}
            onMouseEnter={(data) => setHoveredData(data.payload)}
            onMouseLeave={() => setHoveredData(null)}
            onClick={(data) => data?.id && drillDown(data.id)}
            className="cursor-pointer transition-all duration-300 hover:opacity-80"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
};