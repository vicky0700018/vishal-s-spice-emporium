import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Vishal Pickles and Spices" },
      {
        name: "description",
        content: "How Vishal Pickles and Spices handles customer information on this demo storefront.",
      },
      { property: "og:title", content: "Privacy Policy | Vishal Pickles and Spices" },
      { property: "og:description", content: "Information handling on this demo website." },
    ],
  }),
  component: Privacy,
});

const sections = [
  [
    "Information we collect",
    "In the live store we collect the details you provide for an order or enquiry: name, phone number, email address and delivery address. This prototype stores form entries only in your browser session.",
  ],
  [
    "How information is used",
    "Details are used to process orders, respond to enquiries and share order updates. We do not sell customer information.",
  ],
  [
    "Payment information",
    "This demo does not process payments and does not collect card or UPI credentials. Payment options shown at checkout are illustrative only.",
  ],
  [
    "Cookies and analytics",
    "The live site may use basic cookies to keep your cart and preferences working. This prototype keeps cart state in memory only.",
  ],
  [
    "Contacting us",
    "For any question about your information, write to vishalfoods1985@gmail.com or call the numbers listed on the Contact page.",
  ],
];

function Privacy() {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="font-display text-4xl font-semibold text-primary-dark">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        This policy describes how Vishal Pickles and Spices (Vishal Food Product) handles customer
        information. This website is a demonstration prototype.
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
