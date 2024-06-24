"use client"

import { useSearchParams } from "next/navigation";

interface ErrorProps {
  error?: Error;
  reset?: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

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
        onClick={
          isPermissionError
            ? () => (window.location.href = "/")
            : () => reset?.()
        }
      >
        {isPermissionError ? "Go to Home" : "Try Again"}
      </button>
    </div>
  );
}

// interface ErrorProps {
//   statusCode?: number;
// }

// const CustomError = ({ statusCode }: ErrorProps) => {
//   const errorMessage = statusCode === 403 ? "Access Denied" : "An error occurred";
//   const errorDescription = statusCode === 403 ? "Oops! The page you're trying to access is restricted." : "Sorry, something went wrong on our end.";

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <h1 className="text-6xl font-bold">{errorMessage}</h1>
//       <p className="text-xl mt-3">{errorDescription}</p>
//       {/* Use the Link component directly for navigation */}
//       {statusCode === 403 ? (
//         <Link href="/login" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
//           Go to Login
//         </Link>
//       ) : (
//         <Link href="/" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
//           Go back home
//         </Link>
//       )}
//     </div>
//   );
// };

// CustomError.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
//   const statusCode = res?.statusCode || err?.statusCode || 404;
//   return { statusCode };
// };

// export default CustomError;
