/**
 * Parses a raw HTML string containing <script> tags into a list of
 * injectable script descriptors.  Handles:
 *   - External scripts: <script async src="..."></script>
 *   - Inline scripts: <script>...</script>
 * HTML comments and non-script nodes are ignored.
 */

export type ScriptDescriptor =
  | { type: "external"; src: string; id: string }
  | { type: "inline"; code: string; id: string };

export function parseHeadScripts(raw: string): ScriptDescriptor[] {
  const results: ScriptDescriptor[] = [];
  let idx = 0;

  // Simple regex-based parser — sufficient for well-formed Google tag snippets
  const scriptTagRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = scriptTagRegex.exec(raw)) !== null) {
    const attrs = match[1];
    const body = match[2].trim();
    const srcMatch = /\bsrc=["']([^"']+)["']/.exec(attrs);

    if (srcMatch) {
      results.push({ type: "external", src: srcMatch[1], id: `custom-ext-${idx++}` });
    } else if (body) {
      results.push({ type: "inline", code: body, id: `custom-inline-${idx++}` });
    }
  }

  return results;
}
