import { LogoName } from "./LogoName"
import logoimage from '@/public/1.png'
import { LayoutDashboard, BarChart3, Settings, CreditCard, Layers, LogOut, Shield, Zap, User } from 'lucide-react';
import { tokens } from '../app/tokens';

const menuGroups = [
    {
        title: 'Main',
        items: [
            { icon: LayoutDashboard, label: 'Dashboard', active: true },
            { icon: BarChart3, label: 'Analytics', active: false },
            { icon: Layers, label: 'Clusters', active: false },
        ]
    },
    {
        title: 'System',
        items: [
            { icon: CreditCard, label: 'Billing', active: false },
            { icon: Shield, label: 'Security', active: false },
            { icon: Settings, label: 'Settings', active: false },
        ]
    }
];

export const SideBar = () => {
    return (
        <aside className="w-[22%] min-w-[280px] h-full bg-[#0a0a0a] flex flex-col border-r border-borderPrimary select-none">
            <div className="flex flex-col flex-1 px-4 py-8 gap-10 overflow-y-auto custom-scrollbar">
                {/* Brand Logo */}
                <div className="px-2">
                    <LogoName logoimage={logoimage} title="ATOMITY" />
                </div>

                {/* Navigation Items */}
                <div className="flex flex-col gap-8">
                    {menuGroups.map((group, gIndex) => (
                        <div key={gIndex} className="flex flex-col gap-3">
                            <h3 className="px-4 text-[10px] font-black text-accentPrimary uppercase tracking-[0.2em] opacity-60">
                                {group.title === 'Main' ? 'OVERVIEW' : 'SYSTEM'}
                            </h3>
                            <nav className="flex flex-col gap-1.5">
                                {group.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer group ${
                                            item.active 
                                            ? 'bg-white/5 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] border border-white/5' 
                                            : 'text-[#64748b] hover:text-white hover:bg-white/[0.02]'
                                        }`}
                                    >
                                        <item.icon size={18} className={`transition-transform duration-300 ${item.active ? 'text-accentPrimary scale-110' : 'group-hover:scale-110'}`} />
                                        <span className={`text-[13px] font-bold tracking-wide transition-all ${item.active ? 'translate-x-0.5' : ''}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Section */}
            <div className="p-4 border-t border-borderPrimary bg-black/20 backdrop-blur-sm">
                <div className="flex flex-col gap-2">
                    {/* User Profile */}
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3 group cursor-pointer hover:bg-white/[0.06] transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-[#1e1e1e] flex items-center justify-center border border-white/10 group-hover:border-accentPrimary/50 transition-colors">
                            <User size={20} className="text-white opacity-80" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-black text-white tracking-tight">Aadesh Ak</span>
                            <span className="text-[9px] font-bold text-accentPrimary/70 uppercase tracking-widest">Pro Account</span>
                        </div>
                    </div>

                    {/* Logout */}
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/5 transition-all duration-300 text-[#64748b] hover:text-red-400 group w-full text-left">
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[12px] font-black uppercase tracking-widest">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};