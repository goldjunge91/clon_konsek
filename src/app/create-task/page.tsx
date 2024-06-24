// /src/app/create-task/page.tsx
"use client";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { CreateTaskForm } from "./create-task-form";

export default function CreateTaskPage() {
  useEffect(() => {
    // console.log("CreateTaskPage mounted");
  }, []);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn("auth-provider", { callbackUrl: "/" });
    },
  });
  if (!session) {
    return <h1>Access Denied</h1>;
  }
  return (
    <div className="page-container">
      <div className="content-wrapper-left">

        <h1><span className="page-title">Create </span>a new print file</h1>

        <CreateTaskForm />
      </div>
    </div>
  );
}
