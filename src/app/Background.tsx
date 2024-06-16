// Background.tsx
import React from 'react';
import Image from "next/legacy/image";
import backround from "../../public/backround.jpg";

export default function Background() {
  return (
    <div style={{ zIndex: -1, position: 'relative', width: '100vw', height: '100vh' }}>
    <Image
        alt="Mountains"
        src={backround}
        layout="fill"
        objectFit="cover"
        quality={100}
    />
    </div>
  )
}

// const Background: React.FC = ({ children }) => {
//   return (
//     <div style={{  zIndex: -1, position: 'relative', width: '100vw', height: '100vh'}}>
//       {children}
//     </div>
//   );
// };

// export default Background;
// const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <div style={{ zIndex: -1, position: 'relative', width: '100vw', height: '100vh', backgroundImage: `url(${backround})` }}>
//       {children}
//     </div>
//   );
// };

// export default Background;