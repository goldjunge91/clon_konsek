import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Description:
// This code represents the middleware configuration for the application.
// It uses the `withAuth` middleware from `next-auth` to augment the request with the user's token.
// The middleware checks the user's role and restricts access to certain routes based on the role.
// If the user tries to access a restricted route, they are redirected to the "/denied" page.

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // Check if the user is trying to access the "/browse" route
    if (
      request.nextUrl.pathname.startsWith("/browse") &&
      request.nextauth.token?.role !== "admin"
    ) {
      // If the user is not an admin, redirect them to the "/denied" page
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    // Check if the user is trying to access the "/client" route
    if (
      request.nextUrl.pathname.startsWith("/client") &&
      request.nextauth.token?.role !== "admin" &&
      request.nextauth.token?.role !== "manager"
    ) {
      // If the user is not an admin or manager, redirect them to the "/denied" page
      return NextResponse.rewrite(new URL("/_denied", request.url));
    }
  },
  {
    callbacks: {
      // Callback to determine if the user is authorized
      authorized: ({ token }) => !!token,
    },
  }
);

// Configuration for applying next-auth only to matching routes
export const config = {
  matcher: [
    "/your-tasks",
    "/admin",
    "/edit-task",
    "/task",
    "/browse",
    "/create-task",
  ],
};

// Brief explanation:
// The code represents the middleware configuration for the application.
// It imports the necessary dependencies from next-auth/middleware and next/server.
// The withAuth middleware is used to augment the request with the user's token.
// Inside the middleware function, it checks the user's role based on the requested route.
// If the user is trying to access the "/browse" route and is not an admin, they are redirected to the "/denied" page.
// If the user is trying to access the "/client" route and is neither an admin nor a manager, they are redirected to the "/denied" page.
// The authorized callback is used to determine if the user is authorized based on the presence of a token.
// The config object specifies the routes to which next-auth should be applied using the matcher property.