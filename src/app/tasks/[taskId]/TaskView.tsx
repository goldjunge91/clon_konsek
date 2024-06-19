"use client";
import { Task } from "@/db/schema";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { getDownloadFile2 } from "./actions";
import { useState, useEffect } from "react";
import { readPythonLog2 } from '@/lib/readPythonLog';


export function TaskView({ task }: { task: Task }) {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            signIn(undefined, { callbackUrl: "/foo" });
            redirect("/api/auth/signin?callbackUrl=/tasks/[taskId]/task");
        },
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status !== "loading") {
            // Künstliche Verzögerung von 1 Sekunde (1000 ms)
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [status]);

    const [pythonLog, setPythonLog] = useState<string[]>([]);
    useEffect(() => {
        const fetchPythonLog = async () => {
            const maxLines = 10; // Anzahl der Zeilen, die angezeigt werden sollen
            try {
                const log = await readPythonLog2(task.id, maxLines);
                setPythonLog(log);
            } catch (error) {
                console.error("Error fetching Python log:", error);
            }
        };
        fetchPythonLog();     // Initialer Aufruf von fetchPythonLog

        const timer = setInterval(fetchPythonLog, 2000); // Timer, der fetchPythonLog alle 5 Sekunden aufruft

        return () => {
            clearInterval(timer); // Cleanup-Funktion, um den Timer zu löschen, wenn die Komponente entfernt wird
        };
    }, [task.id]);

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


    if (!session || (session.user.role !== "admin" && session.user.role !== "user")) {
        return <h1 className="text-5xl text-center mt-20">Access Denied</h1>;
    }
    // Überprüfung, ob der Benutzer die Rolle "admin" hat oder der Eigentümer der Aufgabe ist
    if (!session || (session.user.role !== "admin" && session.user.id !== task.userId)) {
        return <h1 className="text-5xl text-center mt-20">Access Denied</h1>;
    }

    if (isLoading) {
        return (
            <div role="status" className="flex justify-center items-center h-screen">
                <svg
                    aria-hidden="true"
                    className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* SVG Path */}
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
    return (
        <div className="p-20 space-y-6">
            <h1 className="text-2xl font-bold">Task Details</h1>
            <p>placeholder </p>
            <p>Task ID: {task?.id}, User ID: {session.user.id}</p>

            {/* CSV Links */}
            <div className="space-y-2">
                <p className="font-semibold">CSV Links:</p>
                <p>Placeholder for the number of links in the CSV</p>
            </div>


            {/* Download-Button */}
            <button
                className={`py-2 px-4 rounded font-semibold ${task.status === "completed"
                    ? "bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                onClick={onSubmitDownload}
                disabled={task.status !== "completed"}
            >
                {task.status === "completed" ? "Download" : "Pending"}
            </button>

            {task.status === "completed" && (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
                    <p>The task is completed. You can download the files now.</p>
                </div>
            )}

            <div className="space-y-2">
                <p className="font-semibold flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span>Status: {task.status}</span>
                </p>
                {/* <p>Participants: Placeholder f</p> */}
            </div>
            {/* Python Log */}
            <div className="space-y-2">
                <p className="font-semibold">Python Log:</p>
                <div className="bg-muted rounded p-4">
                    {pythonLog.length === 0 ? (
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
