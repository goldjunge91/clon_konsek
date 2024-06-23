// Imports necessary components from Next.js and React
import Link from "next/link";
import "./globals.css";


export default function LandingPage() {
    return (
        <>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>PDF stack processor</title>
            {/* Erste box  */}
            <div className="body">
            <div className="container">
                <div className="title-box h1">
                    <h1 className="Title">
                        <span className="boldweight">PDF</span> <span className="title-light">stack processor</span>
                    </h1>
                </div>
                {/*  mittlere box */}
                <div className="textbox">
                    <p>
                        Create a printable document from your QM documentary.
                        <br />
                        This service is part of the{" "}
                        <a href="https://www.konsek.de/17025-starter/" target="_blank" rel="noopener noreferrer">
                            17025starter program.
                        </a>
                    </p>
                </div>
                <div>
                    <button>
                        <Link href="/create-task">
                            Create a new print file
                        </Link>
                    </button>
                </div>
                <div className="footer">
                    <p>
                        Provided by Konsek Engineering & Consulting GmbH
                        <br />
                        <a href="https://www.konsek.de/impressum/">Terms of use</a> | <a href="https://www.konsek.de/datenschutzerklaerung/">Privacy Policy</a> |{" "}
                        <a href="https://www.konsek.de/agb/">Legal</a>
                    </p>
                </div>
            </div>
            </div>
        </>
    );
}