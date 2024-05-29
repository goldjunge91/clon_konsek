import Image from "next/image";
import backround from "../../../public/backround.jpg";
import React from "react";

export default function Backround() {

    return (

        <div className="bg-img">
            <Image
                alt="backround"
                src={backround}
                placeholder="blur"
                // quality={100}
                // fill
                // style={{
                //     position: "absolute",
                //     maxWidth: "100%",
                //     objectFit: "cover",
                // }}
            />
        </div>
        )};
