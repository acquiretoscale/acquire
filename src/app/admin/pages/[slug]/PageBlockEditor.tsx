"use client";

import { useState, useTransition } from "react";
import { savePageBlock } from "../actions";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type {
  PageBlock,
  HeroBlock,
  QuoteBlock,
  RichTextBlock,
  CtaBlock,
  ServiceListBlock,
  BulletCardBlock,
  AssetFocusBlock,
  WhyUsBlock,
  CardsBlock,
  TableBlock,
  CtaButton,
  ListItem,
} from "@/lib/page-content";

// ---------------------------------------------------------------------------
// Block type labels and icons for the UI
// ---------------------------------------------------------------------------

const BLOCK_LABELS: Record<string, string> = {
  hero: "Hero Section",
  quote: "Quote",
  clarity_cta: "Clarity Call CTA",
  buyer_side: "Buyer-Side Services",
  seller_side: "Seller-Side Services",
  asset_focus: "What We Focus On",
  buyers_scenario: "When Buyers Come to Us",
  sellers_scenario: "When Sellers Come to Us",
  why_us: "Why Us",
  mission: "Our Mission",
  comparison_table: "Comparison Table",
  philosophy: "Our Philosophy",
  why_choose: "Why Choose Us",
  deal_sourcing: "Deal Sourcing & Private Vault",
  cta: "Call to Action",
  content: "Content Section",
};

// ---------------------------------------------------------------------------
// Small reusable editor atoms
// ---------------------------------------------------------------------------

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
        {label}
      </label>
      {hint && <p className="text-xs text-[var(--muted)] opacity-70">{hint}</p>}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
        />
      )}
    </div>
  );
}

function CtaButtonField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: CtaButton;
  onChange: (v: CtaButton) => void;
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] p-3 space-y-2">
      <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          value={value.label}
          onChange={(e) => onChange({ ...value, label: e.target.value })}
          placeholder="Button text"
          className="rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
        />
        <input
          type="text"
          value={value.href}
          onChange={(e) => onChange({ ...value, href: e.target.value })}
          placeholder="/path or https://..."
          className="rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
        />
      </div>
    </div>
  );
}

function StringListField({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{label}</label>
      {values.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const next = [...values];
              next[i] = e.target.value;
              onChange(next);
            }}
            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onChange(values.filter((_, j) => j !== i))}
            className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-500 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="self-start rounded-lg border border-[var(--border)] px-3 py-1 text-xs text-[var(--accent)] hover:bg-[var(--card)]"
      >
        + Add item
      </button>
    </div>
  );
}

function ListItemField({
  label,
  items,
  onChange,
}: {
  label: string;
  items: ListItem[];
  onChange: (v: ListItem[]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{label}</label>
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-[var(--border)] p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--muted)]">Item {i + 1}</span>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-xs text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
          <input
            type="text"
            value={item.title}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...next[i], title: e.target.value };
              onChange(next);
            }}
            placeholder="Title (bold)"
            className="w-full rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
          />
          <textarea
            value={item.desc}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...next[i], desc: e.target.value };
              onChange(next);
            }}
            placeholder="Description"
            rows={2}
            className="w-full resize-y rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { title: "", desc: "" }])}
        className="self-start rounded-lg border border-[var(--border)] px-3 py-1 text-xs text-[var(--accent)] hover:bg-[var(--card)]"
      >
        + Add item
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Block-specific editors
// ---------------------------------------------------------------------------

function HeroEditor({
  data,
  onChange,
}: {
  data: HeroBlock;
  onChange: (v: HeroBlock) => void;
}) {
  return (
    <div className="space-y-4">
      <Field label="Label (small text above heading)" value={data.label ?? ""} onChange={(v) => onChange({ ...data, label: v })} />
      <Field label="Main Heading (H1)" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <Field label="Subheading" value={data.subheading ?? ""} onChange={(v) => onChange({ ...data, subheading: v })} multiline />
      {data.subheading_2 !== undefined && (
        <Field label="Subheading 2" value={data.subheading_2 ?? ""} onChange={(v) => onChange({ ...data, subheading_2: v })} />
      )}
      {data.rotating_texts !== undefined && (
        <StringListField
          label="Rotating texts (each line rotates in the hero)"
          values={data.rotating_texts ?? []}
          onChange={(v) => onChange({ ...data, rotating_texts: v })}
        />
      )}
      <CtaButtonField
        label="Primary CTA Button"
        value={data.cta_primary}
        onChange={(v) => onChange({ ...data, cta_primary: v })}
      />
      {data.cta_secondary !== undefined && (
        <CtaButtonField
          label="Secondary CTA Button"
          value={data.cta_secondary ?? { label: "", href: "" }}
          onChange={(v) => onChange({ ...data, cta_secondary: v })}
        />
      )}
      {data.image_src !== undefined && (
        <div className="space-y-2">
          <ImageUpload
            label="Hero Image (upload or enter URL below)"
            currentUrl={data.image_src ?? ""}
            onUploaded={(url) => onChange({ ...data, image_src: url })}
          />
          <Field
            label="Or enter image URL manually"
            value={data.image_src ?? ""}
            onChange={(v) => onChange({ ...data, image_src: v })}
            placeholder="/images/hero.png"
            hint="Use /images/filename.png for public folder images, or a full URL"
          />
        </div>
      )}
      {data.image_alt !== undefined && (
        <Field label="Image Alt Text (SEO — describe the image)" value={data.image_alt ?? ""} onChange={(v) => onChange({ ...data, image_alt: v })} />
      )}
    </div>
  );
}

