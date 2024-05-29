"use client";
import { NextPageContext } from 'next';
import Link from 'next/link';

interface ErrorProps {
  statusCode?: number;
}

const CustomError = ({ statusCode }: ErrorProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">{statusCode || "An error occurred"}</h1>
      <p className="text-xl mt-3">Sorry, something went wrong on our end.</p>
      {/* Use the Link component directly for navigation */}
      <Link href="/" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
        Go back home
      </Link>
    </div>
  );
};

CustomError.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res?.statusCode || err?.statusCode || 404;
  return { statusCode };
};

export default CustomError;