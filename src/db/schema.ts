// src\db\schema.ts
import {
	timestamp,
	pgTable,
	text,
	// serial,
	boolean,
	primaryKey,
	integer,
	uuid,
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from '@auth/core/adapters';
import { sql } from 'drizzle-orm';

export const users = pgTable('user', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').default(''),
	username: text('username').unique(),
	email: text('email'),
	password: text('password'),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
	isAdmin: boolean('isAdmin').default(false),
	role: text('role').default('user'),
});

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		sharedid: uuid('sharedId').default(sql`gen_random_uuid()`),
		role: text('role'),
		isAdmin: boolean('isAdmin').default(false),
		session_state: text('session_state'),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	})
);
export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	isAdmin: boolean('isAdmin').default(false),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
	role: text('role'),
});

export const task = pgTable('task', {
	id: uuid('id')
		.default(sql`gen_random_uuid()`)
		.notNull()
		.primaryKey(),
	dsm_url: text('url'),
	name: text('name'),
	// username: text("username").references(() => users.username),
	secretId: text('secretId'),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	dsm_mail: text('dsm_mail'),
	status: text('status').default('not started'),
});

export type User = typeof users.$inferSelect;
export type Task = typeof task.$inferSelect;
