import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { rupees, useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading, Stars } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vishal Pickles and Spices | Authentic Indian Pickles & Masalas, Pune" },
      {
        name: "description",
        content:
          "Shop traditional Indian pickles, Maharashtrian masalas and instant mixes from Vishal Pickles and Spices, Pune. Retail packs and wholesale quantities.",
      },
      { property: "og:title", content: "Vishal Pickles and Spices | Authentic Indian Flavours" },
      {
        property: "og:description",
        content:
          "Traditional pickles, aromatic masalas and convenient instant mixes, prepared in homemade style in Pune.",
      },
    ],
  }),
  component: Home,
});

const whyPoints = [
  ["Authentic Indian Flavours", "Recipes built on the spice balance of traditional Indian kitchens."],
  ["Homemade-Style Preparation", "Small-batch methods that keep texture and aroma intact."],
  ["Carefully Selected Ingredients", "Produce and whole spices chosen batch by batch."],
  ["Wide Product Range", "Pickles, masalas, instant mixes and curated combos."],
  ["Retail & Bulk Availability", "From a single jar to catering-size packs."],
  ["Trusted Local Food Brand", "Serving households and businesses across Pune."],
];

function Home() {
  const { products, categories, content, testimonials, faqs, addToCart, offers } = useStore();
  const [openFaq, setOpenFaq] = useState<string | null>("F1");
  const [email, setEmail] = useState("");
  const { toast } = useStore();

  const best = products.filter((p) => p.bestSeller).slice(0, 8);
  const pickles = products.filter((p) => p.category === "Pickles").slice(0, 4);
  const masalas = products.filter((p) => p.category === "Masalas").slice(0, 4);
  const mixes = products.filter((p) => p.category === "Instant Mixes").slice(0, 4);
  const combos = products.filter((p) => p.category === "Combo Packs");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark">
        <img
          src="/images/hero-main.jpg"
          alt="Traditional Indian pickle jars and spices on a wooden table"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="relative container-page grid gap-8 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-36">
          <div className="max-w-xl text-cream">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Pune • Pickles • Masalas
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight font-semibold md:text-5xl lg:text-6xl">
              {content.heroTitle}
            </h1>
            <div className="spice-rule mt-5" />
            <p className="mt-5 text-sm text-cream/85 md:text-base">{content.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-base btn-accent px-6 py-3">
                {content.ctaPrimary}
              </Link>
              <Link
                to="/categories"
                className="btn-base border border-cream/40 px-6 py-3 text-cream hover:bg-cream/10"
              >
                {content.ctaSecondary}
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-cream/20 pt-6 text-cream/80">
              {[
                ["28+", "Products"],
                ["5", "Categories"],
                ["Retail & Bulk", "Pack sizes"],
              ].map(([a, b]) => (
                <div key={b}>
                  <dt className="font-display text-xl text-accent">{a}</dt>
                  <dd className="text-[11px] uppercase tracking-wider">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Shop by category"
          title="Find Your Flavour"
          subtitle="From slow-cured pickles to freshly ground masalas and everyday breakfast mixes."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group relative overflow-hidden rounded-lg"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary-dark/90 via-primary-dark/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-cream">
                <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                <p className="mt-1 line-clamp-2 text-[11px] text-cream/75">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Loved by our customers" title="Best Sellers" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {best.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container-page grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
        <div className="relative">
          <img
            src="/images/scene-story.jpg"
            alt="Hands preparing pickle masala in a traditional kitchen"
            loading="lazy"
            className="w-full rounded-lg object-cover shadow-[var(--shadow-lift)]"
          />
          <div className="absolute -bottom-6 -right-4 hidden rounded-lg bg-accent px-6 py-4 text-accent-foreground shadow-lg md:block">
            <p className="font-display text-lg font-semibold">Small batches</p>
            <p className="text-xs">Prepared in homemade style</p>
          </div>
        </div>
        <div>
          <SectionHeading
            align="left"
            eyebrow="Our approach"
            title="From Traditional Recipes to Your Table"
            subtitle="Every jar starts the way an Indian home kitchen would begin: produce cut by hand, spices roasted and ground, masala left to settle until it tastes right. We keep batches small so nothing is rushed."
          />
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            {[
              "Whole spices roasted and ground for each blend",
              "Pickles matured before packing so flavour settles in",
              "Retail jars and bulk packs from the same recipes",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
          <Link to="/about" className="btn-base btn-primary mt-8">
            Read our story
          </Link>
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-primary-dark py-16 text-cream md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              What sets us apart
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{content.whyTitle}</h2>
            <div className="spice-rule mx-auto mt-4" />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map(([t, d], i) => (
              <div
                key={t}
                className="rounded-lg border border-cream/15 bg-cream/5 p-6 transition-colors hover:border-accent/50"
              >
                <span className="font-display text-2xl text-accent">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-cream/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured pickles */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="The jar shelf"
          title="Featured Pickles"
          subtitle="Slow-cured, oil-rich and matured until the masala settles into every piece."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pickles.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/category/$slug" params={{ slug: "pickles" }} className="btn-base btn-outline">
            View all pickles
          </Link>
        </div>
      </section>

      {/* Masalas */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Freshly ground" title="Masala Collection" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {masalas.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Instant mixes */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Ready in minutes"
          title="Instant Mixes"
          subtitle="Breakfast and snack mixes for mornings that move fast."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mixes.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Combos */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Better together" title="Combo Offers" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {combos.map((c) => (
              <div key={c.id} className="card-soft overflow-hidden">
                <img src={c.image} alt={c.name} loading="lazy" className="h-44 w-full object-cover" />
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-primary-dark">{c.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.shortDescription}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-lg font-semibold text-primary-dark">{rupees(c.price)}</span>
                    <span className="text-xs text-muted-foreground line-through">
                      {rupees(c.originalPrice)}
                    </span>
                    <span className="ml-auto rounded-sm bg-chili px-2 py-0.5 text-[10px] font-bold text-cream">
                      {c.discount}% OFF
                    </span>
                  </div>
                  <button className="btn-base btn-primary mt-4 w-full" onClick={() => addToCart(c)}>
                    Add Combo to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            {offers.filter((o) => o.active).length} promotions currently listed on the{" "}
            <Link to="/offers" className="underline">
              Offers page
            </Link>
            . Demo pricing.
          </p>
        </div>
      </section>

      {/* Wholesale CTA */}
      <section className="relative overflow-hidden bg-primary">
        <img
          src="/images/scene-wholesale.jpg"
          alt="Bulk packs of pickles and masalas stacked in a storeroom"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative container-page flex flex-col items-center gap-4 py-16 text-center text-cream md:py-20">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">{content.wholesaleTitle}</h2>
          <p className="max-w-xl text-sm text-cream/85 md:text-base">{content.wholesaleText}</p>
          <Link to="/wholesale" className="btn-base btn-accent mt-2 px-6 py-3">
            Send Wholesale Enquiry
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading eyebrow="In their words" title="Customer Testimonials" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials
            .filter((t) => t.active)
            .map((t) => (
              <figure key={t.id} className="card-soft flex h-full flex-col p-6">
                <Stars rating={t.rating} />
                <blockquote className="mt-3 flex-1 text-sm text-muted-foreground">"{t.text}"</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-semibold text-primary-dark">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-primary-dark">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.location}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="Good to know" title="Frequently Asked Questions" />
          <div className="mt-8 space-y-3">
            {faqs
              .filter((f) => f.active)
              .map((f) => (
                <div key={f.id} className="card-soft overflow-hidden">
                  <button
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={openFaq === f.id}
                    onClick={() => setOpenFaq(openFaq === f.id ? null : f.id)}
                  >
                    <span className="text-sm font-semibold text-primary-dark">{f.question}</span>
                    <span className="text-accent">{openFaq === f.id ? "−" : "+"}</span>
                  </button>
                  {openFaq === f.id ? (
                    <p className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
                      {f.answer}
                    </p>
                  ) : null}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-page py-16 md:py-20">
        <div className="card-soft flex flex-col items-center gap-4 bg-primary-dark px-6 py-12 text-center text-cream">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Stay Connected With Authentic Flavours
          </h2>
          <p className="max-w-lg text-sm text-cream/75">
            New batches, seasonal pickles and combo offers, straight to your inbox.
          </p>
          <form
            className="mt-2 flex w-full max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(email)) return toast("Enter a valid email address", "error");
              setEmail("");
              toast("Subscribed. This is a demo signup.");
            }}
          >
            <input
              className="field"
              type="email"
              aria-label="Email address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn-base btn-accent shrink-0">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
