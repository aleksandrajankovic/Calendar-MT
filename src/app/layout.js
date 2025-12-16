import { Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto-condensed",
});

export const metadata = {
  metadataBase: new URL("https://calendar.meridianbet.com"),
  title: "Promotions Calendar | Meridianbet",
  description:
    "Stay up to date with daily offers, discover new promotions, and enjoy exclusive rewards through the Meridianbet Promotions Calendar.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Promotions Calendar | Meridianbet",
    description:
      "Stay up to date with daily offers, discover new promotions, and enjoy exclusive rewards through the Meridianbet Promotions Calendar.",
    url: "/",
    siteName: "Meridianbet",
    images: [
      {
        url: "https://cloud.merbet.com/Preview-image/calendar-universal.png",
        width: 1200,
        height: 630,
        alt: "Promotions Calendar",
      },
    ],
    locale: "en_MT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Promotions Calendar | Meridianbet",
    description:
      "Stay up to date with daily offers, discover new promotions, and enjoy exclusive rewards through the Meridianbet Promotions Calendar.",
    images: ["https://cloud.merbet.com/Preview-image/calendar-universal.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/src/app/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoCondensed.variable} min-h-screen`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{ style: { background: "#fff", color: "#333" } }}
        />
      </body>
    </html>
  );
}
