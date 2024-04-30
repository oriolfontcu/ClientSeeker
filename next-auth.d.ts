import { UserRole, UserMembership } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole,
    membership: UserMembership
}

declare module "next-auth" {
    interface Session{
        user: ExtendedUser
    }
}
