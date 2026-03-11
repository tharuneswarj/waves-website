import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/studio", label: "Studio" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        {/* Top: logo + nav + contact */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="Waves Company home">
              <Image
                src="/logos/Blue_and_Cream__Logo.png"
                alt="Waves Company"
                width={140}
                height={56}
                className="h-12 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm font-light leading-relaxed text-surface/80">
              Lighting objects designed through code, material honesty, and human
              touch.
            </p>
          </div>

          {/* Nav column */}
          <nav className="flex flex-col gap-3" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-surface/80 transition-colors hover:text-surface"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact column */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@waves.company"
              className="text-sm font-light text-surface/80 transition-colors hover:text-surface"
            >
              hello@waves.company
            </a>
            <a
              href="https://instagram.com/waves_company_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-light text-surface/80 transition-colors hover:text-surface"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              @waves_company_
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-surface/15" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-mono text-xs tracking-wide text-surface/50">
            Still printing. Still curious.
          </p>
          <p className="font-mono text-xs tracking-wide text-surface/50">
            &copy; {new Date().getFullYear()} Waves Company &middot; Made in
            India
          </p>
        </div>
      </div>
    </footer>
  );
}
