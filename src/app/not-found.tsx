// pages/404.js
import Link from "next/link";
/**
 *NotFoundPage
 * @description 404-Fehlerseite für nicht gefundene Ressourcen.
 * @remarks
 * Zeigt eine benutzerfreundliche Meldung für nicht existierende Seiten an.
 * @returns {JSX.Element} Die gerenderte 404-Seite
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404-Nicht gefunden</h1>
      <p className="text-xl mt-3">
        Ups! Wir können die von Ihnen gesuchte Seite nicht finden.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
        Zurück zur Startseite
      </Link>
    </div>
  );
}