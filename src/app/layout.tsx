import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import AuthProvider from "@/lib/AuthProvider";
import {Header} from "./header";
import NextTopLoader from "nextjs-toploader";
import {Toaster} from "@/components/ui/toaster";
import Image from "next/image";
import backround from "../../public/backround.jpg";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: "PdF-Generator",
    description: "An application to automatically generate and download PDFs.",
};


export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <div className="relative">
            <div>
                <Image
                    alt="backround"
                    src={backround}
                    placeholder="blur"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
                <AuthProvider>
                    <Toaster/>
                    <NextTopLoader/>
                    <Header/>
                    <div className="container mx-auto">{children}</div>
                </AuthProvider>
            </div>
        </div>
        </body>
        </html>
    );
}
