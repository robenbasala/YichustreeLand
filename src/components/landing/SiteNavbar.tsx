"use client";

import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Login", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Us", href: "/contact" },
] as const;

export function SiteNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[5.25rem] items-center justify-between border-b border-forest-100/60 bg-white/95 px-5 backdrop-blur-sm sm:px-8 lg:px-12">
      <Link
        href="/"
        className="shrink-0 bg-transparent"
        aria-label="YichusTree home"
      >
        <BrandLogo height={76} />
      </Link>

      <nav
        className="flex items-center gap-1 sm:gap-2"
        aria-label="Main navigation"
      >
        {navLinks.map((link) => (
          <Button key={link.label} variant="ghost" size="sm" asChild>
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </nav>
    </header>
  );
}
