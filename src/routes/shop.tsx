import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Pickles, Masalas & Instant Mixes | Vishal Pickles and Spices" },
      {
        name: "description",
        content:
          "Browse traditional pickles, Maharashtrian masalas, instant mixes, combo packs and wholesale packs with filters and sorting.",
      },
      { property: "og:title", content: "Shop | Vishal Pickles and Spices" },
      {
        property: "og:description",
        content: "Filter by category, price, availability and discount across our full product range.",
      },
    ],
  }),
  component: Shop,
});

const sortOptions = ["Popular", "Newest", "Price Low to High", "Price High to Low", "Rating"];

function Shop() {
  const { products, categories } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sub, setSub] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sort, setSort] = useState("Popular");
  const [inStockOnly, setInStock] = useState(false);
  const [discounted, setDiscounted] = useState(false);
  const [visible, setVisible] = useState(12);

  const subs = useMemo(
    () =>
      Array.from(
        new Set(products.filter((p) => cat === "All" || p.category === cat).map((p) => p.subcategory)),
      ),
    [products, cat],
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (q && !`${p.name} ${p.keywords}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (cat !== "All" && p.category !== cat) return false;
      if (sub !== "All" && p.subcategory !== sub) return false;
      if (p.price > maxPrice) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (discounted && p.discount <= 0) return false;
      return true;
    });
    list = [...list];
    if (sort === "Price Low to High") list.sort((a, b) => a.price - b.price);
    if (sort === "Price High to Low") list.sort((a, b) => b.price - a.price);
    if (sort === "Rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "Newest") list.reverse();
    if (sort === "Popular") list.sort((a, b) => b.reviewCount - a.reviewCount);
    return list;
  }, [products, q, cat, sub, maxPrice, sort, inStockOnly, discounted]);

  return (
    <div className="container-page py-12 md:py-16">
      <SectionHeading
        align="left"
        eyebrow="All products"
        title="Shop the Full Range"
        subtitle="Pickles, masalas, instant mixes, combos and bulk packs in one place."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="card-soft h-fit space-y-5 p-5 lg:sticky lg:top-32">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Search
            </label>
            <input
              className="field mt-2"
              placeholder="Search products"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Category
            </label>
            <select
              className="field mt-2"
              value={cat}
              onChange={(e) => {
                setCat(e.target.value);
                setSub("All");
              }}
            >
              <option>All</option>
              {categories.map((c) => (
                <option key={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Subcategory
            </label>
            <select className="field mt-2" value={sub} onChange={(e) => setSub(e.target.value)}>
              <option>All</option>
              {subs.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Max price: ₹{maxPrice}
            </label>
            <input
              type="range"
              min={100}
              max={2500}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--color-primary)]"
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStock(e.target.checked)} />
            In stock only
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={discounted}
              onChange={(e) => setDiscounted(e.target.checked)}
            />
            Discounted items
          </label>
          <button
            className="btn-base btn-outline w-full"
            onClick={() => {
              setQ("");
              setCat("All");
              setSub("All");
              setMaxPrice(2500);
              setInStock(false);
              setDiscounted(false);
            }}
          >
            Reset filters
          </button>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{filtered.length} products</p>
            <label className="flex items-center gap-2 text-sm">
              Sort by
              <select className="field w-48" value={sort} onChange={(e) => setSort(e.target.value)}>
                {sortOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <EmptyState title="No products match" message="Try widening the price range or clearing filters." />
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.slice(0, visible).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {visible < filtered.length ? (
                <div className="mt-10 text-center">
                  <button className="btn-base btn-primary px-6" onClick={() => setVisible((v) => v + 9)}>
                    Load more
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
