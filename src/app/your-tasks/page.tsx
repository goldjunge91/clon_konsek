/* eslint-disable */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserTasks } from "@/data-access/tasks";
import { UserTaskCard } from "./user-task-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { Task } from "@/db/schema";
import { ListTodo } from 'lucide-react';

// import "./your-task.styles.css";

// { tasks.map((task: Task) => { return <UserTaskCard key={task.id} task={task} />; }) }


export default async function YourTasksPage() {
    unstable_noStore();
    const tasks = await getUserTasks();

    return (
        <main className="your-tasks-page">

            <h1 className="page-title">Your Tasks</h1>
            {tasks.length === 0 ? (
                <div>
                    // Render when there are no tasks
                    <div className="no-tasks-container">
                        <Button asChild className="create-task-button">
                            <Link href="/create-task">
                                 <ListTodo />
                                Create a Task
                            </Link>
                        </Button>
                    </div>
                </div>
            ) : (
                <div >
                    <div className="tasks-container">
                        <div className="task-header">
                            <Button asChild className="create-task-button">
                                <Link href="/create-task">
                                    <ListTodo />

                                    Create a Task
                                </Link>
                            </Button>
                        </div>
                        <div className="task-list">
                            {tasks.map((task) => (
                                <UserTaskCard key={task.id} task={task} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
