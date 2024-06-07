const AuthLayout = ({ children } : { children: React.ReactNode }) => {
    return ( 
        <div className="h-full flex items-center justify-center top-0 z-[-2] w-screen bg-background">
            {children}
        </div>
     );
}
 
export default AuthLayout;