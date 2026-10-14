import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'SkillForge - Elevate Your Future with Premier Training Programs',
  description: 'Connect with countless students globally and discover your true capabilities through our premier training programs and seasoned mentors.',
  keywords: 'digital education, training programs, learning, skill enhancement, professional advancement',
  openGraph: {
    title: 'SkillForge - Elevate Your Future with Premier Training Programs',
    description: 'Connect with countless students globally and discover your true capabilities through our premier training programs and seasoned mentors.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillForge - Elevate Your Future with Premier Training Programs',
    description: 'Connect with countless students globally and discover your true capabilities through our premier training programs and seasoned mentors.',
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={inter.className} suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
