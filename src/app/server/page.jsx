"use client";
import { runpythonscriptAction2 } from "@/lib/actions";
// import { runScript } from "@/lib/actions";
import React from "react";


const ServerActionTestPage = () => {
  const handleRunScriptClick = async () => {
    // Code to run the Python script will go here
    try {
      const result = await runpythonscriptAction2();
      console.log(result);
      if (result.error) {
        alert(`Error running script: ${result.error}`);
      } else {
        alert(`Script executed successfully: ${result.message}`);
      }
    } catch (error) {
      console.error("Error running script:", error);
      alert("Error running script. Check the console for more details.");
    }
  };

  return (
    <div>
      <input type="text" placeholder="input" name="input" />
      <button onClick={handleRunScriptClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
        Run Python Script
      </button>
    </div>
  );
};


export default ServerActionTestPage;