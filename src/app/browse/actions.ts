/* eslint-disable */

'use server';
import { deleteTask, getTask } from '@/data-access/tasks';
import { getSession } from '@/app/api/auth/[...nextauth]/options';
import { revalidatePath } from 'next/cache';
import { useSession } from 'next-auth/react';

export async function deleteAsAdminTask(taskId: string) {
	const session = await getSession();
	// const session = useSession();

	// console.log('Session:', session);
	// console.log('User Role:', session?.user.role);

	if (!session) {
		throw new Error('User not authenticated');
	}
	// .data?.user?.role
	const isAdmin = session.user.role === 'admin';
	const task = await getTask(taskId);

	// console.log('User ID:', session.user.id);
	// console.log('Task User ID:', task?.userId);
	// console.log('Is Admin:', isAdmin);

	if (!session?.user.role === isAdmin) {
		throw new Error('User not authorized');
	}

	await deleteTask(taskId);
	revalidatePath('/browse');
}

export async function getServerSideProps() {
	const session = await getSession();
	if (!session) {
		return {
			redirect: {
				destination: '/api/auth/signin?callbackUrl=/protected-page',
				permanent: false,
			},
		};
	}
	// Additional checks for roles or permissions can also be performed here
	return { props: { session } };
}
