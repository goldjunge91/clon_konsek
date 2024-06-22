/* eslint-disable */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserTasks } from "@/data-access/tasks";
import { UserTaskCard } from "./user-task-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { Task } from "@/db/schema";

export default async function YourTasksPage() {
    unstable_noStore();
    const tasks = await getUserTasks();
    return (
        <main>
            <div className="your-tasks-page" >
                <h1 >Your Tasks</h1>
            </div>
                {tasks.map((task: Task) => { return <UserTaskCard key={task.id} task={task} />; })}
            {tasks.length === 0 && (
                <div className="no-tasks">
                    <Image
                        src="/no-data.svg"
                        width="200"
                        height="200"
                        alt="no data image"
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                        }} />
                    <h2 >You have no tasks</h2>
                    <Button asChild className="button">
                        <Link href="/create-task">Create Task</Link>
                    </Button>
                </div>
            )}
        </main>
    );
}
