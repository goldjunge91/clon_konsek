/* eslint-disable */
// src/app/create-task/actions.ts
"use server";
import { createTask } from "@/data-access/tasks";
import { getSession } from "@/app/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from 'fs/promises';
import validator from 'validator';
import path from 'path';
import { runpythonscriptAction1, runpythonscriptAction2, runpythonscriptAction22 } from "@/lib/actions";
import { randomUUID } from 'crypto';

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { run } from "node:test";

// Funktion, um einen zufälligen Namen zu generieren
function generateRandomName() {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals], // Hier können Sie verschiedene Wörterbücher kombinieren
    length: 2, // Die Anzahl der zu kombinierenden Wörter
    style: 'capital', // Der Stil des generierten Namens
    separator: '', // Trennzeichen zwischen den Wörtern
  });
  return randomName;
}

// Funktion, um eine zufällige UUID als secretId zu generieren
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

export async function saveDataTask2(formData: FormData) {
  const session = await getSession();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  // Vorausgesetzt, formData.get("name") gibt den Namen der Aufgabe zurück
  let taskName = formData.get("name")?.toString() || "";
  // Wenn kein Name angegeben wurde, generieren Sie einen zufälligen Namen
  if (!taskName) {
    taskName = generateRandomName(); // Nutzt die zuvor definierte Funktion zur Generierung eines Namens
  }
  // Task-Daten vorbereiten
  const taskData = {
    name: taskName,
    dsm_url: formData.get("dsm_url")?.toString() || "",
    dsm_mail: formData.get("dsm_mail")?.toString() || "",
    status: "Pending",
    userId: session.user.id,
    secretId:  generateSecretId()?.toString() || "",
  };
  // console.log("createTask SaveDataTask1", taskData)
  try {
    // Task in der Datenbank erstellen
    const savedTask = await createTask(taskData, session.user.id);
    console.log("createTask SaveDataTask2", savedTask);
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
    // TODO hier müssen die Sensiblen Daten decryptet und encrypeted werden
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
      console.log("hallo welt task:", {runpythonscriptAction1});
      await runpythonscriptAction1(savedTask.id);
      console.log("hallo welt task:", {runpythonscriptAction1});

    }, 5000); // 5000 ms (5 Sekunden) Verzögerung
    return { success: true, taskId: savedTask.id };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create task: ");
  }
}