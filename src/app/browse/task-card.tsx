"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/db/schema";
import { GithubIcon } from "lucide-react";


export function TaskCard({ task }: { task: Task }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {task.dsm_url && (
          <Link
            href={task.dsm_url}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Q.Wiki URL
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/tasks/${task.id}`}>Open Task</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
