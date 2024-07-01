// src/app/admin/actions.ts
"use server";
import { createUser, updateUser, findUserByUsername, deleteUser } from "@/data-access/users";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { User } from "@/db/schema";
import { getSession } from "@/app/api/auth/[...nextauth]/options";
import bcrypt from "bcryptjs";
const saltRounds = 10;

/**
 * Erstellt einen neuen Benutzer.
 *
 * @param {Omit<User, "id">} userData - Die Benutzerdaten ohne ID.
 * @returns {Promise<User>} Der erstellte Benutzer.
 * @throws {Error} Wenn der aktuelle Benutzer kein Admin ist.
 */

export async function createUserAction(userData: Omit<User, "id">) {
	const session = await getSession();

	if (!session || (session.user as { role: string }).role !== "admin") {
		throw new Error("You must be an admin to create a user");
	}
	const { ...requiredUserData } = userData;
	const hashedPassword = await bcrypt.hash(requiredUserData.password ?? "", saltRounds);

	const userDataWithHashedPassword: Omit<User, "id"> = {
		...userData,
		password: hashedPassword,
	};

	const user = await createUser(userDataWithHashedPassword);
	revalidatePath("/admin");
	return user;
}

/**
 * Bearbeitet einen bestehenden Benutzer.
 *
 * @param {User} userData - Die aktualisierten Benutzerdaten.
 * @throws {Error} Wenn der Benutzer kein Admin ist oder der zu bearbeitende Benutzer nicht gefunden wird.
 */
export async function editUserAction(userData: User) {
	const session = await getSession();
	if (!session || (session.user as { role: string }).role !== "admin") {
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

/**
 * Löscht einen Benutzer anhand seiner ID.
 *
 * @param {string} userId - Die ID des zu löschenden Benutzers.
 * @throws {Error} Wenn der Benutzer kein Admin ist.
 */
export async function deleteUserAction(userId: string) {
	const session = await getSession();
	if (!session || (session.user as { role: string }).role !== "admin") {
		throw new Error("You must be an admin to delete a user");
	}

	await deleteUser(userId);
	revalidatePath("/admin");
}
