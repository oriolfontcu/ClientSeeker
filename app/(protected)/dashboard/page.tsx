"use client"

import { MembershipGate } from "@/components/auth/membership-gate";
import BusinessesDataTable from "../_components/BusinessesDataTable";

import { useCurrentMembership } from "@/hooks/use-current-membership";
import { UserMembership } from "@prisma/client";

const DashboardPage = () => {
    
    return ( 
            <main className="w-full h-full">
                <MembershipGate allowedMembership={UserMembership.PREMIUM}>
                    <BusinessesDataTable />
                </MembershipGate>
            </main>
     );
}
 
export default DashboardPage;