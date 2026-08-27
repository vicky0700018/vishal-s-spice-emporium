import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { rupees, useStore } from "@/lib/store";
import { EmptyState, Stars } from "@/components/ui-kit";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "Product Details | Vishal Pickles and Spices" },
      {
        name: "description",
        content:
          "Product details, ingredients, highlights and reviews for pickles, masalas and instant mixes from Vishal Pickles and Spices.",
      },
      { property: "og:title", content: "Product Details | Vishal Pickles and Spices" },
      { property: "og:description", content: "Ingredients, pack sizes, delivery and review information." },
    ],
  }),
  component: ProductPage,
});

const reviews = [
  { name: "Prasad K.", rating: 5, text: "Balanced masala and the pieces stay firm. Will reorder." },
  { name: "Ruchira S.", rating: 4, text: "Good quantity for the price. Packing was leak-proof." },
  { name: "Nilesh B.", rating: 5, text: "Tastes closer to homemade than anything I have bought." },
];

function ProductPage() {
  const { id } = Route.useParams();
  const { products, addToCart, wishlist, toggleWishlist, toast } = useStore();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [pack, setPack] = useState(0);

  if (!product) {
    return (
      <div className="container-page py-20">
        <EmptyState
          title="Product not found"
          message="This product may have been removed."
          action={
            <Link to="/shop" className="btn-base btn-primary">
              Back to shop
            </Link>
          }
        />
      </div>
    );
  }

  const packs = [
    { label: `${product.weight} ${product.unit}`, mult: 1 },
    { label: `${product.weight * 2} ${product.unit}`, mult: 1.9 },
  ];
  const chosen = packs[pack] ?? packs[0]!;
  const price = Math.round(product.price * chosen.mult);
  const gallery = product.gallery.filter((g, i, arr) => arr.indexOf(g) === i);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container-page py-10 md:py-14">
      <nav className="text-xs text-muted-foreground">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <img
            src={gallery[active] ?? product.image}
            alt={product.name}
            className="aspect-square w-full rounded-lg object-cover shadow-[var(--shadow-soft)]"
          />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {gallery.map((g, i) => (
              <button
                key={g}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`overflow-hidden rounded-md border-2 transition-colors ${
                  active === i ? "border-primary" : "border-transparent"
                }`}
              >
                <img src={g} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-primary-dark md:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Stars rating={product.rating} />
            <span>
              {product.rating} • {product.reviewCount} reviews
            </span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="font-display text-3xl font-semibold text-primary-dark">{rupees(price)}</span>
            <span className="text-sm text-muted-foreground line-through">
              {rupees(Math.round(product.originalPrice * chosen.mult))}
            </span>
            <span className="rounded-sm bg-chili px-2 py-1 text-[11px] font-bold text-cream">
              {product.discount}% OFF
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes. Demo pricing.</p>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pack size</p>
            <div className="mt-2 flex gap-2">
              {packs.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setPack(i)}
                  className={`btn-base ${pack === i ? "btn-primary" : "btn-outline"}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-md border border-border">
              <button className="px-3 py-2" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button className="px-3 py-2" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
            <span className={`text-sm font-medium ${product.stock > 0 ? "text-primary" : "text-chili"}`}>
              {product.stock > 0 ? `In stock (${product.stock} units)` : "Out of stock"}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="btn-base btn-primary px-6 py-3"
              disabled={product.stock === 0}
              onClick={() => addToCart(product, qty)}
            >
              Add to Cart
            </button>
            <button
              className="btn-base btn-accent px-6 py-3"
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product, qty);
                navigate({ to: "/checkout" });
              }}
            >
              Buy Now
            </button>
            <button className="btn-base btn-outline" onClick={() => toggleWishlist(product.id)}>
              {wishlist.includes(product.id) ? "♥ Wishlisted" : "♡ Wishlist"}
            </button>
          </div>

          <div className="mt-8 space-y-4 text-sm">
            <div>
              <h2 className="font-display text-lg font-semibold text-primary-dark">Description</h2>
              <p className="mt-2 text-muted-foreground">{product.description}</p>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-primary-dark">Ingredients</h2>
              <p className="mt-2 text-muted-foreground">{product.ingredients}</p>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-primary-dark">Highlights</h2>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {[
                  "Traditional recipe",
                  "Homemade-style preparation",
                  "Small-batch made",
                  "Retail & bulk packs",
                ].map((h) => (
                  <li key={h} className="flex gap-2 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card-soft p-4">
                <h3 className="text-sm font-semibold text-primary-dark">Delivery</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Standard delivery in 3-5 business days. Free above ₹999. Demo information.
                </p>
              </div>
              <div className="card-soft p-4">
                <h3 className="text-sm font-semibold text-primary-dark">Returns</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Damaged or leaking packs can be reported within 48 hours of delivery.
                </p>
              </div>
            </div>
            <button className="btn-base btn-outline" onClick={() => toast("Sharing is demo only", "info")}>
              Share this product
            </button>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-primary-dark">Customer Reviews</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="card-soft p-5">
              <Stars rating={r.rating} />
              <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
              <p className="mt-3 text-xs font-semibold text-primary-dark">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length ? (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-primary-dark">Related Products</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
