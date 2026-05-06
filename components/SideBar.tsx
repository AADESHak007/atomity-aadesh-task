import { LogoName } from "./LogoName"
import logoimage from '@/public/1.png'
import { LayoutDashboard, BarChart3, Settings, CreditCard, Layers, LogOut } from 'lucide-react';
import { tokens } from '../app/tokens';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Layers, label: 'Clusters', active: false },
    { icon: CreditCard, label: 'Billing', active: false },
    { icon: Settings, label: 'Settings', active: false },
];

export const SideBar = () => {
    return (
        <div className="sidebar w-[22%] h-full p-4 bg-bgPrimary flex flex-col justify-between box-border">
            <div className="flex flex-col gap-8">
                {/* Brand Logo */}
                <LogoName logoimage={logoimage} title="ATOMITY" />

                {/* Navigation Items */}
                <nav className="flex flex-col gap-2">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                                item.active 
                                ? 'bg-accentPrimary/10 border border-accentPrimary/30 shadow-[0_0_20px_rgba(2,179,46,0.1)]' 
                                : 'hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            <item.icon size={20} className={item.active ? 'text-accentPrimary' : 'text-textSecondary'} />
                            <span className={`text-sm font-medium tracking-wide uppercase ${item.active ? 'text-accentPrimary' : 'text-textSecondary'}`}>
                                {item.label}
                            </span>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="mt-auto border-t border-borderPrimary pt-4">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer text-textTertiary">
                    <LogOut size={20} />
                    <span className="text-sm font-medium tracking-wide uppercase">Logout</span>
                </div>
            </div>
        </div>
    );
};