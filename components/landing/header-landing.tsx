import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"
import { TrustedUsers } from "./trusted-users"

export const HeaderLanding = () => {
    return (
        <section className="flex flex-col h-screen pt-20 items-center">
          <div className="w-4/12 flex flex-col justify-center items-center">
            <TrustedUsers />
            <div className="flex mt-5">
              <h1 className="font-extrabold text-6xl lg:text-7xl tracking-tight flex flex-col gap-6 items-center justify-center">
                <span className="relative">Focus in work, </span>
                <span className="whitespace-nowrap relative ">
                  <span className=" relative whitespace-nowrap"><span className="absolute bg-primary -left-2 -top-1 -bottom-1 -right-2 -rotate-1"></span>
                    <span className="relative text-secondary">we find the leads</span>
                  </span>
                </span>
              </h1> 
            </div>
            <div>
              <p className="mt-20 text-lg text-muted-foreground text-center">Say goodbye to the tedious task of client hunting. With ClientSeek, you can focus on what you do best your work</p>
            </div>
            <div className="p-10">
              <Button variant="default" className="mr-4 p-6 px-8 text-lg">Try FREE now</Button>
              <Button variant="ghost" className="border border-primary p-6 px-8 text-lg">
                Talk With Us
                <Avatar className="border-2 border-secondary size-6 ml-2">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </section>
    )
}