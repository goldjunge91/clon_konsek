"use server";
// Funktion zum Lesen des Python-Logs

import fs from "fs/promises";
import path from "path";

export async function readPythonLog(taskId: string, maxLines: number): Promise<string[]> {
	try {
		const folderPath = path.join(process.cwd(), "DATA", "downloads", taskId);
		const logFilePath = path.join(folderPath, `${taskId}.log`);

		const logContent = await fs.readFile(logFilePath, "utf-8");
		const lines = logContent.split("\n");
		return lines.slice(-maxLines);
	} catch (error) {
		// Keine Protokollierung des Fehlers
		return [];
	}
}
