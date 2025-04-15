import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/NavBar";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";
import "./globals.css";

// Initialize fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Home Remodeling Services",
  description: "Expert home remodeling services. Let's make your dream home a reality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-white text-gray-800 antialiased flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow px-4 md:px-8 lg:px-16 py-8">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Chat Button */}
        <ChatBot />

      </body>
    </html>
  );
}

