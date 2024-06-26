"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

import { UserButton } from "@/app/(protected)/_components/user-button"
import { ModeToggle } from "@/components/theme-toogle"

import { Menu } from "lucide-react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

import { LogoLink } from "@/components/logo-link"
import { cn } from "@/lib/utils"

import { useCurrentRole } from "@/hooks/use-current-role"

export const Navbar = () => {

    const role = useCurrentRole();
    const pathname = usePathname()

    return (
        <header className="bg-secondary w-full sticky top-0 flex items-center  border-b md:px-6 shadow-md p-6">
            <nav className="hidden flex-col text-lg font-medium md:flex md:flex-row md:items-center md:text-sm">
            <LogoLink />
            {role === "ADMIN" 
                ? 
                <Badge
                    variant="destructive"
                    className="ml-6 px-3 py-1 text-sm rounded-full w-[70px]"
                >Admin
                </Badge> 
                :
                ""
            }
                <div className="flex ml-20 gap-5">
                    <Link
                        href="/dashboard"
                        className={cn("transition-colors hover:text-foreground", pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground")}
                    >
                        Dashboard
                    </Link>
                </div>
            </nav>
            <Sheet>
            <SheetTrigger asChild>
                <Button
                variant="link"
                size="icon"
                className="shrink-0 md:hidden"
                >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                <div className="w-fuill justify-between">
                    <LogoLink/>
                    {role === "ADMIN" 
                        ? 
                        <Badge
                            variant="destructive"
                            className="ml-6 px-3 py-1 text-sm rounded-full w-[70px]"
                        >Admin
                        </Badge> 
                        :
                        ""
                    }
                </div>
                <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                >
                    Dashboard
                </Link>
                </nav>
            </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="flex ml-auto sm:flex-initial items-center gap-x-8 ">
                    <ModeToggle />
                    <UserButton />
                </div>
            </div>
        </header>
    )
}