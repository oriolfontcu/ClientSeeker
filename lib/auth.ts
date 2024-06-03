import { auth } from "@/auth";

export const currentUser = async () => {
    const session = await auth();

    return session?.user;
}

export const currentMembership = async () => {
    const session = await auth();

    return session?.user?.membership
}