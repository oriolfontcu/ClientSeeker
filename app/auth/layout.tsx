const AuthLayout = ({ children } : { children: React.ReactNode }) => {
    return ( 
        <div className="h-screen flex items-center justify-center top-0 z-[-2] w-screen bg-secondary">
            {children}
        </div>
     );
}
 
export default AuthLayout;