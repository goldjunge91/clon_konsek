/* eslint-disable */
"use client";
import { useSession, signIn } from "next-auth/react";
import { CreateUserForm } from "./create-user-form";
// import { UserList } from "./UserList";
import { UserList } from "@/components/User/UserList";

export default function CreateUserPage() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            signIn("auth-provider", { callbackUrl: "/admin1" });
        },
    });

    return (
        <div className="admin-page">
            <div className="admin-container">
                <div >
                  <h1>Admin Panel</h1>
                  </div>
                <div className="create-user-section">
                    <h2>Create New User</h2>
                    <CreateUserForm />
                </div>
                <div className="user-list-section">
                    <h2>Existing Users</h2>
                    <UserList />
                </div>
            </div>
        </div>
    );
}
