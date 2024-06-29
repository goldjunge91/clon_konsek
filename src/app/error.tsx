/* eslint-disable react/prop-types */
"use client";
/**
 *ErrorPage
 * @description Fehlerseite für die Anwendung.
 * @remarks
 * Zeigt benutzerfreundliche Fehlermeldungen an.
 * @param {ErrorProps} props - Die Eigenschaften der Fehlerseite
 * @returns {JSX.Element} Die gerenderte Fehlerseite
 */

import { useSearchParams } from "next/navigation";

interface ErrorProps {
	error?: Error;
	reset?: () => void;
}
export default function Error({ reset }: ErrorProps) {
	const searchParams = useSearchParams();
	const status = searchParams?.get("status");

	const isPermissionError = status === "403";

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<h1 className="text-4xl font-bold mb-4">
				{isPermissionError ? "Permission Denied" : "Oops! Something went wrong."}
			</h1>
			<p className="text-xl mb-8">
				{isPermissionError
					? "You do not have permission to access this page."
					: "An unexpected error occurred. Please try again later."}
			</p>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={isPermissionError ? () => (window.location.href = "/") : () => reset?.()}>
				{isPermissionError ? "Go to Home" : "Try Again"}
			</button>
		</div>
	);
}
