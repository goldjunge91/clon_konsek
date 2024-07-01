import Link from "next/link";
import "./globals.css";
import React from "react";
/**
 * LandingPage Komponente
 * 
 * Stellt die Startseite der PDF-processor Anwendung dar * 
 * 
 * Diese Komponente dient als Einstiegspunkt für Benutzer und bietet einen Überblick
 * über die Hauptfunktionen des PDF stack processors.
 * 
 * @remarks
 * Die LandingPage enthält:
 * - Einen Haupttitel "PDF stack processor"
 * - Eine Beschreibung des Services
 * - Einen Link zum 17025starter Progra * - Einen Button zum Erstellen einer neuer Druckdatei
 * - Footer-Informationen mit Links
 * 
 * @example
 * ```tsx
 * import { LandingPage } from './app/page';
 * 
 * function App() {
 *   return <LandingPage />;
 * }
 * ```
 * 
 * @returns Ein React-Element, das die gerenderte Startseite darstellt.
 * 
 * @see {@link https://www.konsek.de/17025-starter/ | 17025starter Programm}
 */

export default function LandingPage() {
	return (
		<>
			{/* <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>PDF stack processor</title> */}
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

