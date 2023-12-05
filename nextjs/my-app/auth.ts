import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import connectMongoDB from "@/lib/mongodb";

import type { NextAuthConfig } from "next-auth"
import { MongoClient } from "mongodb";

const clientPromise = connectMongoDB();

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    GitHub

  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },

  },
  adapter: MongoDBAdapter(clientPromise as any),
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)