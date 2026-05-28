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

export const products: Product[] = [
  { type: "โปร่งแสง", name: "อะคริลิค Shinkolite Prime 10 มม.", prices: { M: 8350, "M+": 8890, L: 9100, "L+": 10300, "Stainless S": 0, "Stainless M": 15900 } },
  { type: "โปร่งแสง", name: "อะคริลิค Shinkolite Heat Cut/Nature 6 มม.", prices: { M: 5550, "M+": 5700, L: 5900, "L+": 6100, "Stainless S": 0, "Stainless M": 11900 } },
  { type: "โปร่งแสง", name: "อะคริลิค Shinkolite Superior 6 มม.", prices: { M: 4250, "M+": 4400, L: 4600, "L+": 4800, "Stainless S": 0, "Stainless M": 9900 } },
  { type: "โปร่งแสง", name: "อะคริลิค Shinkolite Shade Series 4 มม.", prices: { M: 3850, "M+": 4050, L: 4250, "L+": 4400, "Stainless S": 0, "Stainless M": 9100 } },
  { type: "โปร่งแสง", name: "โพลีคาร์บอเนต Embossed Sheet 3 มม.", prices: { M: 3300, "M+": 3400, L: 3600, "L+": 3750, "Stainless S": 4800, "Stainless M": 6600 } },
  { type: "โปร่งแสง", name: "ไฟเบอร์กลาส ลอนเรียบ D-Lite 1.5 มม. / J-Roof 1.2 มม.", prices: { M: 3100, "M+": 3200, L: 3400, "L+": 3600, "Stainless S": 4600, "Stainless M": 6400 } },
  { type: "โปร่งแสง", name: "ไฟเบอร์กลาส ลอนคลื่น D-Lite 1.2 มม. สีเทาอัลลอยด์", prices: { M: 2650, "M+": 2750, L: 2850, "L+": 2900, "Stainless S": 4200, "Stainless M": 5900 } },
  { type: "โปร่งแสง", name: "ไฟเบอร์กลาส ลอนคลื่น D-Lite 1.2 มม.", prices: { M: 2550, "M+": 2650, L: 2750, "L+": 2850, "Stainless S": 4100, "Stainless M": 5700 } },
  { type: "โปร่งแสง", name: "โพลีลอนเล็ก 1.2 มม./1.5 มม.", prices: { M: 2550, "M+": 2650, L: 2750, "L+": 2850, "Stainless S": 4100, "Stainless M": 5700 } },
  { type: "โปร่งแสง", name: "แผ่นใสไฟเบอร์กลาส/โพลี ลอนเมทัลชีท 1.2 มม.", prices: { M: 2150, "M+": 2250, L: 2350, "L+": 2450, "Stainless S": 3700, "Stainless M": 4800 } },
  { type: "โปร่งแสง", name: "โพลีคาร์บอเนต 10 มม.", prices: { M: 2150, "M+": 2250, L: 2350, "L+": 2450, "Stainless S": 3700, "Stainless M": 4800 } },
  { type: "โปร่งแสง", name: "โพลีคาร์บอเนต 8 มม.", prices: { M: 2000, "M+": 2100, L: 2150, "L+": 2250, "Stainless S": 3500, "Stainless M": 4600 } },
  { type: "โปร่งแสง", name: "โพลีคาร์บอเนต 6 มม.", prices: { M: 1800, "M+": 1900, L: 2000, "L+": 2100, "Stainless S": 3300, "Stainless M": 4400 } },
  { type: "ทึบแสง", name: "หลังคาอลูมิเนียม 3 มม.", prices: { M: 3650, "M+": 3850, L: 4050, "L+": 4250, "Stainless S": 0, "Stainless M": 9500 } },
  { type: "ทึบแสง", name: "หลังคาไวนิล ดรีมรูฟ ไวนิลคริปล๊อค 6 มม.", prices: { M: 2750, "M+": 2850, L: 2900, "L+": 2900, "Stainless S": 4300, "Stainless M": 6000 } },
  { type: "ทึบแสง", name: "หลังคาไวนิล ท้องเรียบ หัวกลม/เหลี่ยม 6 มม.", prices: { M: 2750, "M+": 2850, L: 2900, "L+": 3000, "Stainless S": 4300, "Stainless M": 6000 } },
  { type: "ทึบแสง", name: "หลังคาไวนิล ท้องเรียบ หัวเหลี่ยม 5 มม. PR-6", prices: { M: 2650, "M+": 2750, L: 2800, "L+": 2900, "Stainless S": 4200, "Stainless M": 5900 } },
  { type: "ทึบแสง", name: "หลังคาวินเทอร์รูฟ 2 มม.", prices: { M: 2350, "M+": 2450, L: 2550, "L+": 2650, "Stainless S": 3900, "Stainless M": 5000 } },
  { type: "ทึบแสง", name: "เมทัลชีท แผ่นแซนวิช 0.35 มม. + PU 25 มม.", prices: { M: 2150, "M+": 2250, L: 2350, "L+": 2450, "Stainless S": 3700, "Stainless M": 4800 } },
  { type: "ทึบแสง", name: "เมทัลชีท แผ่นแซนวิช บลูสโคป 0.35 มม. + PU 25 มม.", prices: { M: 2350, "M+": 2450, L: 2550, "L+": 2650, "Stainless S": 3900, "Stainless M": 5000 } },
  { type: "ทึบแสง", name: "เมทัลชีท ลอนสแนปล็อค 0.35 มม. + PU 25 มม.", prices: { M: 2100, "M+": 2200, L: 2300, "L+": 2400, "Stainless S": 3650, "Stainless M": 4750 } },
  { type: "ทึบแสง", name: "เมทัลชีท 0.35 มม. + PU 25 มม.", prices: { M: 1800, "M+": 1900, L: 2000, "L+": 2100, "Stainless S": 3300, "Stainless M": 4400 } },
  { type: "ทึบแสง", name: "เมทัลชีท 0.35 มม. + PU 50 มม.", prices: { M: 2000, "M+": 2100, L: 2200, "L+": 2300, "Stainless S": 3500, "Stainless M": 4600 } },
  { type: "ทึบแสง", name: "เมทัลชีท 0.35 มม. + PE 5 มม.", prices: { M: 1600, "M+": 1700, L: 1800, "L+": 1900, "Stainless S": 3100, "Stainless M": 4200 } },
  { type: "ทึบแสง", name: "บลูสโคป ลอนสแนปล็อค 0.35 มม.", prices: { M: 1800, "M+": 1900, L: 2000, "L+": 2100, "Stainless S": 3300, "Stainless M": 4400 } },
  { type: "ทึบแสง", name: "บลูสโคป ลอนสแนปล็อค 0.40 มม.", prices: { M: 1900, "M+": 2000, L: 2100, "L+": 2200, "Stainless S": 3400, "Stainless M": 4500 } },
  { type: "ทึบแสง", name: "บลูสโคป ลอนสแนปล็อค 0.47 มม.", prices: { M: 2000, "M+": 2100, L: 2200, "L+": 2300, "Stainless S": 3500, "Stainless M": 4600 } },
  { type: "ทึบแสง", name: "เหล็กนอก ลอนสแนปล็อค 0.35 มม.", prices: { M: 1700, "M+": 1800, L: 1900, "L+": 2000, "Stainless S": 3200, "Stainless M": 4300 } },
  { type: "ทึบแสง", name: "เหล็กนอก ลอนสแนปล็อค 0.40 มม.", prices: { M: 1800, "M+": 1900, L: 2000, "L+": 2100, "Stainless S": 3300, "Stainless M": 4400 } },
  { type: "ทึบแสง", name: "เหล็กนอก ลอนสแนปล็อค 0.47 มม.", prices: { M: 1900, "M+": 2000, L: 2100, "L+": 2200, "Stainless S": 3400, "Stainless M": 4500 } },
  { type: "ทึบแสง", name: "บลูสโคป แซคส์ คูล 0.35 มม.", prices: { M: 1600, "M+": 1700, L: 1800, "L+": 1900, "Stainless S": 3100, "Stainless M": 4200 } },
  { type: "ทึบแสง", name: "เมทัลชีท มาตรฐาน 0.35 มม.", prices: { M: 1500, "M+": 1600, L: 1700, "L+": 1800, "Stainless S": 3000, "Stainless M": 4100 } },
  { type: "ทึบแสง", name: "เมทัลชีท มาตรฐาน 0.40 มม.", prices: { M: 1600, "M+": 1700, L: 1800, "L+": 1900, "Stainless S": 3100, "Stainless M": 4200 } },
  { type: "ทึบแสง", name: "เมทัลชีท มาตรฐาน 0.47 มม.", prices: { M: 1700, "M+": 1800, L: 1900, "L+": 2000, "Stainless S": 3200, "Stainless M": 4300 } },
];

