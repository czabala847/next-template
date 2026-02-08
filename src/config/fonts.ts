import { Geist, Geist_Mono, Montserrat_Alternates } from "next/font/google"

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// className={titleFont.className} // Use this for titles.
export const titleFont = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["500", "700"],
})