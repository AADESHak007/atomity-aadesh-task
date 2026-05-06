import Image, { StaticImageData } from 'next/image';
import { LucideIcon } from 'lucide-react';
import { tokens } from '../app/tokens';

interface LogoNameProps {
    logoimage?: StaticImageData;
    icon?: LucideIcon;
    title: string;
    active?: boolean;
}

export const LogoName = ({ logoimage, icon: Icon, title, active }: LogoNameProps) => {
    return (
        <div className="flex items-center gap-4 py-4 group cursor-pointer">
            <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-accentPrimary/20 blur-xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative w-12 h-12 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 group-hover:scale-110 transition-transform duration-500 ease-out">
                    {logoimage ? (
                        <Image src={logoimage} width={48} height={48} alt="logo" className="w-[85%] h-[85%] object-contain" />
                    ) : Icon ? (
                        <Icon size={24} className="text-black" />
                    ) : (
                        <span className="text-black font-black text-2xl italic tracking-tighter">A</span>
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-black text-white uppercase tracking-[-0.07em] leading-none">
                    {title}
                </h1>
            </div>
        </div>
    );
};