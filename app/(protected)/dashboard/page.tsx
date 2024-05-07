"use client"

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
    
    const onClick = () => {
        logout();
    }
    return ( 
        <section className="h-full w-full">
            
        </section>
     );
}
 
export default DashboardPage;