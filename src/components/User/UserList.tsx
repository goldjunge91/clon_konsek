/* eslint-disable */
// src/components/UserList.tsx
import { User } from "@/db/schema";
import { UserEditCard } from "./UserEditCard";
import { useEffect, useState } from "react";
import { deleteUserAction } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  }
  async function handleEdit(updatedUser: User) {
    const response = await fetch(`/api/users/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    }
    );
    if (response.ok) {
      await fetchUsers();

    }
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    }

    async function handleDelete(userId: string) {
      await deleteUserAction(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    }

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserEditCard key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
          // <UserEditCard key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    );
}