"use client";

import { useState, type ReactNode } from "react";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function Shell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Client-side utility · no server required
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </header>
        {children}
        <footer className="mt-10 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          Data stays in your browser. Part of the Bookchaowalit developer tools portfolio.
        </footer>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      : variant === "secondary"
        ? "bg-white text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800"
        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900";
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-zinc-500">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 font-mono text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100";
const areaClass = `${inputClass} min-h-[160px] resize-y`;

function jsonToYaml(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (value === null) return "null";
  if (typeof value === "string") {
    if (value === "" || /[:\n#&*!|>%@`]/.test(value) || value.trim() !== value) {
      return JSON.stringify(value);
    }
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return value
      .map((item) => {
        if (typeof item === "object" && item !== null) {
          const nested = jsonToYaml(item, indent + 1).split("\n");
          return pad + "- " + nested[0] + (nested.length > 1 ? "\n" + nested.slice(1).map((l) => pad + "  " + l.trimStart()).join("\n") : "");
        }
        return pad + "- " + jsonToYaml(item, indent);
      })
      .join("\n");
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return entries
      .map(([k, v]) => {
        if (typeof v === "object" && v !== null) {
          return pad + k + ":\n" + jsonToYaml(v, indent + 1);
        }
        return pad + k + ": " + jsonToYaml(v, 0);
      })
      .join("\n");
  }
  return String(value);
}

function simpleYamlToJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    /* continue */
  }
  const lines = text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\t/g, "  "))
    .filter((l) => l.trim() && !l.trim().startsWith("#"));
  if (lines.length && lines.every((l) => l.trimStart().startsWith("- "))) {
    return lines.map((l) => {
      const v = l.trim().slice(2).trim();
      try {
        return JSON.parse(v);
      } catch {
        return v;
      }
    });
  }
  const obj: Record<string, unknown> = {};
  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) throw new Error("Unsupported YAML line: " + line.trim());
    const key = line.slice(0, idx).trim();
    const raw = line.slice(idx + 1).trim();
    if (!raw) {
      obj[key] = null;
      continue;
    }
    try {
      obj[key] = JSON.parse(raw);
    } catch {
      obj[key] = raw;
    }
  }
  return obj;
}

export default function Home() {
  const [input, setInput] = useState('{\n  "hello": "world",\n  "items": [1, 2, 3]\n}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const run = (action: "pretty" | "minify" | "toYaml" | "fromYaml") => {
    setError("");
    try {
      if (action === "pretty") setOutput(JSON.stringify(JSON.parse(input), null, 2));
      else if (action === "minify") setOutput(JSON.stringify(JSON.parse(input)));
      else if (action === "toYaml") setOutput(jsonToYaml(JSON.parse(input)));
      else setOutput(JSON.stringify(simpleYamlToJson(input), null, 2));
    } catch (e) {
      setOutput("");
      setError(e instanceof Error ? e.message : "Conversion failed");
    }
  };

  return (
    <Shell
      title="JSON Converter"
      subtitle="Pretty-print, minify, and convert between JSON and simple YAML without leaving the tab."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Input">
          <textarea className={areaClass} value={input} onChange={(e) => setInput(e.target.value)} />
        </Field>
        <Field label="Output">
          <textarea className={areaClass} value={output} readOnly placeholder="Result appears here" />
        </Field>
      </div>
      {error ? <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p> : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={() => run("pretty")}>Pretty JSON</Button>
        <Button variant="secondary" onClick={() => run("minify")}>
          Minify
        </Button>
        <Button variant="secondary" onClick={() => run("toYaml")}>
          JSON → YAML
        </Button>
        <Button variant="secondary" onClick={() => run("fromYaml")}>
          YAML → JSON
        </Button>
        <Button
          variant="ghost"
          disabled={!output}
          onClick={async () => {
            if (await copyText(output)) {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }
          }}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </Shell>
  );
}
