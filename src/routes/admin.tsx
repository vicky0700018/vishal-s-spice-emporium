import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { useStore, rupees } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Vishal Pickles and Spices" },
      {
        name: "description",
        content:
          "Demo admin dashboard for Vishal Pickles and Spices to manage products, orders, enquiries and site content.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard | Vishal Pickles and Spices" },
      {
        property: "og:description",
        content: "Manage the Vishal Pickles and Spices demo storefront catalogue and content.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminRoute,
});

const ADMIN_EMAIL = "admin@vishalpickles.com";
const ADMIN_PASSWORD = "admin123";

type Row = Record<string, unknown>;
type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "number" | "textarea" | "boolean" | "select";
  options?: string[];
};

function AdminRoute() {
  const { isAdmin } = useStore();
  return isAdmin ? <Dashboard /> : <LoginScreen />;
}

/* ------------------------------- login ---------------------------------- */

function LoginScreen() {
  const { setIsAdmin, toast } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-4 py-16">
      <div className="card-soft w-full max-w-md p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground/70">
          Vishal Pickles and Spices
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-primary-dark">Admin Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Demo panel. Use the credentials below to manage the mock catalogue.
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
              setError("");
              setIsAdmin(true);
              toast("Welcome back, admin");
            } else {
              setError("Invalid email or password.");
            }
          }}
        >
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              className="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error ? (
            <p role="alert" className="text-sm text-chili">
              {error}
            </p>
          ) : null}
          <button type="submit" className="btn-primary w-full">
            Sign in
          </button>
        </form>
        <div className="mt-6 rounded-lg bg-secondary p-3 text-xs text-muted-foreground">
          <strong className="font-semibold">Demo credentials:</strong> {ADMIN_EMAIL} / {ADMIN_PASSWORD}
        </div>
        <Link to="/" className="mt-6 inline-block text-sm font-medium text-primary underline">
          Back to storefront
        </Link>
      </div>
    </main>
  );
}

/* ------------------------------ dashboard -------------------------------- */

const SECTIONS = [
  "Overview",
  "Products",
  "Categories",
  "Orders",
  "Customers",
  "Enquiries",
  "Banners",
  "Offers",
  "Testimonials",
  "FAQs",
  "Content",
  "Settings",
] as const;
type Section = (typeof SECTIONS)[number];

