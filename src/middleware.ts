import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(request: NextRequestWithAuth) {
		const { pathname } = request.nextUrl;
		const { role } = request.nextauth.token || {};

		// Überprüfen Sie, ob der Benutzer versucht, auf die Route "/browse" zuzugreifen
		if (pathname.startsWith("/browse") && role !== "admin") {
			// Wenn der Benutzer kein Admin ist, leiten Sie ihn auf die Seite "/error" um
			// return NextResponse.rewrite(new URL("/error", request.url));
			return NextResponse.redirect(new URL("/error?status=403", request.url));
		}

		// Überprüfen Sie, ob der Benutzer versucht, auf die Route "/client" zuzugreifen
		if (pathname.startsWith("/client") && role !== "admin" && role !== "manager") {
			// Wenn der Benutzer weder Admin noch Manager ist, leiten Sie ihn auf die Seite "/error" um
			return NextResponse.rewrite(new URL("/error", request.url));
		}

		// Überprüfen Sie, ob der Benutzer versucht, auf die Route "/admin" zuzugreifen
		if (pathname.startsWith("/admin") && role !== "admin") {
			// Wenn der Benutzer kein Admin ist, leiten Sie ihn auf die Seite "/error" um
			return NextResponse.rewrite(new URL("/error", request.url));
		}
		// if (pathname.startsWith("/create-task") && role !== "user") {
		// 	// Wenn der Benutzer kein Admin ist, leiten Sie ihn auf die Seite "/error" um
		// 	return NextResponse.rewrite(new URL("/error", request.url));
		// }
		// Wenn keine der Bedingungen erfüllt ist, fahren Sie mit dem ursprünglichen Request fort
		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token, // Callback, um zu bestimmen, ob der Benutzer autorisiert ist
		},
	}
);
export const config = {
	matcher: ["/your-tasks", "/admin", "/edit-task", "/task", "/browse", "/create-task"],
};
