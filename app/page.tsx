import { NavbarLanding } from "@/components/landing/navbar-landing";
import { HeaderLanding } from "@/components/landing/header-landing";


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
