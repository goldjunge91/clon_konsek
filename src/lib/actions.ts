/* eslint-disable */
"use server";
// import winston from "winston";
// /src/lib/actions.ts
// import { spawn } from "child_process";
import { exec } from "child_process";

//
// import { promisify } from "util";
import path from "path";

// src/lib/actions.ts
export async function runpythonscriptAction2(taskId: string): Promise<{ error?: string; message?: string; }> {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.join(process.cwd(), 'src', 'lib', 'main_v3.py');

    // Übergabe der taskId als Argument an das Python-Skript
    console.log(pythonScriptPath)
    const pythonProcess = exec(`python ${pythonScriptPath} ${taskId}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error}`);
        reject({ error: error.message });
      } else if (stderr) {
        console.error(`Script error output: ${stderr}`);
        resolve({ error: stderr });
      } else {
        console.log(`Python script output: ${stdout}`);
        resolve({ message: stdout });
      }
    });
  });
}