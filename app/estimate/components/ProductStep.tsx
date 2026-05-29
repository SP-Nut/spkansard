import { FaCheckCircle, FaImage, FaStar } from "react-icons/fa";
import { formatCurrency, sizes, type MaterialType, type Product } from "../estimateData";

const productBadge = (product: Product, index: number) => {
  const minPrice = Math.min(...sizes.map((size) => product.prices[size]).filter((price) => price > 0));
  if (minPrice >= 8000) return "พรีเมียม";
  if (index < 3) return "ขายดี";
  if (product.type === "โปร่งแสง") return "โปร่งแสง";
  return "คุ้มค่า";
};

const startingPrice = (product: Product) => {
  const prices = sizes.map((size) => product.prices[size]).filter((price) => price > 0);
  return prices.length ? Math.min(...prices) : 0;
};

export function ProductStep({
  roofType,
  products,
  selectedProductName,
  loading,
  error,
  onRetry,
  onSelect,
}: {
  roofType: MaterialType | "";
  products: Product[];
  selectedProductName: string;
  loading: boolean;
  error: string;
  onRetry: () => void;
  onSelect: (name: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <StepHeading eyebrow="Step 2" title="เลือกสินค้า" description="รายการนี้ดึงจาก Supabase เฉพาะสินค้าที่เปิดใช้งานอยู่" />

      {loading ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : error ? (
        <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
          <p className="font-bold">ไม่สามารถโหลดข้อมูลราคาได้ กรุณาลองใหม่อีกครั้ง หรือติดต่อทีมงาน SP Kansard</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-2xl bg-[#1E2E4F] px-4 py-2 text-sm font-black text-white"
          >
            ลองใหม่
          </button>
        </div>
      ) : !roofType ? (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
          เลือกประเภทหลังคาก่อน ระบบจะแสดงสินค้าที่เหมาะกับประเภทนั้น
        </div>
      ) : (
        <div className="mt-4 max-h-[420px] overflow-y-auto pr-1">
          <div className="grid gap-2 md:grid-cols-2">
          {products.map((product, index) => {
            const selected = selectedProductName === product.name;
            return (
              <button
                key={`${product.type}-${product.name}`}
                type="button"
                onClick={() => onSelect(product.name)}
                className={`group grid grid-cols-[76px_1fr] overflow-hidden rounded-2xl border text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                  selected
                    ? "border-[#314874] bg-[#eaf4ff] ring-4 ring-[#314874]/15"
                    : "border-slate-200 bg-white hover:border-[#314874]/50"
                }`}
              >
                {product.imageUrl ? (
                  <div
                    className="h-full min-h-28 bg-cover bg-center"
                    role="img"
                    aria-label={product.imageAlt || product.name}
                    style={{ backgroundImage: `url("${product.imageUrl}")` }}
                  />
                ) : (
                  <div className="grid h-full min-h-28 place-items-center bg-gradient-to-br from-[#eaf4ff] via-white to-[#f5f7fb] text-[#1E2E4F]">
                    <div className="text-center">
                      <FaImage className="mx-auto h-5 w-5 text-[#314874]" />
                      <p className="mt-1 px-2 text-[10px] font-black leading-4">กำลังเตรียมรูป</p>
                    </div>
                  </div>
                )}
                <div className="p-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-black text-[#1E2E4F]">
                      <FaStar className="h-3 w-3 text-[#314874]" />
                      {productBadge(product, index)}
                    </span>
                    {selected ? <FaCheckCircle className="h-5 w-5 shrink-0 text-[#314874]" /> : null}
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-sm font-black leading-5 text-slate-950">{product.name}</h3>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <p className="text-xs text-slate-500">{product.type}</p>
                    <p className="text-sm font-black text-[#1E2E4F]">{formatCurrency(startingPrice(product))}</p>
                  </div>
                </div>
              </button>
            );
          })}
          </div>
        </div>
      )}
    </section>
  );
}

function StepHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#314874]">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-black text-[#1E2E4F]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
