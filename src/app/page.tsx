// Imports necessary components from Next.js and React
import Image from "next/image";
import Link from "next/link";


// Defines the LandingPage component
export default function LandingPage() {
    return (
        // Main container for the landing page
        <div>

            {/* Container for background elements and content with padding */}
            <div>
                {/* Background decorative element */}
                <div>
                    {/* Main content container with max width */}
                    <div>
                        {/* Centered text content */}
                        <div className="text-center gap-y-10">
                            {/* Logo image */}
                            <Image
                                className="inline-block"
                                src="/logo_konsek.svg"
                                width="400"
                                height="800"
                                alt="PDF logo"
                            />
                            {/* Main heading */}
                            <h1>
                                Provided by COMPANY XYZ
                            </h1>
                            {/* Description paragraph */}
                            <p>
                                Create your PDF Collection
                            </p>
                            {/* Call to action button */}
                            <div>
                                <Link
                                    href="/create-task"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >Start Task</Link></div>
                        </div>
                    </div>
                    {/* Another background decorative element */}
                    <div>
                        Hello
                    </div>
                </div>
            </div>
        </div>
    )
}
