import {NextResponse} from 'next/server';
import fs from 'fs';
import path from 'path';
import {getTask} from '@/data-access/tasks';

export async function GET(_request: Request, {params}: { params: { taskId: string } }): Promise<NextResponse<{
    error: string;
}> | NextResponse<Buffer>> {
    const {taskId} = params;

    try {
        // Holt die Aufgabe aus der Datenbank
        const task = await getTask(taskId);

        if (!task) {
            return NextResponse.json({error: 'Task not found'}, {status: 404});
        }

        // Überprüft ob der Status der Aufgabe auf 'completed' gesetzt ist
        if (task.status !== 'completed') {
            return NextResponse.json({error: 'Task is not completed'}, {status: 400});
        }

        // Pfad zur ZIP-Datei
        const folderPath = path.join(process.cwd(), 'DATA', 'downloads', taskId);
        const filePath = path.join(folderPath, `${taskId}.zip`);

        // Überprüft, ob die Datei existiert
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({error: 'File not found'}, {status: 404});
        }

        // Lesen der Datei vom Dateisystem
        const fileBuffer = await fs.promises.readFile(filePath);

        // Setzt den Content-Type-Header und senden der Datei zum Download
        const response = NextResponse.json(fileBuffer, {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${taskId}.zip"`,
            },
        });

        return response;
    } catch (error) {
        console.error('Error downloading file:', error);
        return NextResponse.json({error: 'Ein Fehler ist beim Download aufgetreten.'}, {status: 500});
    }
}