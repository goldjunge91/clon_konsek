// src/data-access/users.ts
import { User, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
// import bcryptjs from "bcryptjs";


import bcrypt from 'bcryptjs';
const saltRounds = 10;

export async function EditUser(userData: Partial<User>, userId: string): Promise<Partial<User>> { // Replace "Us" with "User" in the function signature
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (userData.password && existingUser[0]?.password !== userData.password) { // Add null check for existingUser[0]
    userData.password = await hashPassword(userData.password as string); // Add type assertion to userData.password
  }

  const updatedUser = await db
    .update(users)
    .set(userData as Partial<User>) // Add type assertion to userData parameter
    .where(eq(users.id, userId))
    .returning();

  return updatedUser[0];
}
export async function updateUser(userId: string, userData: User) {
  const updatedUser = await db
    .update(users)
    .set(userData)
    .where(eq(users.id, userId))
    .returning();

  return updatedUser[0];
}

export async function deleteUser(userId: string) {
  await db.delete(users).where(eq(users.id, userId));
}
export async function getUsers() {
  const userList = await db.select().from(users);
  return userList;
}


export async function createUser(userData: Omit<User, 'id' | 'sharedId'>) {
  const inserted = await db
    .insert(users)
    .values(userData)
    .returning();

  return inserted[0];
}

async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function findUserByUsername(username: string) {
  const user = await db.select().from(users).where(eq(users.username, username)).limit(1);
  return user[0];
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}