"use server";

import { exec, spawn } from "child_process";
import path from "path";
import winston from "winston";
// import path from 'path';
// src/lib/actions.ts
export async function runpythonscriptAction2(taskId: string): Promise<{ error?: string; message?: string; }> {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.join(process.cwd(), 'src', 'lib', 'main_v3.py');
    console.log(`Executing Python script at path: ${pythonScriptPath} with taskId: ${taskId}`);

    // Übergabe der taskId als Argument an das Python-Skript
    console.log("python path", pythonScriptPath)
    // const pythonProcess = exec(`python ${pythonScriptPath} ${taskId}`, (error, stdout, stderr) => {
    const pythonProcess = exec(`python "${pythonScriptPath}" "${taskId}"`, (error, stdout, stderr) => {

    console.log("stdout:", stdout)
    console.log(`Executing Python script at path: ${pythonScriptPath} with taskId: ${taskId}`);
    console.log(pythonProcess);

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



export async function runpythonscriptAction22(taskId: string): Promise<{ error?: string; message?: string; }> {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.join(process.cwd(), 'src', 'lib', 'main_v3.py');

    // Übergabe der taskId als Argument an das Python-Skript
    const pythonProcess = exec(`python ${pythonScriptPath} ${taskId}`, (error, stdout, stderr) => {
      console.log({pythonProcess})
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




export async function runpythonscriptAction1(taskId: string): Promise<{ error?: string; message?: string; }> {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.join(process.cwd(), 'src', 'lib', 'main_v2.py');

    // Übergabe der taskId als Argument an das Python-Skript
    const pythonProcess = exec(`python ${pythonScriptPath} ${taskId}`, (error, stdout, stderr) => {
      console.log({pythonProcess})
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

/**
 * @myparam @testpythonscript1 is working.
 */
// pages/api/runPython.ts

// import type { NextApiRequest, NextApiResponse } from 'next';
// //@ts-ignore
// import { spawn } from 'child_process';

// This function is an API route that runs a Python script


export const runPythonScript = async () => {
  try {
    const response = await fetch("/api/runscript"); // Replace 'URL_GOES_HERE' with the actual URL
    const data = await response.text();
    console.log("Script response:", data);
    //    Hier könnten Sie die Antwort verarbeiten oder an anderer Stelle in Ihrer Anwendung verwenden
    return {
      success: true,
      message: "Python script executed successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error running script:", error);
    return { error: "Something went wrong while executing the script." };
  }
};

export const runPythonScript1 = async () => {
  try {
    // Pfad zur Conda-Executable und zum Skript anpassen
    const child = spawn("ls", ["ls"]);

    child.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    child.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    child.on("exit", (code) => {
      console.log(`Child process exited with code ${code}`);
    });

    return { success: true, message: "Python script is being executed." };
  } catch (error) {
    console.error("Error running script:", error);
    return { error: "Something went wrong while starting the script." };
  }
};
export const runPythonScript2 = async () => {
  try {
    // Pfad zur Conda-Executable und zum Skript anpassen
    const child = spawn("pwsh", [
      "cwd",
      "C:Users\tozziGitdev-findersrcappserveractiontestscript",
      "-c",
      "conda activate website && python C:Users\tozziGitdev-findersrcappserveractiontestscriptapp_1.py",
//       // "C:\\Users\\tozzi\\anaconda3\\Scripts\\conda.exe activate website && python "C:\\Users\\tozzi\\Git\\dev-finder\\src\\app\\serveractiontest\\script\\app_1.py"",
    ]);
    console.log("child", child);
    child.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    child.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    child.on("exit", (code) => {
      console.log(`Child process exited with code ${code}`);
    });

    return { success: true, message: "Python script is being executed." };
  } catch (error) {
    console.error("Error running script:", error);
    return { error: "Something went wrong while starting the script." };
  }
};

// // TODO Dieser code geht halb.
// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.simple(),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: "logs.log" }),
//   ],
// });
// export const runPythonScript3 = async () => {
//   try {
//     const pythonScriptPath = path.join(process.cwd(), 'src', 'lib', 'main_v2.py');


//     // const command = exec(`python "${pythonScriptPath}" "${taskId}"`, (error, stdout, stderr) => {

//     const child = spawn("cmd", ["/c", command]);
//     child.stdout.on("data", (data) => {
//       logger.info(`stdout: ${data}`);
//     });
//     child.stderr.on("data", (data) => {
//       logger.error(`stderr: ${data}`);
//     });
//     const processFinished = new Promise((resolve, reject) => {
//       child.on("close", (code) => {
//         logger.info(`child process exited with code ${code}`);
//         resolve(undefined);
//       });
//       child.on("error", (error) => {
//         logger.error("Error running script:", error);
//         reject(error);
//       });
//     });
//     await processFinished;
//   } catch (error) {
//     logger.error("Error running script:", error);
//     // Handle the error here
//   }
// };


// Konfiguration des Loggers
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' }),
  ],
});

export const runPythonScript33 = async () => {
  try {
    const pythonScriptPath = path.join(process.cwd(), 'src', 'lib', 'main_v3.py');
    // Kommando für plattformübergreifende Unterstützung
    const cmd = process.platform === 'win32' ? 'python' : 'python3'; // Verwenden Sie 'python3' auf Unix/Linux/Mac und 'python' auf Windows

    // Starten des Python-Skripts ohne taskId, da es im Beispielcode keine taskId gibt
    const child = spawn(cmd, [pythonScriptPath]);

    child.stdout.on('data', (data) => {
      logger.info(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
      logger.error(`stderr: ${data}`);
    });

    const processFinished = new Promise((resolve, reject) => {
      child.on('close', (code) => {
        logger.info(`child process exited with code ${code}`);
        if (code === 0) {
          resolve(undefined); // Erfolgreich
        } else {
          reject(`Script exited with code ${code}`); // Fehler
        }
      });

      child.on('error', (error) => {
        logger.error('Error running script:', error);
        reject(error);
      });
    });

    await processFinished;
  } catch (error) {
    logger.error('Error running script:', error);
    // Weitere Fehlerbehandlung hier
  }
};