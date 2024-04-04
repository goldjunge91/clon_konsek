import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getTask } from '@/data-access/tasks';

export async function GET(request: Request, { params }: { params: { taskId: string } }) {
  const { taskId } = params;

  try {
    // Holen Sie die Aufgabe aus der Datenbank
    const task = await getTask(taskId);

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Überprüfen Sie, ob der Status der Aufgabe auf 'completed' gesetzt ist
    if (task.status !== 'completed') {
      return NextResponse.json({ error: 'Task is not completed' }, { status: 400 });
    }

    // Pfad zur ZIP-Datei
    const folderPath = path.join(process.cwd(), 'public', 'downloads', taskId);
    const filePath = path.join(folderPath, `${taskId}.zip`);

    // Überprüfen Sie, ob die Datei existiert
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Lesen Sie die Datei vom Dateisystem
    const fileBuffer = await fs.promises.readFile(filePath);

    // Setzen Sie den Content-Type-Header und senden Sie die Datei zum Download
    const response = NextResponse.json(fileBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${taskId}.zip"`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({ error: 'An error occurred while downloading the file' }, { status: 500 });
  }
}