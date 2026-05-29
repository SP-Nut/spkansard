import { FaCheckCircle } from "react-icons/fa";
import { formatCurrency, sizes, type PriceSize, type Product } from "../estimateData";

const sizeDescriptions: Record<PriceSize, string> = {
  M: "งานขนาดมาตรฐาน",
  "M+": "เพิ่มสเปกขึ้นจาก M",
  L: "โครงสร้างและรายละเอียดมากขึ้น",
  "L+": "รองรับตัวเลือกฝ้าใต้หลังคา",
  "Stainless S": "โครงสร้างสแตนเลสขนาดเริ่มต้น",
  "Stainless M": "โครงสร้างสแตนเลสสเปกสูงขึ้น",
};

export function SizeStep({
  product,
  selectedSize,
  onSelect,
}: {
  product: Product | null;
  selectedSize: PriceSize | "";
  onSelect: (size: PriceSize) => void;
}) {
  const availableSizes = product ? sizes.filter((size) => product.prices[size] > 0) : [];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <StepHeading eyebrow="Step 3" title="เลือกไซซ์ราคา" description="แต่ละสินค้าอาจมีไซซ์ที่เปิดราคาไม่เท่ากัน" />
      {!product ? (
        <div className="mt-5 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          เลือกสินค้าก่อน ระบบจะแสดงไซซ์ที่มีราคา
        </div>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {availableSizes.map((size) => {
            const selected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onSelect(size)}
                className={`relative rounded-3xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
                  selected
                    ? "border-[#00A2EA] bg-[#e7f7ff] ring-4 ring-[#00A2EA]/15"
                    : "border-slate-200 bg-white hover:border-[#00A2EA]/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black text-[#202166]">{size}</h3>
                    <p className="mt-1 text-sm text-slate-500">{sizeDescriptions[size]}</p>
                  </div>
                  {selected ? <FaCheckCircle className="h-5 w-5 text-[#00A2EA]" /> : null}
                </div>
                <p className="mt-4 text-lg font-black text-slate-950">{formatCurrency(product.prices[size])}/ตร.ม.</p>
                {size === "L+" ? (
                  <p className="mt-2 rounded-2xl bg-white px-3 py-2 text-xs font-bold text-[#30318B]">
                    รองรับตัวเลือกฝ้าใต้หลังคา
                  </p>
                ) : null}
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
