import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider>
      <html lang="en">
      <body className={`${rubik.className} bg-secondary`}>
      <ThemeProvider attribute="class" defaultTheme="system">
              {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
    
  );
}
