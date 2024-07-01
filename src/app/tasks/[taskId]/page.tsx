/* eslint-disable */
// src/app/tasks[taskId]/page.tsx
import { getTask } from "@/data-access/tasks";
import Link from "next/link";
import { TaskView } from "./TaskView";
import { unstable_noStore } from "next/cache";
// import Image from "next/image";

/**
 *TaskPage
 * @description Seite zur Anzeige und Verwaltung einer einzelnen Aufgabe.
 * @remarks
 * Kombiniert TaskView und zugehörige Aktionen.
 * @param {TaskPageProps} props - Die Eigenschaften der Aufgabenseite
 * @returns {JSX.Element} Die gerenderte Aufgabenseite
 */
export default async function TaskPage(props: { params: { taskId: string } }) {
  unstable_noStore();
  const taskId = props.params.taskId;
  const task = await getTask(taskId);
  console.log("Task in page:", task); // Fügen Sie diesen Log hinzu
  if (!task) {
    return <div>No task of this ID found</div>;
  }
  return (
    <div className="layout-grid-lef">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen">
          <TaskView task={task} />
        </div>
      </div>
    </div>
  );
}

// export default async function TaskPage(props: { params: { taskId: string } }) {
// 	unstable_noStore();
// 	const taskId = props.params.taskId;
// 	const task = await getTask(taskId);
// 	if (!task) {
// 		return <div>No task of this ID found</div>;
// 	}
// 	return (
// 		<div className="layout-grid-lef">
// 			<div className="col-span-3 p-4 pr-2">
// 				<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen">
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// /* eslint-disable */
// // src/app/tasks[taskId]/page.tsx
// import { getTask } from "@/data-access/tasks";
// import Link from "next/link";
// import { TaskView } from "./TaskView";
// import { unstable_noStore } from "next/cache";
// // import Image from "next/image";

// export default async function TaskPage(props: { params: { taskId: string } }) {
//   unstable_noStore();
//   const taskId = props.params.taskId;
//   const task = await getTask(taskId);
//   if (!task) {
//     return <div>No task of this ID found</div>;
//   }
//   return (
//     // der block für das TaskView-Element komponente die TaskView-Komponente
//     <div className="layout-grid-lef">
//     {/* <div className="grid grid-cols-4 min-h-screen"> */}
//       <div className="col-span-3 p-4 pr-2">
//         <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen">
//           <TaskView task={task} />
//         </div>
//       </div>
      
//       {/* <div className="col-span-1 p-4 pl-2">
//         <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
//           <h1 className="text-base">{task?.name}</h1>

//           {task.dsm_url && (
//             <Link
//               href={task.dsm_url}
//               className="flex items-center gap-2 text-center text-sm"
//               target="_blank"
//               rel="noopener noreferrer"
//             >Q.Wiki URL</Link>
//           )}
//           <p className="text-base text-gray-600">{task?.status}</p>
//         </div>
//       </div> */}
//     </div>
//   );
// }