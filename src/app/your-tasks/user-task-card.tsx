"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Task } from "@/db/schema";
import Link from "next/link";

import {
  GithubIcon,
  TrashIcon
} from "lucide-react";

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



export function UserTaskCard({ task }: { task: Task; }) {

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
          description: "Die Aufgabe wurde erfolgreich abgeschlossen, und die Datei kann heruntergeladen werden.",
          variant: "default",
        });
      } catch (error) {
        console.error("Fehler beim Herunterladen:", error);
        toast({
          title: "Fehler",
          description: "Ein Fehler ist aufgetreten. Bitte wenden Sie sich an den Administrator.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Aufgabe nicht abgeschlossen",
        description: "Die Aufgabe ist noch nicht abgeschlossen. Sie können die Datei erst herunterladen, wenn die Aufgabe abgeschlossen ist.",
      });
    }
  };
  const status: string | null = task.status;


  const progressValue = statusToProgress(status ?? "defaultStatus");
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>{task.name}</CardTitle>

        <Progress value={progressValue} className="w-[80%] top-2 " />

        <CardDescription>{task.dsm_mail}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="card p-5 m-3">
          <div className="card p-5 gap-6" >

            <div className="text-2xl flex-col px-3">Status: {task.status}</div>
          </div>

          {/* Download-Button */}
          <div className="flex flex-col items-center gap-2">
            <button
              className={`py-3 px-5 mx-0 rounded font-semibold ${task.status === "completed"
                ? "bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              onClick={onSubmitDownload}
              disabled={task.status !== "completed"}
            >
              {task.status === "completed" ? "Download" : "Pending"}
            </button></div>

          {/* Statusanzeige */}
          <div className="items-center relative top-4">
            {task.status === "completed" && (
              <div className="bg-green-100 text-green-800 px-4 py-2 Flex item-center rounded">
                <p>Zip Datei bereit zum Download&quot;</p>
              </div>
            )}
          </div>
          {/* {task.status === "complete" && (
            <Button asChild>
              <Link href={`/download-task/${task.id}`}>Download Task</Link>
            </Button>
          )} */}
        </div>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}

      <CardContent className="flex flex-col gap-2">
        {task.dsm_url && (
          <Link
            href={task.dsm_url}
            className="flex items-center gap-6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            URL zum Q.Wiki https://name.qwiki.de/
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex gap-12">
        <Button asChild>
          <Link href={`/tasks/${task.id}`}>Öffne Task</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>
              <TrashIcon className="w-4 h-4 mr-2" /> Delete Task
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the
                task and any data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteTaskAction(task.id);
                }}
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}