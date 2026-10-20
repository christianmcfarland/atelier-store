"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { AccountIcon, BagIcon, CloseIcon, MenuIcon, SearchIcon } from "@/components/icons";
import { navigation } from "@/lib/catalog";

// Pages that open on full-bleed imagery get a transparent header until scrolled.
const OVERLAY_PATHS = new Set(["/"]);

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const transparent = OVERLAY_PATHS.has(pathname) && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors ${
          transparent
            ? "theme-inverse bg-transparent"
            : "border-b border-line bg-canvas"
        }`}
      >
        <div className="page-container grid h-header grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center">
            <button
              type="button"
              className="btn btn-icon -ml-3 lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </button>
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex gap-8">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="link-draw text-title-xs uppercase">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Link
            href="/"
            className="font-display text-title-lg tracking-[0.2em] uppercase"
            aria-label="Atelier home"
          >
            Atelier
          </Link>

          <div className="-mr-3 flex items-center justify-end">
            <Link href="#" className="btn btn-icon hidden md:inline-flex" aria-label="Search">
              <SearchIcon />
            </Link>
            <Link href="#" className="btn btn-icon hidden md:inline-flex" aria-label="Account">
              <AccountIcon />
            </Link>
            <Link href="#" className="btn btn-icon" aria-label="Shopping bag, 0 items">
              <BagIcon />
            </Link>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-50 bg-canvas lg:hidden ${
          menuOpen
            ? "visible opacity-100 transition-opacity"
            : "invisible opacity-0 transition-[opacity,visibility]"
        }`}
      >
        <div className="page-container flex h-header items-center">
          <button
            ref={closeButtonRef}
            type="button"
            className="btn btn-icon -ml-3"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile" className="page-container pt-8">
          <ul className="flex flex-col gap-6">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-title-lg uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="divider mt-10 pt-6">
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="#" className="link-muted text-body">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="link-muted text-body">
                  Book an appointment
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
