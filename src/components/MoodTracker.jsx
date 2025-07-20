import { useState } from "react";

export default function MoodTracker() {
  const [mood, setMood] = useState("");
  return (
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
  );
}
