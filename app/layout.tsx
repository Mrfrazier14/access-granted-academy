import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Access Granted Academy | AI, Cybersecurity, IT & Software Engineering",
  description:
    "Hands-on AI, cybersecurity, IT, and software engineering education, live workshops, business training, tech media, and practical learning from Access Granted Academy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
