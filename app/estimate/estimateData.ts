export type MaterialType = "โปร่งแสง" | "ทึบแสง";
export type PriceSize = "M" | "M+" | "L" | "L+" | "Stainless S" | "Stainless M";
export type Unit = "sqm" | "post" | "set" | "point" | "meter" | "free";

export interface Product {
  id?: string;
  type: MaterialType;
  name: string;
  imageUrl?: string;
  imageAlt?: string;
  displayOrder?: number;
  isActive?: boolean;
  prices: Record<PriceSize, number>;
}

export interface ServiceOption {
  id?: string;
  group: string;
  name: string;
  price: number;
  unit: Unit;
  onlySize?: PriceSize;
  displayOrder?: number;
  isActive?: boolean;
}

export const sizes: PriceSize[] = ["M", "M+", "L", "L+", "Stainless S", "Stainless M"];

export const unitLabels: Record<Unit, string> = {
  sqm: "ตร.ม.",
  post: "ต้น",
  set: "ชุด",
  point: "จุด",
  meter: "เมตร",
  free: "ฟรี",
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);

export const freeInstallOptions = ["ขาค้ำเดี่ยว", "ขาค้ำระแนง", "แขนดึง", "แฟลตบาร์"];
export const freeColors = ["ดำด้าน", "ดำเงา", "สีโอ๊คดำ", "เทา", "ขาว"];

export const getServiceTotal = (service: ServiceOption | null, quantity: number, squareMeters: number) => {
  if (!service) return 0;
  if (service.unit === "free") return 0;
  if (service.unit === "sqm") return service.price * squareMeters;
  return service.price * Math.max(0, quantity);
};
