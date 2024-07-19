import { NextResponse } from 'next/server';

import { getTask } from '@/data-access/tasks';

export async function GET(
	request: Request,
	{ params }: { params: { taskId: string } }
) {
	const taskId = params.taskId;
	const task = await getTask(taskId);
	// console.log('Task in API route:', task); // Fügen Sie diesen Log hinzu
	return NextResponse.json(task);
}
