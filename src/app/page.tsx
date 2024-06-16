// Imports necessary components from Next.js and React
// import Image from "next/image";
import Link from "next/link";
// import './custom.css';
// import "./global.css";
import "./landingPage.css";

export default function LandingPage() {
    return (
        <>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Titel</title>
            <div className="container">
                <div className="title-box">
                    <h1>
                        <span className="boldweight">PDF </span>stack processor
                    </h1>
                </div>
                <div className="text-box">
                    <p>
                        Create a printable document from your QM documentary.
                        <br />
                        This service is part of the{" "}
                        <a href="https://www.konsek.de/17025-starter/" target="_blank">
                            17025starter program
                        </a>
                        .
                    </p>
                </div>
                <div className="button-box">
                    <Link href="/create-task" className="button">
                        Create a new print file
                    </Link>
                </div>
                <div className="footer-box">
                    <p>
                        Provided by Konsek Engineering &amp; Consulting GmbH
                        <br />
                        <a href="#">Terms of use</a> | <a href="#">Privacy Policy</a> |{" "}
                        <a href="#">Legal</a>
                    </p>
                </div>
            </div>
        </>
    );
}