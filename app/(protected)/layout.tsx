"use client";

import { usePathname } from 'next/navigation';
import { Navbar } from "./_components/navbar";
import { premiumRoutes } from "@/routes";
import { MembershipGate } from '@/components/auth/membership-gate';
import { UserMembership } from "@prisma/client";
import { useState, useEffect } from 'react';
import LoadingOverlay from '@/components/loading-overlay';

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    const pathname = usePathname();
    const isPremiumRoute = premiumRoutes.includes(pathname);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an asynchronous operation
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // 500 miliseconds of delay

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, []);

    return (
        <div className="h-screen w-full flex flex-col gap-y-10 p-5 items-center top-0 z-[-2] bg-background">
            <Navbar />
            {isLoading && <LoadingOverlay />}
            {!isLoading && (
                isPremiumRoute ? (
                    <MembershipGate allowedMembership={UserMembership.PREMIUM}>
                        {children}
                    </MembershipGate>
                ) : (
                    <>
                        {children}
                    </>
                )
            )}
        </div>
    );
}

export default ProtectedLayout;
