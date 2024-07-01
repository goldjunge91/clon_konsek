/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import { Task } from "@/db/schema";
import Link from "next/link";

import { GithubIcon, TrashIcon } from "lucide-react";
/**
 *UserTaskCard
 * @description Komponente zur Darstellung einer Benutzeraufgabe als Karte.
 * @remarks
 * Zeigt kompakte Informationen zu einer Benutzeraufgabe an.
 * @param {UserTaskCardProps} props - Die Eigenschaften der Benutzeraufgabenkarte
 * @returns {JSX.Element} Eine Karte mit Benutzeraufgabeninformationen
 */
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import * as React from "react";
import { deleteTaskAction } from "./actions";
import { getDownloadFile2 } from "@/app/tasks/[taskId]/actions";
import { useToast } from "@/components/ui/use-toast";

export function UserTaskCard({ task }: { task: Task }) {
	const statusToProgress = (status: string) => {
		switch (status) {
			case "not started":
				return 0;
			case "Pending":
				return 50;
			case "completed":
				return 100;
			default:
				return 0;
		}
	};
	const { toast } = useToast();

	const onSubmitDownload = async () => {
		if (task.status === "completed") {
			try {
				const base64Data = await getDownloadFile2(task.id);
				const downloadUrl = `data:application/zip;base64,${base64Data}`;
				const link = document.createElement("a");
				link.href = downloadUrl;
				link.download = `task_${task.id}.zip`;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				toast({
					title: "Task abgeschlossen",
					description:
						"Die Aufgabe wurde erfolgreich abgeschlossen, und die Datei kann heruntergeladen werden.",
					variant: "default",
				});
			} catch (error) {
				console.error("Fehler beim Herunterladen:", error);
				toast({
					title: "Fehler",
					description:
						"Ein Fehler ist aufgetreten. Bitte wenden Sie sich an den Administrator.",
					variant: "destructive",
				});
			}
		} else {
			toast({
				title: "Aufgabe nicht abgeschlossen",
				description:
					"Die Aufgabe ist noch nicht abgeschlossen. Sie können die Datei erst herunterladen, wenn die Aufgabe abgeschlossen ist.",
			});
		}
	};
	const status: string | null = task.status;

	const progressValue = statusToProgress(status ?? "defaultStatus");
	return (
		<Card className="card">
			<CardHeader>
				<CardTitle>{task.name}</CardTitle>

				{/* <Progress value={progressValue} className="w-[80%] top-2 bg" /> */}
			</CardHeader>
			<CardContent>
				<div className="status-text">Status: {task.status}</div>

				<div className="button-container">
					<button
						className={`download-button ${
							task.status === "completed"
								? "download-button-enabled"
								: "download-button-disabled"
						}`}
						onClick={onSubmitDownload}
						disabled={task.status !== "completed"}>
						{task.status === "completed" ? "Download" : "Pending"}
					</button>
				</div>

				{/* Statusanzeige */}
				<div className="status-container">
					{task.status === "completed" && (
						<div className="status-message">
							<p>Zip Datei bereit zum Download&quot;</p>
						</div>
					)}
				</div>
			</CardContent>
			<Button asChild>
				<Link className="btn" href={`/tasks/${task.id}`}>
					Öffne Task
				</Link>
			</Button>
			<CardFooter>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button className="button" variant={"destructive"}>
							<TrashIcon /> Delete Task
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently remove the task
								and any data associated with it.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => {
									deleteTaskAction(task.id);
								}}>
								Yes, delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardFooter>
		</Card>
	);
}
