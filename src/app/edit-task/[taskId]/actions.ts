"use server";

import {editTask, getTask} from "@/data-access/tasks";
import {Task} from "@/db/schema";
import {getSession} from "@/app/api/auth/[...nextauth]/options";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function editTaskAction(taskData: Omit<Task, "userId">) {
    const session = await getSession();

    if (!session) {
        throw new Error("you must be logged in to create this task");
    }

    const task = await getTask(taskData.id);

    if (task?.userId !== session.user.id) {
        throw new Error("User not authorized");
    }

    await editTask({...taskData, userId: task.userId});

    revalidatePath("/your-tasks");
    revalidatePath(`/edit-task/${taskData.id}`);
    redirect("/your-tasks");
}
