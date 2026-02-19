export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-theme="content" className="theme-content min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {children}
    </div>
  );
}
