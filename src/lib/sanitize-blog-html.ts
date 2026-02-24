/**
 * Sanitize blog post HTML for safe rendering on the public site.
 *
 * Strips:
 * - ALL inline `style` attributes (prevents layout-breaking widths, font sizes, etc.)
 * - ALL `class` attributes (Quill editor classes like ql-size-huge have no matching
 *   CSS on the frontend and can cause broken rendering)
 * - `width` / `height` HTML attributes
 *
 * The blog page's `.prose` CSS handles all typography styling.
 * Call this when rendering blog content (blog page), and on save (PostForm) for width-only cleanup.
 */
export function sanitizeBlogHtml(html: string): string {
  if (!html || typeof html !== "string") return html;
  return html
    .replace(/&nbsp;/g, " ")
    .replace(/\s+style\s*=\s*["'][^"']*["']/gi, "")
    .replace(/\s+class\s*=\s*["'][^"']*["']/gi, "")
    .replace(/\s+width\s*=\s*["'][^"']*["']/gi, "")
    .replace(/\s+height\s*=\s*["'][^"']*["']/gi, "");
}

/**
 * Lighter sanitizer for saving in PostForm / paste handler.
 * Only strips width-related properties so editor formatting is preserved in admin.
 */
export function sanitizeBlogHtmlForSave(html: string): string {
  if (!html || typeof html !== "string") return html;
  return html
    .replace(/\bwidth\s*=\s*["'][^"']*["']/gi, "")
    .replace(/\bmin-width\s*=\s*["'][^"']*["']/gi, "")
    .replace(/\bmax-width\s*=\s*["'][^"']*["']/gi, "")
    .replace(/\bstyle\s*=\s*["']([^"']*)["']/gi, (_, inner) => {
      const cleaned = inner
        .replace(/\bwidth\s*:\s*[^;]+;?/gi, "")
        .replace(/\bmin-width\s*:\s*[^;]+;?/gi, "")
        .replace(/\bmax-width\s*:\s*[^;]+;?/gi, "")
        .trim()
        .replace(/;+\s*$/, "")
        .replace(/^\s*;\s*/, "");
      return cleaned ? ` style="${cleaned}"` : "";
    });
}