export const mainServices: ServiceOption[] = [
  { group: "งานเสา", name: "เสาเดี่ยว", price: 2000, unit: "post" },
  { group: "งานเสา", name: "เสาระแนง", price: 3500, unit: "post" },
  { group: "งานเสา", name: "เสาเรียง", price: 2800, unit: "post" },
  { group: "สีโครงสร้าง", name: "สีผสมพิเศษ", price: 200, unit: "sqm" },
  { group: "งานฝ้า ใช้เฉพาะ L+", name: "ฝ้าตะแกรงเหล็ก", price: 1100, unit: "sqm", onlySize: "L+" },
  { group: "งานฝ้า ใช้เฉพาะ L+", name: "ฝ้าระแนงเชอรา 8 มม.", price: 1500, unit: "sqm", onlySize: "L+" },
  { group: "งานฝ้า ใช้เฉพาะ L+", name: "ฝ้าเมทัลชีทสีธรรมดา", price: 1500, unit: "sqm", onlySize: "L+" },
  { group: "งานฝ้า ใช้เฉพาะ L+", name: "ฝ้าระแนงเหล็กใต้หลังคา", price: 1600, unit: "sqm", onlySize: "L+" },
  { group: "งานฝ้า ใช้เฉพาะ L+", name: "ฝ้าเมทัลชีทลายไม้", price: 1600, unit: "sqm", onlySize: "L+" },
  { group: "งานฝ้า ใช้เฉพาะ L+", name: "ฝ้าระแนงเหล็กลายไม้ Aron", price: 3700, unit: "sqm", onlySize: "L+" },
];

