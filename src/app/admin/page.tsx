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
    <div>
      <div className="admin-container">
        <h1>Admin Panel</h1>
        <CreateUserForm />
      </div>
      <div className="admin-user-list">
        <h1>Userlist</h1>
        <UserList />
      </div>
    </div>
  );
}
