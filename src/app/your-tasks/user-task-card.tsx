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
  PencilIcon, 
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



export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);



  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-[60%]" />;
  }

export function UserTaskCard({ task }: { task: Task }) {
  
  return (
    <Card>
      <CardHeader className="relative">
        <Button className="absolute top-2 right-2" size="icon">
          <Link href={`/edit-task/${task.id}`}>
            <PencilIcon />
          </Link>
        </Button>
        <CardTitle>{task.name}</CardTitle>
        <Progress value={33} />
        <CardDescription>{task.dsm_mail}</CardDescription>
        <button className="button size-50">Click Me!</button>
        <Button asChild>
          <Link href="/create-task">Create Task</Link>
        </Button>
      </CardHeader>

      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="card p-5 m-3">
          <h3>{task.name}</h3>
          <p>Status: {task.status}</p>
          {task.status === "complete" && (
            <Button asChild>
              <Link href={`/download-task/${task.id}`}>Download Task</Link>
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>

      <CardContent className="flex flex-col gap-4">
        {task.dsm_url && (
          <Link
            href={task.dsm_url}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            URL zum Q.Wiki "https://name.qwiki.de/"
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
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