import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Vishal Pickles and Spices | Vishal Food Product, Pune" },
      {
        name: "description",
        content:
          "Vishal Pickles and Spices, legally Vishal Food Product, is a Pune based maker of traditional pickles, masalas and instant mixes for retail and bulk customers.",
      },
      { property: "og:title", content: "About Us | Vishal Pickles and Spices" },
      {
        property: "og:description",
        content: "A Pune based manufacturer, wholesaler and retailer of Indian culinary accompaniments.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { settings } = useStore();
  return (
    <div>
      <section className="relative overflow-hidden bg-primary-dark">
        <img
          src="/images/scene-about.jpg"
          alt="Traditional Indian condiments arranged on a table"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="relative container-page py-20 text-cream">
          <h1 className="font-display text-4xl font-semibold md:text-5xl">Our Story</h1>
          <p className="mt-3 max-w-xl text-sm text-cream/85">
            Traditional Indian taste, prepared in homemade style, from a Pune kitchen to yours.
          </p>
        </div>
      </section>

      <div className="container-page grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Who we are"
            title="Vishal Pickles and Spices"
            subtitle={`${settings.businessName}, legally operating as ${settings.legalName}, is based in Pune and focuses on traditional Indian culinary accompaniments.`}
          />
          <div className="mt-6 space-y-4 text-sm text-muted-foreground">
            <p>
              We make pickles, spice blends and instant mixes the way an Indian home kitchen would: produce
              prepared by hand, spices roasted and ground for each blend, and masala given time to settle
              before packing.
            </p>
            <p>
              Our range covers traditional and regional pickles, everyday and regional masalas, and instant
              mixes for breakfast and snacks. The same recipes go into retail jars and into larger packs for
              bulk and wholesale customers.
            </p>
            <p>
              As supplied by the business, Vishal Pickles and Spices has its primary storefront in Kharadi and
              manufacturing operations in Ambegaon Budruk, Pune.
            </p>
          </div>
          <Link to="/contact" className="btn-base btn-primary mt-8">
            Get in touch
          </Link>
        </div>

        <div className="grid gap-5">
          <img
            src="/images/scene-kitchen.jpg"
            alt="Spices being roasted in a traditional kitchen"
            loading="lazy"
            className="h-64 w-full rounded-lg object-cover"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["Retail customers", "Household jars and packs available across our full range."],
              ["Bulk & wholesale", "Larger quantities for shops, caterers and commercial kitchens."],
              ["Pickles & masalas", "Traditional and regional recipes made in small batches."],
              ["Instant mixes", "Practical mixes for everyday Indian breakfast and snacks."],
            ].map(([t, d]) => (
              <div key={t} className="card-soft p-5">
                <h3 className="font-display text-base font-semibold text-primary-dark">{t}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
