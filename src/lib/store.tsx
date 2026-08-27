import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  categories as seedCategories,
  initialBanners,
  initialContent,
  initialCustomers,
  initialEnquiries,
  initialFaqs,
  initialOffers,
  initialOrders,
  initialSettings,
  initialTestimonials,
  products as seedProducts,
  type Product,
} from "@/data/mock";

export type CartLine = { product: Product; qty: number };
export type Toast = { id: number; message: string; tone: "success" | "error" | "info" };

type PlacedOrder = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  payment: string;
  lines: { name: string; qty: number; price: number }[];
  total: number;
  eta: string;
};

type Store = ReturnType<typeof useStoreValue>;

const StoreContext = createContext<Store | null>(null);

let toastId = 0;

function useStoreValue() {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [categories, setCategories] = useState(seedCategories);
  const [orders, setOrders] = useState(initialOrders);
  const [customers] = useState(initialCustomers);
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [faqs, setFaqs] = useState(initialFaqs);
  const [banners, setBanners] = useState(initialBanners);
  const [offers, setOffers] = useState(initialOffers);
  const [content, setContent] = useState(initialContent);
  const [settings, setSettings] = useState(initialSettings);

  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, tone: Toast["tone"] = "success") => {
    const id = ++toastId;
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const addToCart = useCallback(
    (product: Product, qty = 1) => {
      setCart((c) => {
        const found = c.find((l) => l.product.id === product.id);
        if (found)
          return c.map((l) => (l.product.id === product.id ? { ...l, qty: l.qty + qty } : l));
        return [...c, { product, qty }];
      });
      toast(`${product.name} added to cart`);
    },
    [toast],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) =>
      qty <= 0
        ? c.filter((l) => l.product.id !== id)
        : c.map((l) => (l.product.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((c) => c.filter((l) => l.product.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
      toast("Wishlist updated", "info");
    },
    [toast],
  );

  const totals = useMemo(() => {
    const subtotal = cart.reduce((s, l) => s + l.product.price * l.qty, 0);
    const mrp = cart.reduce((s, l) => s + l.product.originalPrice * l.qty, 0);
    const shipping = subtotal === 0 || subtotal >= 999 ? 0 : settings.shipping;
    return { subtotal, mrp, savings: mrp - subtotal, shipping, total: subtotal + shipping };
  }, [cart, settings.shipping]);

  const count = cart.reduce((s, l) => s + l.qty, 0);

  const placeOrder = useCallback(
    (form: Omit<PlacedOrder, "id" | "lines" | "total" | "eta">) => {
      const id = `VPS-${Math.floor(30000 + Math.random() * 9000)}`;
      const order: PlacedOrder = {
        ...form,
        id,
        lines: cart.map((l) => ({ name: l.product.name, qty: l.qty, price: l.product.price })),
        total: totals.total,
        eta: "3-5 business days",
      };
      setLastOrder(order);
      setOrders((o) => [
        {
          id,
          customer: form.name,
          date: new Date().toISOString().slice(0, 10),
          items: cart.reduce((s, l) => s + l.qty, 0),
          amount: totals.total,
          payment: form.payment,
          status: "Pending",
        },
        ...o,
      ]);
      setCart([]);
      return order;
    },
    [cart, totals.total],
  );

  const addEnquiry = useCallback(
    (e: { name: string; business: string; phone: string; email: string; type: string; message: string }) => {
      setEnquiries((list) => [
        {
          id: `EN-${String(list.length + 1).padStart(2, "0")}`,
          date: new Date().toISOString().slice(0, 10),
          status: "New",
          ...e,
        },
        ...list,
      ]);
    },
    [],
  );

  return {
    products,
    setProducts,
    categories,
    setCategories,
    orders,
    setOrders,
    customers,
    enquiries,
    setEnquiries,
    addEnquiry,
    testimonials,
    setTestimonials,
    faqs,
    setFaqs,
    banners,
    setBanners,
    offers,
    setOffers,
    content,
    setContent,
    settings,
    setSettings,
    cart,
    count,
    totals,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWishlist,
    isAdmin,
    setIsAdmin,
    lastOrder,
    placeOrder,
    toasts,
    toast,
  };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const value = useStoreValue();
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
