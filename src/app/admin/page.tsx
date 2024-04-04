/* eslint-disable */
"use client";
import { useEffect, useState, Suspense } from "react";
import { useSession, signIn } from 'next-auth/react';
import LoadingCircle from "@/components/helper/LoadingCircle";
import TaskSkeleton from "@/components/helper/TaskSkeleton";
import {CreateUserForm} from './create-user-form';
import { UserList } from "@/components/User/UserList";


export default function CreateUserPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn('auth-provider', { callbackUrl: '/admin' });
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowSkeleton(true); // Switch to TaskSkeleton after 2 seconds
      setIsLoading(false); // Stop loading state
      clearTimeout(timer);
    }, 3000); // Simulate data fetching
  }, []);

  if (status === "loading" || isLoading) {
    return <LoadingCircle />;
  }
  if (session?.user.role !== "admin") {
        return <h1 className="text-5xl">Access Denied</h1>}

    return (
    <div>
      <h3>Loading Content</h3>
      <Suspense fallback={ <TaskSkeleton />}>

      </Suspense>
        <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
          <h1 className="text-4xl font-bold">Admin Panel</h1>

          <CreateUserForm />
        </div>
        <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <UserList />
    </div>
    </div>
  );
}
