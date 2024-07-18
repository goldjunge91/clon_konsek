/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// import {JWT} from '@auth/core';
// src/app/auth/[...nextauth]/options.ts
// import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { getServerSession, NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
// import {GoogleProfile} from "next-auth/providers/google";
// import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { AUTH_CONFIG } from '@/config';
import { findUserByUsername, verifyPassword } from '@/data-access/users';
import { db } from '@/db';

import { CustomAdapter } from './customAdapter';
import { GoogleAuth } from './googleAuthConfig';

export const options: NextAuthOptions = {
	adapter: CustomAdapter(db) as Adapter,
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 * 30, // 30 days
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username:',
					type: 'text',
					placeholder: 'your-cool-username',
				},
				password: {
					label: 'Password:',
					type: 'password',
					placeholder: 'your-awesome-password',
				},
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials.password) {
					return null;
				}
				const user = await findUserByUsername(credentials.username);
				if (!user || user.password === null) {
					return null;
				}
				const isPasswordValid = await verifyPassword(
					credentials.password,
					user.password
				);
				if (!isPasswordValid) {
					return null;
				}
				return {
					id: user.id,
					name: user.name ?? '',
					email: user.email ?? '',
					image: user.image ?? '',
					role: user.role ?? 'user',
					username: user.username ?? '',
				};
			},
		}),
		...(AUTH_CONFIG.ENABLE_GOOGLE_AUTH ? [GoogleAuth] : []),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (user) {
				token.id = user.id;
				token.name = user.name ?? '';
				token.email = user.email ?? '';
				token.username = user.username ?? user.email ?? '';
				token.role = user.role ?? 'user';
			}

			if (token.username) {
				try {
					const dbUser = await db.query.users.findFirst({
						where: (users, { eq }) =>
							eq(users.username, token.username as string),
					});

					if (dbUser) {
						token.role = dbUser.role ?? 'user';
					} else {
						// eslint-disable-next-line no-console
						console.log('No user with username found');
					}
				} catch (error) {
					console.error('Error in JWT callback:', error);
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
