import Link from "next/link";

const workshops = [
  {
    title: "AI for Business",
    description: "Hands-on training that helps owners and teams use AI safely, productively, and responsibly.",
    topics: ["Generative AI", "Prompting", "AI agents", "Content creation", "Workflow automation", "AI privacy & security"],
  },
  {
    title: "Cybersecurity for Business",
    description: "Practical security training that turns cybersecurity into everyday business habits.",
    topics: ["Phishing", "MFA", "Password security", "Ransomware awareness", "Device security", "Incident reporting"],
  },
  {
    title: "IT Basics for Business",
    description: "Technology fundamentals for owners and employees who want to work more confidently and efficiently.",
    topics: ["Windows & macOS", "Microsoft 365", "Networking", "Cloud basics", "Backups", "Troubleshooting"],
  },
  {
    title: "Software Engineering Workshops",
    description: "Modern development training for aspiring developers, technical teams, and organizations.",
    topics: ["Python", "JavaScript", "Full stack", "REST APIs", "Git & GitHub", "AI-assisted development"],
  },
];

export default function WorkshopsPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="prompt">./academy --live</span>
          <h1>Live <span className="highlight">Technology Workshops</span></h1>
          <p className="lead">Learn it. Build it. Secure it. Access Granted Academy delivers practical AI, cybersecurity, IT, and software engineering workshops for individuals, entrepreneurs, businesses, and professional teams.</p>
          <div className="hero-actions">
            <Link href="/business-training" className="btn btn-primary">Request Business Training</Link>
            <Link href="/tracks" className="btn btn-outline">Explore Learning Tracks</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <span className="prompt">ls ./workshops</span>
            <h2>Workshop Programs</h2>
            <p>Sessions can be introductory, hands-on, private, or customized around your organization.</p>
          </div>
          <div className="grid grid-2">
            {workshops.map((workshop) => (
              <div className="card" key={workshop.title}>
                <h3>{workshop.title}</h3>
                <p>{workshop.description}</p>
                <div className="tag-row">
                  {workshop.topics.map((topic) => <span className="tag" key={topic}>{topic}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-intro">
            <span className="prompt">./next-step</span>
            <h2>From Training to Implementation</h2>
            <p>Access Granted Academy teaches the skills. When an organization is ready to assess, build, secure, or implement a solution, DivineGuard IT Services LLC can support the professional services side.</p>
          </div>
          <div className="card">
            <h3>Learn → Assess → Plan → Build → Secure → Support</h3>
            <p>Start with a workshop, identify the opportunity, and move into AI implementation, cybersecurity assessments, software development, automation, or IT consulting when needed.</p>
          </div>
        </div>
      </section>
    </>
  );
}
