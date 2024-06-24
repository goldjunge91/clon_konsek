import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTasks } from "@/data-access/tasks";
import { TaskCard } from "./task-card";
import { options } from "../api/auth/[...nextauth]/options";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { redirect } from 'next/navigation';



export default async function Browse({ searchParams, }: {
    searchParams: {
        search: string;
    };
}) {
    unstable_noStore();
    const tasks = await getTasks(searchParams.search);
    const session = await getServerSession(options)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }
    if (session?.user.role !== "admin") {
        return <h1 className="text-5xl">Access Denied</h1>
    }
    return (
        <main className="min-h-screen p-16">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl">Tasks-Placeholder</h1>
                <Button asChild>
                    <Link href={"/create-task"}>Create Task</Link>
                </Button>
            </div>

            <div className="mb-8">
            </div>
            <div className="grid grid-cols-3 gap-4">
                {tasks.map((task) => {
                    return <TaskCard key={task.id} task={task} />;
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
                    <h2 className="text-2xl">No Tasks Yet!</h2>
                    <Button asChild>
                        <Link href={"/create-task"}>Create Task</Link>
                    </Button>
                </div>
            )}
        </main>
    );
}


// import { Button } from "@/components/ui/button";
// import { getTasks } from "@/data-access/tasks";
// import { getServerSession } from "next-auth/next";
// import { unstable_noStore } from "next/cache";
// import Image from "next/image";
// import Link from "next/link";
// import { TaskCard } from "./task-card";
// import { redirect } from "next/navigation";
// import { Task } from "../../db/schema";
// import { options } from "../api/auth/[...nextauth]/options";


// export default async function browse({ searchParams, }: {
//     searchParams: { search: string; };
// }) {
//     unstable_noStore();

//     // Fetch tasks based on search parameters
//     const tasks = await getTasks(searchParams.search);

//     // Get the server session
//     const session = await getServerSession(options);

//     // Redirect to the signin page if no session exists
//     if (!session) {
//         redirect("/api/auth/signin?callbackUrl=/server");
//     }
//     // Check if the user has the admin role
//     else if (session?.user.role === "adminpo{

//         return (
//             <main className="bb">
//                 <div className="browse">
//                     <h1>Your Tasks</h1>
//                     {tasks.length === 0 && (
//                         <Button asChild>
//                             <Link href="/create-task">Create Task</Link>
//                         </Button>
//                     )}
//                 </div>
//                 {/* Display task cards */}
//                 <div className="grid">
//                     <div>
//                         {tasks.map((task: Task) => {
//                             return <TaskCard key={task.id} task={task} />;
//                         })}
//                     </div>
//                 </div>
//                 {/* Display a message and a button if no tasks are available */}
//                 {tasks.length === 0 && (
//                     <div >
//                         <Image
//                             src="/no-data.svg" width="200" height="200" alt="no data image" style={{
//                                 maxWidth: "100%",
//                                 height: "auto"
//                             }} />
//                         <h2>You have no tasks</h2>
//                         <Button asChild>
//                             <Link href="/create-task">Create Task</Link>
//                         </Button>
//                     </div>
//                 )}
//             </main>
//         );
//     }
//     else {
//         return <h1>Access Denied</h1>;
//     }
// }