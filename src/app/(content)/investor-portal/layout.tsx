import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Portal",
  description: "Sign in to access the Acquire To Scale investor portal.",
  alternates: { canonical: "/investor-portal" },
};

export default function InvestorPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="investor-portal-theme min-h-[calc(100vh-140px)]">
      {children}
    </div>
  );
}
