import Image from 'next/image';
import NextTopLoader from 'nextjs-toploader';

import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/lib/AuthProvider';

import background from './../../public/background.jpg';
import { Header } from './header';

// import BackgroundImage from "@/components/backgroundImage";
import './globals.css';
import React from 'react'; // Import React library
/**
 *RootLayout
 * Haupt-Layout-Komponente für die gesamte Anwendung.
 * @remarks
 * Definiert die grundlegende Struktur und gemeinsame Elemente aller Seiten.
 * @param props - Die Eigenschaften des Layouts
 * @returns Das gerenderte Root-Layout
 */

const metadataElement = (
	<>
		<meta charSet="utf-8" />
		<title>PDF stack processor</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	</>
);

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				{metadataElement}
				<body className="layout-body">
					<div className="background-container">
						<Image
							className="imagebackground"
							// alt="sky" src="./../background.jpg" quality={100}
							alt="sky"
							src={background}
							quality={100}
						/>
					</div>
					<AuthProvider>
						<Toaster />
						<NextTopLoader />
						<Header />
						{children}
					</AuthProvider>
				</body>
			</html>
		</>
	);
}
