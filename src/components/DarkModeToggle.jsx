export default function DarkModeToggle({ isDark, toggleDark }) {
  return (
    <section className="box">
      <h2>🌓 Toggle Dark Mode</h2>
      <button onClick={toggleDark}>
        Switch to {isDark ? "Light" : "Dark"} Mode
      </button>
    </section>
  );
}
