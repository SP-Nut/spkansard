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
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <StepHeading eyebrow="Step 2" title="เลือกสินค้า" description="รายการนี้ดึงจาก Supabase เฉพาะสินค้าที่เปิดใช้งานอยู่" />

      {loading ? (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-52 animate-pulse rounded-3xl bg-slate-100" />
          ))}
        </div>
      ) : error ? (
        <div className="mt-5 rounded-3xl border border-rose-100 bg-rose-50 p-5 text-sm text-rose-700">
          <p className="font-bold">ไม่สามารถโหลดข้อมูลราคาได้ กรุณาลองใหม่อีกครั้ง หรือติดต่อทีมงาน SP Kansard</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-2xl bg-[#30318B] px-4 py-2 text-sm font-black text-white"
          >
            ลองใหม่
          </button>
        </div>
      ) : !roofType ? (
        <div className="mt-5 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          เลือกประเภทหลังคาก่อน ระบบจะแสดงสินค้าที่เหมาะกับประเภทนั้น
        </div>
      ) : (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {products.map((product, index) => {
            const selected = selectedProductName === product.name;
            return (
              <button
                key={`${product.type}-${product.name}`}
                type="button"
                onClick={() => onSelect(product.name)}
                className={`group overflow-hidden rounded-3xl border text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
                  selected
                    ? "border-[#00A2EA] bg-[#e7f7ff] ring-4 ring-[#00A2EA]/15"
                    : "border-slate-200 bg-white hover:border-[#00A2EA]/50"
                }`}
              >
                {product.imageUrl ? (
                  <div
                    className="h-36 bg-cover bg-center"
                    role="img"
                    aria-label={product.imageAlt || product.name}
                    style={{ backgroundImage: `url("${product.imageUrl}")` }}
                  />
                ) : (
                  <div className="grid h-36 place-items-center bg-gradient-to-br from-[#e7f7ff] via-white to-[#f8e7f2] text-[#30318B]">
                    <div className="text-center">
                      <FaImage className="mx-auto h-8 w-8 text-[#00A2EA]" />
                      <p className="mt-2 text-xs font-black">กำลังเตรียมรูปสินค้า</p>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-black text-[#30318B]">
                      <FaStar className="h-3 w-3 text-[#FF2B8C]" />
                      {productBadge(product, index)}
                    </span>
                    {selected ? <FaCheckCircle className="h-5 w-5 shrink-0 text-[#00A2EA]" /> : null}
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-base font-black leading-6 text-slate-950">{product.name}</h3>
                  <p className="mt-2 text-xs font-bold text-slate-500">{product.type}</p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <p className="text-sm text-slate-500">ราคาเริ่มต้น</p>
                    <p className="text-lg font-black text-[#30318B]">{formatCurrency(startingPrice(product))}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

function StepHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00A2EA]">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-black text-[#202166]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
