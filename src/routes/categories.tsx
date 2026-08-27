import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Product Categories | Vishal Pickles and Spices" },
      {
        name: "description",
        content:
          "Explore pickles, masalas, instant mixes, combo packs and wholesale packs from Vishal Pickles and Spices, Pune.",
      },
      { property: "og:title", content: "Categories | Vishal Pickles and Spices" },
      { property: "og:description", content: "Five categories of authentic Indian condiments and mixes." },
    ],
  }),
  component: Categories,
});

function Categories() {
  const { categories, products } = useStore();
  return (
    <div className="container-page py-12 md:py-16">
      <SectionHeading
        eyebrow="Browse"
        title="Shop by Category"
        subtitle="Each category carries retail jars as well as larger packs for bulk buyers."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories
          .filter((c) => c.active)
          .map((c) => (
            <Link
              key={c.id}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="card-soft group overflow-hidden transition-transform hover:-translate-y-1"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-5">
                <h2 className="font-display text-xl font-semibold text-primary-dark">{c.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                <p className="mt-3 text-xs uppercase tracking-wider text-accent-foreground/70">
                  {products.filter((p) => p.category === c.name).length} products
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
