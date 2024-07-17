'use server';

import { exec, spawn } from 'child_process';
import path from 'path';
import { promisify } from 'util';

import { Semaphore } from 'async-mutex';
// import path from 'path';
// src/lib/actions.ts

const execPromise = promisify(exec);
export async function runpythonscriptAction11(
	taskId: string
): Promise<{ error?: string; message?: string }> {
	try {
		const pythonScriptPath = path.join(
			process.cwd(),
			'src',
			'lib',
			'main_v3.py'
		);
		console.log(
			`Executing Python script at path: ${pythonScriptPath} with taskId: ${taskId}`
		);

		// Verwenden Sie eine absolute Pfadangabe für den Python-Interpreter
		const pythonInterpreter = process.env.PYTHON_PATH || 'python3';

		const { stdout, stderr } = await execPromise(
			`"${pythonInterpreter}" "${pythonScriptPath}" "${taskId}"`
		);

		if (stderr) {
			console.error(`Script error output: ${stderr}`);
			return { error: stderr };
		}

		console.log(`Python script output: ${stdout}`);
		return { message: stdout };
	} catch (error) {
		console.error(`Error executing Python script: ${error}`);
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

// export async function runpythonscriptAction2(
//   taskId: string
// ): Promise<{ error?: string; message?: string }> {
//   return new Promise((resolve, reject) => {
//     const pythonScriptPath = path.join(
//       process.cwd(),
//       'src',
//       'lib',
//       'main_v3.py'
//     );
//     console.log(
//       `Executing Python script at path: ${pythonScriptPath} with taskId: ${taskId}`
//     );

//     // Übergabe der taskId als Argument an das Python-Skript
//     console.log('python path', pythonScriptPath);
//     exec(
//       `python3 ${pythonScriptPath} ${taskId}`,
//       (error, stdout, stderr) => {
//         console.log('stdout:', stdout);
//         console.log(
//           `Executing Python script at path: ${pythonScriptPath} with taskId: ${taskId}`
//         );

//         if (error) {
//           console.error(`Error executing Python script: ${error}`);
//           reject({ error: error.message });
//         } else if (stderr) {
//           console.error(`Script error output: ${stderr}`);
//           resolve({ error: stderr });
//         } else {
//           console.log(`Python script output: ${stdout}`);
//           resolve({ message: stdout });
//         }
//       }
//     );
//   },
// }

const semaphore = new Semaphore(2);

export async function runpythonscriptAction2(
	taskId: string
): Promise<{ error?: string; message?: string }> {
	const [, release] = await semaphore.acquire();
	try {
		const pythonScriptPath = path.join(
			process.cwd(),
			'src',
			'lib',
			'main_v3.py'
		);
		console.log(
			`Executing Python script at path: ${pythonScriptPath} ${taskId}`
		);
		const pythonInterpreter = process.env.PYTHON_PATH || 'python3';

		return new Promise((resolve, reject) => {
			// Übergeben Sie die taskId als separates Argument
			const pythonProcess = spawn(pythonInterpreter, [
				pythonScriptPath,
				taskId,
			]);

			let stdout = '';
			let stderr = '';

			pythonProcess.stdout.on('data', (data) => {
				stdout += data.toString();
			});

			pythonProcess.stderr.on('data', (data) => {
				stderr += data.toString();
			});

			pythonProcess.on('close', (code) => {
				if (code !== 0) {
					console.error(`Script error output: ${stderr}`);
					resolve({ error: stderr });
				} else {
					console.log(`Python script output: ${stdout}`);
					resolve({ message: stdout });
				}
			});

			pythonProcess.on('error', (error) => {
				console.error(`Error executing Python script: ${error}`);
				reject({ error: error.message });
			});

			const timeout = setTimeout(() => {
				pythonProcess.kill();
				reject({ error: 'Script execution timed out' });
			}, 8000000);

			pythonProcess.on('close', () => clearTimeout(timeout));
		});
	} catch (error) {
		console.error(`Unexpected error: ${error}`);
		return {
			error: error instanceof Error ? error.message : String(error),
		};
	} finally {
		release();
	}
}
