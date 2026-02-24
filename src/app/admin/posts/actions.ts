"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deletePost(id: string): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  await supabase.from("blog_posts").delete().eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/blog");
}
