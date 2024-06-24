
import AuthProvider from "@/lib/AuthProvider";
import { Header } from "./header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import background from "./../../public/background.jpg"
// import BackgroundImage from "@/components/backgroundImage";
import "./globals.css"



// Wrap the JSX elements in a parent element
export const metadataElement = (
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
      <html lang="en" suppressHydrationWarning>{metadataElement}
        <body className="layout-body" >
          <div className="background-container">
            <Image className="imagebackground"
              // alt="sky" src="./../background.jpg" quality={100}
              alt="sky" src={background} quality={100}
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
