export default function MediaPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="prompt">./media --watch --listen</span>
          <h1>Access Granted <span className="highlight">Media</span></h1>
          <p className="lead">Technology education beyond the classroom: YouTube, podcast conversations, hands-on demonstrations, AI builds, cybersecurity education, software engineering, and practical tech reviews.</p>
          <div className="hero-actions">
            <a href="https://www.youtube.com/@AccessGranted-26" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Watch on YouTube</a>
            <a href="https://www.tiktok.com/@aaron.frazier.jr6" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Follow on TikTok</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro"><span className="prompt">ls ./media</span><h2>What We Cover</h2><p>Content built around learning, building, securing, and understanding modern technology.</p></div>
          <div className="grid grid-2">
            <div className="card"><h3>AI &amp; Automation</h3><p>AI demonstrations, agents, automation, business use cases, developer workflows, tools, and practical experiments.</p></div>
            <div className="card"><h3>Cybersecurity</h3><p>Security fundamentals, awareness, privacy, emerging threats, tools, career development, and cybersecurity for businesses.</p></div>
            <div className="card"><h3>Software Engineering</h3><p>Full-stack development, Python, JavaScript, APIs, projects, debugging, developer tools, and building AI-powered applications.</p></div>
            <div className="card"><h3>Tech Reviews</h3><p>iPhone, MacBook, PCs, AI hardware, smartphones, developer gear, cybersecurity products, software, and business technology — reviewed through a developer, security, creator, and business lens.</p></div>
            <div className="card"><h3>Access Granted Podcast</h3><p>Conversations with entrepreneurs, developers, cybersecurity professionals, creators, business owners, students, community leaders, and people building the future of technology.</p></div>
            <div className="card"><h3>Las Vegas Business &amp; Tech</h3><p>Local businesses, entrepreneurs, events, technology education, community conversations, and real-world examples of how technology can improve an organization.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-intro"><span className="prompt">./collaborate</span><h2>Collaborate With Access Granted</h2><p>We welcome podcast guests, business-owner interviews, technology professionals, product demonstrations, tech review opportunities, brand partnerships, event coverage, and educational collaborations.</p></div>
          <div className="hero-actions"><a href="mailto:aaronfrazier@dgitservices.onmicrosoft.com?subject=Access%20Granted%20Media%20Collaboration" className="btn btn-primary">Collaborate With Us</a></div>
        </div>
      </section>
    </>
  );
}
