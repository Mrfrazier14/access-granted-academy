import Link from "next/link";

export default function AIPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="prompt">./learn --track ai</span>
          <h1><span className="highlight">AI &amp; Automation</span> for Work, Business &amp; Development</h1>
          <p className="lead">Learn practical artificial intelligence from the fundamentals through prompting, automation, AI agents, secure business use, APIs, and AI-powered software.</p>
          <div className="hero-actions">
            <Link href="/workshops" className="btn btn-primary">View AI Workshops</Link>
            <Link href="/business-training" className="btn btn-outline">Train Your Team</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <span className="prompt">cat ai-roadmap.md</span>
            <h2>What You&apos;ll Learn</h2>
            <p>A practical path for professionals, creators, developers, and business owners.</p>
          </div>
          <div className="grid grid-2">
            <div className="card"><h3>AI Foundations</h3><p>Generative AI, large language models, capabilities, limitations, responsible use, and choosing the right tool for the job.</p><div className="tag-row"><span className="tag">LLMs</span><span className="tag">Prompting</span><span className="tag">Responsible AI</span></div></div>
            <div className="card"><h3>AI for Business</h3><p>Use AI for research, administration, customer support, content workflows, productivity, and process improvement without losing sight of privacy.</p><div className="tag-row"><span className="tag">Productivity</span><span className="tag">Content</span><span className="tag">Business workflows</span></div></div>
            <div className="card"><h3>Automation &amp; AI Agents</h3><p>Understand how agents, APIs, tools, structured data, and automated workflows can turn AI from a chatbot into a useful business system.</p><div className="tag-row"><span className="tag">Agents</span><span className="tag">APIs</span><span className="tag">Automation</span></div></div>
            <div className="card"><h3>Building with AI</h3><p>Explore Python, JavaScript, REST APIs, model integration, AI-assisted development, testing, debugging, and full-stack AI applications.</p><div className="tag-row"><span className="tag">Python</span><span className="tag">JavaScript</span><span className="tag">Full Stack AI</span></div></div>
            <div className="card"><h3>AI Security</h3><p>Learn safe handling of business information, access control, prompt-injection awareness, data privacy, governance, and human review.</p><div className="tag-row"><span className="tag">Security</span><span className="tag">Privacy</span><span className="tag">Governance</span></div></div>
            <div className="card"><h3>Implementation Strategy</h3><p>Identify high-value use cases, map workflows, choose measurable outcomes, pilot responsibly, and decide when custom implementation makes sense.</p><div className="tag-row"><span className="tag">AI readiness</span><span className="tag">Use cases</span><span className="tag">ROI</span></div></div>
          </div>
        </div>
      </section>
    </>
  );
}
