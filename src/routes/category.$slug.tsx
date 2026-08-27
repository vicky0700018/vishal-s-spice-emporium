import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/ui-kit";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const label = params.slug.replace(/-/g, " ");
    return {
      meta: [
        { title: `${label} | Vishal Pickles and Spices` },
        {
          name: "description",
          content: `Shop ${label} from Vishal Pickles and Spices, Pune. Traditional recipes in retail and bulk packs.`,
        },
        { property: "og:title", content: `${label} | Vishal Pickles and Spices` },
        { property: "og:description", content: `Our ${label} range, prepared in homemade style.` },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const { categories, products } = useStore();
  const [sort, setSort] = useState("Popular");
  const category = categories.find((c) => c.slug === slug);
  let list = products.filter((p) => p.category === category?.name);
  list = [...list];
  if (sort === "Price Low to High") list.sort((a, b) => a.price - b.price);
  if (sort === "Price High to Low") list.sort((a, b) => b.price - a.price);
  if (sort === "Rating") list.sort((a, b) => b.rating - a.rating);

  if (!category) {
    return (
      <div className="container-page py-20">
        <EmptyState
          title="Category not found"
          message="This category is not available."
          action={
            <Link to="/categories" className="btn-base btn-primary">
              All categories
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-primary-dark">
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="relative container-page py-16 text-cream md:py-20">
          <nav className="text-xs text-cream/70">
            <Link to="/">Home</Link> / <Link to="/categories">Categories</Link> / {category.name}
          </nav>
          <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{category.name}</h1>
          <p className="mt-3 max-w-xl text-sm text-cream/80">{category.description}</p>
        </div>
      </section>

      <div className="container-page py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{list.length} products</p>
          <select className="field w-52" value={sort} onChange={(e) => setSort(e.target.value)}>
            {["Popular", "Price Low to High", "Price High to Low", "Rating"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        {list.length === 0 ? (
          <EmptyState title="Nothing here yet" message="Products for this category will appear soon." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
