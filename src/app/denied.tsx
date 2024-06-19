// pages/404.js
import Link from 'next/link';

export default function NotFound() {
    return (
        <body className=" ">
            <h1>
                404-Nicht gefunden
            </h1>
            <p className="text-xl mt-3">Oops! We can't find the page you're looking for.</p>
            <Link href="/" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Back to Home Page
            </Link>
        </body>
    );
}

// "min-h-screen flex flex-col items-center justify-cente