"use client";
import { Task } from "@/db/schema";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { getDownloadFile2 } from "./actions";
import { useState } from "react";
import { readPythonLog } from '@/lib/readPythonLog';
import useSWR from "swr";
import React from "react"; // Import React library

/**
 * TaskView Component
 * 
 * Detailansicht einer einzelnen Aufgabe.
 * 
 * @remarks
 * Zeigt alle Informationen zu einer spezifischen Aufgabe an und ermöglicht Interaktionen.
 * Verwendet `revalidatePath('/tasks/${initialTask.id}')` zur Aktualisierung der Daten.
 * 
 * @param props - Die Eigenschaften der Aufgabenansicht
 * @returns Die gerenderte Aufgabendetailansicht
 */

const fetcher = (url: string | URL | Request) => fetch(url).then((res) => res.json());

export function TaskView({ task: initialTask }: { task: Task }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn("auth-provider", { callbackUrl: "/" });
      redirect("/api/auth/signin?callbackUrl=/tasks/[taskId]/task");
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = useState(initialTask.status === "completed");

  const { data: task } = useSWR(`/api/tasks/${initialTask.id}`, fetcher, {
    initialData: initialTask,
    refreshInterval: isCompleted ? 0 : 2000,
    onSuccess: (data) => {
      if (data.status === "completed" && !isCompleted) {
        setIsCompleted(true);
        toast({
          title: "Task abgeschlossen",
          description: "Die Aufgabe wurde erfolgreich abgeschlossen. Sie können jetzt die Datei herunterladen.",
          variant: "default",
        });
        router.refresh();
        // setTimeout(() => {
        // 	router.push("/your-task");
        // }, 5000);
        // router.refresh();
      }
    },
  });

  const { data: pythonLog } = useSWR(
    () => (isCompleted ? null : `/api/tasks/${task?.id}/log`),
    () => readPythonLog(task?.id, isCompleted ? 50 : 10),
    {
      refreshInterval: isCompleted ? 0 : 2000,
    }
  );
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

  if (!session || (session.user?.role !== "admin" && session.user?.role !== "user")) {
    return <h1 className="text-5xl text-center mt-20">Access Denied</h1>;
  }
  // Überprüfung, ob der Benutzer die Rolle "admin" hat oder der Eigentümer der Aufgabe ist
  if (!session || (session.user?.role !== "admin" && session.user?.role !== "user") || !session.user?.role) {
    return <h1 className="text-5xl text-center mt-20">Access Denied</h1>;
  }
  return (
    <div className="taskview box-content my-40 px-14 h-60 pt-16 rounded">
      <h1 className="top-14 taskview container px-10 rounded">Task Details</h1>
      <p className="my-5 px-10">{" "}</p>
      <p>placeholder </p>
      <p>Task ID: {task?.id}, User ID: {session.user.id}</p>

      <button
        className={`buttonDownload ${task.status === "completed" ? "completed" : "pending"}`}
        onClick={onSubmitDownload}
        disabled={task.status !== "completed"}
      >
        {task.status === "completed" ? "Download" : "Pending"}
      </button>
      {task.status === "completed" && (
        <div className="bg-green-100 text-green-800 px-4 my-5 rounded max-w-80">
          <p>The task is completed. You can download the files now.</p>
        </div>
      )}
      <div className="space-y-2">
        <p className="font-semibold flex items-center space-x-2">
          <span className={`w-3 h-3 rounded-full ${task.status === "completed" ? "bg-green-500" : "bg-yellow-500"}`}></span>
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
              <p key={index}>{decodeURIComponent(encodeURIComponent(line))}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { Task } from "@/db/schema";
// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { useToast } from "@/components/ui/use-toast";
// import { getDownloadFile2 } from "./actions";
// import { useState, useEffect } from "react";
// import { readPythonLog2 } from '@/lib/readPythonLog';


// export function TaskView({ task }: { task: Task }) {
//     const { data: session } = useSession({
//         required: true,
//         onUnauthenticated() {
//             // Wenn der Benutzer nicht authentifiziert ist, wird er zur Anmeldeseite weitergeleitet
//             signIn("auth-provider", { callbackUrl: "/" });
//             redirect("/api/auth/signin?callbackUrl=/tasks/[taskId]/task");
//         },
//     });


//     const [pythonLog, setPythonLog] = useState<string[]>([]);
//     useEffect(() => {
//         // fetching des Logfiles in eine ansicht für den User
//         const fetchPythonLog = async () => {
//             try {
//                 const maxLines = 10; // Anzahl der Zeilen, die angezeigt werden sollen
//                 const log = await readPythonLog2(task.id, maxLines);
//                 setPythonLog(log);
//             } catch (error) {
//                 console.error("Error fetching Python log:", error);
//             }
//         };
//         fetchPythonLog();     // Initialer Aufruf von fetchPythonLog
//         const timer = setInterval(fetchPythonLog, 2000); // Timer, der fetchPythonLog alle 5 Sekunden aufruft
//         return () => {
//             clearInterval(timer); // Cleanup-Funktion, um den Timer zu löschen, wenn die Komponente entfernt wird
//         };
//     }, [task.id]);

//     const { toast } = useToast();
//     const onSubmitDownload = async () => {
//         if (task.status === "completed") {
//             try {
//                 const base64Data = await getDownloadFile2(task.id);
//                 const downloadUrl = `data:application/zip;base64,${base64Data}`;
//                 const link = document.createElement("a");
//                 link.href = downloadUrl;
//                 link.download = `task_${task.id}.zip`;
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
//                 toast({
//                     title: "Task abgeschlossen",
//                     description: "Die Aufgabe wurde erfolgreich abgeschlossen, und die Datei kann heruntergeladen werden.",
//                     variant: "default",
//                 });
//             } catch (error) {
//                 console.error("Fehler beim Herunterladen:", error);
//                 toast({
//                     title: "Fehler",
//                     description: "Ein Fehler ist aufgetreten. Bitte wenden Sie sich an den Administrator.",
//                     variant: "destructive",
//                 });
//             }
//         } else {
//             toast({
//                 title: "Aufgabe nicht abgeschlossen",
//                 description: "Die Aufgabe ist noch nicht abgeschlossen. Sie können die Datei erst herunterladen, wenn die Aufgabe abgeschlossen ist.",
//             });
//         }
//     };


//     if (!session || (session.user.role !== "admin" && session.user.role !== "user")) {
//         return <h1 className="text-5xl text-center mt-20">Access Denied</h1>;
//     }
//     // Überprüfung, ob der Benutzer die Rolle "admin" hat oder der Eigentümer der Aufgabe ist
//     if (!session || (session.user.role !== "admin" && session.user.id !== task.userId)) {
//         return <h1 className="text-5xl text-center mt-20">Access Denied</h1>;
//     }
//   return (
//     <div className="p-20 space-y-6">
//       <h1 className="text-2xl font-bold">Task Details</h1>
//       <p>placeholder </p>
//       <p>Task ID: {task?.id}, User ID: {session.user.id}</p>

//       {/* CSV Links */}
//       <div className="space-y-2">
//         <p className="font-semibold">CSV Links:</p>
//         <p>Placeholder for the number of links in the CSV</p>
//       </div>


//       {/* Download-Button */}
//       <button
//         className={`py-2 px-4 rounded font-semibold ${task.status === "completed"
//           ? "bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
//           : "bg-muted text-muted-foreground cursor-not-allowed"
//           }`}
//         onClick={onSubmitDownload}
//         disabled={task.status !== "completed"}
//       >
//         {task.status === "completed" ? "Download" : "Pending"}
//       </button>

//       {task.status === "completed" && (
//         <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
//           <p>The task is completed. You can download the files now.</p>
//         </div>
//       )}

//       <div className="space-y-2">
//         <p className="font-semibold flex items-center space-x-2">
//           <span className="w-3 h-3 rounded-full bg-green-500"></span>
//           <span>Status: {task.status}</span>
//         </p>
//         <p>Participants: Placeholder for task participants</p>
//       </div>
//       {/* Python Log */}
//       <div className="space-y-2">
//         <p className="font-semibold">Python Log:</p>
//         <div className="bg-muted rounded p-4">
//           {pythonLog.length === 0 ? (
//             <p>No log file found.</p>
//           ) : (
//             pythonLog.map((line, index) => (
//               <p key={index}>{decodeURIComponent(encodeURIComponent(line))}</p>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
