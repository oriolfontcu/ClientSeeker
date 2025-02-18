import { useSession } from "next-auth/react";

export const useCurrentMembership = () => {
    const session = useSession();

    // return session.data?.user?.membership;
    return "PREMIUM"
}