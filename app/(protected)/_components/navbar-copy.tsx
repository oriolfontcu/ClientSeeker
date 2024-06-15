"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

import { useCurrentMembership } from "@/hooks/use-current-membership"
import { useCurrentRole } from "@/hooks/use-current-role"

import { UserButton } from "@/app/(protected)/_components/user-button"
import { ModeToggle } from "@/components/theme-toogle"
import { Badge } from "@/components/ui/badge"

export const Navbar = () => {
    const pathname = usePathname()

    const membership = useCurrentMembership();
    const role = useCurrentRole();

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
                { role === "ADMIN" ?
                    <Badge variant="destructive" className="text-sm rounded-full px-4 py-2">Admin</Badge>
                    : 
                    ""
                }
                <ModeToggle />
                <UserButton />
            </div>
        </nav>
    )
}