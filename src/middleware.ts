import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Beschreibung:
// Dieser Code repräsentiert die Middleware-Konfiguration für die Anwendung.
// Er verwendet die withAuth Middleware von next-auth, um die Anfrage mit dem Token des Benutzers zu erweitern.
// Die Middleware überprüft die Rolle des Benutzers und beschränkt den Zugriff auf bestimmte Routen basierend auf der Rolle.
// Wenn der Benutzer versucht, auf eine eingeschränkte Route zuzugreifen, wird er zur Seite "/denied" umgeleitet.
export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        const { pathname } = request.nextUrl;
        const { role } = request.nextauth.token || {};

        // Überprüfen Sie, ob der Benutzer versucht, auf die Route "/browse" zuzugreifen
        if (pathname.startsWith("/browse") && role !== "admin") {
            // Wenn der Benutzer kein Admin ist, leiten Sie ihn auf die Seite "/denied" um
            return NextResponse.rewrite(new URL("/denied", request.url));
        }

        // Überprüfen Sie, ob der Benutzer versucht, auf die Route "/client" zuzugreifen
        if (pathname.startsWith("/client") && role !== "admin" && role !== "manager") {
            // Wenn der Benutzer weder Admin noch Manager ist, leiten Sie ihn auf die Seite "/denied" um
            return NextResponse.rewrite(new URL("/denied", request.url));
        }

        // Überprüfen Sie, ob der Benutzer versucht, auf die Route "/admin" zuzugreifen
        if (pathname.startsWith("/admin") && role !== "admin") {
            // Wenn der Benutzer kein Admin ist, leiten Sie ihn auf die Seite "/denied" um
            return NextResponse.rewrite(new URL("/denied", request.url));
        }
        if (pathname.startsWith("/admin1") && role !== "admin") {
            // Wenn der Benutzer kein Admin ist, leiten Sie ihn auf die Seite "/denied" um
            return NextResponse.rewrite(new URL("/denied", request.url));
        }
        // Wenn keine der Bedingungen erfüllt ist, fahren Sie mit dem ursprünglichen Request fort
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // Callback, um zu bestimmen, ob der Benutzer autorisiert ist
        },
    }
);

// export default withAuth(
// 	// `withAuth` ergänzt Ihre `Request` mit dem Token des Benutzers.
// 	function middleware(request: NextRequestWithAuth) {
// 		// Überprüfen Sie, ob der Benutzer versucht, auf die Route "/browse" zuzugreifen
// 		if (
// 			request.nextUrl.pathname.startsWith("/browse") &&
// 			request.nextauth.token?.role !== "admin"
// 		) {
// 			// Wenn der Benutzer kein Admin ist, leiten Sie ihn auf die Seite "/denied" um
// 			return NextResponse.rewrite(new URL("/denied", request.url));
// 		}

// 		// Überprüfen Sie, ob der Benutzer versucht, auf die Route "/client" zuzugreifen
// 		if (
// 			request.nextUrl.pathname.startsWith("/client") &&
// 			request.nextauth.token?.role !== "admin" &&
// 			request.nextauth.token?.role !== "manager"
// 		) {
// 			// Wenn der Benutzer weder Admin noch Manager ist, leiten Sie ihn auf die Seite "/denied" um
// 			return NextResponse.rewrite(new URL("/denied", request.url));
// 		}
// 		if (
// 			request.nextUrl.pathname.startsWith("/admin") &&
// 			request.nextauth.token?.role !== "admin"
// 		) {
// 			// Wenn der Benutzer weder Admin noch Manager ist, leiten Sie ihn auf die Seite "/denied" um
// 			return NextResponse.rewrite(new URL("/denied", request.url));
// 		} else {
// 			return NextResponse.next();
// 		}
// 	},
// 	{
// 		callbacks: {
// 			authorized: ({ token }) => !!token,
// 		},
// 	}
// );

// Konfiguration für die Anwendung von next-auth nur auf passende Routen
export const config = {
	matcher: ["/your-tasks", "/admin", "/admin1", "/edit-task", "/task", "/browse", "/create-task"],
};

// Kurze Erklärung:
// Der Code stellt die Middleware-Konfiguration für die Anwendung dar.
// Er importiert die notwendigen Abhängigkeiten von next-auth/middleware und next/server.
// Die withAuth-Middleware wird verwendet, um die Anfrage mit dem Token des Benutzers zu ergänzen.
// Innerhalb der Middleware-Funktion überprüft sie die Rolle des Benutzers basierend auf der angeforderten Route.
// Wenn der Benutzer versucht, auf die Route "/browse" zuzugreifen und kein Admin ist, wird er auf die Seite "/denied" umgeleitet.
// Wenn der Benutzer versucht, auf die Route "/client" zuzugreifen und weder Admin noch Manager ist, wird er auf die Seite "/denied" umgeleitet.
// Der autorisierte Callback wird verwendet, um zu bestimmen, ob der Benutzer aufgrund des Vorhandenseins eines Tokens autorisiert ist.
// Das Konfigurationsobjekt gibt die Routen an, auf die next-auth mit der Eigenschaft matcher angewendet werden soll.
