/* eslint-disable */
import {getTask} from "@/data-access/tasks";
import {EditTaskForm} from "./edit-task-form";
import {unstable_noStore} from "next/cache";
import {string} from "zod";

export default async function EditTaskPage({

                                               params,
                                           }: {
    params: { taskId: string };
}) {
    unstable_noStore();
    const task = await getTask(params.taskId);
    // const logger = new logger();


    if (!task) {
        return <div>Task not found</div>;
    }

    return (
        <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
            <h1 className="text-4xl font-bold">Edit Task</h1>

            <EditTaskForm task={task}/>
        </div>
    );
}
