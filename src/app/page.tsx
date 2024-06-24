// import Link from "next/link";

// export default function LandingPage() {
//   return (
// <>
//   <meta charSet="utf-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>PDF stack processor</title>

//   <div className="container">
//     <div aria-hidden="false">
//       <div />
//     </div>
//     <div className="main-content">
//       <div className="text-content">
//         <h1 className="title">
//           <span className="font-bold">PDF</span>{" "}
//           <span>stack processor</span>
//         </h1>
//         <p className="description">
//           Create a printable document from your QM documentary.
//           <br />
//           This service is part of the{" "}
//           <a
//             href="https://www.konsek.de/17025-starter/"
// target="_blank"
// rel="noopener noreferrer"
//               >
//                 17025starter program.
//               </a>
//             </p>
//             <div className="button-container">
//               <Link href="/create-task" className="primary-button">
//                 Create a new print file
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="background-blur" aria-hidden="true">
//           <div className="background-gradient" />
//         </div>
//         <div>
//           <p>
//             Provided by Konsek Engineering & Consulting GmbH
//             <br />
//             <a href="https://www.konsek.de/impressum/">Terms of use</a> | <a href="https://www.konsek.de/datenschutzerklaerung/">Privacy Policy</a> |{" "}
//             <a href="https://www.konsek.de/agb/">Legal</a>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }


// // Imports necessary components from Next.js and React

import Link from "next/link";
import "./globals.css";

export default function LandingPage() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>PDF stack processor</title>

      <div className="container-landingpage">
        <div className="layout-full-left">
          <h1 className="title">
            <span className="boldweight">PDF </span>
            stack processor
          </h1>
          <p className="description gap-10">
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


// .container {
//   @apply container mx-auto flex flex-col gap-8 pt-12 pb-24;
// }