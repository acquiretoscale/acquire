import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buyer Form",
  description: "Complete the buyer intake form to start your acquisition journey with Acquire To Scale.",
  alternates: {
    canonical: "/buyer-form",
  },
};

export default function BuyerFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="buyer-form-dark-bg min-h-screen">{children}</div>;
}
