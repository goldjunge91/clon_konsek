/* eslint-disable */

"use server";

import {deleteTask, getTask} from "@/data-access/tasks";

import {getSession} from "@/app/api/auth/[...nextauth]/options";
import {revalidatePath} from "next/cache";
// import NextAuth from "next-auth/next";
import {useSession} from "next-auth/react";

export async function deleteAsAdminTask(taskId: string) {
    const session = await getSession();
    const session_admin = useSession();

    if (!session) {
        throw new Error("User not authenticated");
    }

    const isAdmin = session_admin.data?.user?.role === "admin";
    const task = await getTask(taskId);

    if (task?.userId !== session.user.id && !isAdmin) {
        throw new Error("User not authorized");
    }

    await deleteTask(taskId);
    revalidatePath("/browse");
}

export async function getServerSideProps() {
    const session = await getSession();
    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin?callbackUrl=/protected-page",
                permanent: false,
            },
        };
    }
    // Additional checks for roles or permissions can also be performed here
    return {props: {session}};
}
