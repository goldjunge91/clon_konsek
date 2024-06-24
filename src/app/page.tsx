import Link from "next/link";

export default function LandingPage() {
  return (
    <>
    

      <div className="container-landingpage">
        <div className="layout-full-left">
          <h1 className="title">
            <span className="boldweight">PDF </span>
            stack processor
          </h1>
          <p className="descriptio">
            Create a printable document from your QM documentary.<br />
            This service is part of the <a href="https://www.konsek.de/17025-starter/" target="_blank" rel="noopener noreferrer" className="underline">17025starter program</a>.
          </p>
          <button className="primary-button">
            <Link href="/create-task" >
              Create a new print file
            </Link>
          </button>
          <p className="footer-text">
            Provided by Konsek Engineering & Consulting GmbH<br />
            <a href="https://www.konsek.de/impressum/">Terms of use</a> | <a href="https://www.konsek.de/datenschutzerklaerung/">Privacy Policy</a> |{" "}
            <a href="https://www.konsek.de/agb/">Legal</a>
          </p>
        </div>
      </div>
    </>
  );
}

