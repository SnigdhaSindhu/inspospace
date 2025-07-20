import { useState, useEffect } from "react";

export default function QuoteBox() {
  const [quote, setQuote] = useState("Loading...");

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

  return (
    <section className="box">
      <h2>✨ Daily Inspiration</h2>
      <p>{quote}</p>
      <button onClick={fetchQuote}>New Quote</button>
    </section>
  );
}

