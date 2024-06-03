"use client"

import { usePathname } from 'next/navigation';
import { Navbar } from "./_components/navbar";
import { premiumRoutes } from "@/routes";
import { MembershipGate } from '@/components/auth/membership-gate';
import { UserMembership } from "@prisma/client";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    const pathname = usePathname();
    const isPremiumRoute = premiumRoutes.includes(pathname);
   
    return ( 
        <div className="h-screen w-full flex flex-col gap-y-10 p-5 items-center top-0 z-[-2] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            <Navbar />
            {isPremiumRoute ? (
                <MembershipGate allowedMembership={UserMembership.PREMIUM}>
                    {children}
                </MembershipGate>
            ) : (
                <>
                    {children}
                </>
            )}
        </div>
     );
}
 
export default ProtectedLayout;