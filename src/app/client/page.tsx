/* eslint-disable */
"use client";
// Remember you must use an AuthProvider for
// client components to useSession
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useParams } from 'next/navigation';
import UserCard from '@/components/UserCard';
import { Suspense } from 'react';
const fetchData = () => new Promise(resolve => setTimeout(resolve, 2000)); // Simulates data fetching

export default function RunScriptPage() {
    const { data: session, status } = useSession();
    // const router = useParams();
    const [output, setOutput] = useState("");

    if (status === "loading") {
        // return <Suspense fallback={<p>Loading feed...</p>}></Suspense>
      return
    }

    if (status === "unauthenticated") {
        signIn('auth-provider', { callbackUrl: '/client' }); // Leitet zur Anmeldeseite um
        return; // Zeigt nichts an, während die Umleitung verarbeitet wird
    }

    // Optional: Zugriffssteuerung basierend auf der Benutzerrolle
    if (session?.user.role !== "admin" && session?.user.role !== "user") {
        return <h1>Zugriff verweigert</h1>;
    }

    const handleRunScript = async () => {
      try {
        const response = await fetch('/api/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Server antwortete mit ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Script executed successfully:', result);

        // Weiterer Code zur Verarbeitung der Antwort...
      } catch (error) {
        console.error('Fehler bei der Skriptausführung:', error);
        // Fehlerbehandlung, z.B. Benutzerbenachrichtigung
      }

    };

  return (
    <div>
      <UserCard user={session?.user} pagetype={"Client"} />
      {/* <button onClick={handleRunScript}>Python-Skript ausführen</button> */}
      <UserCard user={session?.user} pagetype={"Client"} />
      <form className="flex flex-col gap-3">
        <input type="text" placeholder="Your Name" className="input-class" />
        <input type="email" placeholder="Your Email" className="input-class" />
        <textarea placeholder="Your Message" className="textarea-class"></textarea>
        <button type="submit" className="submit-button-class">Submit</button>
        <button type="button" className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Extra large</button>

      </form>
      <div>
        <p>This is a paragraph within a div element.</p>
      </div>
      <pre>{output}</pre>
    </div>
  );
}
