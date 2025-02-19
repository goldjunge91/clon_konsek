// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			role: string;
		} & DefaultSession["user"];
	}

	interface User extends DefaultUser {
		id: string;
		role: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		role: string;
	}
}
// declare module "next-auth" {
// 	interface Session {
// 		user: {
// 			id: string;
// 			role: string;
// 		} & DefaultSession["user"];
// 	}

// 	interface User extends DefaultUser {
// 		role: string;
// 	}
// }

// declare module "next-auth/jwt" {
// 	interface JWT extends DefaultJWT {
// 		role: string;
// 	}
// }
// declare module "next-auth" {
// 	interface Session extends DefaultSession {
// 		user: {
// 			id: string;
// 			role: string;
// 		} & DefaultSession["user"];
// 	}
// }

// declare module "next-auth" {
// 	interface Session {
// 		user: {
// 			id: string;
// 			role: string;
// 		} & DefaultSession["user"];
// 	}

// 	interface User extends DefaultUser {
// 		role: string;
// 	}
// }

// declare module "next-auth/jwt" {
// 	interface JWT extends DefaultJWT {
// 		role: string;
// 	}
// }

// // declare module "next-auth" {
// //   interface Session extends DefaultSession {
// //     user: {
// //       id: string;
// //       role: string;
// //     } & DefaultSession["user"];
// //   }
// // }
