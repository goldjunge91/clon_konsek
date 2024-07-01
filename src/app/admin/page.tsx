/* eslint-disable */
"use client";
import { useSession, signIn } from "next-auth/react";
import { CreateUserForm } from "./create-user-form";
import { UserList } from "@/components/User/UserList";
import { unstable_noStore } from "next/cache";

/**
 *AdminPage
 * @description Admin-Dashboard zur Benutzerverwaltung.
 * @remarks
 * Diese Seite bietet eine Übersicht und Zugriff auf alle Benutzerverwaltungsfunktionen.
 * @file Brief description of the file here
 * @author FirstName LastName <optionalEmail@example.com>
 * @copyright FirstName LastName Year
 * @license LicenseHereIfApplicable
 * @returns {CreateUserPage}
 */

export default async function CreateUserPage() {
	unstable_noStore();

	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			signIn("auth-provider", { callbackUrl: "/" });
		},
	});
	if (!session || session.user.role !== "admin") {
		return <h1>Access Denied</h1>;
	}
	return (
		<div className="admin-page">
			<div className="admin-container">
				<div>
					<h1>Admin Panel</h1>
				</div>
				<div className="create-user-section">
					<h2>Create New User</h2>
					<CreateUserForm />
				</div>
				<div className="user-list-section">
					<h2>Existing Users</h2>
					<UserList />
				</div>
			</div>
		</div>
	);
}
