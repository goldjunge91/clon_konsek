import { Button } from "@/components/ui/button";
import { getTasks } from "@/data-access/tasks";
import { getServerSession } from "next-auth/next";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import { TaskCard } from "./task-card";

export default async function Browse({ searchParams, }: { searchParams: { search: string; }; }) {
    unstable_noStore();
    const session = await getServerSession(options);
    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/server");
    }
    // console.log("Session:", session);
    // console.log("Admin Session:", session?.user.role);

    if (session?.user.role !== "admin") {
        redirect("/error?status=403");
    }
    const tasks = await getTasks(searchParams.search);

    return (
        <main className="min-h-screen p-16">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl">Tasks-Placeholder</h1>
                <Button asChild>
                    <Link href={"/create-task"}>Create Task</Link>
                </Button>
            </div>
            <div className="mb-8"></div>
            <div className="grid grid-cols-3 gap-4">
                {tasks.map((task) => {
                    return <TaskCard key={task.id} task={task} />;
                })}
            </div>
            {tasks.length === 0 && (
                <div className="flex flex-col gap-4 justify-center items-center mt-24">
                    <Image src="/no-data.svg" width="200" height="200" alt="no data image" />
                    <h2 className="text-2xl">No Tasks Yet!</h2>
                    <Button asChild>
                        <Link href={"/create-task"}>Create Task</Link>
                    </Button>
                </div>
            )}
        </main>
    );
}
