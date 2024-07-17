/* eslint-disable */
// src/tasks/[taskId]/page.tsx
'use server';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getTask } from '@/data-access/tasks';

export async function getDownloadFile2(taskId: string) {
	try {
		// Holen Sie die Aufgabe aus der Datenbank
		const task = await getTask(taskId);

		if (!task) {
			throw new Error('Task not found');
		}

		// Überprüfen Sie, ob der Status der Aufgabe auf 'completed' gesetzt ist
		if (task.status !== 'completed') {
			throw new Error('Task is not completed');
		}

		// Pfad zur ZIP-Datei
		const folderPath = path.join(
			process.cwd(),
			'DATA',
			'downloads',
			taskId
		);
		const filePath = path.join(folderPath, `${taskId}.zip`);

		// Überprüfen Sie, ob die Datei existiert
		if (!fs.existsSync(filePath)) {
			throw new Error('File not found');
		}

		// Lesen Sie die Datei vom Dateisystem
		const fileBuffer = await fs.promises.readFile(filePath);

		// Konvertieren Sie den Datei-Buffer in einen base64-kodierten String
		const base64Data = fileBuffer.toString('base64');

		return base64Data;
	} catch (error) {
		console.error('Error downloading file:', error);
		throw error;
	}
}
