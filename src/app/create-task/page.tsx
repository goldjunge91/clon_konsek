// /src/app/create-task/page.tsx
"use client";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { CreateTaskForm } from "./create-task-form";
/**
 *CreateTaskPage
 * @description Seite zum Erstellen neuer Aufgaben.
 * @remarks
 * Stellt die Benutzeroberfläche für die Aufgabenerstellung bereit.
 * @returns {JSX.Element} Die gerenderte Seite zur Aufgabenerstellung
 */
export default function CreateTaskPage() {
	useEffect(() => {
		// console.log("CreateTaskPage mounted");
	}, []);
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			signIn("auth-provider", { callbackUrl: "/" });
		},
	});
	if (!session) {
		return <h1>Access Denied</h1>;
	}
	return (
		<div className="page-container">
			<div className="content-wrapper-left">

				<h1><span className="page-title"><span className="boldweight">Create </span> </span>a new print file</h1>
				<div className="form-container">
					<CreateTaskForm />
				</div>
			</div>
		</div>
	);
}

// export default function CreateTaskPage() {
// 	useEffect(() => {
// 		// console.log("CreateTaskPage mounted");
// 	}, []);
// 	const { data: session } = useSession({
// 		required: true,
// 		onUnauthenticated() {
// 			signIn("auth-provider", { callbackUrl: "/" });
// 		},
// 	});
// 	if (!session) {
// 		return <h1>Access Denied</h1>;
// 	}
// 	return (
// 		<div className="page-container">
// 			<div className="content-wrapper-left">
// 				<h1>
// 					<span className="page-title">
// 						<span className="boldweight">Create </span>{" "}
// 					</span>
// 					a new print file
// 				</h1>
// 				<div className="form-container">
// 					<CreateTaskForm />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
