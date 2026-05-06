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
        <table className="w-full text-xs">
            <thead>
                <tr className="font-bold border-b border-borderPrimary">
                    <th className="text-left pb-4 pl-4 text-textTertiary uppercase tracking-widest text-[10px]">Name</th>
                    <th className="pb-4 text-center text-textTertiary uppercase tracking-widest text-[10px]">CPU</th>
                    <th className="pb-4 text-center text-textTertiary uppercase tracking-widest text-[10px]">RAM</th>
                    <th className="pb-4 text-center text-textTertiary uppercase tracking-widest text-[10px]">Storage</th>
                    <th className="pb-4 text-center text-textTertiary uppercase tracking-widest text-[10px]">Network</th>
                    <th className="pb-4 text-center text-textTertiary uppercase tracking-widest text-[10px]">GPU</th>
                    <th className="pb-4 text-center text-textTertiary uppercase tracking-widest text-[10px]">Efficiency</th>
                    <th className="pb-4 text-right pr-4 text-textTertiary uppercase tracking-widest text-[10px]">Total</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-borderPrimary last:border-0 cursor-pointer transition-colors group ${
                        activeId === row.id ? 'bg-accentPrimary/10' : 'hover:bg-white/5'
                      }`}
                      onClick={() => handleSelect(row.id)}
                    >
                        <td className="py-4 pl-4 font-bold text-textSecondary group-hover:text-accentPrimary transition-colors">{row.name}</td>
                        <td className="py-4 text-center text-textTertiary">${row.cpu.toLocaleString()}</td>
                        <td className="py-4 text-center text-textTertiary">${row.ram.toLocaleString()}</td>
                        <td className="py-4 text-center text-textTertiary">${row.storage.toLocaleString()}</td>
                        <td className="py-4 text-center text-textTertiary">${row.network.toLocaleString()}</td>
                        <td className="py-4 text-center text-textTertiary">${row.gpu.toLocaleString()}</td>
                        <td className="py-4 text-center text-textTertiary">{row.efficiency}%</td>
                        <td className="py-4 text-right pr-4 font-bold text-textPrimary">${row.total.toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}