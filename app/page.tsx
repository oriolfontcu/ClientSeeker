import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { LoginButton } from "@/components/auth/login-button";
import { PricingCardComponent } from "@/components/pricing-card";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <>
      <main className="flex h-full flex-col items-center justify-center top-0 z-[-2] w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <div className="space-y-6">
          <h1 className={cn(
            "text-6xl font-semibold text-white drop shadow",
            font.className,
            )}>
              ClientSeek.io
          </h1>
          <p className="text-white text-lg">
            Focus on work, not in founding it.
          </p>
          <div>
            <LoginButton>
              <Button variant="secondary" size="lg">
                Sign in
              </Button>
            </LoginButton>
          </div>
        </div>
      </main>
    </>
  );
}
