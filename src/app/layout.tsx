import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/lib/AuthProvider";
import { Header } from "./header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
// import Image from "next/image";
// import background from "@/../public/background.jpg";
import BackgroundImage from "@/components/backgroundImage";
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PdF-Generator",
  description: "An application to automatically generate and download PDFs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <div>
        <Image className="imagebackground" 
					alt="sky" src={background} quality={100} 
					/>
        </div> */}
        <AuthProvider>
          <Toaster />
          <NextTopLoader />
            <BackgroundImage />
            <div className="container-overlay">
              <Header />
              {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
