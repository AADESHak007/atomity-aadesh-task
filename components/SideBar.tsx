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
        <div className="sidebar w-[22%] h-full p-6 bg-[#0f0f0f] flex flex-col justify-between box-border border-r border-borderPrimary">
            <div className="flex flex-col gap-10">
                {/* Brand Logo */}
                <div className="px-2">
                    <LogoName logoimage={logoimage} title="ATOMITY" />
                </div>

                {/* Navigation Items */}
                <div className="flex flex-col gap-8">
                    {menuGroups.map((group, gIndex) => (
                        <div key={gIndex} className="flex flex-col gap-3">
                            <h3 className="px-4 text-[11px] font-bold text-accentPrimary uppercase tracking-[0.15em] opacity-80">
                                {group.title === 'Main' ? 'OVERVIEW' : 'FINANCE'}
                            </h3>
                            <nav className="flex flex-col gap-1">
                                {group.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-3 p-2.5 rounded-lg transition-all cursor-pointer group ${
                                            item.active 
                                            ? 'bg-[#1e1e1e] text-white' 
                                            : 'hover:bg-[#1a1a1a] text-[#a1a1a1] hover:text-white'
                                        }`}
                                    >
                                        <item.icon size={18} className="opacity-90" />
                                        <span className="text-[14px] font-medium tracking-tight">
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-auto flex flex-col gap-4">
                {/* User Profile Section */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-3 group cursor-pointer hover:bg-white/[0.05] transition-all">
                    <div className="w-9 h-9 rounded-full bg-[#1e1e1e] flex items-center justify-center border border-white/10">
                        <User size={18} className="text-white opacity-80" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-white tracking-tight">Aadesh Ak</span>
                        <span className="text-[10px] font-medium text-[#717171] uppercase tracking-wider">Pro Account</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 transition-all cursor-pointer text-[#a1a1a1] hover:text-red-500 group">
                    <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                    <span className="text-[13px] font-medium tracking-tight">Logout</span>
                </div>
            </div>
        </div>
    );
};