// filepath: 
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Sending credentials:", credentials);
          const res = await axios.post("http://localhost:4000/api/v1/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          console.log("Response from backend:", res.data);

          if (res.data && res.data.token) {
            return {
              id: res.data.id,
              email: res.data.email,
              name: res.data.fullName, // Usa "name" en lugar de "fullname"
              role: res.data.role || "user",
              token: res.data.token,
            };
          }
          return null;
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name; // Usa "name" en lugar de "fullname"
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name, // Usa "name" en lugar de "fullname"
        role: token.role,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };