import NextAuth from "next-auth"
import { UserRole, UserMembership } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages : {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({ user }){
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    // async signIn({ user }){
    //   const existingUser = await getUserById(user.id!);

    //   if(!existingUser || !existingUser.emailVerified){
    //     return false
    //   }

    //   return true
    // },
    async session({ token, session }){
      console.log({ sessionToken: token })

      if (token.sub && session.user){
          session.user.id = token.sub
      }

      if (token.role && session.user){
        session.user.role = token.role as UserRole;
      }

      if (token.membership && session.user){
        session.user.membership = token.membership as UserMembership
      }

      return session;
    },
    async jwt({ token }){
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token
      
      token.role = existingUser.role
      token.membership = existingUser.membership;

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})