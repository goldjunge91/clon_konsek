/* eslint-disable */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserTasks } from "@/data-access/tasks";
import { UserTaskCard } from "./user-task-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";



export default async function YourTasksPage() {
  unstable_noStore();
  const tasks = await getUserTasks();

  // const isAUthenticated = getServerSideProps (
  return (
    <main className="page-layout">
      <div className="page-header">
        <h1 className="page-title">Your Tasks</h1>
        <div className="move_button">
          <Button>
            <Link className="button-primary" href="/create-task">Create Task</Link>
          </Button>
        </div>
      </div>
      <div className="task-grid">
        {tasks.map((task) => {
          return <UserTaskCard key={task.id} task={task} />;
        })}
      </div>
      {tasks.length === 0 && (
        <div className="no-tasks-message">
          <Image
            src="/no-data.svg"
            width="200"
            height="200"
            alt="no data image"
          />
          <h2 className="no-tasks-text">You have no tasks</h2>
          <Button asChild className="btn" variant={"destructive"}>
            <Link href="/create-task">Create Task</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
