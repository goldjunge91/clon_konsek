/* eslint-disable */
// src/app/tasks[taskId]/page.tsx
import { getTask } from "@/data-access/tasks";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { TaskView } from "./TaskView";
import { unstable_noStore } from "next/cache";

export default async function TaskPage(props: { params: { taskId: string } }) {
    unstable_noStore();
    const taskId = props.params.taskId;
    const task = await getTask(taskId);
    if (!task) {
        return <div>No task of this ID found</div>;
    }

    return (
        // der block für das TaskView-Element komponente die TaskView-Komponente
        <div className="container">
            <div className="task-view">
                <div className="card-styles">
                    <TaskView task={task} />
                </div>
            </div>
            <div className="card-styles">
                <div className="card-styles">
                    <h1 >{task?.name}</h1>
                    {task.dsm_url && (
                        <Link
                            href={task.dsm_url}
                            className="task-link"
                            target="_blank"
                            rel="noopener noreferrer">
                            <GithubIcon />
                            Q.Wiki URL
                        </Link>
                    )}
                    <p className="task-status">{task?.status}</p>
                </div>
            </div>
        </div>
    );
}