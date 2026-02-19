import { site } from "@/lib/site";
import { SiteLogo } from "./SiteLogo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { AwardBadge } from "./ui/award-badge";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--surface-dark)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-3 py-4 sm:px-4">
        <SiteLogo />
        <nav className="hidden items-center gap-5 text-[11px] font-semibold uppercase tracking-wider md:flex md:gap-6" aria-label="Main navigation">
          <NavLinks items={site.nav as Parameters<typeof NavLinks>[0]["items"]} />
          <AwardBadge
            href="/investor-portal"
            customTitle="INVESTOR PORTAL"
            variant="gold"
            icon="ph"
            compact
            className="shrink-0"
          />
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
