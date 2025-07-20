import { useState, useEffect } from "react";

export default function JournalBox() {
  const [entry, setEntry] = useState("");

  // Load saved entry on mount
  useEffect(() => {
    const saved = localStorage.getItem("journal");
    if (saved) setEntry(saved);
  }, []);

  // Save entry to localStorage
  const handleSave = () => {
    localStorage.setItem("journal", entry);
    alert("Saved your thoughts! 💾");
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
    </section>
  );
}
=