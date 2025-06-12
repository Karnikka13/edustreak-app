import { useState } from "react";
import styles from "../styles/askai.module.css";

export default function AIAsk() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.result || "⚠️ No response");
  };

  return (
    <div className={styles.aiAsk}>
      <h3 className={styles.heading}>💬 Ask EduAI</h3>
      <textarea
        className={styles.textarea}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
        placeholder="Ask a question..."
      />
      <button className={styles.button} onClick={askAI}>Ask</button>
      {response && (
        <div className={styles.response}>
          <strong>AI Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