export const extraServices: ServiceOption[] = [
  { group: "งานรากฐาน", name: "ฟุตติ้ง ไม่ลงเข็ม", price: 3000, unit: "set" },
  { group: "งานรากฐาน", name: "เข็มหกเหลี่ยม 3 ม. + ฟุตติ้ง", price: 5000, unit: "set" },
  { group: "งานรากฐาน", name: "เข็มหกเหลี่ยม 4 ม. + ฟุตติ้ง", price: 6000, unit: "set" },
  { group: "งานรากฐาน", name: "เข็มหกเหลี่ยม 6 ม. + ฟุตติ้ง", price: 7000, unit: "set" },
  { group: "งานรากฐาน", name: "ไมโครไพล์ I18 1 ต้น", price: 20000, unit: "post" },
  { group: "งานรากฐาน", name: "ไมโครไพล์ I18 2 ต้น", price: 17000, unit: "post" },
  { group: "งานรากฐาน", name: "ไมโครไพล์ I18 3 ต้น", price: 15000, unit: "post" },
  { group: "งานรากฐาน", name: "ไมโครไพล์ I18 4 ต้น", price: 13000, unit: "post" },
  { group: "งานรากฐาน", name: "ไมโครไพล์ I22 1 ต้น", price: 22000, unit: "post" },
  { group: "งานรากฐาน", name: "ไมโครไพล์ I22 2 ต้น", price: 19000, unit: "post" },
  { group: "งานรากฐาน", name: "ไมโครไพล์ I22 3 ต้น", price: 17000, unit: "post" },
  { group: "งานรากฐาน", name: "ไมโครไพล์ I22 4 ต้น", price: 13000, unit: "post" },
  { group: "งานรากฐาน", name: "เข็มเหล็ก F76 ลึก 2 ม.", price: 9500, unit: "post" },
  { group: "งานรากฐาน", name: "เข็มเหล็ก F76 ลึก 3 ม.", price: 12500, unit: "post" },
  { group: "งานไฟฟ้า", name: "จุดไฟส่องสว่าง", price: 1500, unit: "point" },
  { group: "งานท่อน้ำ", name: "PVC 3 นิ้ว", price: 550, unit: "meter" },
  { group: "งานท่อน้ำ", name: "ไวนิล Lion 3 นิ้ว สีขาว", price: 700, unit: "meter" },
  { group: "งานท่อน้ำ", name: "ไวนิล VG 3 นิ้ว สีขาว", price: 900, unit: "meter" },
];

export const gutters: ServiceOption[] = [
  { group: "รางน้ำพับพิเศษ", name: "L1 สแตนเลส 304 หลังบ้าน", price: 2600, unit: "meter" },
  { group: "รางน้ำพับพิเศษ", name: "L1 อลูมิเนียม หลังบ้าน", price: 1600, unit: "meter" },
  { group: "รางน้ำพับพิเศษ", name: "L2 สแตนเลส 304 ซ่อนราง", price: 1600, unit: "meter" },
  { group: "รางน้ำพับพิเศษ", name: "L2 อลูมิเนียม ซ่อนราง", price: 850, unit: "meter" },
  { group: "รางน้ำพับพิเศษ", name: "L3 สแตนเลส 304 หน้าบ้าน", price: 1500, unit: "meter" },
  { group: "รางน้ำพับพิเศษ", name: "L3 อลูมิเนียม หน้าบ้าน", price: 550, unit: "meter" },
  { group: "รางน้ำมาตรฐาน", name: "6 นิ้ว เกรด 304", price: 850, unit: "meter" },
  { group: "รางน้ำมาตรฐาน", name: "5 นิ้ว เกรด 304", price: 700, unit: "meter" },
  { group: "รางน้ำไวนิล", name: "VG สีขาว", price: 900, unit: "meter" },
  { group: "รางน้ำไวนิล", name: "Lion สีขาว", price: 700, unit: "meter" },
];

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
