import { createFileRoute, Link } from "@tanstack/react-router";
import { rupees, useStore } from "@/lib/store";
import { EmptyState } from "@/components/ui-kit";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Vishal Pickles and Spices" },
      { name: "description", content: "Review the pickles, masalas and mixes in your cart before checkout." },
      { property: "og:title", content: "Cart | Vishal Pickles and Spices" },
      { property: "og:description", content: "Review your order and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, setQty, removeFromCart, clearCart, totals } = useStore();

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-display text-3xl font-semibold text-primary-dark md:text-4xl">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Your cart is empty"
            message="Add a jar of pickle or a masala pack to get started."
            action={
              <Link to="/shop" className="btn-base btn-primary">
                Start shopping
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-4">
            {cart.map((l) => (
              <div key={l.product.id} className="card-soft flex flex-col gap-4 p-4 sm:flex-row">
                <img
                  src={l.product.image}
                  alt={l.product.name}
                  className="h-28 w-full rounded-md object-cover sm:w-28"
                />
                <div className="flex flex-1 flex-col">
                  <Link
                    to="/product/$id"
                    params={{ id: l.product.id }}
                    className="font-display text-lg font-semibold text-primary-dark"
                  >
                    {l.product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {l.product.category} • {l.product.weight} {l.product.unit}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-3">
                    <div className="flex items-center rounded-md border border-border">
                      <button
                        className="px-3 py-1.5"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(l.product.id, l.qty - 1)}
                      >
                        −
                      </button>
                      <span className="w-9 text-center text-sm font-semibold">{l.qty}</span>
                      <button
                        className="px-3 py-1.5"
                        aria-label="Increase quantity"
                        onClick={() => setQty(l.product.id, l.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold text-primary-dark">
                      {rupees(l.product.price * l.qty)}
                    </span>
                    <button
                      className="ml-auto text-xs font-semibold text-chili underline-offset-2 hover:underline"
                      onClick={() => removeFromCart(l.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button className="btn-base btn-outline" onClick={clearCart}>
              Clear cart
            </button>
          </div>

          <aside className="card-soft h-fit space-y-3 p-5 lg:sticky lg:top-32">
            <h2 className="font-display text-lg font-semibold text-primary-dark">Order Summary</h2>
            <Row label="MRP total" value={rupees(totals.mrp)} />
            <Row label="Discount" value={`− ${rupees(totals.savings)}`} />
            <Row label="Subtotal" value={rupees(totals.subtotal)} />
            <Row label="Delivery" value={totals.shipping === 0 ? "Free" : rupees(totals.shipping)} />
            <div className="border-t border-border pt-3">
              <Row label="Total" value={rupees(totals.total)} bold />
            </div>
            <p className="text-xs text-muted-foreground">Estimated delivery: 3-5 business days.</p>
            <Link to="/checkout" className="btn-base btn-primary w-full">
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="btn-base btn-outline w-full">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between text-sm ${bold ? "font-semibold text-primary-dark" : ""}`}>
      <span className={bold ? "" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
