// A Web Worker class to envelope Pyodide
class PyodideWorker {
	constructor() {
		this.pyodide = null;
	}

	async initialize() {
		try {
			// Load Pyodide
			importScripts('https://cdn.jsdelivr.net/pyodide/v0.23.2/full/pyodide.js');

			this.pyodide = await loadPyodide();
			
			this.postMessage({ type: 'initialized', message: 'Pyodide initialized successfully' });
		} catch (error) {
			this.postMessage({ type: 'error', message: `Failed to initialize Pyodide: ${error.message}` });
		}
	}

	async runPython(code) {
		try {
			const result = await this.pyodide.runPythonAsync(code);
			
			this.postMessage({ type: 'result', result });
		} catch (error) {
			this.postMessage({ type: 'error', message: `Error running Python code: ${error.message}` });
		}
	}

	postMessage(message) {
		postMessage(message);
	}
}

// Create an instance of the PyodideWorker
const pyodideWorker = new PyodideWorker();

// Set up a postbox that handles messages from the main thread (and what to do with them)
self.onmessage = async (event) => 
{
	if (event.data.type === 'initialize') {
		await pyodideWorker.initialize();
	} else if (event.data.type === 'runPython') {
		await pyodideWorker.runPython(event.data.code);
	}
};