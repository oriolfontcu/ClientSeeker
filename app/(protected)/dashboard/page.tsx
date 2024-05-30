"use client"

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import BusinessesDataTable from "../_components/BusinessesDataTable";

const DashboardPage = () => {

    const mapsFetch = fetch("")
    
    const onClick = () => {
        logout();
    }
    return ( 
        <main className="w-full h-full">
            <BusinessesDataTable />
        </main>
     );
}
 
export default DashboardPage;