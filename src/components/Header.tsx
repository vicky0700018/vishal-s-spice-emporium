import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/offers", label: "Offers" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { count, settings } = useStore();
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    setOpen(false);
    navigate({ to: "/search", search: { q } });
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-primary-dark text-cream">
        <div className="container-page flex h-9 items-center justify-center text-center text-[11px] tracking-wide md:text-xs">
          Authentic Indian Pickles • Traditional Masalas • Homemade-Style Taste
        </div>
      </div>

      <div className="border-b border-border bg-card/95 backdrop-blur">
        <div className="container-page flex h-16 items-center gap-3 md:h-20">
          <button
            className="btn-base btn-outline px-2 py-1.5 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="block h-[2px] w-5 bg-current shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]" />
          </button>

          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              V
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-semibold text-primary-dark md:text-lg">
                {settings.businessName}
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:block">
                Pune • Since Generations of Taste
              </span>
            </span>
          </Link>

          <nav className="ml-6 hidden items-center gap-5 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary font-semibold" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <form onSubmit={submit} className="ml-auto hidden max-w-xs flex-1 md:block" role="search">
            <input
              className="field"
              placeholder="Search pickles, masalas, mixes…"
              aria-label="Search products"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </form>

          <div className="ml-auto flex items-center gap-2 md:ml-2">
            <Link to="/account" className="btn-base btn-outline hidden px-3 py-2 sm:inline-flex">
              Account
            </Link>
            <Link to="/cart" className="btn-base btn-primary relative px-3 py-2" aria-label="Cart">
              Cart
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground">
                {count}
              </span>
            </Link>
          </div>
        </div>

        {open ? (
          <div className="border-t border-border bg-card lg:hidden">
            <div className="container-page space-y-3 py-4">
              <form onSubmit={submit} role="search">
                <input
                  className="field"
                  placeholder="Search products…"
                  aria-label="Search products"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
              </form>
              <div className="grid grid-cols-2 gap-2">
                {nav.concat([{ to: "/account", label: "Account" }]).map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md border border-border px-3 py-2 text-sm font-medium"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
