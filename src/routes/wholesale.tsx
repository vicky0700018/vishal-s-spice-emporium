import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale & Bulk Enquiry | Vishal Pickles and Spices" },
      {
        name: "description",
        content:
          "Send a bulk or wholesale enquiry for pickles, masalas, instant mixes and combo packs from Vishal Pickles and Spices, Pune.",
      },
      { property: "og:title", content: "Bulk Orders & Wholesale Enquiries" },
      {
        property: "og:description",
        content: "Larger quantities for shops, caterers and commercial kitchens.",
      },
    ],
  }),
  component: Wholesale,
});

const interests = ["Pickles", "Masalas", "Instant Mixes", "Combo Packs", "Wholesale Packs", "Other"];

function Wholesale() {
  const { addEnquiry, toast, settings } = useStore();
  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    city: "",
    interest: "Pickles",
    quantity: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      return toast("Name, phone and a valid email are required", "error");
    addEnquiry({
      name: form.name,
      business: form.business || "-",
      phone: form.phone,
      email: form.email,
      type: "Wholesale",
      message: `${form.interest} • ${form.quantity} • ${form.city} • ${form.message}`,
    });
    setSent(true);
    setForm({
      name: "",
      business: "",
      phone: "",
      email: "",
      city: "",
      interest: "Pickles",
      quantity: "",
      message: "",
    });
    toast("Wholesale enquiry submitted");
  };

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <section className="relative overflow-hidden bg-primary-dark">
        <img
          src="/images/scene-bulk.jpg"
          alt="Large catering packs of pickles and spices"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="relative container-page py-20 text-cream">
          <h1 className="font-display text-4xl font-semibold md:text-5xl">
            Bulk Orders & Wholesale Enquiries
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-cream/85">
            Vishal Pickles and Spices serves customers looking for larger quantities and commercial
            requirements — retail shops, caterers, canteens and institutional kitchens. Share your
            requirement and we will get back with pack sizes and pricing.
          </p>
        </div>
      </section>

      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <SectionHeading align="left" eyebrow="How it works" title="Supplying at Volume" />
          <ul className="space-y-4 text-sm text-muted-foreground">
            {[
              ["Share your requirement", "Tell us the products, quantity and your city."],
              ["We confirm packs & pricing", "Our team responds with available pack sizes."],
              ["Regular supply", "Repeat schedules can be arranged for ongoing needs."],
            ].map(([t, d], i) => (
              <li key={t} className="card-soft flex gap-4 p-5">
                <span className="font-display text-2xl text-accent">0{i + 1}</span>
                <span>
                  <span className="block font-semibold text-primary-dark">{t}</span>
                  <span className="block text-xs">{d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            Prefer to call? {settings.phone} / {settings.altPhone}
          </p>
        </div>

        <form className="card-soft space-y-4 p-6" onSubmit={submit} noValidate>
          <h2 className="font-display text-lg font-semibold text-primary-dark">Wholesale Enquiry Form</h2>
          {sent ? (
            <p className="rounded-md border border-primary/30 bg-secondary/60 px-4 py-3 text-sm">
              Enquiry received. Our team will contact you. (Demo submission)
            </p>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <F label="Name" k="name" v={form.name} set={set} />
            <F label="Business Name" k="business" v={form.business} set={set} />
            <F label="Phone" k="phone" v={form.phone} set={set} />
            <F label="Email" k="email" v={form.email} set={set} />
            <F label="City" k="city" v={form.city} set={set} />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Product Interest
              </label>
              <select
                className="field mt-1.5"
                value={form.interest}
                onChange={(e) => set("interest", e.target.value)}
              >
                {interests.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <F label="Required Quantity" k="quantity" v={form.quantity} set={set} />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Message
            </label>
            <textarea
              className="field mt-1.5 min-h-28"
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
            />
          </div>
          <button className="btn-base btn-primary w-full">Submit Enquiry</button>
        </form>
      </div>
    </div>
  );
}

function F({
  label,
  k,
  v,
  set,
}: {
  label: string;
  k: string;
  v: string;
  set: (k: string, v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input className="field mt-1.5" value={v} onChange={(e) => set(k, e.target.value)} />
    </div>
  );
}
