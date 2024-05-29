/* eslint-disable */
"use client";
import { useSession, signIn } from 'next-auth/react';
import {CreateUserForm} from './create-user-form';
import { UserList } from "@/components/User/UserList";


export default function CreateUserPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn('auth-provider', { callbackUrl: '/admin' });
    },
  });

  if (session?.user.role !== "admin") {
        return <h1 className="text-5xl">Access Denied</h1>}

    return (
    <div>
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
