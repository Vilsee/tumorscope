import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DisclaimerBadge from "@/components/DisclaimerBadge";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const splineMono = Spline_Sans_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | NeuroScope",
    default: "NeuroScope — Interactive 3D Atlas of WHO CNS5 Brain Tumor Classification",
  },
  description:
    "An interactive 3D anatomical atlas of the WHO CNS5 brain tumor classification system. Explore brain anatomy, tumor categories, grades, molecular markers, and live research data. Educational tool — not for diagnosis.",
  keywords: [
    "WHO CNS5",
    "brain tumor classification",
    "neuroanatomy",
    "3D brain atlas",
    "glioma",
    "meningioma",
    "neuro-oncology",
    "educational atlas",
  ],
  authors: [{ name: "Ppragya" }, { name: "Vilsee" }],
  openGraph: {
    title: "NeuroScope — Interactive 3D Atlas of WHO CNS5 Brain Tumor Classification",
    description:
      "Explore the WHO CNS5 classification system through an interactive 3D brain atlas with live PubMed research, clinical trials, and AI-powered summaries.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${splineMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ background: 'var(--bg-base)' }}>
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <DisclaimerBadge />
      </body>
    </html>
  );
}
