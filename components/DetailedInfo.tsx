import { useDashboard } from "../context/DashboardContext";

interface DetailedInfoProps {
  data: any[];
  onSelect?: (id: string) => void;
  selectedId?: string;
}

export const DetailedInfo = ({ data, onSelect: propOnSelect, selectedId: propSelectedId }: DetailedInfoProps) => {
    const { drillDown, clusterId, nsId } = useDashboard();
    
    // Use either the prop or the context value
    const activeId = propSelectedId || nsId || clusterId;
    const handleSelect = (id: string) => {
        if (propOnSelect) {
            propOnSelect(id);
        } else {
            drillDown(id);
        }
    };

    return (
        <table className="w-full min-w-[640px] text-xs font-sans">
            <thead>
                <tr className="border-b border-borderPrimary">
                    <th className="text-left pb-6 pl-4 text-[#94a3b8] font-black uppercase tracking-[0.25em] text-[9px] opacity-70">Resource Name</th>
                    <th className="pb-6 text-center text-[#94a3b8] font-black uppercase tracking-[0.25em] text-[9px] opacity-70">Compute</th>
                    <th className="pb-6 text-center text-[#94a3b8] font-black uppercase tracking-[0.25em] text-[9px] opacity-70">Memory</th>
                    <th className="pb-6 text-center text-[#94a3b8] font-black uppercase tracking-[0.25em] text-[9px] opacity-70">Storage</th>
                    <th className="pb-6 text-center text-[#94a3b8] font-black uppercase tracking-[0.25em] text-[9px] opacity-70">Network</th>
                    <th className="pb-6 text-center text-[#94a3b8] font-black uppercase tracking-[0.25em] text-[9px] opacity-70">Graphics</th>
                    <th className="pb-6 text-center text-[#94a3b8] font-black uppercase tracking-[0.25em] text-[9px] opacity-70">Efficiency</th>
                    <th className="pb-6 text-right pr-4 text-[#94a3b8] font-black uppercase tracking-[0.25em] text-[9px] opacity-70">Total Cost</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-white/[0.03] last:border-0 cursor-pointer transition-all duration-300 group ${
                        activeId === row.id ? 'bg-accentPrimary/5' : 'hover:bg-white/[0.03]'
                      }`}
                      onClick={() => handleSelect(row.id)}
                    >
                        <td className="py-5 pl-4 font-black text-textPrimary group-hover:text-accentPrimary transition-colors tracking-tighter uppercase">{row.name}</td>
                        <td className="py-5 text-center text-textSecondary font-medium">${row.cpu.toLocaleString()}</td>
                        <td className="py-5 text-center text-textSecondary font-medium">${row.ram.toLocaleString()}</td>
                        <td className="py-5 text-center text-textSecondary font-medium">${row.storage.toLocaleString()}</td>
                        <td className="py-5 text-center text-textSecondary font-medium">${row.network.toLocaleString()}</td>
                        <td className="py-5 text-center text-textSecondary font-medium">${row.gpu.toLocaleString()}</td>
                        <td className="py-5 text-center text-accentPrimary font-black">{row.efficiency}%</td>
                        <td className="py-5 text-right pr-4 font-black text-textPrimary group-hover:scale-105 transition-transform origin-right">${row.total.toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}