import { SiteNavbar } from "./SiteNavbar";
import { FloatingLeaves } from "./FloatingLeaves";

interface SitePageLayoutProps {
  children: React.ReactNode;
}

export function SitePageLayout({ children }: SitePageLayoutProps) {
  return (
    <main className="relative min-h-screen bg-white">
      <SiteNavbar />
      <FloatingLeaves
        count={4}
        className="pointer-events-none fixed inset-0 z-0 opacity-25"
      />
      <div className="relative z-10 pt-[5.25rem]">{children}</div>
      <footer className="border-t border-forest-100 px-6 py-8 text-center text-sm text-forest-500">
        <p>
          © {new Date().getFullYear()} YichusTree — Preserve your Jewish family
          story.
        </p>
      </footer>
    </main>
  );
}
