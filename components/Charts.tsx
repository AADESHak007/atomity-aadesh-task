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
              <span className="w-2 h-2 rounded-full bg-accentPrimary animate-pulse shadow-[0_0_10px_#7c3aed]" />
              {level} VIEW
            </h2>
            <p className="text-[9px] font-bold text-textTertiary uppercase tracking-[0.2em]">
              <span className={level === 'clusters' ? 'text-white font-black' : ''}>CLUSTERS</span>
              {clusterId && (
                <span className="mx-2 opacity-30">/</span>
              )}
              {clusterId && (
                <span className={level === 'namespaces' ? 'text-white font-black' : ''}>{clusterId}</span>
              )}
              {nsId && (
                <span className="mx-2 opacity-30">/</span>
              )}
              {nsId && (
                <span className={level === 'pods' ? 'text-white font-black' : ''}>{nsId}</span>
              )}
            </p>
          </div>
        </div>
        
        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
          Node Sync: Active
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col justify-center items-center min-h-0">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }} barGap={0}>
          <CartesianGrid vertical={false} strokeDasharray="8 8" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-text-tertiary)", fontWeight: 'bold', fontSize: 10, dy: 10 }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }} 
            contentStyle={{ backgroundColor: '#0a0d17', border: '1px solid #1a1f35', borderRadius: '12px', fontSize: '11px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
            itemStyle={{ color: 'var(--color-accent-primary)', fontWeight: 'bold' }}
          />
          <Bar
            dataKey="total"
            fill="var(--color-accent-primary)"
            radius={[10, 10, 10, 10]}
            barSize={60}
            onMouseEnter={(data) => setHoveredData(data.payload)}
            onMouseLeave={() => setHoveredData(null)}
            onClick={(data) => data?.id && drillDown(data.id)}
            className="cursor-pointer transition-all duration-500 hover:opacity-80"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
};