import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You",
  description: "We've received your submission and will respond within 24 hours.",
  robots: "noindex, nofollow",
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
