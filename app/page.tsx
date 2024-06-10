import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { LoginButton } from "@/components/auth/login-button";
import { PricingCardComponent } from "@/components/auth/pricing-card";
import { NavbarLanding } from "@/components/landing/navbar-landing";
import { HeaderLanding } from "@/components/landing/header-landing";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-center w-full h-full bg-secondary">
        <NavbarLanding />
        <HeaderLanding />
      </main>
    </>
  );
}
