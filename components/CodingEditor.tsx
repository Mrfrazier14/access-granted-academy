"use client";

import { useRef, useState } from "react";

type TestResult = {
  input: unknown;
  expected: unknown;
  actual: unknown;
  pass: boolean;
  error: string | null;
};

export default function CodingEditor({
  problemId,
  starterCode,
  testCode,
  signedIn,
}: {
  problemId: string;
  starterCode: string;
  testCode: string;
  signedIn: boolean;
}) {
  const [code, setCode] = useState(starterCode);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  async function runTests() {
    setRunning(true);
    setRunError(null);
    setResults(null);
    setSaved(false);

    const source = `${code}\n\n${testCode}`;
    const blob = new Blob([source], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    workerRef.current = worker;

    const timeout = setTimeout(() => {
      worker.terminate();
      setRunError("Time limit exceeded — check for an infinite loop.");
      setRunning(false);
    }, 5000);

    worker.onmessage = async (event) => {
      clearTimeout(timeout);
      const testResults = event.data as TestResult[];
      setResults(testResults);
      setRunning(false);
      worker.terminate();
      URL.revokeObjectURL(url);

      if (signedIn) {
        const passed = testResults.every((r) => r.pass);
        const res = await fetch(`/api/coding/${problemId}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, passed }),
        });
        if (res.ok) setSaved(true);
      }
    };

    worker.onerror = (event) => {
      clearTimeout(timeout);
      setRunError(event.message || "Your code threw an error before tests could run.");
      setRunning(false);
      worker.terminate();
      URL.revokeObjectURL(url);
    };
  }

  const allPassed = results !== null && results.every((r) => r.pass);

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        style={{
          width: "100%",
          minHeight: 240,
          fontFamily: "var(--font-mono)",
          fontSize: "0.9rem",
          background: "var(--bg-alt)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: 16,
          resize: "vertical",
        }}
      />

      <div style={{ marginTop: 16 }}>
        <button className="btn btn-primary" onClick={runTests} disabled={running}>
          {running ? "Running…" : "Run Tests"}
        </button>
        {!signedIn && (
          <span style={{ marginLeft: 12, fontSize: "0.85rem", color: "var(--muted)" }}>
            Sign in to save your submission history.
          </span>
        )}
      </div>

      {runError && <div className="form-error" style={{ marginTop: 16 }}>{runError}</div>}

      {results && (
        <div style={{ marginTop: 20 }}>
          <div className={allPassed ? "form-success" : "form-error"}>
            {allPassed
              ? `All ${results.length} tests passed!`
              : `${results.filter((r) => r.pass).length}/${results.length} tests passed`}
            {saved && " — submission saved"}
          </div>
          {results.map((r, i) => (
            <div className="quiz-question" key={i}>
              <p style={{ color: r.pass ? "var(--accent)" : "var(--danger)", fontWeight: 700 }}>
                Test {i + 1}: {r.pass ? "PASS" : "FAIL"}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                input: {JSON.stringify(r.input)} — expected: {JSON.stringify(r.expected)} — got:{" "}
                {r.error ? `error: ${r.error}` : JSON.stringify(r.actual)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
