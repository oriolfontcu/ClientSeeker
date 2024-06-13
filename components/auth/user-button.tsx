"use client"

import { FaUser } from "react-icons/fa";
import { ExitIcon, PersonIcon, GearIcon } from "@radix-ui/react-icons";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar"
import { LogoutButton } from "@/components/auth/logout-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";


export const UserButton = () => {
    const user = useCurrentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""}/>
                    <AvatarFallback className="bg-slate-900">
                        <FaUser className="text-white"/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuItem className="cursor-pointer">
                    <PersonIcon className="h-4 w-4 mr-2" />
                    <Link href="/settings">Me</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <GearIcon className="h-4 w-4 mr-2" />
                    <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <LogoutButton>
                    <DropdownMenuItem className="cursor-pointer">
                        <ExitIcon className="h-4 w-4 mr-2" />
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}