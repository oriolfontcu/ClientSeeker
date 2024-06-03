"use client";

import { useCurrentMembership } from "@/hooks/use-current-membership";
import { UserMembership } from "@prisma/client";
import { FormError } from "../form-error";

interface MembershipGateProps {
    children: React.ReactNode;
    allowedMembership: UserMembership
}

export const MembershipGate = ({
    children,
    allowedMembership,
}: MembershipGateProps) => {
    const membership = useCurrentMembership(); 

    if (membership != allowedMembership){
        return (
            <FormError message="You should be a Premium member to access this content! "/>
        )
    }

    return (
        <>
            {children}
        </>
    )
}