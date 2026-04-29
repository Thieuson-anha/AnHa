"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/giai-phap", label: "Giải pháp" },
  { href: "/cong-nghe", label: "Công nghệ" },
  { href: "/du-an", label: "Dự án" },
  { href: "/ve-chung-toi", label: "Về chúng tôi" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-navy-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center bg-white/95 rounded-lg px-2 py-1">
            <Image
              src="/images/logo-anha.jpg"
              alt="An Hà - Giá trị ở niềm tin"
              width={130}
              height={52}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white font-medium transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0936233454"
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>093 6233 454</span>
            </a>
            <Link href="/lien-he" className="btn-primary text-sm px-6 py-2.5">
              Nhận báo giá
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-navy-900 border-t border-navy-700">
          <div className="section-container py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white font-medium py-3 px-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/lien-he"
              className="btn-primary mt-3 justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Nhận báo giá
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
