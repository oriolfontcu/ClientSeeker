const AuthLayout = ({ children } : { children: React.ReactNode }) => {
    return ( 
        <div className="h-full flex items-center justify-center top-0 z-[-2] w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            {children}
        </div>
     );
}
 
export default AuthLayout;