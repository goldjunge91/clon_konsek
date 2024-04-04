"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/db/schema";
import { GithubIcon } from "lucide-react";
// import { TagsList } from "@/components/tags-list";
// import { splitTags } from "@/lib/utils";

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.name}</CardTitle>
        {/* <CardDescription>{task.description}</CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* <TagsList tags={splitTags(task.tags)} /> */}
        {task.dsm_url && (
          <Link
            href={task.dsm_url}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/tasks/${task.id}`}>Join Task</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
