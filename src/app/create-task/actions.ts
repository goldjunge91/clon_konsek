/* eslint-disable */
// src/app/create-task/actions.ts
"use server";
import { createTask } from "@/data-access/tasks";
import { getSession } from "@/app/api/auth/[...nextauth]/options";
// import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from 'fs/promises';
import validator from 'validator';
import path from 'path';
import { runpythonscriptAction2 } from "@/lib/actions";

function generateJsonOutput2(data: any): string {
  const jsonEntries = Object.entries(data)
    .map(([key, value]) => {
      let valueString: string;

      if (typeof value === "string") {
        // Strings unverändert lassen
        valueString = `"${value}"`;
      } else {
        valueString = JSON.stringify(value);
      }

      // Nur Schlüssel sanitisieren
      const sanitizedKey = validator.escape(key);
      return `"${sanitizedKey}": ${valueString}`;
    })
    .join(",\n");

  return `{\n${jsonEntries}\n}`;
}

export async function saveDataTask2(formData: FormData) {
  const session = await getSession();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  // Task-Daten vorbereiten
  const taskData = {
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    dsm_url: formData.get("dsm_url")?.toString() || "",
    dsmmail: formData.get("dsmmail")?.toString() || "",
    status: "Pending",
    userId: session.user.id,
  };
  try {
    // Task in der Datenbank erstellen
    // @ts-ignore
    const savedTask = await createTask(taskData, session.user.id);
    console.log("hallo welt task:", savedTask);
    const uploadsDir = path.join(process.cwd(), 'DATA', 'downloads');
    const taskFolderPath = path.join(uploadsDir, savedTask.id.toString());
    await mkdir(taskFolderPath, { recursive: true });
    // Datei speichern, falls vorhanden
    const file = formData.get("file") as File | undefined;
    if (file) {
      const filePath = path.join(taskFolderPath, "liste.csv");
      const fileBuffer = await file.arrayBuffer();
      await writeFile(filePath, new Uint8Array(fileBuffer));
      console.log(`File saved to ${filePath}`);
    }
    // Konvertiert und speichert formDataFields als JSON
    const formDataFields = {
      ...savedTask,
    };
    const dsmPassword = formData.get("dsmpassword")?.toString() || "";
    const zipPassword = formData.get("zippassword")?.toString() || "";
    const sensitiveData = {
      dsmpassword: dsmPassword,
      zippassword: zipPassword,
    };
    const combinedData = { ...formDataFields, ...sensitiveData };
    const jsonOutput = generateJsonOutput2(combinedData);
    const jsonFilePath = path.join(taskFolderPath, `form-data.json`);
    await writeFile(jsonFilePath, jsonOutput);
    revalidatePath("/your-tasks");
    // Verzögertes Ausführen des Python-Skripts
    setTimeout(async () => {
      await runpythonscriptAction2(savedTask.id);
    }, 5000); // 5000 ms (5 Sekunden) Verzögerung
    return { success: true, taskId: savedTask.id };
  } catch (error) {
    console.error(error);
    // @ts-ignore
    throw new Error("Failed to create task: " + error.message);
  }
}


