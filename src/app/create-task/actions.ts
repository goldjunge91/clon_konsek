/* eslint-disable */
// src/app/create-task/actions.ts
"use server";
import { getSession } from "@/app/api/auth/[...nextauth]/options";
import { createTask } from "@/data-access/tasks";
import { runpythonscriptAction2 } from "@/lib/actions";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
import {
    adjectives,
    animals,
    colors,
    uniqueNamesGenerator,
} from "unique-names-generator";
import validator from "validator";

// import CryptoJS from "crypto-js";
// import {dotenv} from "dotenv"


// Funktion, um einen zufälligen Namen zu generieren
function generateRandomName() {
    const randomName = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals], // Hier können Sie verschiedene Wörterbücher kombinieren
        length: 2, // Die Anzahl der zu kombinierenden Wörter
        style: "capital", // Der Stil des generierten Namens
        separator: "",
    }); // Trennzeichen zwischen den Wörtern
    return randomName;
}

function generateSecretId() {
    // Erzeugt eine zufällige UUID
    return randomUUID();
}

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
  
// function generateJsonOutput3(data: any): string {
//     const jsonEntries = Object.entries(data)
//         .map(([key, value]) => {
//             let valueString: string;
//             if (typeof value === "string") {
//                 // Strings unverändert lassen
//                 valueString = `"${value}"`;
//             } else {
//                 valueString = JSON.stringify(value);
//             }
//             // Nur Schlüssel sanitisieren
//             const sanitizedKey = validator.escape(key);
//             // Encrypt sensitive data (zippassword and dsmpassword)
//             if (key === "zippassword" || key === "dsmpassword") {
//                 const secretKey = process.env.SECRET_KEY;
//                 if (typeof secretKey === "string") {
//                     if (typeof value === "string") {
//                         const encryptedValue = CryptoJS.AES.encrypt(
//                             value,
//                             secretKey, {
//                                 mode: CryptoJS.mode.ECB,
//                                 padding: CryptoJS.pad.Pkcs7,
//                             }).toString();
//                         valueString = `"${encryptedValue}"`;
//                     } else {
//                         // Fehler ausgabe
//                         console.error(`Error: Value for key "${key}" is not a string.`);
//                     }
//                 }
//             }
//             return `"${sanitizedKey}": ${valueString}`;
//         })
//         .join(",\n");
//     return `{\n${jsonEntries}\n}`;
// }


export async function saveDataTask2(formData: FormData) {
    const session = await getSession();
    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }
    // Vorausgesetzt, formData.get("name") gibt den Namen der Aufgabe zurück
    let taskName = formData.get("name")?.toString() || "";
    // Wenn kein Name angegeben wurde, zufälligen Namen generieren.
    if (!taskName) {
        taskName = generateRandomName();
    } // Nutzt die zuvor definierte Funktion generateRandomName

    // Task-Daten vorbereiten
    const taskData = {
        name: taskName,
        dsm_url: formData.get("dsm_url")?.toString() || "",
        dsm_mail: formData.get("dsm_mail")?.toString() || "",
        status: "Pending",
        userId: session.user.id,
        secretId: generateSecretId()?.toString() || "",
    };
    try {
        // Trennzeichen zwischen den Wörtern
        // Task in der Datenbank erstellen
        const savedTask = await createTask(taskData, session.user.id);
        // console.log("createTask SaveDataTask2", savedTask);
        const uploadsDir = path.join(process.cwd(), "DATA", "downloads");
        const taskFolderPath = path.join(uploadsDir, savedTask.id.toString());
        await mkdir(taskFolderPath, {recursive: true});
        // Datei speichern, falls vorhanden
        const file = formData.get("file") as File | undefined;
        if (file) {
            const filePath = path.join(taskFolderPath, "liste.csv");
            const fileBuffer = await file.arrayBuffer();
            await writeFile(filePath, new Uint8Array(fileBuffer));
            // console.log(`File saved to ${filePath}`);
        }
        // Konvertiert und speichert formDataFields als JSON
        const formDataFields = {
            ...savedTask,
        };

        // TODO hier müssen die Sensiblen Daten decryptet und encrypeted werden
        const dsmPassword = formData.get("dsmpassword")?.toString() || "";
        const zipPassword = formData.get("zippassword")?.toString() || "";
        const sensitiveData = {
            dsmpassword: dsmPassword,
            zippassword: zipPassword,
        };

        const combinedData = {...formDataFields, ...sensitiveData};
        const jsonOutput = generateJsonOutput2(combinedData);
        const jsonFilePath = path.join(taskFolderPath, `form-data.json`);
        await writeFile(jsonFilePath, jsonOutput);
        revalidatePath("/your-tasks");
        // Verzögertes Ausführen des Python-Skripts
        setTimeout(async () => {
            await runpythonscriptAction2(savedTask.id);
        }, 5000); // 5000 ms (5 Sekunden) Verzögerung
        return {success: true, taskId: savedTask.id};
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create task: ");
    }
}
