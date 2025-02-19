/* eslint-disable */
"use server";

import { deleteTask, getTask } from "@/data-access/tasks";
import { getSession } from "@/app/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
import { NextAuthOptions } from "next-auth";
/**
 *YourTasksActions
 * @description Aktionen für die Verwaltung der Aufgaben eines Benutzers.
 * @remarks
 * Enthält Funktionen zur Bearbeitung und Verwaltung benutzerspezifischer Aufgaben.
 * @link Verwandt mit {@link YourTasksPage}
 */
export async function deleteTaskAction(taskId: string) {
	const session = await getSession();
	if (!session) {
		throw new Error("User not authenticated");
	}

	const task = await getTask(taskId);

	if (task?.userId !== session.user.id) {
		throw new Error("User not authorized");
	}

	await deleteTask(taskId);

	revalidatePath("/your-tasks");
}
export async function getServerSideProps(options: NextAuthOptions) {
	const session = await getSession();
	if (!session) {
		return {
			redirect: {
				destination: "/api/auth/signin?callbackUrl=/protected-page",
				permanent: false,
			},
		};
	}
	// Additional checks for roles or permissions can also be performed here
	return { props: { session } };
}
