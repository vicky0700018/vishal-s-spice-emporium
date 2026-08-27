import { createFileRoute, Link } from "@tanstack/react-router";
import { rupees, useStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers & Combo Savings | Vishal Pickles and Spices" },
      {
        name: "description",
        content:
          "Current demo promotions on pickle combos, masala bundles and family packs from Vishal Pickles and Spices.",
      },
      { property: "og:title", content: "Offers | Vishal Pickles and Spices" },
      { property: "og:description", content: "Combo savings, masala bundles and family pack deals." },
    ],
  }),
  component: Offers,
});

function Offers() {
  const { offers, products, addToCart } = useStore();
  const combos = products.filter((p) => p.category === "Combo Packs");

  return (
    <div className="container-page py-12 md:py-16">
      <SectionHeading
        eyebrow="Save more"
        title="Current Offers"
        subtitle="All promotions shown here are demo/mock promotional data for this prototype."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {offers
          .filter((o) => o.active)
          .map((o) => (
            <div key={o.id} className="card-soft overflow-hidden md:flex">
              <img src={o.image} alt={o.name} loading="lazy" className="h-48 w-full object-cover md:w-48" />
              <div className="p-6">
                <span className="rounded-sm bg-accent px-2 py-1 text-[11px] font-bold text-accent-foreground">
                  {o.discount}% OFF
                </span>
                <h2 className="mt-3 font-display text-xl font-semibold text-primary-dark">{o.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{o.description}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Valid {o.start} to {o.end}
                </p>
                <Link to="/shop" className="btn-base btn-primary mt-4">
                  Shop this offer
                </Link>
              </div>
            </div>
          ))}
      </div>

      <h2 className="mt-16 font-display text-2xl font-semibold text-primary-dark">Combo Deals</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {combos.map((c) => (
          <div key={c.id} className="card-soft overflow-hidden">
            <img src={c.image} alt={c.name} loading="lazy" className="h-40 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-display text-base font-semibold text-primary-dark">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.shortDescription}</p>
              <p className="mt-3 font-semibold text-primary-dark">
                {rupees(c.price)}{" "}
                <span className="text-xs font-normal text-muted-foreground line-through">
                  {rupees(c.originalPrice)}
                </span>
              </p>
              <button className="btn-base btn-primary mt-3 w-full" onClick={() => addToCart(c)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
