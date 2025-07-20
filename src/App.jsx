import React, { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [quote, setQuote] = useState("Loading...");
  const [entry, setEntry] = useState("");
  const [history, setHistory] = useState([]);
  const [mood, setMood] = useState("");

  // DARK MODE EFFECT
  useEffect(() => {
    document.body.className = isDark ? "dark" : "";
  }, [isDark]);

  // LOAD JOURNAL HISTORY
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("journalHistory") || "[]");
    setHistory(saved);
  }, []);

  // FETCH QUOTE
  const fetchQuote = async () => {
    try {
      const res = await fetch("https://api.quotable.io/random");
      const data = await res.json();
      setQuote(`"${data.content}" — ${data.author}`);
    } catch (err) {
      setQuote("❌ Failed to fetch quote. Please check your connection.");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  // JOURNAL FUNCTIONS
  const handleSave = () => {
    const newEntry = { entry, date: new Date().toLocaleString() };
    const updated = [newEntry, ...history];
    setHistory(updated);
    localStorage.setItem("journalHistory", JSON.stringify(updated));
    setEntry("");
  };

  const handleExport = () => {
    const text = history.map(e => `${e.date}\n${e.entry}`).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "journal.txt";
    a.click();
  };

  const handleShare = async () => {
    const text = history.map(e => `${e.date}\n${e.entry}`).join("\n\n");
    try {
      await navigator.share({ text });
    } catch (err) {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <div className="app">
      {/* Dark Mode Toggle */}
      <section className="box">
        <h2>🌓 Toggle Dark Mode</h2>
        <button onClick={() => setIsDark(!isDark)}>
          Switch to {isDark ? "Light" : "Dark"} Mode
        </button>
      </section>

      {/* Quote Section */}
      <section className="box">
        <h2>✨ Daily Inspiration</h2>
        <p>{quote}</p>
        <button onClick={fetchQuote}>New Quote</button>
      </section>

      {/* Journal Section */}
      <section className="box">
        <h2>📝 Journal Prompt</h2>
        <textarea
          rows="5"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your thoughts..."
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleExport}>Export</button>
        <button onClick={handleShare}>Share</button>
        <ul>
          {history.map((h, i) => (
            <li key={i}><b>{h.date}</b><br />{h.entry}</li>
          ))}
        </ul>
      </section>

      {/* Mood Tracker */}
      <section className="box">
        <h2>😊 Mood Tracker</h2>
        <div className="mood">
          {["😊", "😐", "😔"].map((m) => (
            <span key={m} onClick={() => setMood(m)}>
              {m}
            </span>
          ))}
        </div>
        {mood && <p>You feel: <b>{mood}</b></p>}
      </section>
    </div>
  );
}
