// Imports necessary components from Next.js and React
// import Image from "next/image";
import Link from "next/link";
// import './custom.css';
// import "./global.css";
import "./landingPage.css";


export default function LandingPage() {
    return (
        <>
            {/* <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
            {/* <title>Titel</title> */}


            {/* Erste box  */}
            <div className="container">
                <div className="title-box h1">
                    <h1 className="title-box h1">
                        PDF <span className="title-light">stack processor</span>
                    </h1>
                </div>

                {/*  mittlere box */}
                <div className="text-box">
                    <p>
                        Create a printable document from your QM documentary.
                        <br />
                        This service is part of the{""}
                        <a href="https://www.konsek.de/17025-starter/" target="_blank" rel="noopener noreferrer">
                            17025starter program.
                        </a>
                    </p>
                </div>
                {/* Button styling  */}
                <div className="button-box">
                    <Link href="/create-task">
                        Create a new print file
                    </Link>
                </div>
                <div className="footer-box">
                    <p>
                        Provided by Konsek Engineering &amp; Consulting GmbH
                        <br />
                        <a href="/LINK">Terms of use</a> | <a href="/LINK">Privacy Policy</a> |{" "}
                        <a href="/LINK">Legal</a>
                    </p>
                </div>
            </div>
        </>
    );
}