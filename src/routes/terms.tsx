import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Vishal Pickles and Spices" },
      {
        name: "description",
        content: "Terms of use, ordering, delivery and returns information for this demo storefront.",
      },
      { property: "og:title", content: "Terms & Conditions | Vishal Pickles and Spices" },
      { property: "og:description", content: "Ordering, delivery and returns terms." },
    ],
  }),
  component: Terms,
});

const sections = [
  [
    "Use of this website",
    "This site is published by Vishal Food Product, operating as Vishal Pickles and Spices. It is currently a demonstration prototype and orders placed here are not fulfilled.",
  ],
  [
    "Products and pricing",
    "Product descriptions, weights and prices shown are illustrative demo values. Actual pack sizes and prices are confirmed at the time of order.",
  ],
  [
    "Orders",
    "An order is confirmed only after our team acknowledges it. We may cancel an order where stock is unavailable.",
  ],
  [
    "Delivery",
    "Standard delivery is estimated at 3-5 business days in the live store. Coverage and charges depend on the delivery PIN code.",
  ],
  [
    "Returns",
    "Food products are not returnable once opened. Damaged or leaking packs may be reported within 48 hours of delivery with photographs.",
  ],
  [
    "Contact",
    "For anything related to these terms, contact vishalfoods1985@gmail.com or the phone numbers listed on the Contact page.",
  ],
];

function Terms() {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="font-display text-4xl font-semibold text-primary-dark">Terms & Conditions</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Please read these terms before using this website or placing an order.
      </p>
      <div className="mt-8 space-y-6">
        {sections.map(([t, d]) => (
          <section key={t}>
            <h2 className="font-display text-lg font-semibold text-primary-dark">{t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
