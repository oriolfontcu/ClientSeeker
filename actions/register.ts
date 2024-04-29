"use server";

import * as z from "zod"

import { RegisterSchema } from "@/schemas";

export const register = async (values : z.infer<typeof RegisterSchema>) => {
    const validatedFileds = RegisterSchema.safeParse(values);

    if (!validatedFileds.success) {
        return { error: "Invalid fields!" };
    }

    return { success: "Email sent!" };
}