"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/db/schema";
import { TrashIcon } from "lucide-react";
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
import { deleteAsAdminTask } from "./actions";

// {/* Card header */}: Indicates the card header section.
// {/* Card content */}: Indicates the card content section.
// {/* Display task status */}: Explains that this section displays the task status.
// {/* Display green button if task is completed */}: Explains that a green button is displayed if the task status is "completed".
// {/* Placeholder for timer */}: Indicates that this is a placeholder for the timer component or logic.
// {/* Card footer */}: Indicates the card footer section.
// {/* Alert dialog for deleting the task */}: Explains that this section contains an alert dialog for deleting the task. 


export function TaskCard({ task }: { task: Task }) {
  return (
    <Card>
      {/* Card header */}
      <CardHeader className="relative size-20">
        <CardTitle>{task.name}</CardTitle>
      </CardHeader>
      
      {/* Card content */}
      <CardContent className="flex flex-col gap-8">
        <div>
          {/* Display task status */}
          {/* <div className="text-2xl flex-col px-3">Status: {task.status}</div> */}
          <div className="text-2xl flex-col px-3">Status: </div>
          {/* Display green button if task is completed */}
          {task.status === "completed" && (
            <div className="text-2xl bg-green-100 text-green-800 px-4 py-2 flex items-center rounded">
              <p>Task Completed</p>
            </div>
          )}
        </div>
        
        <div>
          {/* Placeholder for timer */}
          <div className="text-lg">Elapsed Time: 00:00:00</div>
        </div>
      </CardContent>
      
      {/* Card footer */}
      <CardFooter className="flex flex-col gap-12">
        {/* Alert dialog for deleting the task */}
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
                onClick={() => deleteAsAdminTask(task.id)}
                className="border border-red-500 text-black-500 hover:bg-red-500 hover:text-white"
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