// export async function saveDataTask3(formData: FormData) {
//   const session = await getSession();
//   if (!session || !session.user) {
//     throw new Error("Unauthorized");
//   }
//   // Task-Daten vorbereiten
//   const taskData = {
//     name: formData.get("name")?.toString() || "",
//     description: formData.get("description")?.toString() || "",
//     dsm_url: formData.get("dsm_url")?.toString() || "",
//     dsmmail: formData.get("dsmmail")?.toString() || "",
//     status: "Pending",
//     userId: session.user.id,
//   };
//   try {
//     // Task in der Datenbank erstellen
//     // @ts-ignore
//     const savedTask = await createTask(taskData, session.user.id);
//     console.log("hallo welt task:", savedTask);
//     const uploadsDir = path.join(process.cwd(), 'DATA', 'downloads');
//     const taskFolderPath = path.join(uploadsDir, savedTask.id.toString());
//     await mkdir(taskFolderPath, { recursive: true });
//     // Datei speichern, falls vorhanden
//     const file = formData.get("file") as File | undefined;
//     if (file) {
//       const filePath = path.join(taskFolderPath, "liste.csv");
//       await writeFile(filePath, Buffer.from(await file.arrayBuffer()));
//       console.log(`File saved to ${filePath}`);
//     }
//     // Konvertiert und speichert formDataFields als JSON
//     const formDataFields = {
//       ...savedTask,
//     };
//     const dsmPassword = formData.get("dsmpassword")?.toString() || "";
//     const zipPassword = formData.get("zippassword")?.toString() || "";
//     const sensitiveData = {
//       dsmpassword: dsmPassword,
//       zippassword: zipPassword,
//     };
//     const combinedData = { ...formDataFields, ...sensitiveData };
//     const jsonOutput = generateJsonOutput2(combinedData);
//     const jsonFilePath = path.join(taskFolderPath, `form-data.json`);
//     await writeFile(jsonFilePath, jsonOutput);

//     revalidatePath("/your-tasks");

//     // Verzögertes Ausführen des Python-Skripts
//     setTimeout(async () => {
//       await runpythonscriptAction1(savedTask.id);
//     }, 5000); // 5000 ms (5 Sekunden) Verzögerung

//     return { success: true, taskId: savedTask.id };
//   } catch (error) {
//     console.error(error);
//     // @ts-ignore
//     throw new Error("Failed to create task: " + error.message);
//   }
// }



// function generateJsonOutput11(data: any): string {
//   const jsonEntries = Object.entries(data)
//     .map(([key, value]) => {
//       let valueString: string;

//       if (typeof value === "string") {
//         // Sanitisiere Strings, um Code-Injection und XSS zu verhindern
//         valueString = `"${sanitizeString(value)}"`;
//       } else {
//         valueString = JSON.stringify(value);
//       }

//       return `"${sanitizeString(key)}": ${valueString}`;
//     })
//     .join(",\n");

//   return `{\n${jsonEntries}\n}`;
// }

// function sanitizeString(str: string): string {
//   // Entfernt potentiell gefährliche Zeichen und HTML-Tags
//   const sanitizedStr = str.replace(/[<>\/]/g, "");

//   // Weitere Sanitisierungsregeln können hier hinzugefügt werden

//   return sanitizedStr;
// }


// /**
//  *
//  * !! Achtung nicht löschen
//  * Funktion funktioniert.
//  *
//  */
// function generateJsonOutput1(data: any): string {
//   const jsonEntries = Object.entries(data)
//     .map(([key, value]) => {
//       let valueString: string;

//       if (typeof value === "string") {
//         // Strings unverändert lassen
//         valueString = `"${value}"`;
//       } else {
//         valueString = JSON.stringify(value);
//       }

//       // Nur Schlüssel sanitisieren
//       const sanitizedKey = validator.escape(key);
//       return `"${sanitizedKey}": ${valueString}`;
//     })
//     .join(",\n");

//   return `{\n${jsonEntries}\n}`;
// }
// export async function saveDataTask1(formData: FormData) {
//   const session = await getSession();
//   if (!session || !session.user) {
//     throw new Error("Unauthorized");
//   }

//   // Task-Daten vorbereiten
//   const taskData = {
//     name: formData.get("name")?.toString() || "",
//     description: formData.get("description")?.toString() || "",
//     dsm_url: formData.get("dsm_url")?.toString() || "",
//     dsmmail: formData.get("dsmmail")?.toString() || "",
//     status: "Pending",
//     userId: session.user.id,
//   };

//   try {
//     // Task in der Datenbank erstellen
//     // @ts-ignore
//     const savedTask = await createTask(taskData, session.user.id);
//     console.log("hallo welt task:", savedTask);

//     // Dynamischer Pfad zum 'downloads'-Verzeichnis im 'public'-Ordner
//     const uploadsDir = path.join(process.cwd(), 'DATA', 'downloads');

