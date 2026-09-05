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
            Learn <span className="highlight">Cybersecurity</span> &amp;{" "}
            <span className="highlight">Software Engineering</span> — for free.
          </h1>
          <p className="lead">
            Access Granted Academy is a free, hands-on learning platform built by Aaron
            Frazier — creator of the Access Granted YouTube &amp; TikTok channels. Work
            through real lessons, quiz yourself, and track your progress as you build
            skills in security and full stack development.
          </p>
          <div className="hero-actions">
            <Link href="/sign-up" className="btn btn-primary">
              Start Learning — Free
            </Link>
            <Link href="/tracks" className="btn btn-outline">
              Browse Tracks
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <span className="prompt">ls ./tracks</span>
            <h2>Learning Tracks</h2>
            <p>Pick a track and work through it at your own pace.</p>
          </div>

          <div className="grid grid-2">
            {tracks.map((track) => {
              const lessonCount = track.modules.reduce(
                (sum, m) => sum + m.lessons.length,
                0
              );
              return (
                <Link key={track.id} href={`/tracks/${track.slug}`} className="card-link">
                  <div className="card">
                    <h3>{track.title}</h3>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-2)" }}>
                      {track.tagline}
                    </p>
                    <p>{track.description}</p>
                    <div className="tag-row">
                      <span className="tag">{track.modules.length} modules</span>
                      <span className="tag">{lessonCount} lessons</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-intro">
            <span className="prompt">./content --list</span>
            <h2>From the Channel</h2>
            <p>
              This academy is an extension of the Access Granted content on YouTube and
              TikTok — tech, software engineering, and cybersecurity, explained.
            </p>
          </div>
          <div className="hero-actions">
            <a
              href="https://www.youtube.com/@AccessGranted-26"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              YouTube
            </a>
            <a
              href="https://www.tiktok.com/@aaron.frazier.jr6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              TikTok
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
