import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shawon Haque | AI Engineer & Developer",
  description: "AI Engineer, Developer, Designer, and Creator - Building the future with AI",
  keywords: ["AI Engineer", "Developer", "Designer", "Creator", "Shawon Haque"],
  authors: [{ name: "Shawon Haque" }],
  openGraph: {
    title: "Shawon Haque | AI Engineer & Developer",
    description: "AI Engineer, Developer, Designer, and Creator",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#0a0a0f] text-white antialiased">
        <div className="aurora-bg" />
        {children}
      </body>
    </html>
  );
}
