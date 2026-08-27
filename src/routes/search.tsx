import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/ui-kit";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({ q: String(search["q"] ?? "") }),
  head: () => ({
    meta: [
      { title: "Search Results | Vishal Pickles and Spices" },
      {
        name: "description",
        content: "Search pickles, masalas and instant mixes by name, category or description.",
      },
      { property: "og:title", content: "Search | Vishal Pickles and Spices" },
      { property: "og:description", content: "Find the product you are looking for." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { products } = useStore();
  const [term, setTerm] = useState(q);

  const needle = q.trim().toLowerCase();
  const results = needle
    ? products.filter((p) =>
        `${p.name} ${p.category} ${p.subcategory} ${p.description} ${p.keywords}`
          .toLowerCase()
          .includes(needle),
      )
    : [];

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-display text-3xl font-semibold text-primary-dark">Search</h1>
      <form
        className="mt-5 flex max-w-xl gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ search: { q: term } });
        }}
        role="search"
      >
        <input
          className="field"
          value={term}
          aria-label="Search products"
          placeholder="Try 'mango', 'masala', 'instant'"
          onChange={(e) => setTerm(e.target.value)}
        />
        <button className="btn-base btn-primary shrink-0">Search</button>
      </form>

      <p className="mt-6 text-sm text-muted-foreground">
        {results.length} products found for "{q}"
      </p>

      {results.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No matching products"
            message="Try a different keyword such as pickle, goda or thalipeeth."
            action={
              <Link to="/shop" className="btn-base btn-primary">
                Browse all products
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
