"use server";

import { exec } from "child_process";
import path from "path";
// import path from 'path';
// src/lib/actions.ts
export async function runpythonscriptAction2(taskId: string): Promise<{ error?: string; message?: string; }> {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.join(process.cwd(), 'src', 'lib', 'main_v3.py');
    console.log(`Executing Python script at path: ${pythonScriptPath} with taskId: ${taskId}`);

    // Übergabe der taskId als Argument an das Python-Skript
    console.log("python path", pythonScriptPath)
    exec(`python ${pythonScriptPath} ${taskId}`, (error, stdout, stderr) => {

    console.log("stdout:", stdout)
    console.log(`Executing Python script at path: ${pythonScriptPath} with taskId: ${taskId}`);

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
