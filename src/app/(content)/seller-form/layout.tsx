import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seller Form",
  description: "Complete the seller intake form to start your exit journey with Acquire To Scale.",
  alternates: {
    canonical: "/seller-form",
  },
};

export default function SellerFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="buyer-form-dark-bg min-h-screen">{children}</div>;
}
