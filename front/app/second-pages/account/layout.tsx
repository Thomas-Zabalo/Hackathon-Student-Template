'use client';
import Navbar from '@/components/Navbar';
import AccountNavbar from './AccountNavbar';
import { useTheme } from '@/context/ThemeContext';
import AnimatedContainer from '@/components/AnimatedContainer';
export default function AccountLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { heroContainerType } = useTheme();
    const isWide = heroContainerType === 'wide';
    return (
        <AnimatedContainer className={isWide ? 'bg-main-gradient' : 'pt-6'}>
            <div className="container">
                <div className={isWide ? '' : 'bg-main-gradient rounded-3xl lg:rounded-4xl'}>
                    <Navbar />
                    <div className="pt-16 pb-6 lg:pb-52 max-w-[55rem] mx-auto">
                        <AccountNavbar />
                        <div className="mt-12">{children}</div>
                    </div>
                </div>
            </div>
        </AnimatedContainer>
    );
}
