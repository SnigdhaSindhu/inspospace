import { useState, useEffect } from "react";

export default function JournalBox() {
  const [entry, setEntry] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("journalHistory") || "[]");
    setHistory(saved);
  }, []);

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
  );
}
