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
        <div
            className={`logoName w-full h-[60px] p-1 flex justify-between items-center border rounded-lg transition-all duration-200 cursor-pointer ${active ? 'bg-accentPrimary/10 border-accentPrimary' : 'border-borderPrimary bg-white/5 hover:bg-white/10'
                }`}
        >
            <div className={`logoIcon w-[30%] flex justify-center items-center h-full border rounded-full overflow-hidden ${active ? 'border-accentPrimary' : 'border-borderPrimary'
                }`}>
                {logoimage && (
                    <Image src={logoimage} width={100} height={100} alt="logo" className="w-full h-full object-contain bg-white" />
                )}
                {Icon && (
                    <Icon size={24} className={active ? 'text-accentPrimary' : 'text-textTertiary'} />
                )}
            </div>

            <h1 className={`w-[70%] h-full p-1 text-sm flex justify-center items-center font-bold uppercase tracking-wide text-center leading-tight ${active ? 'text-accentPrimary' : 'text-textPrimary'
                }`}>
                {title}
            </h1>
        </div>
    );
};