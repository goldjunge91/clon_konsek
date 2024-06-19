import { Button } from "@/components/ui/button";
import { getTasks } from "@/data-access/tasks";
import { getServerSession } from "next-auth/next";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { TaskCard } from "./task-card";
import { redirect } from "next/navigation";
import { Task } from "../../db/schema";
import { options } from "../api/auth/[...nextauth]/options";

// Description:
// This code represents the "browse" page of the application.
// It fetches tasks based on search parameters and displays them as task cards.
// The page is accessible only to admin users.
// If there are no tasks, it displays a message and a button to create a new task.

// export default async function Home({ searchParams, }: {
export default async function browse({ searchParams, }: {
    searchParams: { search: string; };
}) {
    unstable_noStore();

    // Fetch tasks based on search parameters
    const tasks = await getTasks(searchParams.search);

    // Get the server session
    const session = await getServerSession(options);

    // Redirect to the signin page if no session exists
    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/server");
    }

    // Check if the user has the admin role
    if (session?.user.role !== "admin") {
        return <h1>Access Denied</h1>;
    }

    return (
        <main className="browse-page">
            <div className="flex justify-between items-center mb-10">
                <h1>Your Tasks</h1>
                {tasks.length === 0 && (
                    <Button asChild>
                        <Link href="/create-task">Create Task</Link>
                    </Button>
                )}
            </div>

            {/* Display task cards */}
            {/* <div className="grid grid-cols-3 gap-4"> */}
            <div className="display">
                {tasks.map((task: Task) => {
                    return <TaskCard key={task.id} task={task} />;
                })}
            </div>

            {/* Display a message and a button if no tasks are available */}
            {tasks.length === 0 && (
                <div className="flex flex-col gap-4 justify-center items-center mt-24">
                    <Image
                        src="/no-data.svg" width="200" height="200" alt="no data image" style={{
                            maxWidth: "100%",
                            height: "auto"
                        }} />
                    <h2>You have no tasks</h2>
                    <Button asChild>
                        <Link href="/create-task">Create Task</Link>
                    </Button>
                </div>
            )}
        </main>
    );
}

// Brief explanation:
// The code represents the "browse" page of the application.
// It imports necessary dependencies and components.
// The browse function is an async function that handles the page rendering.
// It fetches tasks based on the provided search parameters using the getTasks function.
// It retrieves the server session using getServerSession and the options from the authentication configuration.
// If no session exists, it redirects the user to the signin page.
// If the user does not have the admin role, it renders an "Access Denied" message.
// If the user is an admin, it renders the main content of the page.
// It displays the page title and a "Create Task" button if there are no tasks.
// It maps over the tasks array and renders TaskCard components for each task.
// If there are no tasks, it displays a message and a "Create Task" button.