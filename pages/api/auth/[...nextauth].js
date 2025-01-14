import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const logSessionUpdate = () => {
  const currentdate = new Date();
  const datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return datetime;
};

export const authOptions = {
  // session: {
  //   strategy: "jwt",
  // },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          const { data } = await axios.post(
            `${process.env.NEXTAUTH_URL}/api/login`,
            {
              email,
              password,
            }
          );
          return data;
        } catch (error) {
          let errorCode = error?.status || "";
          let errorMessage = error?.response?.data || "Something went wrong!";
          throw new Error(errorCode + " " + errorMessage);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const datetime = logSessionUpdate();

      if (user) {
        console.log("First Login");
        console.log(datetime);
        console.log({ ...token, ...user });
        return { ...token, ...user };
      }
      if (trigger === "update" && session?.user?.token) {
        console.log("Update after expiration");
        console.log(datetime);
        return {
          ...token,
          token: session.user.token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token;

      return session;
    },
  },
};

export default NextAuth(authOptions);
