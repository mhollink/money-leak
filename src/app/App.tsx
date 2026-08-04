import "./App.css";

const principles = [
  {
    title: "Know what you pay",
    description: "Keep one clear overview of your active subscriptions and recurring expenses.",
  },
  {
    title: "See the real impact",
    description: "Compare monthly costs with their yearly financial impact.",
  },
  {
    title: "Celebrate savings",
    description: "Keep track of cancelled subscriptions and the money they no longer consume.",
  },
] as const;

function App() {
  return (
    <main className="landing-page">
      <header className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Recurring finances, made visible</p>

          <h1>Money Leak</h1>

          <p className="hero__introduction">
            Understand which recurring payments are leaving your account and make deliberate choices
            about where your money goes.
          </p>

          <a className="hero__action" href="#principles">
            Explore the approach
          </a>
        </div>

        <div className="hero__summary">
          <span className="hero__summary-label">Current focus</span>
          <strong>Subscription inventory</strong>
          <span>Early development</span>
        </div>
      </header>

      <section className="principles" id="principles" aria-labelledby="principles-title">
        <div className="section-heading">
          <p className="section-heading__eyebrow">The starting point</p>
          <h2 id="principles-title">Start with clarity</h2>
          <p>
            Money Leak begins with a small, trustworthy overview before introducing broader
            financial planning.
          </p>
        </div>

        <div className="principles__grid">
          {principles.map((principle) => (
            <article className="principle-card" key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>Money Leak is currently in early development.</p>
      </footer>
    </main>
  );
}

export default App;
