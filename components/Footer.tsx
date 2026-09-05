export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-social">
          <a
            href="https://www.youtube.com/@AccessGranted-26"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C17.6 2.6 12 2.6 12 2.6h0s-5.6 0-8.3.3c-.4 0-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.2 8.1.2 10v1.9c0 1.9.3 3.8.3 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.7.3 7.7.3s5.6 0 8.3-.3c.4 0 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.3-1.9.3-3.8V10c0-1.9-.3-3.8-.3-3.8zM9.7 14.6V7.4l6.4 3.6-6.4 3.6z" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@aaron.frazier.jr6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 2h-3v13.5a3.5 3.5 0 11-3.5-3.5c.2 0 .3 0 .5.03V8.9a6.6 6.6 0 00-.5-.02A6.6 6.6 0 003.4 15.5 6.6 6.6 0 0010 22.1a6.6 6.6 0 006.5-6.6V8.7a9.4 9.4 0 005.6 1.8V7.5A6.4 6.4 0 0116.5 2z" />
            </svg>
          </a>
          <a
            href="https://github.com/mrfrazier14"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.5 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.5A10.03 10.03 0 0022 12.26C22 6.58 17.52 2 12 2z" />
            </svg>
          </a>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} <strong>Access Granted Academy</strong> — built by Aaron Frazier.
        </div>
      </div>
    </footer>
  );
}
