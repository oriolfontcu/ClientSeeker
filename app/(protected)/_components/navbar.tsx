"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

import { useCurrentMembership } from "@/hooks/use-current-membership"
import { useCurrentRole } from "@/hooks/use-current-role"

import { UserButton } from "@/app/(protected)/_components/user-button"
import { ModeToggle } from "@/components/theme-toogle"
import { Badge } from "@/components/ui/badge"

import { CircleUser, Menu, Package2, Search } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LogoLink } from "@/components/logo-link"

export const Navbar = () => {
    const pathname = usePathname()

    const membership = useCurrentMembership();
    const role = useCurrentRole();

    return (
        <header className="bg-secondary w-full sticky top-0 flex items-center gap-4 border-b md:px-6 shadow-md p-6">
            <nav className="hidden flex-col text-lg font-medium md:flex md:flex-row md:items-center md:text-sm">
            <LogoLink />
                <div className="flex ml-20 gap-5">
                    <Link
                        href="/dashboard"
                        className="text-muted-foreground transition-colors hover:text-foreground"
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
                <LogoLink />
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