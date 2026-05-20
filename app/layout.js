import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SerwistProvider } from "@serwist/turbopack/react";
import ThemeColorSync from "@/components/ThemeColorSync";
import { appleStartupImages } from "@/lib/splashScreens";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Readr",
  description: "Your books, finally in their place.",
  applicationName: "Readr",
  appleWebApp: {
    capable: true,
    title: "Readr",
    statusBarStyle: "black-translucent",
    startupImage: appleStartupImages,
  },
  formatDetection: {
    telephone: false,
  },
  // Next 16 only emits the modern `mobile-web-app-capable` ; iOS ignores
  // apple-touch-startup-image (splash screens) unless the legacy
  // `apple-mobile-web-app-capable` meta is also present.
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport = {
  themeColor: "#FEFEFF",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          <ThemeColorSync />
          <SerwistProvider
            swUrl="/serwist/sw.js"
            disable={process.env.NODE_ENV === "development"}
          >
            {children}
          </SerwistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
