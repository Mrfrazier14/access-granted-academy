import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Access Granted Academy | Learn Cybersecurity & Software Engineering",
  description:
    "Free, hands-on lessons and quizzes in cybersecurity and software engineering from Access Granted.",
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
