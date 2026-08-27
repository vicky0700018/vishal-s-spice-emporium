import { createFileRoute, Link } from "@tanstack/react-router";
import { rupees, useStore } from "@/lib/store";
import { EmptyState } from "@/components/ui-kit";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "Order Placed | Vishal Pickles and Spices" },
      { name: "description", content: "Your demo order confirmation from Vishal Pickles and Spices." },
      { property: "og:title", content: "Order Placed | Vishal Pickles and Spices" },
      { property: "og:description", content: "Mock order confirmation with order number and delivery details." },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { lastOrder } = useStore();

  if (!lastOrder) {
    return (
      <div className="container-page py-20">
        <EmptyState
          title="No recent order"
          message="Place an order to see the confirmation here."
          action={
            <Link to="/shop" className="btn-base btn-primary">
              Go to shop
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-page max-w-3xl py-14">
      <div className="card-soft p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground">
          ✓
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-primary-dark">
          Order Placed Successfully!
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you, {lastOrder.name}. This is a demo confirmation — no payment was processed.
        </p>
        <p className="mt-4 inline-block rounded-md bg-secondary px-4 py-2 font-semibold text-primary-dark">
          Order number: {lastOrder.id}
        </p>
      </div>

      <div className="card-soft mt-6 p-6">
        <h2 className="font-display text-lg font-semibold text-primary-dark">Items</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {lastOrder.lines.map((l) => (
            <li key={l.name} className="flex justify-between">
              <span className="text-muted-foreground">
                {l.name} × {l.qty}
              </span>
              <span>{rupees(l.price * l.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-border pt-3 font-semibold text-primary-dark">
          <span>Total paid</span>
          <span>{rupees(lastOrder.total)}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="card-soft p-6">
          <h2 className="font-display text-lg font-semibold text-primary-dark">Delivery Address</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {lastOrder.name}
            <br />
            {lastOrder.address}
            <br />
            {lastOrder.city}, {lastOrder.state} — {lastOrder.pin}
            <br />
            {lastOrder.phone}
          </p>
        </div>
        <div className="card-soft p-6">
          <h2 className="font-display text-lg font-semibold text-primary-dark">Order Details</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Payment method: {lastOrder.payment}
            <br />
            Estimated delivery: {lastOrder.eta}
            <br />
            Confirmation sent to {lastOrder.email}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/shop" className="btn-base btn-primary px-6">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
