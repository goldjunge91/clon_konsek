// import {JWT} from '@auth/core';
// src/app/auth/[...nextauth]/options.ts
// import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { Adapter } from 'next-auth/adapters'
import { getServerSession, NextAuthOptions } from 'next-auth';
// import {GoogleProfile} from "next-auth/providers/google";
import { db } from '@/db';
// import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUserByUsername, verifyPassword } from '@/data-access/users';
import { GoogleAuth } from "./googleAuthConfig";
import { AUTH_CONFIG } from '@/config';
import { CustomAdapter } from './customAdapter';


export const options: NextAuthOptions = {
  adapter: CustomAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username:", type: "text", placeholder: "your-cool-username" },
        password: { label: "Password:", type: "password", placeholder: "your-awesome-password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const user = await findUserByUsername(credentials.username);
        if (!user || user.password === null) {
          return null;
        }
        const isPasswordValid = await verifyPassword(credentials.password, user.password);
        if (!isPasswordValid) {
          return null;
        }
        return {
          id: user.id,
          name: user.name ?? "",
          email: user.email ?? "",
          image: user.image ?? "",
          role: user.role ?? "user",
          username: user.username ?? "",
        };
      },
    }),
    ...(AUTH_CONFIG.ENABLE_GOOGLE_AUTH ? [GoogleAuth] : []),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? "";
        token.email = user.email ?? "";
        token.username = user.username ?? user.email ?? "";
        token.role = user.role ?? "user";
      }

      if (token.username) {
        try {
          const dbUser = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.username, token.username as string),
          });

          if (dbUser) {
            token.role = dbUser.role ?? "user";
          } else {
            console.log("No user with username found");
          }
        } catch (error) {
          console.error("Error in JWT callback:", error);
        }
      }

      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.role = token.role as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
};

export function getSession() {
  return getServerSession(options);
}


// export const options: NextAuthOptions = {
//   adapter: CustomAdapter(db) as Adapter,
//   // adapter: DrizzleAdapter(db) as Adapter,
//   session: {
//     strategy: 'jwt',
//     maxAge: 60 * 60 * 24 * 30, // 30 days
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username:", type: "text", placeholder: "your-cool-username" },
//         password: { label: "Password:", type: "password", placeholder: "your-awesome-password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.username || !credentials?.password) {
//           return null;
//         }
//         const user = await findUserByUsername(credentials.username);
//         if (!user || user.password === null) {
//           return null;
//         }
//         const isPasswordValid = await verifyPassword(credentials.password, user.password);
//         if (!isPasswordValid) {
//           return null;
//         }
//         return {
//           id: user.id,
//           name: user.name ?? "",
//           // email: user.email ?? "",
//           image: user.image ?? "",
//           role: user.role ?? "user",
//           username: user.username ?? "",

//         }
//       },
//     }),
//     ...(AUTH_CONFIG.ENABLE_GOOGLE_AUTH ? [GoogleAuth] : []),
//   ],
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name ?? "";
//         // token.email = user.email ?? "";
//         token.username = user.username ?? user.email ?? ""; // Fallback to email if username is not set
//         token.role = user.role ?? "user";
//       }

//       if (token.username) {
//         try {
//           const dbUser = await db.query.users.findFirst({
//             where: (users, { eq }) => eq(users.username, token.username as string),
//           });

//           if (dbUser) {
//             token.role = dbUser.role ?? "user";
//           } else {
//             console.log("No user with username found");
//           }
//         } catch (error) {
//           console.error("Error in JWT callback:", error);
//         }
//       }

//       if (account) {
//         token.accessToken = account.access_token;
//       }

//       return token;
//     },
//     async session({ token, session }) {
//       if (token && session.user) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
//         // session.user.email = token.email as string;
//         session.user.image = token.image as string;
//         session.user.role = token.role as string;
//         session.user.username = token.username as string;
//       }
//       return session;
//     },
//   },
// };
// export function getSession() {
//   return getServerSession(options)
// }

