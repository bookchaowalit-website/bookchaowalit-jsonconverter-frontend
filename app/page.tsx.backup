"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Copy, Download } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState<"json" | "yaml">("json");
  const [error, setError] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const convert = async () => {
    if (!input.trim()) return;

    setIsConverting(true);
    setError("");

    try {
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: Date.now(),
          method: "tools/call",
          params: {
            name: format === "json" ? "yaml_to_json" : "json_to_yaml",
            arguments: {
              [format === "json" ? "yaml" : "json"]: input
            }
          }
        }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
      } else {
        setOutput(data.result.result);
      }
    } catch (err) {
      setError("Conversion failed");
    } finally {
      setIsConverting(false);
    }
  };

  const validate = async () => {
    if (!input.trim()) return;

    try {
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: Date.now(),
          method: "tools/call",
          params: {
            name: "json_validate",
            arguments: {
              json: input
            }
          }
        }),
      });

      const data = await response.json();
      if (!data.result.valid) {
        setError(data.result.error);
      } else {
        setError("");
      }
    } catch (err) {
      setError("Validation failed");
    }
  };

  const prettify = async () => {
    if (!input.trim()) return;

    try {
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: Date.now(),
          method: "tools/call",
          params: {
            name: "json_prettify",
            arguments: {
              json: input
            }
          }
        }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
      } else {
        setInput(data.result.result);
        setError("");
      }
    } catch (err) {
      setError("Prettify failed");
    }
  };

  const swap = () => {
    setInput(output);
    setOutput(input);
    setFormat(format === "json" ? "yaml" : "json");
    setError("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            JSON/YAML Converter
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Convert between JSON and YAML formats with validation and formatting
          </p>
        </header>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Input
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={validate}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Validate
                </button>
                <button
                  onClick={prettify}
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Prettify
                </button>
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Format
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFormat("json")}
                  className={`px-4 py-2 rounded text-sm font-medium ${
                    format === "json"
                      ? "bg-blue-500 text-white"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                  }`}
                >
                  JSON
                </button>
                <button
                  onClick={() => setFormat("yaml")}
                  className={`px-4 py-2 rounded text-sm font-medium ${
                    format === "yaml"
                      ? "bg-blue-500 text-white"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                  }`}
                >
                  YAML
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter your ${format.toUpperCase()} here...`}
              className="w-full h-64 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-900 dark:border-slate-600 dark:text-white font-mono text-sm resize-none"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            <div className="flex gap-2 mt-4">
              <button
                onClick={convert}
                disabled={isConverting || !input.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConverting ? "Converting..." : (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    Convert
                  </>
                )}
              </button>
              <button
                onClick={() => copyToClipboard(input)}
                disabled={!input}
                className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Output
              </h2>
              <button
                onClick={() => {
                  swap();
                  convert();
                }}
                disabled={!output}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Swap
              </button>
            </div>
            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder={`Converted ${format === "json" ? "YAML" : "JSON"} will appear here...`}
              className="w-full h-64 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-900 dark:border-slate-600 dark:text-white font-mono text-sm resize-none"
              readOnly
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => copyToClipboard(output)}
                disabled={!output}
                className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
              <button
                onClick={() => downloadFile(output, `converted.${format === "json" ? "yaml" : "json"}`)}
                disabled={!output}
                className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Sample Data */}
        <div className="mt-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Sample Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setInput('{"name": "John", "age": 30, "city": "New York"}')}
              className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-left"
            >
              <h4 className="font-medium text-slate-900 dark:text-white mb-1">Simple JSON</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Basic JSON object</p>
            </button>
            <button
              onClick={() => setInput(`name: John
age: 30
city: "New York" hobbies:
  - reading
  - swimming`)}
              className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-left"
            >
              <h4 className="font-medium text-slate-900 dark:text-white mb-1">Simple YAML</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Basic YAML structure</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
