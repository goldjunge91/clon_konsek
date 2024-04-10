/* eslint-disable */
"use server";
// src/app/create-task/actions.ts

import { getSession } from "@/app/api/auth/[...nextauth]/options";
import fs from "fs";
import { promisify } from "util";
import { spawn } from "child_process";

const writeFile = promisify(fs.writeFile);

export async function saveDataTask(formData: FormData) {
  console.log("saving task", formData);
  const session = await getSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
// @ts-nocheck
const runPythonScript = async () => {
  try {

    // Pfad zur Conda-Executable und zum Skript anpassen
    const child = spawn("ls", ["ls"]);

    child.stdout.on("data", (data: string) => {
        console.log(`stdout: ${data}`);
    });
// @ts-ignore

    child.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
    });
// @ts-ignore

    child.on("exit", (code) => {
        console.log(`Child process exited with code ${code}`);
    });

    return { success: true, message: "Python script is being executed." };
  } catch (error) {
    console.error("Error running script:", error);
    return { error: "Something went wrong while starting the script." };
  }
};
};
