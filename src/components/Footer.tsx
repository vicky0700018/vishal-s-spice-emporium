import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

export function Footer() {
  const { settings, content } = useStore();
  return (
    <footer className="mt-20 bg-primary-dark text-cream">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg font-semibold text-accent-foreground">
              V
            </span>
            <span className="font-display text-lg font-semibold">{settings.businessName}</span>
          </div>
          <p className="mt-4 text-sm text-cream/70">{content.footerText}</p>
          <p className="mt-3 text-xs text-cream/50">Legal name: {settings.legalName}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            {[
              ["/", "Home"],
              ["/shop", "Shop"],
              ["/about", "About"],
              ["/contact", "Contact"],
              ["/offers", "Offers"],
              ["/wholesale", "Wholesale"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to as string} className="transition-colors hover:text-accent">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Customer Support
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            {[
              ["/faq", "FAQ"],
              ["/faq", "Shipping"],
              ["/terms", "Returns"],
              ["/terms", "Terms & Conditions"],
              ["/privacy", "Privacy Policy"],
            ].map(([to, label]) => (
              <li key={label}>
                <Link to={to as string} className="transition-colors hover:text-accent">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            <li>
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a>
            </li>
            <li>
              <a href={`tel:${settings.altPhone.replace(/\s/g, "")}`}>{settings.altPhone}</a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </li>
            <li className="pt-2 text-cream/60">{settings.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-cream/60 sm:flex-row">
          <p>© 2026 Vishal Pickles and Spices. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={settings.instagram} className="hover:text-accent">
              Instagram
            </a>
            <a href={settings.facebook} className="hover:text-accent">
              Facebook
            </a>
            <a href="/admin" className="text-cream/45 underline-offset-2 hover:text-accent hover:underline">
              Admin Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
