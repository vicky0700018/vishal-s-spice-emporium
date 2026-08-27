import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Vishal Pickles and Spices | Kharadi, Pune" },
      {
        name: "description",
        content:
          "Contact Vishal Pickles and Spices at Shop No. 1, Padmachaya Society, Kharadi Road, Pune. Call +91 91757 57069 or email vishalfoods1985@gmail.com.",
      },
      { property: "og:title", content: "Contact Us | Vishal Pickles and Spices" },
      { property: "og:description", content: "Address, phone numbers, email and enquiry form." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { settings, addEnquiry, toast } = useStore();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 5)
      return toast("Please fill name, a valid email and a message", "error");
    addEnquiry({ ...form, business: "-", type: "Contact" });
    setForm({ name: "", email: "", phone: "", message: "" });
    setSent(true);
    toast("Message sent. We will get back to you.");
  };

  return (
    <div className="container-page py-12 md:py-16">
      <SectionHeading
        align="left"
        eyebrow="Say hello"
        title="Contact Us"
        subtitle="Questions about products, orders or bulk supply? Reach us directly."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5">
          <div className="card-soft p-6">
            <h2 className="font-display text-lg font-semibold text-primary-dark">
              {settings.businessName}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">{settings.address}</p>
            <div className="mt-4 space-y-1 text-sm">
              <p>
                <a className="hover:text-primary" href={`tel:${settings.phone.replace(/\s/g, "")}`}>
                  {settings.phone}
                </a>
              </p>
              <p>
                <a className="hover:text-primary" href={`tel:${settings.altPhone.replace(/\s/g, "")}`}>
                  {settings.altPhone}
                </a>
              </p>
              <p>
                <a className="hover:text-primary" href={`mailto:${settings.email}`}>
                  {settings.email}
                </a>
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="btn-base btn-primary">
                Call Now
              </a>
              <a href={`mailto:${settings.email}`} className="btn-base btn-outline">
                Email Us
              </a>
              <a href={settings.whatsapp} className="btn-base btn-accent">
                WhatsApp Enquiry
              </a>
            </div>
          </div>

          <div className="card-soft overflow-hidden">
            <div className="relative flex h-56 items-center justify-center bg-secondary">
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="relative text-center">
                <span className="text-3xl">📍</span>
                <p className="mt-2 text-sm font-semibold text-primary-dark">Kharadi Road, Pune 411014</p>
                <p className="text-xs text-muted-foreground">Map placeholder — demo only</p>
              </div>
            </div>
          </div>
        </div>

        <form className="card-soft space-y-4 p-6" onSubmit={submit} noValidate>
          <h2 className="font-display text-lg font-semibold text-primary-dark">Send a Message</h2>
          {sent ? (
            <p className="rounded-md border border-primary/30 bg-secondary/60 px-4 py-3 text-sm">
              Thanks for reaching out. Your enquiry has been recorded in this demo.
            </p>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          </div>
          <Input label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Message
            </label>
            <textarea
              className="field mt-1.5 min-h-32"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button className="btn-base btn-primary w-full">Send Message</button>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input className="field mt-1.5" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
