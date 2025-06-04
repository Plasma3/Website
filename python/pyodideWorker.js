self.onmessage = async function (event) {
    const { type, pythonCode } = event.data;

    if (type === "load") {
        try {
            importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js");
            self.pyodide = await loadPyodide();
            postMessage({ type: "loaded" });
        } catch (error) {
            postMessage({ type: "error", error: error.message });
        }
    } else if (type === "run" && self.pyodide) {
        try {
            const result = self.pyodide.runPython(pythonCode);
            postMessage({ type: "result", result });
        } catch (error) {
            postMessage({ type: "error", error: error.message });
        }
    }
};
