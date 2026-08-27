import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Vishal Pickles and Spices" },
      {
        name: "description",
        content:
          "Answers about pack sizes, storage, shipping, bulk orders, payment options and the ordering process.",
      },
      { property: "og:title", content: "Frequently Asked Questions | Vishal Pickles and Spices" },
      { property: "og:description", content: "Common questions about products, orders and wholesale." },
    ],
  }),
  component: Faq,
});

function Faq() {
  const { faqs } = useStore();
  const [open, setOpen] = useState<string | null>(null);
  const groups = Array.from(new Set(faqs.filter((f) => f.active).map((f) => f.category)));

  return (
    <div className="container-page max-w-3xl py-12 md:py-16">
      <SectionHeading
        eyebrow="Help centre"
        title="Frequently Asked Questions"
        subtitle="Everything about products, shipping, payments and bulk supply."
      />
      <div className="mt-10 space-y-8">
        {groups.map((g) => (
          <div key={g}>
            <h2 className="font-display text-lg font-semibold text-primary-dark">{g}</h2>
            <div className="mt-3 space-y-3">
              {faqs
                .filter((f) => f.active && f.category === g)
                .map((f) => (
                  <div key={f.id} className="card-soft overflow-hidden">
                    <button
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-primary-dark"
                      aria-expanded={open === f.id}
                      onClick={() => setOpen(open === f.id ? null : f.id)}
                    >
                      {f.question}
                      <span className="text-accent">{open === f.id ? "−" : "+"}</span>
                    </button>
                    {open === f.id ? (
                      <p className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
                        {f.answer}
                      </p>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
