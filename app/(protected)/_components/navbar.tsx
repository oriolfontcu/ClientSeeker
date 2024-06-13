"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

import { UserButton } from "@/components/auth/user-button"

import { useCurrentMembership } from "@/hooks/use-current-membership"
import { ModeToggle } from "@/components/theme-toogle"

export const Navbar = () => {
    const pathname = usePathname()
    const membership = useCurrentMembership();

    return (
        <nav className="bg-secondary flex justify-between items-center p-6 w-full shadow-md">
            <div className="flex gap-x-5">
                <Button 
                    asChild
                    variant={pathname === "/dashboard" ? "default" : "outline"}
                >
                    <Link href="/dashboard">Dashboard </Link>
                </Button>
            </div>
            <div className="flex gap-x-5 justify-center items-center">
                {membership === "PREMIUM" ? 
                <Button 
                    asChild
                    variant="default"
                >
                    <Link href="/dashboard">Premium</Link>
                </Button> 
                : <Button 
                    asChild
                    variant="outline"
                >
                    <Link href="/premium">Free</Link>
                </Button>
                }
                <ModeToggle />
                <UserButton />
            </div>
        </nav>
    )
}