// // // export const NextAuthOptions = {
// export const options: NextAuthOptions = {
//   adapter: DrizzleAdapter(db) as Adapter,
//   session: {
//     strategy: "jwt",
//     maxAge: 60 * 60 * 24 * 30,
//     // You can define your own encode/decode functions for signing and encryption
//     // async encode() {},
//     // async decode() {},
//   },
//   providers: [
//     // GoogleProvider({
//     //   profile(profile: GoogleProfile) {

//     //     return {
//     //       ...profile,
//     //       role: profile.role ?? "user",
//     //       name: profile.name,
//     //       email: profile.email,
//     //       id: String(profile.id), // K
//     //       image: profile.picture ?? "/",
//     //     };
//     //   },
//     //   clientId: process.env.GOOGLE_CLIENT_ID!,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     // }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username:", type: "text", placeholder: "Username" },
//         password: { label: "Password:", type: "password", placeholder: "Password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.username || !credentials?.password) {
//           throw new Error("Missing username or password");
//         }
//         const user = await findUserByUsername(credentials.username);
//         if (!user) {
//           throw new Error("No user found with the provided username");
//         }
//         if (user.password === null) {
//           throw new Error("User password is null");
//         }
//         const isPasswordValid = await verifyPassword(credentials.password, user.password);
//         if (!isPasswordValid) {
//           throw new Error("Invalid password");
//         }
//         return {
//           id: user.id,
//           username: user.username ?? "",
//           // email: user.email,
//           image: user.image ?? "",
//           role: user.role ?? "user",
//         };
//       },
//     }),
//   ],
//   callbacks: {

//     // @ts-ignore
//     async jwt({ token, account }) {
//       // console.log("token before db query:", token);
//       // const dbUser = await db.query.users.findFirst({
//       //   where: (users, { eq }) => eq(users.email, token.email!),
//       // });
// const dbUser = await db.query.users.findFirst({
//   where: (user, { eq }) => eq(user.username, token.username!),
// });
// if (dbUser) {
//   token.role = dbUser.role;
// }
// if (!dbUser) {
//   throw new Error("no user with email found");
// }
// if (account) {
//   token.accessToken = account.access_token;
// }

//       return {
//         id: dbUser.id,
//         // name: dbUser.name,
//         username: dbUser.username,
//         // email: dbUser.email,
//         // image: dbUser.image,
//         role: dbUser.role,
//       };
//     },
//       // @ts-ignore
//     async session({ token, session }) {

//       if (token) {
//         session.user = {
//           id: token.id as string,
//           name: token.name as string,
//           // email: token.email!,
//           // image: token.image as string,
//           role: token.role as string,
//         };
//       }
//       return session;
//     },
//   },
//   // @ts-ignore
// } satisfies typeof NextAuthOptions;

// export function getSession() {
//   return getServerSession(options);
// }

// export const options: NextAuthOptions = {
//   adapter: DrizzleAdapter(db) as Adapter,
//   session: {
//     strategy: "jwt",
//     maxAge: 60 * 60 * 24 * 30,
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username:", type: "text", placeholder: "Username" },
//         password: { label: "Password:", type: "password", placeholder: "Password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.username || !credentials?.password) {
//           throw new Error("Missing username or password");
//         }
//         const user = await findUserByUsername(credentials.username);
//         if (!user) {
//           throw new Error("No user found with the provided username");
//         }
//         if (user.password === null) {
//           throw new Error("User password is null");
//         }
//         const isPasswordValid = await verifyPassword(credentials.password, user.password);
//         if (!isPasswordValid) {
//           throw new Error("Invalid password");
//         }
//         return {
//           id: user.id,
//           name: user.username ?? "",
//           image: user.image ?? "",
//           role: user.role ?? "user",
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//   },
// };

