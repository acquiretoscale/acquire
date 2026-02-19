import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminLoginForm } from "./AdminLoginForm";

export default async function AdminLoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/admin");

  return (
    <section className="mx-auto max-w-md px-4 py-20">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Admin sign in</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Sign in to create and edit blog posts.
        </p>
        <AdminLoginForm />
        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          <Link href="/" className="text-[var(--accent)] hover:underline">
            ← Back to site
          </Link>
        </p>
      </div>
    </section>
  );
}
