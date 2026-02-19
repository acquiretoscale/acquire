import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PostForm } from "../../PostForm";
import { isDemoMode } from "@/lib/admin-demo";

export default async function NewPostPage() {
  const demoMode = isDemoMode();
  if (!demoMode) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/admin/login");
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-[var(--foreground)]">New post</h1>
      <PostForm demoMode={demoMode} />
    </section>
  );
}
