import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { rupees, useStore } from "@/lib/store";
import type { Product } from "@/data/mock";
import { Modal, Stars } from "@/components/ui-kit";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [quick, setQuick] = useState(false);
  const wished = wishlist.includes(product.id);

  return (
    <article className="card-soft group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-4/3 overflow-hidden bg-secondary">
        <Link to="/product/$id" params={{ id: product.id }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.badge ? (
            <span className="rounded-sm bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              {product.badge}
            </span>
          ) : null}
          {product.discount > 0 ? (
            <span className="rounded-sm bg-chili px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-cream">
              {product.discount}% off
            </span>
          ) : null}
        </div>
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-sm shadow-sm transition-colors hover:bg-card"
        >
          <span className={wished ? "text-chili" : "text-muted-foreground"}>{wished ? "♥" : "♡"}</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {product.category}
        </p>
        <h3 className="mt-1 font-display text-base font-semibold text-primary-dark">
          <Link to="/product/$id" params={{ id: product.id }}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.shortDescription}</p>

        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Stars rating={product.rating} />
          <span>
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <span className="text-lg font-semibold text-primary-dark">{rupees(product.price)}</span>
            {product.originalPrice > product.price ? (
              <span className="ml-2 text-xs text-muted-foreground line-through">
                {rupees(product.originalPrice)}
              </span>
            ) : null}
          </div>
          <span className="rounded-sm bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground">
            {product.weight} {product.unit}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            className="btn-base btn-primary flex-1"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of stock" : "Add to Cart"}
          </button>
          <button className="btn-base btn-outline" onClick={() => setQuick(true)}>
            Quick View
          </button>
        </div>
      </div>

      <Modal open={quick} onClose={() => setQuick(false)} title={product.name} wide>
        <div className="grid gap-5 sm:grid-cols-2">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full rounded-md object-cover"
          />
          <div>
            <Stars rating={product.rating} />
            <p className="mt-3 text-sm text-muted-foreground">{product.description}</p>
            <p className="mt-4 text-2xl font-semibold text-primary-dark">{rupees(product.price)}</p>
            <p className="text-xs text-muted-foreground">
              {product.weight} {product.unit} • {product.stock > 0 ? "In stock" : "Out of stock"}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button className="btn-base btn-primary" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                className="btn-base btn-outline"
                onClick={() => setQuick(false)}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </article>
  );
}
