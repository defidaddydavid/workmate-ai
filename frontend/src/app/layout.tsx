import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WorkMate AI - Your Intelligent Meeting & Productivity Assistant",
  description: "WorkMate AI transforms meetings with real-time transcription, smart scheduling, and integrated task management to boost your productivity.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientBody
        className={inter.className}
      >
        {children}
      </ClientBody>
    </html>
  );
}
