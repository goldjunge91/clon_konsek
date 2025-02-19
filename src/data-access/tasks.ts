/* eslint-disable */
import { db } from "@/db";
import { Task, task } from "@/db/schema";
import { eq } from "drizzle-orm";
import { like } from "drizzle-orm";
import { getSession } from "@/app/api/auth/[...nextauth]/options";
import { unstable_noStore } from "next/cache";

/**
 *
 * @param search
 * @returns
 */
// @ts-ignore
export async function getTasks(search: string | undefined) {
	// @ts-ignore
	const where = search ? like(task.tags, `%${search}%`) : undefined; // @ts-ignore
	const tasks = await db.query.task.findMany({
		where,
	});
	console.log("Task from getTask:", task); // Fügen Sie diesen Log hinzu
	return tasks;
}

export async function getUserTasks() {
	// console.log(getSession);
	const session = await getSession();
	if (!session) {
		throw new Error("User not authenticated");
	}
	const tasks = await db.query.task.findMany({
		where: eq(task.userId, session.user.id),
	});
	// console.log(tasks);
	return tasks;
}

// export async function getTask(taskId: string) {
// 	// console.log(getTask);
// 	unstable_noStore();
// 	return await db.query.task.findFirst({
// 		where: eq(task.id, taskId),
// 	});
// }

export async function getTask(taskId: string): Promise<Task | null> {
	const result = await db.query.task.findFirst({
		where: eq(task.id, taskId),
	});

	if (!result) return null;

	return result;
}

export async function deleteTask(taskId: string) {
	await db.delete(task).where(eq(task.id, taskId));
}

export async function createTask(taskData: Omit<Task, "id" | "userId">, userId: string) {
	const inserted = await db
		.insert(task)
		.values({ ...taskData, userId })
		.returning();
	return inserted[0];
}

export async function editTask(taskData: Task) {
	const updated = await db.update(task).set(taskData).where(eq(task.id, taskData.id)).returning();
	return updated[0];
}