function Dashboard() {
  const store = useStore();
  const [section, setSection] = useState<Section>("Overview");
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            className="btn-outline px-3 py-1.5 text-sm md:hidden"
            onClick={() => setNavOpen((o) => !o)}
            aria-expanded={navOpen}
          >
            Menu
          </button>
          <span className="font-semibold text-primary-dark">Vishal Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/" className="btn-outline px-3 py-1.5 text-sm">
            View site
          </Link>
          <button
            className="btn-primary px-3 py-1.5 text-sm"
            onClick={() => {
              store.setIsAdmin(false);
              store.toast("Logged out", "info");
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[110rem] gap-6 px-4 py-6">
        <aside
          className={`${navOpen ? "block" : "hidden"} w-full shrink-0 md:block md:w-56`}
          aria-label="Admin sections"
        >
          <nav className="card-soft sticky top-20 p-2">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSection(s);
                  setNavOpen(false);
                }}
                aria-current={section === s ? "page" : undefined}
                className={`mb-1 block w-full rounded-md px-3 py-2 text-left text-sm ${
                  section === s
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {s}
              </button>
            ))}
          </nav>
        </aside>

        <main className={`${navOpen ? "hidden" : "block"} min-w-0 flex-1 md:block`}>
          <h1 className="mb-4 text-2xl font-semibold text-primary-dark">{section}</h1>
          {section === "Overview" ? <Overview onJump={setSection} /> : null}
          {section === "Products" ? (
            <Crud
              rows={store.products as unknown as Row[]}
              setRows={store.setProducts as unknown as (u: (r: Row[]) => Row[]) => void}
              columns={["id", "name", "category", "price", "stock", "status"]}
              fields={[
                { key: "name", label: "Name" },
                {
                  key: "category",
                  label: "Category",
                  type: "select",
                  options: store.categories.map((c) => c.name),
                },
                { key: "subcategory", label: "Subcategory" },
                { key: "shortDescription", label: "Short description", type: "textarea" },
                { key: "description", label: "Description", type: "textarea" },
                { key: "price", label: "Price", type: "number" },
                { key: "originalPrice", label: "MRP", type: "number" },
                { key: "weight", label: "Weight", type: "number" },
                { key: "unit", label: "Unit" },
                { key: "stock", label: "Stock", type: "number" },
                { key: "badge", label: "Badge" },
                { key: "image", label: "Image path" },
                { key: "featured", label: "Featured", type: "boolean" },
                { key: "bestSeller", label: "Best seller", type: "boolean" },
                {
                  key: "status",
                  label: "Status",
                  type: "select",
                  options: ["Active", "Draft", "Out of stock"],
                },
              ]}
              blank={{
                name: "",
                category: "Pickles",
                subcategory: "",
                shortDescription: "",
                description: "",
                price: 0,
                originalPrice: 0,
                discount: 0,
                weight: 400,
                unit: "g",
                rating: 4.5,
                reviewCount: 0,
                image: "/images/product-pickle-a.jpg",
                gallery: [],
                badge: "",
                stock: 10,
                featured: false,
                bestSeller: false,
                ingredients: "",
                keywords: "",
                status: "Active",
              }}
              idPrefix="VP"
              label="product"
            />
          ) : null}
          {section === "Categories" ? (
            <Crud
              rows={store.categories as unknown as Row[]}
              setRows={store.setCategories as unknown as (u: (r: Row[]) => Row[]) => void}
              columns={["id", "name", "slug", "description"]}
              fields={[
                { key: "name", label: "Name" },
                { key: "slug", label: "Slug" },
                { key: "description", label: "Description", type: "textarea" },
                { key: "image", label: "Image path" },
              ]}
              blank={{ name: "", slug: "", description: "", image: "/images/cat-pickles.jpg" }}
              idPrefix="c"
              label="category"
            />
          ) : null}
          {section === "Orders" ? (
            <Crud
              rows={store.orders as unknown as Row[]}
              setRows={store.setOrders as unknown as (u: (r: Row[]) => Row[]) => void}
              columns={["id", "customer", "date", "items", "amount", "payment", "status"]}
              fields={[
                { key: "customer", label: "Customer" },
                { key: "date", label: "Date" },
                { key: "items", label: "Items", type: "number" },
                { key: "amount", label: "Amount", type: "number" },
                {
                  key: "payment",
                  label: "Payment",
                  type: "select",
                  options: ["COD", "UPI", "Card"],
                },
                {
                  key: "status",
                  label: "Status",
                  type: "select",
                  options: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
                },
              ]}
              blank={{
                customer: "",
                date: new Date().toISOString().slice(0, 10),
                items: 1,
                amount: 0,
                payment: "COD",
                status: "Pending",
              }}
              idPrefix="VPS-"
              label="order"
            />
          ) : null}
          {section === "Customers" ? (
            <ReadOnlyTable
              rows={store.customers as unknown as Row[]}
              columns={["id", "name", "email", "phone", "orders", "spent", "lastOrder", "status"]}
            />
          ) : null}
          {section === "Enquiries" ? (
            <Crud
              rows={store.enquiries as unknown as Row[]}
              setRows={store.setEnquiries as unknown as (u: (r: Row[]) => Row[]) => void}
              columns={["id", "name", "business", "phone", "type", "date", "status"]}
              fields={[
                { key: "name", label: "Name" },
                { key: "business", label: "Business" },
                { key: "phone", label: "Phone" },
                { key: "email", label: "Email" },
                { key: "type", label: "Type", type: "select", options: ["Wholesale", "General", "Support"] },
                { key: "message", label: "Message", type: "textarea" },
                {
                  key: "status",
                  label: "Status",
                  type: "select",
                  options: ["New", "Contacted", "Closed"],
                },
              ]}
              blank={{
                name: "",
                business: "",
                phone: "",
                email: "",
                type: "Wholesale",
                message: "",
                date: new Date().toISOString().slice(0, 10),
                status: "New",
              }}
              idPrefix="EN-"
              label="enquiry"
            />
          ) : null}
          {section === "Banners" ? (
            <Crud
              rows={store.banners as unknown as Row[]}
              setRows={store.setBanners as unknown as (u: (r: Row[]) => Row[]) => void}
              columns={["id", "title", "buttonText", "buttonLink", "active"]}
              fields={[
                { key: "title", label: "Title" },
                { key: "subtitle", label: "Subtitle", type: "textarea" },
                { key: "image", label: "Image path" },
                { key: "buttonText", label: "Button text" },
                { key: "buttonLink", label: "Button link" },
                { key: "active", label: "Active", type: "boolean" },
              ]}
              blank={{
                title: "",
                subtitle: "",
                image: "/images/hero-main.jpg",
                buttonText: "Shop Now",
                buttonLink: "/shop",
                active: true,
              }}
              idPrefix="B"
              label="banner"
            />
          ) : null}
          {section === "Offers" ? (
            <Crud
              rows={store.offers as unknown as Row[]}
              setRows={store.setOffers as unknown as (u: (r: Row[]) => Row[]) => void}
              columns={["id", "name", "discount", "start", "end", "active"]}
              fields={[
                { key: "name", label: "Name" },
                { key: "description", label: "Description", type: "textarea" },
                { key: "discount", label: "Discount %", type: "number" },
                { key: "start", label: "Start date" },
                { key: "end", label: "End date" },
                { key: "image", label: "Image path" },
                { key: "active", label: "Active", type: "boolean" },
              ]}
              blank={{
                name: "",
                description: "",
                discount: 10,
                start: new Date().toISOString().slice(0, 10),
                end: new Date().toISOString().slice(0, 10),
                image: "/images/offer-combo.jpg",
                active: true,
              }}
              idPrefix="O"
              label="offer"
            />
          ) : null}
          {section === "Testimonials" ? (
            <Crud
              rows={store.testimonials as unknown as Row[]}
              setRows={store.setTestimonials as unknown as (u: (r: Row[]) => Row[]) => void}
              columns={["id", "name", "location", "rating", "active"]}
              fields={[
                { key: "name", label: "Name" },
                { key: "location", label: "Location" },
                { key: "text", label: "Testimonial", type: "textarea" },
                { key: "rating", label: "Rating", type: "number" },
                { key: "active", label: "Active", type: "boolean" },
              ]}
              blank={{ name: "", location: "", text: "", rating: 5, active: true }}
              idPrefix="T"
              label="testimonial"
            />
          ) : null}
          {section === "FAQs" ? (
            <Crud
              rows={store.faqs as unknown as Row[]}
              setRows={store.setFaqs as unknown as (u: (r: Row[]) => Row[]) => void}
              columns={["id", "question", "category", "active"]}
              fields={[
                { key: "question", label: "Question" },
                { key: "answer", label: "Answer", type: "textarea" },
                {
                  key: "category",
                  label: "Category",
                  type: "select",
                  options: ["Products", "Shipping", "Payment", "Orders", "Bulk Orders"],
                },
                { key: "active", label: "Active", type: "boolean" },
              ]}
              blank={{ question: "", answer: "", category: "Products", active: true }}
              idPrefix="F"
              label="FAQ"
            />
          ) : null}
          {section === "Content" ? <ContentEditor /> : null}
          {section === "Settings" ? <SettingsEditor /> : null}
        </main>
      </div>
    </div>
  );
}

/* ------------------------------- overview -------------------------------- */

function Overview({ onJump }: { onJump: (s: Section) => void }) {
  const { products, orders, customers, enquiries } = useStore();
  const revenue = orders.reduce((s, o) => s + o.amount, 0);
  const lowStock = products.filter((p) => p.stock <= 5);

  const stats = [
    { label: "Products", value: String(products.length), section: "Products" as Section },
    { label: "Orders", value: String(orders.length), section: "Orders" as Section },
    { label: "Revenue", value: rupees(revenue), section: "Orders" as Section },
    { label: "Customers", value: String(customers.length), section: "Customers" as Section },
    { label: "Enquiries", value: String(enquiries.length), section: "Enquiries" as Section },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={() => onJump(s.section)}
            className="card-soft p-4 text-left transition hover:-translate-y-0.5"
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold text-primary-dark">{s.value}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card-soft p-4">
          <h2 className="mb-3 font-semibold text-primary-dark">Recent orders</h2>
          <ReadOnlyTable
            rows={orders.slice(0, 6) as unknown as Row[]}
            columns={["id", "customer", "amount", "status"]}
          />
        </div>
        <div className="card-soft p-4">
          <h2 className="mb-3 font-semibold text-primary-dark">Low stock</h2>
          {lowStock.length === 0 ? (
            <p className="text-sm text-muted-foreground">All products are well stocked.</p>
          ) : (
            <ReadOnlyTable
              rows={lowStock.slice(0, 6) as unknown as Row[]}
              columns={["id", "name", "stock"]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- tables --------------------------------- */

function cellText(v: unknown) {
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (v === null || v === undefined) return "—";
  return String(v);
}

function ReadOnlyTable({ rows, columns }: { rows: Row[]; columns: string[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            {columns.map((c) => (
              <th key={c} className="px-3 py-2 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={String(r["id"] ?? i)} className="border-b border-border/60">
              {columns.map((c) => (
                <td key={c} className="px-3 py-2">
                  {cellText(r[c])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Crud({
  rows,
  setRows,
  columns,
  fields,
  blank,
  idPrefix,
  label,
}: {
  rows: Row[];
  setRows: (updater: (r: Row[]) => Row[]) => void;
  columns: string[];
  fields: FieldDef[];
  blank: Row;
  idPrefix: string;
  label: string;
}) {
  const { toast } = useStore();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Row | null>(null);
  const [isNew, setIsNew] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      columns.some((c) => String(r[c] ?? "").toLowerCase().includes(q)),
    );
  }, [rows, columns, query]);

  const save = (row: Row) => {
    if (isNew) {
      const id = `${idPrefix}${Math.floor(1000 + Math.random() * 9000)}`;
      setRows((r) => [{ ...row, id }, ...r]);
      toast(`New ${label} added`);
    } else {
      setRows((r) => r.map((x) => (x["id"] === row["id"] ? row : x)));
      toast(`${label} updated`);
    }
    setEditing(null);
  };

  return (
    <div className="card-soft p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <input
          className="field max-w-xs"
          placeholder={`Search ${label}s`}
          aria-label={`Search ${label}s`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn-primary px-4 py-2 text-sm"
          onClick={() => {
            setIsNew(true);
            setEditing({ ...blank });
          }}
        >
          Add {label}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[42rem] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              {columns.map((c) => (
                <th key={c} className="px-3 py-2 font-semibold">
                  {c}
                </th>
              ))}
              <th className="px-3 py-2 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={String(r["id"] ?? i)} className="border-b border-border/60">
                {columns.map((c) => (
                  <td key={c} className="px-3 py-2 align-top">
                    {cellText(r[c])}
                  </td>
                ))}
                <td className="whitespace-nowrap px-3 py-2 text-right">
                  <button
                    className="btn-outline mr-2 px-3 py-1 text-xs"
                    onClick={() => {
                      setIsNew(false);
                      setEditing({ ...r });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-xs font-medium text-chili underline"
                    onClick={() => {
                      setRows((list) => list.filter((x) => x["id"] !== r["id"]));
                      toast(`${label} deleted`, "info");
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">No {label}s found.</p>
        ) : null}
      </div>

      {editing ? (
        <EditDialog
          title={`${isNew ? "Add" : "Edit"} ${label}`}
          row={editing}
          fields={fields}
          onCancel={() => setEditing(null)}
          onSave={save}
        />
      ) : null}
    </div>
  );
}

function EditDialog({
  title,
  row,
  fields,
  onCancel,
  onSave,
}: {
  title: string;
  row: Row;
  fields: FieldDef[];
  onCancel: () => void;
  onSave: (r: Row) => void;
}) {
  const [draft, setDraft] = useState<Row>(row);
  const set = (k: string, v: unknown) => setDraft((d) => ({ ...d, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/50 p-4">
      <div role="dialog" aria-modal="true" aria-label={title} className="card-soft my-8 w-full max-w-2xl p-6">
        <h2 className="text-lg font-semibold text-primary-dark">{title}</h2>
        <form
          className="mt-4 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSave(draft);
          }}
        >
          {fields.map((f) => (
            <FormField key={f.key} def={f} value={draft[f.key]} onChange={set} />
          ))}
          <div className="sm:col-span-2 mt-2 flex justify-end gap-3">
            <button type="button" className="btn-outline px-4 py-2 text-sm" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary px-4 py-2 text-sm">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: unknown;
  onChange: (k: string, v: unknown) => void;
}) {
  const id = `f-${def.key}`;
  const wrap = (node: ReactNode, full = false) => (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {def.label}
      </label>
      {node}
    </div>
  );

  if (def.type === "boolean")
    return (
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="checkbox"
          className="h-4 w-4"
          checked={Boolean(value)}
          onChange={(e) => onChange(def.key, e.target.checked)}
        />
        <label htmlFor={id} className="text-sm font-medium">
          {def.label}
        </label>
      </div>
    );

  if (def.type === "select")
    return wrap(
      <select
        id={id}
        className="field"
        value={String(value ?? "")}
        onChange={(e) => onChange(def.key, e.target.value)}
      >
        {(def.options ?? []).map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>,
    );

  if (def.type === "textarea")
    return wrap(
      <textarea
        id={id}
        rows={3}
        className="field"
        value={String(value ?? "")}
        onChange={(e) => onChange(def.key, e.target.value)}
      />,
      true,
    );

  return wrap(
    <input
      id={id}
      type={def.type === "number" ? "number" : "text"}
      className="field"
      value={String(value ?? "")}
      onChange={(e) =>
        onChange(def.key, def.type === "number" ? Number(e.target.value) : e.target.value)
      }
    />,
  );
}

/* --------------------------- content & settings --------------------------- */

function ContentEditor() {
  const { content, setContent, toast } = useStore();
  const [draft, setDraft] = useState(content);

  return (
    <form
      className="card-soft grid gap-4 p-6 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setContent(draft);
        toast("Site content updated");
      }}
    >
      {(Object.keys(draft) as Array<keyof typeof draft>).map((k) => {
        const long = String(draft[k]).length > 60;
        return (
          <div key={String(k)} className={long ? "md:col-span-2" : ""}>
            <label htmlFor={`c-${String(k)}`} className="mb-1 block text-sm font-medium">
              {String(k)}
            </label>
            {long ? (
              <textarea
                id={`c-${String(k)}`}
                rows={3}
                className="field"
                value={draft[k]}
                onChange={(e) => setDraft({ ...draft, [k]: e.target.value })}
              />
            ) : (
              <input
                id={`c-${String(k)}`}
                className="field"
                value={draft[k]}
                onChange={(e) => setDraft({ ...draft, [k]: e.target.value })}
              />
            )}
          </div>
        );
      })}
      <div className="md:col-span-2">
        <button className="btn-primary px-5 py-2 text-sm" type="submit">
          Save content
        </button>
      </div>
    </form>
  );
}

function SettingsEditor() {
  const { settings, setSettings, toast } = useStore();
  const [draft, setDraft] = useState(settings);

  return (
    <form
      className="card-soft grid gap-4 p-6 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSettings(draft);
        toast("Settings saved");
      }}
    >
      {(Object.keys(draft) as Array<keyof typeof draft>).map((k) => {
        const value = draft[k];
        if (typeof value === "boolean")
          return (
            <div key={String(k)} className="flex items-center gap-2">
              <input
                id={`s-${String(k)}`}
                type="checkbox"
                className="h-4 w-4"
                checked={value}
                onChange={(e) => setDraft({ ...draft, [k]: e.target.checked })}
              />
              <label htmlFor={`s-${String(k)}`} className="text-sm font-medium">
                {String(k)}
              </label>
            </div>
          );
        return (
          <div key={String(k)} className={String(value).length > 60 ? "md:col-span-2" : ""}>
            <label htmlFor={`s-${String(k)}`} className="mb-1 block text-sm font-medium">
              {String(k)}
            </label>
            <input
              id={`s-${String(k)}`}
              className="field"
              type={typeof value === "number" ? "number" : "text"}
              value={String(value)}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  [k]: typeof value === "number" ? Number(e.target.value) : e.target.value,
                })
              }
            />
          </div>
        );
      })}
      <div className="md:col-span-2">
        <button className="btn-primary px-5 py-2 text-sm" type="submit">
          Save settings
        </button>
      </div>
    </form>
  );
}
