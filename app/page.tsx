import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const tracks = await prisma.track.findMany({
    orderBy: { order: "asc" },
    include: { modules: { include: { lessons: true } } },
  });

  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="prompt">whoami</span>
          <h1>
            Learn <span className="highlight">AI</span>, <span className="highlight">Cybersecurity</span>, IT &amp;{" "}
            <span className="highlight">Software Engineering</span>.
          </h1>
          <p className="lead">
            Access Granted Academy is a hands-on technology education platform built by Aaron Frazier. Learn through practical lessons, live workshops, business training, media, and real-world technology content — from IT fundamentals to AI automation and secure software development.
          </p>
          <div className="hero-actions">
            <Link href="/sign-up" className="btn btn-primary">Start Learning — Free</Link>
            <Link href="/workshops" className="btn btn-outline">Explore Workshops</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro"><span className="prompt">ls ./tracks</span><h2>Learning Tracks</h2><p>Build your foundation, then expand into security, software, and AI.</p></div>
          <div className="grid grid-2">
            {tracks.map((track) => {
              const lessonCount = track.modules.reduce((sum, m) => sum + m.lessons.length, 0);
              return (
                <Link key={track.id} href={`/tracks/${track.slug}`} className="card-link">
                  <div className="card"><h3>{track.title}</h3><p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-2)" }}>{track.tagline}</p><p>{track.description}</p><div className="tag-row"><span className="tag">{track.modules.length} modules</span><span className="tag">{lessonCount} lessons</span></div></div>
                </Link>
              );
            })}
            <Link href="/ai" className="card-link"><div className="card"><h3>AI &amp; Automation</h3><p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-2)" }}>Use AI. Automate work. Build intelligent applications.</p><p>Learn AI foundations, prompting, agents, automation, secure business use, APIs, and AI-powered software development.</p><div className="tag-row"><span className="tag">AI agents</span><span className="tag">Automation</span><span className="tag">AI security</span></div></div></Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-intro"><span className="prompt">./academy --live</span><h2>Live Workshops &amp; Business Training</h2><p>Bring practical technology education to your team, business, organization, or community.</p></div>
          <div className="grid grid-2">
            <Link href="/workshops" className="card-link"><div className="card"><h3>Live Workshops</h3><p>AI for Business, Cybersecurity for Business, IT Basics, and Software Engineering workshops designed around practical skills.</p><div className="tag-row"><span className="tag">AI</span><span className="tag">Cybersecurity</span><span className="tag">IT</span><span className="tag">SWE</span></div></div></Link>
            <Link href="/business-training" className="card-link"><div className="card"><h3>Private &amp; Corporate Training</h3><p>Customized on-site and remote programs for small businesses, corporate teams, startups, nonprofits, educational programs, and government teams.</p><div className="tag-row"><span className="tag">Las Vegas</span><span className="tag">Remote</span><span className="tag">Custom programs</span></div></div></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro"><span className="prompt">./media --watch --listen</span><h2>YouTube, Podcast &amp; Tech Reviews</h2><p>Learn beyond the classroom through AI builds, cybersecurity education, software engineering, interviews, podcast conversations, and hands-on technology reviews.</p></div>
          <div className="grid grid-2">
            <Link href="/media" className="card-link"><div className="card"><h3>Access Granted Media</h3><p>Explore the main YouTube channel, podcast, AI content, cybersecurity, SWE, Las Vegas technology and business conversations.</p></div></Link>
            <Link href="/media" className="card-link"><div className="card"><h3>Tech Reviews</h3><p>iPhone, MacBook, PCs, AI hardware, developer gear, software, cybersecurity products, and business technology reviewed from a practical professional perspective.</p></div></Link>
          </div>
          <div className="hero-actions" style={{ marginTop: "2rem" }}><a href="https://www.youtube.com/@AccessGranted-26" target="_blank" rel="noopener noreferrer" className="btn btn-primary">YouTube</a><a href="https://www.tiktok.com/@aaron.frazier.jr6" target="_blank" rel="noopener noreferrer" className="btn btn-outline">TikTok</a></div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container"><div className="section-intro"><span className="prompt">./next-step --professional</span><h2>Learn With Access Granted. Implement With DivineGuard.</h2><p>Access Granted Academy focuses on education and training. Organizations ready for AI implementation, cybersecurity assessments, software engineering, automation, IT consulting, or ongoing technology services can work with DivineGuard IT Services LLC.</p></div></div>
      </section>
    </>
  );
}
