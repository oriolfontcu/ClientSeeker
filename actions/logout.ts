"use server"

import { signOut } from "@/auth"

export const logout = async () => {

    // Some stuff about the user

    await signOut();
}