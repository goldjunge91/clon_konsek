import Image from "next/image";
import React from "react";
import background from "../../public/background.jpg";

const BackgroundImage = () => {
  return (
    <div className="image-background-container">
      <Image
        className="image-background"
        src={background}
        alt="Background"
        quality={100}
        fill
        sizes="150%"
        style={{
          objectFit: "cover"
        }} />
    </div>
  );
};
export default BackgroundImage;
