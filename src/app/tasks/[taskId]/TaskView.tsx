'use client';
import { Task } from '@/db/schema';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { getDownloadFile2 } from './actions';
import { useState, useEffect } from 'react';
import { readPythonLog } from '@/lib/readPythonLog';
import useSWR from 'swr';
import React from 'react';

const fetcher = (url: string | URL | Request) =>
	fetch(url).then((res) => res.json());

export function TaskView({ task: initialTask }: { task: Task }) {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			signIn('auth-provider', { callbackUrl: '/' });
			redirect('/api/auth/signin?callbackUrl=/tasks/[taskId]/task');
		},
	});

	const router = useRouter();
	const { toast } = useToast();
	const [isCompleted, setIsCompleted] = useState(
		initialTask.status === 'completed'
	);

	const {
		data: task,
		error,
		isLoading,
	} = useSWR(`/api/tasks/${initialTask.id}`, fetcher, {
		initialData: initialTask,
		refreshInterval: isCompleted ? 0 : 2000,
		onSuccess: (data) => {
			if (data.status === 'completed' && !isCompleted) {
				setIsCompleted(true);
				toast({
					title: 'Task abgeschlossen',
					description:
						'Die Aufgabe wurde erfolgreich abgeschlossen. Sie können jetzt die Datei herunterladen.',
					variant: 'default',
				});
				router.refresh();
			}
		},
	});

	const [pythonLog, setPythonLog] = useState<string[]>([]);
	useEffect(() => {
		if (task && !isCompleted) {
			const fetchLog = async () => {
				const log = await readPythonLog(task.id, 10);
				setPythonLog(log);
			};
			fetchLog();
			const interval = setInterval(fetchLog, 2000);
			return () => clearInterval(interval);
		}
		return () => {}; // Add this line
	}, [task, isCompleted]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading task: {error.message}</div>;
	if (!task) return <div>No task found</div>;
	const onSubmitDownload = async () => {
		if (task.status === 'completed') {
			try {
				const base64Data = await getDownloadFile2(task.id);
				const downloadUrl = `data:application/zip;base64,${base64Data}`;
				const link = document.createElement('a');
				link.href = downloadUrl;
				link.download = `task_${task.id}.zip`;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				toast({
					title: 'Task abgeschlossen',
					description:
						'Die Aufgabe wurde erfolgreich abgeschlossen, und die Datei kann heruntergeladen werden.',
					variant: 'default',
				});
			} catch (error) {
				console.error('Fehler beim Herunterladen:', error);
				toast({
					title: 'Fehler',
					description:
						'Ein Fehler ist aufgetreten. Bitte wenden Sie sich an den Administrator.',
					variant: 'destructive',
				});
			}
		} else {
			toast({
				title: 'Aufgabe nicht abgeschlossen',
				description:
					'Die Aufgabe ist noch nicht abgeschlossen. Sie können die Datei erst herunterladen, wenn die Aufgabe abgeschlossen ist.',
			});
		}
	};
	// Vereinfachte Berechtigungsprüfung
	if (
		!session ||
		(session.user?.role !== 'admin' && session.user?.role !== 'user')
	) {
		return <h1 className="text-5xl text-center mt-20">Access Denied</h1>;
	}

	return (
		<div className="taskview box-content my-40 px-14 h-60 pt-16 rounded">
			<h1 className="top-14 taskview container px-10 rounded">
				Task Details
			</h1>
			<p className="my-5 px-10"> </p>
			<p>placeholder </p>
			<p>
				Task ID: {task?.id}, User ID: {session.user.id}
			</p>
			<button
				className={`buttonDownload ${task.status === 'completed' ? 'completed' : 'pending'}`}
				onClick={onSubmitDownload}
				disabled={task.status !== 'completed'}
			>
				{task.status === 'completed' ? 'Download' : 'Pending'}
			</button>
			{task.status === 'completed' && (
				<div className="bg-green-100 text-green-800 px-4 my-5 rounded max-w-80">
					<p>
						The task is completed. You can download the files now.
					</p>
				</div>
			)}
			<div className="space-y-2">
				<p className="font-semibold flex items-center space-x-2">
					<span
						className={`w-3 h-3 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}
					></span>
					<span>Status: {task.status}</span>
				</p>
			</div>
			<div className="space-y-2">
				<p className="font-semibold">Python Log:</p>
				<div className="bg-muted rounded p-4">
					{!pythonLog || pythonLog.length === 0 ? (
						<p>No log file found.</p>
					) : (
						pythonLog.map((line, index) => (
							<p key={index}>
								{decodeURIComponent(encodeURIComponent(line))}
							</p>
						))
					)}
				</div>
			</div>
		</div>
	);
}
