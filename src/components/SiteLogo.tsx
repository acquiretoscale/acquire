import Link from "next/link";

export function SiteLogo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2 transition opacity-100 hover:opacity-80"
      aria-label="Acquire To Scale — Home"
    >
      <span className="whitespace-nowrap font-bold tracking-widest text-white text-lg uppercase sm:text-xl">
        Acquire To Scale
      </span>
    </Link>
  );
}
