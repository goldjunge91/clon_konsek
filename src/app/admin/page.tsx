/* eslint-disable */
"use client";
import { useSession, signIn } from "next-auth/react";
import { CreateUserForm } from "./create-user-form";
import { UserList } from "./UserList";

export default function CreateUserPage() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            signIn("auth-provider", { callbackUrl: "/admin" });
        },
    });
    if (session?.user.role !== "admin") {
        return <h1>Access Denied</h1>;
    }
    return (
        <div className="admin">
            <h1 className="h1">Admin Panel</h1>

            <div className="container">
                <CreateUserForm />
            </div>
            <h1>Userlist</h1>
            <div>
                <UserList />
            </div>
        </div>
    );
}
