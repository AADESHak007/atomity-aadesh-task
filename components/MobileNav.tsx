'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LogoName } from './LogoName';
import logoimage from '@/public/1.png';

export const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuGroups = [
        {
            title: 'Main',
            items: [
                { label: 'Dashboard', active: true },
                { label: 'Clusters', active: false },
                { label: 'Nodes', active: false },
                { label: 'Network', active: false },
            ]
        },
        {
            title: 'Finance',
            items: [
                { label: 'Billing', active: false },
                { label: 'Usage', active: false },
                { label: 'Forecast', active: false },
            ]
        }
    ];

    return (
        <div className="xl:hidden w-full sticky top-0 z-[100]">
            {/* Top Bar */}
            <div className="w-full bg-[#0a0d17]/80 backdrop-blur-xl border-b border-borderPrimary p-4 flex items-center justify-between">
                <div className="scale-75 origin-left">
                    <LogoName logoimage={logoimage} title="ATOMITY" />
                </div>
                <button 
                    onClick={() => setIsOpen(true)}
                    className="p-2 bg-white/5 rounded-xl border border-borderPrimary text-accentPrimary"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Overlay Menu */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110] flex animate-in fade-in duration-300">
                    <div className="w-[80%] max-w-[300px] h-full bg-[#0f0f0f] border-r border-borderPrimary p-6 flex flex-col gap-10 animate-in slide-in-from-left duration-500">
                        <div className="flex items-center justify-between">
                            <LogoName logoimage={logoimage} title="ATOMITY" />
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-textTertiary hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-8">
                            {menuGroups.map((group, gIndex) => (
                                <div key={gIndex} className="flex flex-col gap-4">
                                    <h3 className="text-[10px] font-bold text-accentPrimary uppercase tracking-[0.2em] opacity-80">
                                        {group.title === 'Main' ? 'OVERVIEW' : 'FINANCE'}
                                    </h3>
                                    <nav className="flex flex-col gap-2">
                                        {group.items.map((item, iIndex) => (
                                            <button 
                                                key={iIndex}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-wider ${
                                                    item.active 
                                                    ? 'bg-accentPrimary/10 text-white border border-accentPrimary/20' 
                                                    : 'text-textTertiary hover:text-white hover:bg-white/5'
                                                }`}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1" onClick={() => setIsOpen(false)} />
                </div>
            )}
        </div>
    );
};
