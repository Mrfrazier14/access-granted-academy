import Link from "next/link";

export default function BusinessTrainingPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="prompt">./training --organization</span>
          <h1>Technology Training for <span className="highlight">Businesses &amp; Teams</span></h1>
          <p className="lead">Customized AI, cybersecurity, IT, and software education for small businesses, corporate teams, startups, entrepreneurs, nonprofits, community organizations, educational programs, and government teams.</p>
          <div className="hero-actions">
            <a href="mailto:aaronfrazier@dgitservices.onmicrosoft.com?subject=Access%20Granted%20Business%20Training%20Request" className="btn btn-primary">Request Training</a>
            <Link href="/workshops" className="btn btn-outline">View Workshops</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro"><span className="prompt">ls ./business-training</span><h2>Build a Program Around Your Team</h2><p>Training can be delivered as a focused workshop, hands-on session, multi-session program, or customized learning path.</p></div>
          <div className="grid grid-2">
            <div className="card"><h3>AI Adoption &amp; Productivity</h3><p>Help employees understand AI, prompt effectively, automate appropriate workflows, create content, protect sensitive information, and identify useful business applications.</p></div>
            <div className="card"><h3>Cybersecurity Awareness</h3><p>Practical employee and leadership training covering phishing, social engineering, MFA, passwords, ransomware, email security, device security, and incident reporting.</p></div>
            <div className="card"><h3>IT Fundamentals</h3><p>Improve confidence with Windows, macOS, Microsoft 365, cloud concepts, files and backups, networking, hardware, troubleshooting, and secure remote work.</p></div>
            <div className="card"><h3>Software &amp; Technical Teams</h3><p>Customized sessions covering programming, Python, JavaScript, full-stack development, APIs, Git, debugging, DevOps fundamentals, and AI-assisted development.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-intro"><span className="prompt">./delivery --flexible</span><h2>Training That Fits the Organization</h2></div>
          <div className="tag-row"><span className="tag">Las Vegas area</span><span className="tag">On-site</span><span className="tag">Remote</span><span className="tag">Private teams</span><span className="tag">Hands-on labs</span><span className="tag">Multi-session programs</span></div>
          <div className="card" style={{ marginTop: "2rem" }}><h3>Need implementation after training?</h3><p>Access Granted Academy focuses on education. DivineGuard IT Services LLC can support AI implementation, cybersecurity assessments, software engineering, automation, IT consulting, and ongoing professional technology services.</p></div>
        </div>
      </section>
    </>
  );
}
