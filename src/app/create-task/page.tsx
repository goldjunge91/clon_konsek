"use client";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { CreateTaskForm } from "./create-task-form";
import "@/./app/globals.css";




export default function CreateTaskPage() {
    useEffect(() => {
        console.log("CreateTaskPage mounted");
    }, []);
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            signIn("auth-provider", { callbackUrl: "/" });
        },
    });
    if (!session) {
        return <h1 className="text-5xl">Access Denied</h1>;
    }
    return (
        <div className="create-task-page">
            <h1>Create Task</h1>
            <CreateTaskForm  />
        </div>
    );
}
