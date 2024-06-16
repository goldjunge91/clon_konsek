// Imports necessary components from Next.js and React
// import Image from "next/image";
import Link from "next/link";
// import './custom.css';
import "./global.css";

export default function LandingPage() {
    return (
        <>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Titel</title>
            <div className="flex flex-col items-center justify-center min-h-screen  p-4">
                <h1>
                    <span className="boldweight">PDF </span>stack processor
                </h1>
                <p>
                    Create a printable document from your QM documentary.
                    <br />
                    This service is part of the{" "}
                    <a href="https://www.konsek.de/17025-starter/" target="_blank">
                        17025starter program
                    </a>
                    .
                </p >
                <Link href="/create-task" className="button">
                    Create a new print file
                </Link>
                {/* <button>Create a new print file</button> */}
                <p>
                    Provided by Konsek Engineering &amp; Consulting GmbH
                    <br />
                    <a href="#">Terms of use</a> | <a href="#">Privacy Policy</a> |{" "}
                    <a href="#">Legal</a>
                </p>
            </div >
        </>
    );
}