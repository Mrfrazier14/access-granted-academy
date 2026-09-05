import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header className="site-header">
      <nav className="navbar">
        <Link href="/" className="brand">
          <span className="bracket">&lt;</span>Access Granted Academy
          <span className="bracket">/&gt;</span>
        </Link>
        <div className="nav-links">
          <Link href="/tracks">~/tracks</Link>
          {session?.user ? (
            <>
              <Link href="/dashboard">~/dashboard</Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
                style={{ display: "inline" }}
              >
                <button type="submit" className="nav-cta" style={{ background: "none" }}>
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/sign-in">~/sign-in</Link>
              <Link href="/sign-up" className="nav-cta">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
