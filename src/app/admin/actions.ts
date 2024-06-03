// src/app/admin/actions.ts
/* disable-eslint */
"use server";
import {
  createUser,
  updateUser,
  findUserByUsername,
  deleteUser,
} from "@/data-access/users";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { User } from "@/db/schema";
import { getSession } from "@/app/api/auth/[...nextauth]/options";
import bcrypt from "bcryptjs";

const saltRounds = 10;

export async function createUserAction(userData: Omit<User, "id">) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    throw new Error("You must be an admin to create a user");
  }
  const { ...requiredUserData } = userData;
  const hashedPassword = await bcrypt.hash(
    requiredUserData.password ?? "",
    saltRounds
  );

  const userDataWithHashedPassword: Omit<User, "id"> = {
    ...userData,
    password: hashedPassword,
  };

  const user = await createUser(userDataWithHashedPassword);
  revalidatePath("/admin");
  return user;
}

export async function editUserAction(userData: User) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    throw new Error("You must be an admin to edit a user");
  }

  const user = await findUserByUsername(userData.username!); // Add the non-null assertion operator (!) to userData.username
  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = userData.password
    ? await bcrypt.hash(userData.password, saltRounds)
    : user.password;

  const updatedUserData: User = {
    ...userData,
    password: hashedPassword,
  };

  await updateUser(user.id, updatedUserData);

  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteUserAction(userId: string) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    throw new Error("You must be an admin to delete a user");
  }

  await deleteUser(userId);
  revalidatePath("/admin");
}
