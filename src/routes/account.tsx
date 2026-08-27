import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account | Vishal Pickles and Spices" },
      {
        name: "description",
        content: "Demo account area with wishlist items and your most recent order in this session.",
      },
      { property: "og:title", content: "My Account | Vishal Pickles and Spices" },
      { property: "og:description", content: "Wishlist and recent order for this demo session." },
    ],
  }),
  component: Account,
});

function Account() {
  const { wishlist, products, lastOrder } = useStore();
  const wished = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-page py-12 md:py-16">
      <SectionHeading
        align="left"
        eyebrow="Session only"
        title="My Account"
        subtitle="This demo does not use accounts or logins. Your wishlist and last order live in this browser session."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card-soft p-6">
          <h2 className="font-display text-lg font-semibold text-primary-dark">Wishlist</h2>
          {wished.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Nothing saved yet. Tap the heart on any product card.
            </p>
          ) : (
            <ul className="mt-3 space-y-3">
              {wished.map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="h-12 w-12 rounded-md object-cover" />
                  <Link to="/product/$id" params={{ id: p.id }} className="text-sm font-medium">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card-soft p-6">
          <h2 className="font-display text-lg font-semibold text-primary-dark">Recent Order</h2>
          {lastOrder ? (
            <div className="mt-2 text-sm text-muted-foreground">
              <p className="font-semibold text-primary-dark">{lastOrder.id}</p>
              <p>
                {lastOrder.lines.length} item(s) • ₹{lastOrder.total.toLocaleString("en-IN")}
              </p>
              <Link to="/order-success" className="btn-base btn-outline mt-4">
                View confirmation
              </Link>
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">No orders placed in this session yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
