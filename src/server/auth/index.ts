import NextAuth from "next-auth";
// Adapters
import { D1Adapter } from "@auth/d1-adapter";
// Providers
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: D1Adapter(process.env.DB),
  secret: process.env.AUTH_SECRET,
  providers: [GitHub],
  // trustHost: true, // to run npm run preview you need to set this to true
});
