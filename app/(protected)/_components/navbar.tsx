"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { UserButton } from "@/components/auth/user-button"

import { useCurrentMembership } from "@/hooks/use-current-membership"
import { ModeToggle } from "@/components/theme-toogle"

export const Navbar = () => {
    const pathname = usePathname()
    const membership = useCurrentMembership();

    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-full shadow-sm">
            <div className="flex gap-x-5">
                <Button 
                    asChild
                    variant={pathname === "/dashboard" ? "default" : "outline"}
                >
                    <Link href="/dashboard">Dashboard </Link>
                </Button>
                <Button 
                    asChild
                    variant={pathname === "/settings" ? "default" : "outline"}
                >
                    <Link href="/settings">Settings</Link>
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