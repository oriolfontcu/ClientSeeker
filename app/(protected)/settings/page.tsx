"use client"

import Link from "next/link"
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserInfo } from "../_components/user-info";

const SettingsPage = () => {
    const user = useCurrentUser();

    return ( 
        <div className="flex w-full flex-col">
            <section className="h-full w-full">
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
                    <div className="mx-auto grid w-full max-w-6xl gap-2">
                        <h1 className="text-3xl font-semibold">Settings</h1>
                    </div>
                    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                    >
                        <Link href="#" className="font-semibold text-primary">
                        General
                        </Link>
                        <Link href="#">Security</Link>
                        <Link href="#">Integrations</Link>
                        <Link href="#">Support</Link>
                        <Link href="#">Organizations</Link>
                        <Link href="#">Advanced</Link>
                    </nav>
                    <UserInfo 
                        user={user}
                    />
                    </div>  
                </main>
            </section>
        </div>
     );
}
 
export default SettingsPage;