function QuoteEditor({ data, onChange }: { data: QuoteBlock; onChange: (v: QuoteBlock) => void }) {
  return (
    <Field label="Quote text" value={data.text} onChange={(v) => onChange({ ...data, text: v })} multiline />
  );
}

function RichTextEditor({ data, onChange }: { data: RichTextBlock; onChange: (v: RichTextBlock) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Heading" value={data.heading ?? ""} onChange={(v) => onChange({ ...data, heading: v })} />
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Paragraphs</label>
        {(data.paragraphs ?? []).map((p, i) => (
          <div key={i} className="flex gap-2">
            <textarea
              value={p}
              onChange={(e) => {
                const next = [...(data.paragraphs ?? [])];
                next[i] = e.target.value;
                onChange({ ...data, paragraphs: next });
              }}
              rows={3}
              className="flex-1 resize-y rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => onChange({ ...data, paragraphs: (data.paragraphs ?? []).filter((_, j) => j !== i) })}
              className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-500 hover:bg-red-50 self-start"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange({ ...data, paragraphs: [...(data.paragraphs ?? []), ""] })}
          className="self-start rounded-lg border border-[var(--border)] px-3 py-1 text-xs text-[var(--accent)] hover:bg-[var(--card)]"
        >
          + Add paragraph
        </button>
      </div>
    </div>
  );
}

function CtaEditor({ data, onChange }: { data: CtaBlock; onChange: (v: CtaBlock) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Label (small badge text, optional)" value={data.label ?? ""} onChange={(v) => onChange({ ...data, label: v })} />
      <Field label="Heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <Field label="Body text" value={data.body} onChange={(v) => onChange({ ...data, body: v })} multiline />
      <CtaButtonField label="Button" value={data.button} onChange={(v) => onChange({ ...data, button: v })} />
    </div>
  );
}

function ServiceListEditor({ data, onChange }: { data: ServiceListBlock; onChange: (v: ServiceListBlock) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Section title (e.g. BUYER-SIDE)" value={data.title} onChange={(v) => onChange({ ...data, title: v })} />
      <Field label="Intro text" value={data.intro ?? ""} onChange={(v) => onChange({ ...data, intro: v })} multiline />
      <ListItemField label="Service items" items={data.items} onChange={(v) => onChange({ ...data, items: v })} />
      <div className="space-y-2">
        <ImageUpload
          label="Section Image (upload or enter URL below)"
          currentUrl={data.image_src ?? ""}
          onUploaded={(url) => onChange({ ...data, image_src: url })}
        />
        <Field
          label="Or enter image URL manually"
          value={data.image_src ?? ""}
          onChange={(v) => onChange({ ...data, image_src: v })}
          placeholder="/images/example.png"
        />
      </div>
      <Field label="Image Alt Text (SEO — describe the image)" value={data.image_alt ?? ""} onChange={(v) => onChange({ ...data, image_alt: v })} />
      <CtaButtonField label="CTA Button" value={data.cta} onChange={(v) => onChange({ ...data, cta: v })} />
      <Field label="Footer note (optional)" value={data.note ?? ""} onChange={(v) => onChange({ ...data, note: v })} multiline />
    </div>
  );
}

function BulletCardEditor({ data, onChange }: { data: BulletCardBlock; onChange: (v: BulletCardBlock) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Label (small badge)" value={data.label} onChange={(v) => onChange({ ...data, label: v })} />
      <Field label="Heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <StringListField label="Bullet items" values={data.items} onChange={(v) => onChange({ ...data, items: v })} />
    </div>
  );
}

function AssetFocusEditor({ data, onChange }: { data: AssetFocusBlock; onChange: (v: AssetFocusBlock) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Label" value={data.label} onChange={(v) => onChange({ ...data, label: v })} />
      <Field label="Body text" value={data.body} onChange={(v) => onChange({ ...data, body: v })} multiline />
    </div>
  );
}

function WhyUsEditor({ data, onChange }: { data: WhyUsBlock; onChange: (v: WhyUsBlock) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <StringListField label="Bullet items" values={data.bullets} onChange={(v) => onChange({ ...data, bullets: v })} />
      <Field label="Bold statement" value={data.bold_statement} onChange={(v) => onChange({ ...data, bold_statement: v })} multiline />
      <Field label="Body paragraph" value={data.body} onChange={(v) => onChange({ ...data, body: v })} multiline />
      <CtaButtonField label="Primary Button" value={data.cta_primary} onChange={(v) => onChange({ ...data, cta_primary: v })} />
      <CtaButtonField label="Secondary Button" value={data.cta_secondary} onChange={(v) => onChange({ ...data, cta_secondary: v })} />
    </div>
  );
}

function CardsEditor({ data, onChange }: { data: CardsBlock; onChange: (v: CardsBlock) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <Field label="Intro (optional)" value={data.intro ?? ""} onChange={(v) => onChange({ ...data, intro: v })} multiline />
      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Cards</label>
        {data.cards.map((card, i) => (
          <div key={i} className="rounded-lg border border-[var(--border)] p-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-[var(--muted)]">Card {i + 1}</span>
              <button
                type="button"
                onClick={() => onChange({ ...data, cards: data.cards.filter((_, j) => j !== i) })}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              value={card.title}
              onChange={(e) => {
                const next = [...data.cards];
                next[i] = { ...next[i], title: e.target.value };
                onChange({ ...data, cards: next });
              }}
              placeholder="Card title"
              className="w-full rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            />
            <textarea
              value={card.desc}
              onChange={(e) => {
                const next = [...data.cards];
                next[i] = { ...next[i], desc: e.target.value };
                onChange({ ...data, cards: next });
              }}
              placeholder="Card description"
              rows={2}
              className="w-full resize-y rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange({ ...data, cards: [...data.cards, { title: "", desc: "" }] })}
          className="self-start rounded-lg border border-[var(--border)] px-3 py-1 text-xs text-[var(--accent)] hover:bg-[var(--card)]"
        >
          + Add card
        </button>
      </div>
    </div>
  );
}

function TableEditor({ data, onChange }: { data: TableBlock; onChange: (v: TableBlock) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <Field label="Intro text" value={data.intro ?? ""} onChange={(v) => onChange({ ...data, intro: v })} multiline />
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Table rows</label>
        <p className="text-xs text-[var(--muted)] mt-1 mb-2">Headers: {data.headers.join(" | ")}</p>
        {data.rows.map((row, ri) => (
          <div key={ri} className="mb-2 flex gap-2 items-start">
            {row.map((cell, ci) => (
              <input
                key={ci}
                type="text"
                value={cell}
                onChange={(e) => {
                  const next = data.rows.map((r, i) =>
                    i === ri ? r.map((c, j) => (j === ci ? e.target.value : c)) : r
                  );
                  onChange({ ...data, rows: next });
                }}
                className="flex-1 rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-xs text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              />
            ))}
            <button
              type="button"
              onClick={() => onChange({ ...data, rows: data.rows.filter((_, i) => i !== ri) })}
              className="rounded border border-red-200 px-2 py-1 text-xs text-red-500 hover:bg-red-50 shrink-0"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange({ ...data, rows: [...data.rows, data.headers.map(() => "")] })}
          className="mt-1 rounded-lg border border-[var(--border)] px-3 py-1 text-xs text-[var(--accent)] hover:bg-[var(--card)]"
        >
          + Add row
        </button>
      </div>
      <Field label="Footer note (optional)" value={data.footer_note ?? ""} onChange={(v) => onChange({ ...data, footer_note: v })} multiline />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Generic block renderer — picks the right editor for the block type
// ---------------------------------------------------------------------------

function BlockEditorInner({
  blockType,
  data,
  onChange,
}: {
  blockType: string;
  data: PageBlock;
  onChange: (v: PageBlock) => void;
}) {
  switch (blockType) {
    case "hero":
      return <HeroEditor data={data as HeroBlock} onChange={(v) => onChange(v)} />;
    case "quote":
      return <QuoteEditor data={data as QuoteBlock} onChange={(v) => onChange(v)} />;
    case "rich_text":
      return <RichTextEditor data={data as RichTextBlock} onChange={(v) => onChange(v)} />;
    case "cta":
      return <CtaEditor data={data as CtaBlock} onChange={(v) => onChange(v)} />;
    case "list":
      if ("items" in data && Array.isArray((data as BulletCardBlock).items) && typeof (data as BulletCardBlock).items[0] === "string") {
        return <BulletCardEditor data={data as BulletCardBlock} onChange={(v) => onChange(v)} />;
      }
      if ("label" in data && !("heading" in data)) {
        return <AssetFocusEditor data={data as AssetFocusBlock} onChange={(v) => onChange(v)} />;
      }
      if ("bullets" in data) {
        return <WhyUsEditor data={data as WhyUsBlock} onChange={(v) => onChange(v)} />;
      }
      return <ServiceListEditor data={data as ServiceListBlock} onChange={(v) => onChange(v)} />;
    case "cards":
      return <CardsEditor data={data as CardsBlock} onChange={(v) => onChange(v)} />;
    case "table":
      return <TableEditor data={data as TableBlock} onChange={(v) => onChange(v)} />;
    default:
      return <RichTextEditor data={data as RichTextBlock} onChange={(v) => onChange(v)} />;
  }
}

// ---------------------------------------------------------------------------
// Individual block card with expand/collapse
// ---------------------------------------------------------------------------

function BlockCard({
  pageSlug,
  blockKey,
  blockType,
  sortOrder,
  initialData,
}: {
  pageSlug: string;
  blockKey: string;
  blockType: string;
  sortOrder: number;
  initialData: PageBlock;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<PageBlock>(initialData);
  const [isPending, startTransition] = useTransition();
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const label = BLOCK_LABELS[blockKey] ?? blockKey;

  // Determine actual block type for display
  const displayType = detectBlockType(blockKey, blockType, data);

  function handleSave() {
    setSaveState("idle");
    startTransition(async () => {
      const result = await savePageBlock(pageSlug, blockKey, blockType, data, sortOrder);
      if (result.error) {
        setSaveState("error");
        setErrorMsg(result.error);
      } else {
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 3000);
      }
    });
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-[var(--card-hover)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[var(--foreground)]">{label}</span>
          <span className="rounded-full bg-[var(--card-hover)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--muted)]">
            {displayType}
          </span>
        </div>
        <svg
          className={`h-4 w-4 text-[var(--muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Editor */}
      {isOpen && (
        <div className="border-t border-[var(--border)] px-5 py-5 space-y-5">
          <BlockEditorInner blockType={displayType} data={data} onChange={setData} />

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isPending}
              className="inline-flex h-9 items-center justify-center rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:opacity-60"
            >
              {isPending ? "Saving…" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={() => { setData(initialData); setIsOpen(false); }}
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Cancel
            </button>
            {saveState === "saved" && (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Saved — live page updated
              </span>
            )}
            {saveState === "error" && (
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs text-red-600">{errorMsg}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function detectBlockType(blockKey: string, blockType: string, data: PageBlock): string {
  if (blockType === "list") {
    if ("bullets" in data) return "rich_text"; // why_us uses bullets array
    if ("label" in data && !("heading" in data)) return "rich_text"; // asset_focus
    if (Array.isArray((data as BulletCardBlock).items) && typeof (data as BulletCardBlock).items[0] === "string") return "list";
    return "list"; // service list
  }
  return blockType;
}

// ---------------------------------------------------------------------------
// Main export: full page editor
// ---------------------------------------------------------------------------

export type BlockData = {
  blockKey: string;
  blockType: string;
  sortOrder: number;
  content: PageBlock;
};

export function PageBlockEditor({
  pageSlug,
  pageLabel,
  pagePath,
  blocks,
}: {
  pageSlug: string;
  pageLabel: string;
  pagePath: string;
  blocks: BlockData[];
}) {
  return (
    <div className="space-y-3">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">{pageLabel}</h2>
          <a
            href={pagePath}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:underline"
          >
            {pagePath}
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <p className="text-sm text-[var(--muted)]">
          Click any section to expand and edit.
        </p>
      </div>

      {blocks
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((block) => (
          <BlockCard
            key={block.blockKey}
            pageSlug={pageSlug}
            blockKey={block.blockKey}
            blockType={block.blockType}
            sortOrder={block.sortOrder}
            initialData={block.content}
          />
        ))}
    </div>
  );
}
