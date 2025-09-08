import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";

import { Providers } from "@/components/providers";
import { META_THEME_COLORS, SITE_INFO, USER } from "@/data/site";
import { fontMono, fontSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    template: `%s – ${SITE_INFO.name}`,
    default: `${SITE_INFO.name} - ${SITE_INFO.subtitle}`,
  },
  description: SITE_INFO.description,
  creator: USER.username,
  openGraph: {
    siteName: SITE_INFO.name,
    url: "/",
    type: "website",
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@shail_teotia", // Twitter username
    images: [SITE_INFO.ogImage],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
