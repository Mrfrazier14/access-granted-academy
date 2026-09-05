import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function TracksPage() {
  const tracks = await prisma.track.findMany({
    orderBy: { order: "asc" },
    include: { modules: { include: { lessons: true } } },
  });

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="prompt">ls ./tracks</span>
          <h1>Learning Tracks</h1>
          <p>Choose a track below. Each one is organized into modules and lessons you can work through at your own pace.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
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
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85rem",
                        color: "var(--accent-2)",
                      }}
                    >
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
    </>
  );
}
