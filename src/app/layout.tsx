import type { Metadata } from "next";
import "./globals.css";
import { ThemeSyncer } from "./ThemeSyncer";

export const metadata: Metadata = {
  title: "Divyanshu M. Patel | Full-Stack MERN Developer — DivyanshuOS Portfolio",
  description:
    "Interactive macOS-style portfolio of Divyanshu M. Patel — Full-Stack MERN Developer from Surat, India. Explore projects, skills, and experience in an immersive desktop environment.",
  keywords: [
    "Divyanshu M. Patel",
    "Divyanshu Patel",
    "Full Stack Developer",
    "MERN Stack",
    "Portfolio",
    "React",
    "Node.js",
    "SaaS",
  ],
  authors: [{ name: "Divyanshu M. Patel", url: "https://github.com/Divyanshu1121" }],
  openGraph: {
    title: "Divyanshu M. Patel | Full-Stack MERN Developer",
    description:
      "Interactive macOS-style portfolio with live AI assistant, terminal, and draggable windows.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divyanshu M. Patel | Full-Stack MERN Developer",
    description:
      "Interactive macOS-style portfolio with live AI assistant, terminal, and draggable windows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeSyncer />
        {children}
      </body>
    </html>
  );
}