//     // const uploadsDir = "C:\\Users\\tozzi\\Git\\pdf-website\\public\\downloads\\";
//     const taskFolderPath = path.join(uploadsDir, savedTask.id.toString());
//     await mkdir(taskFolderPath, { recursive: true });

//     // Datei speichern, falls vorhanden
//     const file = formData.get("file") as File | undefined;
//     if (file) {
//       const filePath = path.join(taskFolderPath, "liste.csv");
//       await writeFile(filePath, Buffer.from(await file.arrayBuffer()));
//       console.log(`File saved to ${filePath}`);
//     }

//     // Konvertiert und speichert formDataFields als JSON
//     const formDataFields = {
//       ...savedTask,
//     };

//     const dsmPassword = formData.get("dsmpassword")?.toString() || "";
//     const zipPassword = formData.get("zippassword")?.toString() || "";
//     const sensitiveData = {
//       dsmpassword: dsmPassword,
//       zippassword: zipPassword,
//     };

//     const combinedData = { ...formDataFields, ...sensitiveData };
//     // ! Hier kann die Funktion generateJsonOutput1() durch generateJsonOutput() ersetzt werden
//     const jsonOutput = generateJsonOutput1(combinedData);

//     const jsonFilePath = path.join(taskFolderPath, `form-data.json`);
//     await writeFile(jsonFilePath, jsonOutput);

//     revalidatePath("/your-tasks");
//     return { success: true, taskId: savedTask.id };
//   } catch (error) {
//     console.error(error);
//     // @ts-ignore
//     throw new Error("Failed to create task: " + error.message);
//   }
// }



// /**
//  * !! Achtung nicht löschen
//  *  Erstellt einen neuen Task in der Datenbank und speichert die Datei, falls vorhanden.
//  * @param formData
//  * @returns
// */
// export async function saveDataTask(formData: FormData) {
//   const session = await getSession();

//   if (!session || !session.user) {
//     throw new Error("Unauthorized");
//   }

//   // Task-Daten vorbereiten
//   const taskData = {
//     name: formData.get("name")?.toString() || "",
//     description: formData.get("description")?.toString() || "",
//     dsm_url: formData.get("dsm_url")?.toString() || "",
//     dsmpassword: formData.get("dsmpassword")?.toString() || "",
//     dsmmail: formData.get("dsmmail")?.toString() || "",
//     zippassword: formData.get("zippassword")?.toString() || "",
//     status: "Pending", // Setzen Sie den initialen Status auf "Pending"
//     userId: session.user.id,
//   };

//   try {
//     // Task in der Datenbank erstellen
//     // @ts-ignore

//     const savedTask = await createTask(taskData, session.user.id);
//     console.log("hallo welt task:", savedTask);
//     const uploadsDir = path.join(process.cwd(), 'DATA', 'downloads');
//     // const uploadsDir = "C:\\Users\\tozzi\\Git\\pdf-website\\public\\downloads\\";

//     const taskFolderPath = path.join(uploadsDir, savedTask.id.toString());
//     await mkdir(taskFolderPath, { recursive: true });
//     ;


//     // Datei speichern, falls vorhanden
//     const file = formData.get("file") as File | undefined;
//     if (file) {
//       const filePath = path.join(taskFolderPath, "liste.csv");
//       await writeFile(filePath, Buffer.from(await file.arrayBuffer()));
//       console.log(`File saved to ${filePath}`);

//       const formattedData = JSON.stringify(savedTask, null, 4);   // Konvertiert und speichert formDataFields als JSON
//       const jsonFilePath = path.join(taskFolderPath, `form-data.json`);
//       await writeFile(jsonFilePath, formattedData)
//     }

//     revalidatePath("/your-tasks");
//     return { success: true, taskId: savedTask.id };
//   } catch (error) {
//     console.error(error);
//     // @ts-ignore
//     throw new Error("Failed to create task: " + error.message);
//   }
// }

