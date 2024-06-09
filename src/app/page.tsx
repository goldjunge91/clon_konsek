// Imports necessary components from Next.js and React
// import Image from "next/image";
import Link from "next/link";
// import './custom.css';
import "./custom.css";

export default function LandingPage() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Titel</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n@font-face {\n  font-family: helvetica200;\n  src: url(https://www.konsek.de/wp-content/themes/twentytwentythree/assets/fonts/helveticaneuelt-std-thin_normal_250.ttf);\n}\n\n@font-face {\n  font-family: helvetica500;\n  src: url(https://www.konsek.de/wp-content/themes/twentytwentythree/assets/fonts/helvetica-neue-lt-std_normal_500.otf);\n}\n\n@font-face {\n  font-family: roboto300;\n  src: url(https://www.konsek.de/wp-content/themes/twentytwentythree/assets/fonts/roboto-slab-light_normal_300.ttf);\n}\n@font-face {\n  font-family: roboto500;\n  src: url(https://www.konsek.de/wp-content/themes/twentytwentythree/assets/fonts/roboto-slab-medium_normal_500.ttf);\n}\n\nh1 {\nfont-family: helvetica200, arial; \nfont-size:3rem; \nfont-weight:200; \nline-height:2.6rem; \nmargin-bottom:2rem;\n}\n\n.boldweight {\nfont-family: helvetica500;\n}\n\np {\nfont-family: roboto300, arial; \nfont-size: 1.05rem; \nline-height:1.6rem;\n}\na:link, a:visited {\ncolor:#000;\n}\n\nbutton {\n  border: solid 2px #000; \n  border-radius: 0.5rem; \n  background-color: transparent;\n  padding: 15px 32px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-family: roboto500, arial;\n  font-size: 1.2rem;\n  margin: 2rem 0;\n  cursor: pointer;\n  letter-spacing:0.03rem;\n}\n\n",
        }}
      />
      <h1>
        <span className="boldweight">PDF </span>stack processor
      </h1>
      <p>
        Create a printable document from your QM documentary.
        <br />
        This service is part of the{" "}
        <a href="https://www.konsek.de/17025-starter/" target="_blank">
          17025starter program
        </a>
        .
      </p>
      <Link href="/create-task" className="button">
        Create a new print file
      </Link>
      {/* <button>Create a new print file</button> */}
      <p>
        Provided by Konsek Engineering &amp; Consulting GmbH
        <br />
        <a href="#">Terms of use</a> | <a href="#">Privacy Policy</a> |{" "}
        <a href="#">Legal</a>
      </p>
    </>
  );
}

// <div className="bg-fullscreen min-h-screen flex flex-col items-center justify-center text-center">
//   {/* <div className="bg-fullscreen min-h-screen flex flex-col items-center justify-center text-center"> */}
//   <h1>
//     <span className="boldweight">PDF </span>stack processor
//   </h1>
//     {/* <h1 className="heading">
//       PDF <span className="highlight">stack processor</span>
//     </h1> */}
//     <p>
//     Create a printable document from your QM documentary.<br />
//     This service is part of the <a href="https://www.konsek.de/17025-starter/" target="_blank" rel="noopener noreferrer">17025starter program</a>.
//   </p>
//   <button>Create a new print file</button>
//   <p></p>
//     <p className="subheading">
//       Create a printable document from your QM documentary. This service is part of the <span className="highlight">17025starter program.</span>
//     </p>
//     <Link href="/create-task" className="button">
//       Create a new print file
//     </Link>
//     <div className="p">
//       Provided by Konsek Engineering & Consulting GmbH<br />
//       <Link href="/terms" className="link">Terms of use</Link> | <Link href="/privacy" className="link">Privacy Policy</Link> | <Link href="/legal" className="link">Legal</Link>
//     </div>
//   </div>

// export default function LandingPage() {
//   return (
//     <div className="">
//       <div className="container">
//         <div className="background-decor" aria-hidden="true">
//           <div
//             className="shape"
//             style={{
//               clipPath:
//                 "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//             }}
//           />
//         </div>
//         <div className="main-content">
//           <div className="text-center gap-y-10">
//             <Image
//               className="inline-block"
//               src="/logo_konsek.svg"
//               width="400"
//               height="800"
//               alt="PDF logo"
//             />
//             <h1 className="heading">Provided by COMPANY XYZ</h1>
//             <p className="subheading">Create your PDF Collection</p>
//             <div className="button-container">
//               <Link href="/create-task" className="button-primary">
//                 Start Task
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="background-decor" aria-hidden="true">
//           <div
//             className="shape"
//             style={{
//               clipPath:
//                 "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// Defines the LandingPage component
// export default function LandingPage() {
//   return (
//     // Main container for the landing page
//     <div className="">
//       {/* Container for background elements and content with padding */}
//       <div className="relative isolate px-6 pt-14 lg:px-8">
//         {/* Background decorative element */}
//         <div //absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80
//           className=""
//           aria-hidden="true"
//         >
//           {/* Decorative shape with gradient and clip-path for visual flair */}
//           <div
//             className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
//             style={{
//               clipPath:
//                 "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//             }}
//           />
//         </div>
//         {/* Main content container with max width */}
//         <div className="mx-auto max-w-2xl  pt-80 ">
//           {/* Centered text content */}
//           <div className="text-center gap-y-10">
//             {/* Logo image */}
//             <Image
//               className="inline-block"
//               src="/logo_konsek.svg"
//               width="400"
//               height="800"
//               alt="PDF logo"
//             />
//             {/* Main heading */}
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
//               Provided by COMPANY XYZ
//             </h1>
//             {/* Description paragraph */}
//             <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
//               Create your PDF Collection
//             </p>
//             {/* Call to action button */}
//             <div className="mt-10 flex items-center justify-center gap-x-6">
//               <Link
//                 href="/create-task"
//                 className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Start Task
//               </Link>
//             </div>
//           </div>
//         </div>
//         {/* Another background decorative element */}
//         <div
//           className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
//           aria-hidden="true"
//         >
//           {/* Decorative shape similar to the first one but positioned differently */}
//           <div
//             className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
//             style={{
//               clipPath:
//                 "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
