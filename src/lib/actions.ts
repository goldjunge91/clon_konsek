/* eslint-disable no-console */
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

const semaphore = new Semaphore(2);

export async function runpythonscriptAction2(taskId: string): Promise<{
	error?: string;
	message?: string;
	exitCode: number;
	executionTime: number;
}> {
	const startTime = Date.now();
	let release: (() => void) | undefined;
	try {
		[, release] = await semaphore.acquire();
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

		return new Promise((resolve) => {
			const pythonProcess = spawn(pythonInterpreter, [
				pythonScriptPath,
				taskId,
			]);

			let stdout = '';
			let stderr = '';

			pythonProcess.stdout.on('data', (data) => {
				stdout += data.toString();
				console.log(`Python script output: ${data}`);
			});

			pythonProcess.stderr.on('data', (data) => {
				stderr += data.toString();
				console.error(`Python script error: ${data}`);
			});

			const timeout = setTimeout(() => {
				pythonProcess.kill();
				resolve({
					error: 'Script execution timed out',
					exitCode: 124,
					executionTime: Date.now() - startTime,
				});
			}, 8000000);

			pythonProcess.on('close', (code: number | null) => {
				clearTimeout(timeout);
				const executionTime = Date.now() - startTime;
				if (code !== 0) {
					console.error(
						`Script exited with code ${code}. Error output: ${stderr}`
					);
					resolve({
						error: stderr,
						exitCode: code ?? 1,
						executionTime,
					});
				} else {
					console.log(
						`Python script completed successfully. Output: ${stdout}`
					);
					resolve({
						message: stdout,
						exitCode: 0,
						executionTime,
					});
				}
			});

			pythonProcess.on('error', (error) => {
				clearTimeout(timeout);
				console.error(`Error executing Python script: ${error}`);
				resolve({
					error: error.message,
					exitCode: 1,
					executionTime: Date.now() - startTime,
				});
			});
		});
	} catch (error) {
		console.error(`Unexpected error: ${error}`);
		return {
			error: error instanceof Error ? error.message : String(error),
			exitCode: 1,
			executionTime: Date.now() - startTime,
		};
	} finally {
		if (release) {
			release();
		}
	}
}
