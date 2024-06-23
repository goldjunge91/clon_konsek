"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,

    CardHeader,
    CardTitle,
} from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import { Task } from "@/db/schema";
import Link from "next/link";
// import { getDownloadFile2 } from "@/app/tasks/[taskId]/actions";
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

import { TrashIcon } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
import * as React from "react";
import { deleteTaskAction } from "./actions";



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
    // const { toast } = useToast();
    // const onSubmitDownload = async () => {
    //     if (task.status === "completed") {
    //         try {
    //             const base64Data = await getDownloadFile2(task.id);
    //             const downloadUrl = `data:application/zip;base64,${base64Data}`;
    //             const link = document.createElement("a");
    //             link.href = downloadUrl;
    //             link.download = `task_${task.id}.zip`;
    //             document.body.appendChild(link);
    //             link.click();
    //             document.body.removeChild(link);
    //             toast({
    //                 title: "Task completed",
    //                 description:
    //                     "The task has been successfully completed, and the file can be downloaded.",
    //                 variant: "default",
    //             });
    //         } catch (error) {
    //             console.error("Download error:", error);
    //             toast({
    //                 title: "Error",
    //                 description: "An error occurred. Please contact the administrator.",
    //                 variant: "destructive",
    //             });
    //         }
    //     } else {
    //         toast({
    //             title: "Task not completed",
    //             description: "The task is not yet completed. You can only download the file once the task is completed.",
    //         });
    //     }
    // };

    const status: string | null = task.status;
    // const progressValue = statusToProgress(status ?? "defaultStatus");
    // console.log(`Progress value for task ${task.id}: ${progressValue}`); // Debugging line
    return (
        <div>

            <Card className="user-task-card">
                <CardHeader className="user-card-header">
                    <CardTitle>TASK</CardTitle>
                    {/* <Progress value={progressValue} className="progress" /> */}
                </CardHeader>
                <CardContent className="user-card-content">
                    <div className="status">Status: {task.status}</div>
                </CardContent >
                <Button asChild>
                    <a className="alink">
                        <Link href={`/tasks/${task.id}`} >Open Task</Link>
                    </a>
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="button">
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
            </Card >
        </div>
    );
}
