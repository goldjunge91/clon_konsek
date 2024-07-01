"use server";
/**
 *  actions.ts (Admin)
 *AdminActions
 *  Verwaltet serverseitige Aktionen für Benutzeradministration.
 * @remarks
 * Dieses Modul enthält Funktionen zum Erstellen, Bearbeiten und Löschen von Benutzern.
 *
 *  Verwandt mit {@link CreateUserForm}
 */

import { deleteUser } from "@/data-access/users";
import { getSession } from "@/app/api/auth/[...nextauth]/options";
// import {getSession} from "@/lib/auth";

export async function deleteAccountAction() {
	const session = await getSession();

	if (!session) {
		throw new Error("you must be logged in to delete your account");
	}

	await deleteUser(session.user.id);
}
