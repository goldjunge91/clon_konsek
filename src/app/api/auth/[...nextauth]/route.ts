// /src/app/api/auth/[...nextauth]/route.ts

// import NextAuth from "next-auth";
// import { authConfig } from "@/lib/auth";

import NextAuth from "next-auth";
import { options } from './options'

// const handler = NextAuth(authConfig);
// export { handler as GET, handler as POST };

// // /src/app/api/auth/[...nextauth]/route.ts
// // import { authConfig } from "@/lib/auth";

const handler = NextAuth(options)

export { handler as GET, handler as POST }