/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Button } from "@/components/ui/button";
import { unstable_noStore } from 'next/cache';
// import Link from "next/link";
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { getTasks } from '@/data-access/tasks';

import { options } from '../api/auth/[...nextauth]/options';

import { TaskCard } from './task-card';

export default async function Browse({
	searchParams,
}: {
	searchParams: { search: string };
}) {
	unstable_noStore();
	const session = await getServerSession(options);
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/server');
	}
	// console.log("Session:", session);
	// console.log("Admin Session:", session?.user.role);
	if (session.user.role !== 'admin') {
		redirect('/error?status=403');
	}
	const tasks = await getTasks(searchParams.search);

	return (
		<main className="page-layout">
			<div className="page-header">
				<h1 className="page-title">Tasks-Placeholder</h1>
				{/* <Button asChild>
                    <Link href={"/create-task"}>Create Task</Link>
                </Button> */}
			</div>
			<div className=""></div>
			<div className="task-grid">
				{tasks.map((task) => {
					return <TaskCard key={task.id} task={task} />;
				})}
			</div>
		</main>
	);
}
