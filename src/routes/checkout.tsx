import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { rupees, useStore } from "@/lib/store";
import { EmptyState } from "@/components/ui-kit";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Vishal Pickles and Spices" },
      { name: "description", content: "Enter delivery details and place your demo order." },
      { property: "og:title", content: "Checkout | Vishal Pickles and Spices" },
      { property: "og:description", content: "Demo checkout with Cash on Delivery, UPI and Card options." },
    ],
  }),
  component: Checkout,
});

const empty = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "Maharashtra",
  pin: "",
};

function Checkout() {
  const { cart, totals, placeOrder, toast } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [payment, setPayment] = useState("Cash on Delivery");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e["name"] = "Enter your full name";
    if (!/^[0-9]{10}$/.test(form.phone.replace(/\D/g, "").slice(-10)))
      e["phone"] = "Enter a valid 10 digit mobile number";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e["email"] = "Enter a valid email";
    if (form.address.trim().length < 8) e["address"] = "Enter your full address";
    if (!form.city.trim()) e["city"] = "Enter your city";
    if (!/^[0-9]{6}$/.test(form.pin)) e["pin"] = "Enter a valid 6 digit PIN code";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return toast("Please correct the highlighted fields", "error");
    setLoading(true);
    setTimeout(() => {
      placeOrder({ ...form, payment });
      setLoading(false);
      navigate({ to: "/order-success" });
    }, 700);
  };

  if (cart.length === 0) {
    return (
      <div className="container-page py-20">
        <EmptyState
          title="Nothing to check out"
          message="Your cart is empty right now."
          action={
            <Link to="/shop" className="btn-base btn-primary">
              Browse products
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-display text-3xl font-semibold text-primary-dark md:text-4xl">Checkout</h1>
      <form className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]" onSubmit={submit} noValidate>
        <div className="space-y-6">
          <section className="card-soft p-6">
            <h2 className="font-display text-lg font-semibold text-primary-dark">Customer Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" value={form.name} onChange={set} error={errors["name"]} />
              <Field label="Mobile Number" name="phone" value={form.phone} onChange={set} error={errors["phone"]} />
              <Field label="Email" name="email" value={form.email} onChange={set} error={errors["email"]} />
              <Field label="City" name="city" value={form.city} onChange={set} error={errors["city"]} />
              <Field label="State" name="state" value={form.state} onChange={set} />
              <Field label="PIN Code" name="pin" value={form.pin} onChange={set} error={errors["pin"]} />
              <div className="sm:col-span-2">
                <Field label="Address" name="address" value={form.address} onChange={set} error={errors["address"]} textarea />
              </div>
            </div>
          </section>

          <section className="card-soft p-6">
            <h2 className="font-display text-lg font-semibold text-primary-dark">Delivery Method</h2>
            <label className="mt-4 flex items-start gap-3 rounded-md border border-primary bg-secondary/50 p-4">
              <input type="radio" checked readOnly className="mt-1" />
              <span>
                <span className="block text-sm font-semibold">Standard Delivery</span>
                <span className="block text-xs text-muted-foreground">
                  3-5 business days • {totals.shipping === 0 ? "Free" : rupees(totals.shipping)}
                </span>
              </span>
            </label>
          </section>

          <section className="card-soft p-6">
            <h2 className="font-display text-lg font-semibold text-primary-dark">Payment</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Demo only — no payment gateway is connected.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["Cash on Delivery", "UPI", "Card"].map((p) => (
                <label
                  key={p}
                  className={`cursor-pointer rounded-md border p-4 text-sm transition-colors ${
                    payment === p ? "border-primary bg-secondary/60 font-semibold" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="mr-2"
                    checked={payment === p}
                    onChange={() => setPayment(p)}
                  />
                  {p}
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="card-soft h-fit space-y-3 p-5 lg:sticky lg:top-32">
          <h2 className="font-display text-lg font-semibold text-primary-dark">Order Summary</h2>
          <ul className="space-y-2 text-sm">
            {cart.map((l) => (
              <li key={l.product.id} className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {l.product.name} × {l.qty}
                </span>
                <span>{rupees(l.product.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border pt-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{rupees(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span>{totals.shipping === 0 ? "Free" : rupees(totals.shipping)}</span>
            </div>
            <div className="mt-2 flex justify-between font-semibold text-primary-dark">
              <span>Total</span>
              <span>{rupees(totals.total)}</span>
            </div>
          </div>
          <button className="btn-base btn-primary w-full" disabled={loading}>
            {loading ? "Placing order…" : "Place Order"}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  textarea,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (k: string, v: string) => void;
  error?: string | undefined;
  textarea?: boolean | undefined;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          className="field mt-1.5 min-h-24"
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
        />
      ) : (
        <input
          id={name}
          className="field mt-1.5"
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
        />
      )}
      {error ? <p className="mt-1 text-xs text-chili">{error}</p> : null}
    </div>
  );
}
