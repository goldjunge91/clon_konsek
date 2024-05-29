/* eslint-disable */

import * as fs from 'fs';

// Hilfsfunktion, die ein Objekt schön formatiert
export function formatForLogging(obj: any): string {
    return JSON.stringify(obj, null, 2);
}

// Angepasste customLog Funktion für beliebige Log-Daten
export function customLog(data: Record<string, any>): void {
    const formattedData = Object.entries(data).reduce((acc, [key, value]) => {
        // Formatierung jedes Wertes
        acc += `${key}: ${formatForLogging(value)},\n`;
        return acc;
    }, '');

    const timestamp = new Date().toISOString();
    const logMessage = `
########### Start of console log ###############
${timestamp}
${formattedData}
########### End of console log ###############
`;

    console.log(logMessage);
    fs.appendFileSync('application.log', logMessage + '\n', 'utf8');
}