//     export const options: NextAuthOptions = {
//       adapter: DrizzleAdapter(db) as Adapter,
//       session: {
//         strategy: "jwt",
//         maxAge: 60 * 60 * 24 * 30,
//       },
//       providers: [
//     GoogleProvider({
//       profile(profile: GoogleProfile) {
//         return {
//           ...profile,
//           role: profile.role ?? "user",
//           name: profile.name,
//           email: profile.email,
//           id: String(profile.id),
//           image: profile.picture ?? "/",
//         };
//       },
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username:", type: "text", placeholder: "your-cool-username" },
//         password: { label: "Password:", type: "password", placeholder: "your-awesome-password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.username || !credentials?.password) {
//           throw new Error("Missing username or password");
//         }
//         const user = await findUserByUsername(credentials.username);
//         if (!user) {
//           throw new Error("No user found with the provided username");
//         }
//         if (user.password === null) {
//           throw new Error("User password is null");
//         }
//         const isPasswordValid = await verifyPassword(credentials.password, user.password);
//         if (!isPasswordValid) {
//           throw new Error("Invalid password");
//         }
//         return {
//           id: user.id,
//           name: user.name ?? "",
//           image: user.image ?? "",
//           role: user.role ?? "user",
//         };
//       },
//     }),
//   ],
//       callbacks: {
//         async jwt({ token, user, account }: { token: JWT; user?: any; account?: any }) {
//         //   const dbUser = await db.query.users.findFirst({
//         //     where: (users, { eq }) => eq(users.email, token.email!),
//         //   });
//           const dbUser = await db.query.users.findFirst({ where: (users, {eq}) => eq(user.username, token.username!),
//                         });
//           if (dbUser) {
//             token.role = dbUser.role;
//           }
//           if (!dbUser) {
//             throw new Error("no user with email found");
//           }
//           if (account) {
//             token.accessToken = account.access_token;
//           }
//           return {
//             id: dbUser.id,
//             name: dbUser.name,
//             image: dbUser.image,
//             role: dbUser.role,
//           };
//         },

//         async session({ token, session }: { token: JWT; session: Session }) {
//           if (token) {
//             session.user = {
//               id: token.id as string,
//               name: token.name as string,
//               image: token.image as string,
//               role: token.role as string,
//             };
//           }
//           return session;
//         },
//       },
//     } satisfies NextAuthOptions;
//       export function getSession() {
//         return getServerSession(options);
//       }

// // export function getSession() {
// //     return getServerSession(options);
// // }

// export const options: NextAuthOptions = {
// adapter: DrizzleAdapter(db) as Adapter,
//   session: {
//     strategy: "jwt",
//     maxAge: 60 * 60 * 24 * 30,
//   },
//   providers: [
//     GoogleProvider({
//         profile(profile: GoogleProfile) {
//           return {
//             ...profile,
//             role: profile.role ?? "user",
//             name: profile.name,
//             email: profile.email,
//             id: String(profile.id),
//             image: profile.picture ?? "/",

//           };
//         },
//         clientId: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       }),
//       CredentialsProvider({
//         name: "Credentials",
//         credentials: {
//           username: { label: "Username:", type: "text", placeholder: "your-cool-username" },
//           password: { label: "Password:", type: "password", placeholder: "your-awesome-password" },
//         },
//         async authorize(credentials) {
//           if (!credentials?.username || !credentials?.password) {
//             throw new Error("Missing username or password");
//           }
//           const user = await findUserByUsername(credentials.username);
//           if (!user) {
//             throw new Error("No user found with the provided username");
//           }
//           if (user.password === null) {
//             throw new Error("User password is null");
//           }
//           const isPasswordValid = await verifyPassword(credentials.password, user.password);
//           if (!isPasswordValid) {
//             throw new Error("Invalid password");
//           }
//           return {
//             id: user.id,
//             name: user.name ?? "",
//             image: user.image ?? "",
//             role: user.role ?? "user",
//           };
//         },
//       }),
//     ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//   },
// };

// export function getSession() {
//     return getServerSession(options);
// }
