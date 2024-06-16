/* eslint-disable */
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getUserTasks} from "@/data-access/tasks";
import {UserTaskCard} from "./user-task-card";
import {unstable_noStore} from "next/cache";
import Image from "next/legacy/image";
import {Task} from "../../db/schema";

export default async function YourTasksPage() {
    unstable_noStore();
    const tasks = await getUserTasks();

    // const isAUthenticated = getServerSideProps (
    return (
        <main className="min-h-screen p-20">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl">Your Tasks</h1>
                {tasks.length === 0 && (
                    <Button asChild>
                        <Link href="/create-task">Create Task</Link>
                    </Button>
                )}
            </div>
            <div className="grid grid-cols-3 gap-4">
                {tasks.map((task: Task) => {
                    return <UserTaskCard key={task.id} task={task}/>;
                })}
            </div>
            {tasks.length === 0 && (
                <div className="flex flex-col gap-4 justify-center items-center mt-24">
                    <Image
                        src="/no-data.svg"
                        width="200"
                        height="200"
                        alt="no data image"
                    />
                    <h2 className="text-2xl">You have no tasks</h2>
                    <Button asChild>
                        <Link href="/create-task">Create Task</Link>
                    </Button>
                </div>
            )}
        </main>
    );
}
