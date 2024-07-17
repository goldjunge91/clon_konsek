/* eslint-disable */
// src/app/tasks[taskId]/page.tsx
import { getTask } from '@/data-access/tasks';
import Link from 'next/link';
import { TaskView } from './TaskView';
import { unstable_noStore } from 'next/cache';

export default async function TaskPage(props: { params: { taskId: string } }) {
	unstable_noStore();
	const taskId = props.params.taskId;

	const task = await getTask(taskId);
	if (!task) {
		return <div>No task of this ID found</div>;
	}
	return (
		<div className="layout-grid-lef">
			<div className="col-span-3 p-4 pr-2">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen">
					<TaskView task={task} />
					{/* <TaskView task={normalizedTask} /> */}
				</div>
			</div>
		</div>
	);
}
