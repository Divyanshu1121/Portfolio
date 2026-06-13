import type { Metadata } from "next";
import "./globals.css";
import { ThemeSyncer } from "./ThemeSyncer";

export const metadata: Metadata = {
  title: "Arya Shah | AI Engineer · Full-Stack Developer — AryaOS Portfolio",
  description:
    "Interactive macOS-style portfolio of Arya Shah — AI Engineer and Full-Stack Developer from Surat, India. Explore projects, skills, and experience in an immersive desktop environment.",
  keywords: [
    "Arya Shah",
    "AI Engineer",
    "Full Stack Developer",
    "Portfolio",
    "Machine Learning",
    "TensorFlow",
    "React",
    "FastAPI",
    "Computer Vision",
  ],
  authors: [{ name: "Arya Shah", url: "https://github.com/arya-shah22" }],
  openGraph: {
    title: "Arya Shah | AI Engineer · Full-Stack Developer",
    description:
      "Interactive macOS-style portfolio with live AI assistant, terminal, and draggable windows.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arya Shah | AI Engineer · Full-Stack Developer",
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

