import { LANG, SITE_TITLE, SITE_SHORT_NAME, SITE_DESCRIPTION } from "@/lib/market";

export default function manifest() {
  return {
    name: SITE_TITLE,
    short_name: SITE_SHORT_NAME,
    description:
      SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0b",
    theme_color: "#A6080E",
    lang: LANG,
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
