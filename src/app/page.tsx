// Imports necessary components from Next.js and React
import Image from "next/image";
import Link from "next/link";

// Defines the LandingPage component
export default function LandingPage() {
  return (
    // Main container for the landing page
    <div className="">
      {/* Container for background elements and content with padding */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Background decorative element */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          {/* Decorative shape with gradient and clip-path for visual flair */}
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        {/* Main content container with max width */}
        <div className="mx-auto max-w-2xl  pt-80 ">
          {/* Centered text content */}
          <div className="text-center">
            {/* Logo image */}
            <Image
              className="inline-block"
              src="/logo1.png"
              width="200"
              height="200"
              alt="PDF logo"
            />
            {/* Main heading */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Bereitgestellt von FIRMA XYZ
            </h1>
            {/* Description paragraph */}
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
            Erstelle dine PDF Sammlung
            </p>
            {/* Call to action button */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/client"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
        {/* Another background decorative element */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          {/* Decorative shape similar to the first one but positioned differently */}
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
