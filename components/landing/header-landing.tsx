import { TrustedUsers } from "./trusted-users"

export const HeaderLanding = () => {
    return (
        <section className="flex flex-col h-screen justify-center items-center">
          <TrustedUsers />
          <div className="flex">
            <h1 className="font-extrabold text-5xl lg:text-6xl tracking-tight flex flex-col gap-3 items-center justify-center">
              <span className="relative">Focus in work ,</span>
              <span className="whitespace-nowrap relative ">
                <span className=" relative whitespace-nowrap"><span className="absolute bg-primary -left-2 -top-1 -bottom-1 -right-2 -rotate-2"></span>
                  <span className="relative text-secondary">not finding it</span>
                </span>
              </span>
            </h1> 
          </div>
        </section>
    )
}