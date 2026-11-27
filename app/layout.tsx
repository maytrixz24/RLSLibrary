import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RLSlibrary — Read. Learn. Smart.",
  description: "An open digital library for reading, learning, and discovery.",
  applicationName: "RLSlibrary",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
