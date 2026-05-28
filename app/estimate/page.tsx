"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FaCalculator,
  FaChevronRight,
  FaHome,
  FaImage,
  FaLine,
  FaPhoneAlt,
  FaRulerCombined,
} from "react-icons/fa";

import {
  formatCurrency,
  freeColors,
  freeInstallOptions,
  getServiceTotal,
  sizes,
  unitLabels,
  type MaterialType,
  type PriceSize,
  type Product,
  type ServiceOption,
} from "./estimateData";
import { supabase } from "@/lib/supabase";

type InstallStyle = "มีเสา" | "ไร้เสา" | "";

interface EstimateProductRow {
  id: string;
  type: MaterialType;
  name: string;
  image_url?: string | null;
  image_alt?: string | null;
  prices: Record<PriceSize, number>;
  display_order?: number | null;
  is_active?: boolean | null;
}

interface EstimateServiceRow {
  id: string;
  service_type: "main" | "extra" | "gutter";
  service_group: string;
  name: string;
  price: number;
  unit: ServiceOption["unit"];
  only_size?: PriceSize | null;
  display_order?: number | null;
  is_active?: boolean | null;
}

const materialTypes: MaterialType[] = ["โปร่งแสง", "ทึบแสง"];
const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#314874] focus:ring-2 focus:ring-[#314874]/20 disabled:bg-gray-100 disabled:text-gray-400";
const labelClass = "text-sm font-semibold text-gray-700";

const mapProductRow = (row: EstimateProductRow): Product => ({
  id: row.id,
  type: row.type,
  name: row.name,
  imageUrl: row.image_url || undefined,
  imageAlt: row.image_alt || undefined,
  displayOrder: row.display_order ?? 0,
  isActive: row.is_active ?? true,
  prices: row.prices,
});

const mapServiceRow = (row: EstimateServiceRow): ServiceOption => ({
  id: row.id,
  group: row.service_group,
  name: row.name,
  price: row.price,
  unit: row.unit,
  onlySize: row.only_size || undefined,
  displayOrder: row.display_order ?? 0,
  isActive: row.is_active ?? true,
});

const initialCustomer = {
  name: "",
  phone: "",
  lineId: "",
  email: "",
  imageUrl: "",
  message: "",
};

export default function EstimatePage() {
  const [calculatorProducts, setCalculatorProducts] = useState<Product[]>([]);
  const [calculatorMainServices, setCalculatorMainServices] = useState<ServiceOption[]>([]);
  const [calculatorExtraServices, setCalculatorExtraServices] = useState<ServiceOption[]>([]);
  const [calculatorGutters, setCalculatorGutters] = useState<ServiceOption[]>([]);
  const [materialType, setMaterialType] = useState<MaterialType | "">("");
  const [productName, setProductName] = useState("");
  const [size, setSize] = useState<PriceSize | "">("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [installStyle, setInstallStyle] = useState<InstallStyle>("");
  const [postServiceName, setPostServiceName] = useState("เสาเดี่ยว");
  const [postCount, setPostCount] = useState(2);
  const [freeInstallName, setFreeInstallName] = useState(freeInstallOptions[0]);
  const [colorName, setColorName] = useState(freeColors[0]);
  const [useSpecialColor, setUseSpecialColor] = useState(false);
  const [ceilingName, setCeilingName] = useState("");
  const [extraServiceQuantities, setExtraServiceQuantities] = useState<Record<string, number>>({});
  const [gutterName, setGutterName] = useState("");
  const [gutterLength, setGutterLength] = useState(5);
  const [customer, setCustomer] = useState(initialCustomer);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchCalculatorData = async () => {
      try {
        const [productResult, serviceResult] = await Promise.all([
          supabase
            .from("estimate_products")
            .select("id,type,name,image_url,image_alt,prices,display_order,is_active")
            .eq("is_active", true)
            .order("display_order", { ascending: true }),
          supabase
            .from("estimate_services")
            .select("id,service_type,service_group,name,price,unit,only_size,display_order,is_active")
            .eq("is_active", true)
            .order("display_order", { ascending: true }),
        ]);

        if (!mounted) return;

        if (!productResult.error && productResult.data && productResult.data.length > 0) {
          setCalculatorProducts((productResult.data as EstimateProductRow[]).map(mapProductRow));
        }

        if (!serviceResult.error && serviceResult.data && serviceResult.data.length > 0) {
          const serviceRows = serviceResult.data as EstimateServiceRow[];
          setCalculatorMainServices(serviceRows.filter((row) => row.service_type === "main").map(mapServiceRow));
          setCalculatorExtraServices(serviceRows.filter((row) => row.service_type === "extra").map(mapServiceRow));
          setCalculatorGutters(serviceRows.filter((row) => row.service_type === "gutter").map(mapServiceRow));
        }
      } catch (error) {
        console.warn("Estimate data could not be loaded from Supabase:", error);
      }
    };

    fetchCalculatorData();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(
    () => (materialType ? calculatorProducts.filter((product) => product.type === materialType) : []),
    [calculatorProducts, materialType]
  );

  const selectedProduct = useMemo(
    () => calculatorProducts.find((product) => product.name === productName && product.type === materialType) ?? null,
    [calculatorProducts, materialType, productName]
  );

  const availableSizes = useMemo(
    () => (selectedProduct ? sizes.filter((item) => selectedProduct.prices[item] > 0) : []),
    [selectedProduct]
  );

  const validSize = size && availableSizes.includes(size) ? size : "";
  const numericWidth = Number(width);
  const numericLength = Number(length);
  const hasRequiredEstimateInputs =
    Boolean(selectedProduct && validSize && numericWidth > 0 && numericLength > 0 && installStyle);

  const estimate = useMemo(() => {
    if (!hasRequiredEstimateInputs || !selectedProduct || !validSize) {
      return {
        squareMeters: 0,
        materialRate: 0,
        materialTotal: 0,
        postService: null,
        specialColorService: null,
        ceilingService: null,
        extraServiceItems: [],
        gutterService: null,
        postTotal: 0,
        colorTotal: 0,
        ceilingTotal: 0,
        extraTotal: 0,
        gutterTotal: 0,
        total: 0,
      };
    }

    const squareMeters = numericWidth * numericLength;
    const materialRate = selectedProduct.prices[validSize] || 0;
    const materialTotal = squareMeters * materialRate;
    const postService = installStyle === "มีเสา"
      ? calculatorMainServices.find((service) => service.name === postServiceName) ?? null
      : null;
    const specialColorService = useSpecialColor
      ? calculatorMainServices.find((service) => service.name === "สีผสมพิเศษ") ?? null
      : null;
    const ceilingService = validSize === "L+"
      ? calculatorMainServices.find((service) => service.name === ceilingName) ?? null
      : null;
    const extraServiceItems = calculatorExtraServices
      .filter((service) => extraServiceQuantities[service.name] !== undefined)
      .map((service) => {
        const quantity = Math.max(0, extraServiceQuantities[service.name] ?? 1);

        return {
          service,
          quantity,
          total: getServiceTotal(service, quantity, squareMeters),
        };
      });
    const gutterService = calculatorGutters.find((service) => service.name === gutterName) ?? null;

    const postTotal = getServiceTotal(postService, postCount, squareMeters);
    const colorTotal = getServiceTotal(specialColorService, 1, squareMeters);
    const ceilingTotal = getServiceTotal(ceilingService, 1, squareMeters);
    const extraTotal = extraServiceItems.reduce((sum, item) => sum + item.total, 0);
    const gutterTotal = getServiceTotal(gutterService, gutterLength, squareMeters);

    return {
      squareMeters,
      materialRate,
      materialTotal,
      postService,
      specialColorService,
      ceilingService,
      extraServiceItems,
      gutterService,
      postTotal,
      colorTotal,
      ceilingTotal,
      extraTotal,
      gutterTotal,
      total: materialTotal + postTotal + colorTotal + ceilingTotal + extraTotal + gutterTotal,
    };
  }, [
    ceilingName,
    calculatorExtraServices,
    calculatorGutters,
    calculatorMainServices,
    extraServiceQuantities,
    gutterLength,
    gutterName,
    hasRequiredEstimateInputs,
    installStyle,
    numericLength,
    numericWidth,
    postCount,
    postServiceName,
    selectedProduct,
    useSpecialColor,
    validSize,
  ]);

  const selectedExtraCount = estimate.extraServiceItems.length;
  const extraAndGutterTotal = estimate.colorTotal + estimate.ceilingTotal + estimate.extraTotal + estimate.gutterTotal;

  const handleMaterialTypeChange = (type: MaterialType) => {
    setMaterialType(type);
    setProductName("");
    setSize("");
  };

  const handleProductChange = (name: string) => {
    const product = calculatorProducts.find((item) => item.name === name && item.type === materialType);
    setProductName(name);
    if (!product) {
      setSize("");
      return;
    }
    const firstSize = sizes.find((item) => product.prices[item] > 0);
    setSize(firstSize ?? "");
  };

  const handleExtraServiceToggle = (serviceName: string, checked: boolean) => {
    setExtraServiceQuantities((current) => {
      if (checked) {
        return {
          ...current,
          [serviceName]: current[serviceName] ?? 1,
        };
      }

      const next = { ...current };
      delete next[serviceName];
      return next;
    });
  };

  const handleExtraQuantityChange = (serviceName: string, quantity: number) => {
    setExtraServiceQuantities((current) => ({
      ...current,
      [serviceName]: quantity,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasRequiredEstimateInputs || !selectedProduct || !validSize) {
      setStatus("error");
      setStatusText("กรุณาเลือกวัสดุ สินค้า ไซซ์ ขนาดพื้นที่ และรูปแบบติดตั้งก่อนส่งข้อมูล");
      return;
    }

    setStatus("sending");
    setStatusText("");

    const estimateMessage = [
      "ข้อมูลประเมินราคาเบื้องต้นจากหน้า /estimate",
      `ประเภทวัสดุ: ${materialType}`,
      `สินค้า: ${selectedProduct.name}`,
      selectedProduct.imageUrl ? `รูปสินค้า: ${selectedProduct.imageUrl}` : "",
      `ไซซ์ราคา: ${validSize} (${formatCurrency(estimate.materialRate)}/ตร.ม.)`,
      `พื้นที่: ${numericWidth} x ${numericLength} ม. (${estimate.squareMeters.toFixed(1)} ตร.ม.)`,
      `รูปแบบติดตั้ง: ${installStyle}${installStyle === "ไร้เสา" ? ` (${freeInstallName})` : ""}`,
      installStyle === "มีเสา" && estimate.postService ? `งานเสา: ${estimate.postService.name} x ${postCount}` : "",
      `สีโครงสร้าง: ${useSpecialColor ? "สีผสมพิเศษ" : colorName}`,
      estimate.ceilingService ? `งานฝ้า: ${estimate.ceilingService.name}` : "",
      estimate.extraServiceItems.length > 0
        ? `บริการเสริม: ${estimate.extraServiceItems.map((item) => `${item.service.name} x ${item.quantity}`).join(", ")}`
        : "",
      estimate.gutterService ? `รางน้ำ: ${estimate.gutterService.name} x ${gutterLength} เมตร` : "",
      customer.imageUrl ? `รูปหน้างาน/แบบที่ชอบ: ${customer.imageUrl}` : "",
      `รวมราคาเบื้องต้น: ${formatCurrency(estimate.total)}`,
      customer.message ? `รายละเอียดเพิ่มเติม: ${customer.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customer.name,
          phone: customer.phone,
          lineId: customer.lineId,
          email: customer.email,
          services: [
            selectedProduct.name,
            validSize,
            "ประเมินราคาออนไลน์",
            ...estimate.extraServiceItems.map((item) => item.service.name),
          ],
          message: estimateMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "ส่งข้อมูลไม่สำเร็จ");
      }

      setStatus("success");
      setStatusText("ส่งข้อมูลแล้ว ทีมงานจะติดต่อกลับพร้อมรายละเอียดหน้างานครับ");
      setCustomer(initialCustomer);
    } catch (error) {
      setStatus("error");
      setStatusText(error instanceof Error ? error.message : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 text-gray-900 sm:pt-20">
      <section className="bg-linear-to-r from-[#1E2E4F] to-[#314874] text-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-white/70">
            <Link href="/" className="transition hover:text-white" aria-label="หน้าแรก">
              <FaHome className="h-4 w-4" />
            </Link>
            <FaChevronRight className="h-3 w-3" />
            <span>ประเมินราคา</span>
          </nav>

          <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#eaf4ff]">SP Kansard Estimate</p>
              <h1 className="mt-2 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                คำนวณราคากันสาดแบบเร็วและส่งให้ทีมประเมินต่อ
              </h1>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-lg border border-white/20 bg-white/10 p-2 text-center text-xs font-semibold text-white/75 shadow-sm">
              <span className="rounded-md bg-white px-2 py-3 text-[#1E2E4F]">เลือกวัสดุ</span>
              <span className="rounded-md bg-white/10 px-2 py-3">ใส่ขนาด</span>
              <span className="rounded-md bg-white/10 px-2 py-3">ส่งข้อมูล</span>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
        <div className="space-y-4">
          <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#314874]">Step 1</p>
                <h2 className="text-xl font-black">วัสดุและรุ่น</h2>
              </div>
              <span className="rounded-full bg-[#eaf4ff] px-3 py-1 text-xs font-bold text-[#314874]">
                {calculatorProducts.length} รายการ
              </span>
            </div>

            <div className="grid gap-5 xl:grid-cols-[1fr_260px]">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {materialTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleMaterialTypeChange(type)}
                      className={`rounded-lg border px-4 py-3 text-sm font-black transition ${
                        materialType === type
                          ? "border-[#1E2E4F] bg-[#1E2E4F] text-white shadow-sm"
                          : "border-gray-200 bg-gray-50 text-gray-800 hover:border-[#314874]/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="grid gap-3 md:grid-cols-[1fr_190px]">
                  <label className="block">
                    <span className={labelClass}>สินค้า/วัสดุ</span>
                    <select
                      value={productName}
                      onChange={(event) => handleProductChange(event.target.value)}
                      className={`mt-2 ${inputClass}`}
                      disabled={!materialType}
                    >
                      <option value="">เลือกสินค้า/วัสดุ</option>
                      {filteredProducts.map((product) => (
                        <option key={`${product.type}-${product.name}`} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className={labelClass}>ไซซ์ราคา</span>
                    <select
                      value={validSize}
                      onChange={(event) => setSize(event.target.value as PriceSize)}
                      className={`mt-2 ${inputClass}`}
                      disabled={!selectedProduct}
                    >
                      <option value="">เลือกไซซ์</option>
                      {availableSizes.map((item) => (
                        <option key={item} value={item}>
                          {item} - {formatCurrency(selectedProduct?.prices[item] || 0)}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {selectedProduct && (
                  <div className="grid gap-2 sm:grid-cols-3">
                    {availableSizes.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setSize(item)}
                        className={`rounded-lg border p-3 text-left transition ${
                          validSize === item
                            ? "border-[#314874] bg-[#eaf4ff]"
                            : "border-gray-200 bg-white hover:border-[#314874]/50"
                        }`}
                      >
                        <span className="block text-sm font-black text-gray-900">{item}</span>
                        <span className="mt-1 block text-xs text-gray-500">
                          {formatCurrency(selectedProduct.prices[item])}/ตร.ม.
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-3">
                {selectedProduct?.imageUrl ? (
                  <div
                    role="img"
                    aria-label={selectedProduct.imageAlt || selectedProduct.name}
                    className="h-36 rounded-md bg-cover bg-center"
                    style={{ backgroundImage: `url("${selectedProduct.imageUrl}")` }}
                  />
                ) : (
                  <div className="flex h-28 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 bg-gray-50 text-gray-400">
                    <FaImage className="h-7 w-7" />
                    <span className="text-xs font-semibold">ยังไม่มีรูปสินค้า</span>
                  </div>
                )}

                <div className="mt-3 space-y-2">
                  <p className="line-clamp-2 text-sm font-bold leading-6 text-gray-900">
                    {selectedProduct?.name || "เลือกสินค้าเพื่อดูรายละเอียด"}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span className="rounded-full bg-gray-100 px-2 py-1">
                      {materialType || "ยังไม่เลือกวัสดุ"}
                    </span>
                    <span className="rounded-full bg-[#eaf4ff] px-2 py-1 text-[#314874]">
                      {validSize ? `${validSize} ${formatCurrency(estimate.materialRate)}/ตร.ม.` : "เลือกไซซ์ราคา"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#314874]">Step 2</p>
              <h2 className="text-xl font-black">ขนาดและการติดตั้ง</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className={labelClass}>กว้าง (เมตร)</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={width}
                  onChange={(event) => setWidth(event.target.value)}
                  placeholder="เช่น 3"
                  className={`mt-2 ${inputClass}`}
                />
              </label>
              <label className="block">
                <span className={labelClass}>ยาว (เมตร)</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={length}
                  onChange={(event) => setLength(event.target.value)}
                  placeholder="เช่น 5"
                  className={`mt-2 ${inputClass}`}
                />
              </label>
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_220px]">
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3 text-sm font-bold">
                <FaRulerCombined className="text-[#314874]" />
                <span>พื้นที่ {estimate.squareMeters.toFixed(1)} ตร.ม.</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(["มีเสา", "ไร้เสา"] as InstallStyle[]).map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setInstallStyle(style)}
                    className={`rounded-lg border px-4 py-3 text-sm font-black transition ${
                      installStyle === style
                        ? "border-[#1E2E4F] bg-[#1E2E4F] text-white"
                        : "border-gray-200 bg-white hover:border-[#314874]/50"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {installStyle && (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {installStyle === "มีเสา" ? (
                  <>
                    <label className="block">
                      <span className={labelClass}>รูปแบบเสา</span>
                      <select
                        value={postServiceName}
                        onChange={(event) => setPostServiceName(event.target.value)}
                        className={`mt-2 ${inputClass}`}
                      >
                        {calculatorMainServices
                          .filter((service) => service.group === "งานเสา")
                          .map((service) => (
                            <option key={service.name} value={service.name}>
                              {service.name} - {formatCurrency(service.price)}/{unitLabels[service.unit]}
                            </option>
                          ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className={labelClass}>จำนวนต้น</span>
                      <input
                        type="number"
                        min="0"
                        value={postCount}
                        onChange={(event) => setPostCount(Number(event.target.value))}
                        className={`mt-2 ${inputClass}`}
                      />
                    </label>
                  </>
                ) : (
                  <label className="block md:col-span-2">
                    <span className={labelClass}>รูปแบบไร้เสา</span>
                    <select
                      value={freeInstallName}
                      onChange={(event) => setFreeInstallName(event.target.value)}
                      className={`mt-2 ${inputClass}`}
                    >
                      {freeInstallOptions.map((item) => (
                        <option key={item} value={item}>
                          {item} - ฟรี
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
            )}
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <details>
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#314874]">Optional</p>
                    <h2 className="text-xl font-black">ตัวเลือกเสริม</h2>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
                    เลือกแล้ว {selectedExtraCount}
                  </span>
                </div>
              </summary>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>สีโครงสร้าง</span>
                  <select
                    value={useSpecialColor ? "สีผสมพิเศษ" : colorName}
                    onChange={(event) => {
                      const value = event.target.value;
                      setUseSpecialColor(value === "สีผสมพิเศษ");
                      if (value !== "สีผสมพิเศษ") setColorName(value);
                    }}
                    className={`mt-2 ${inputClass}`}
                  >
                    {freeColors.map((item) => (
                      <option key={item} value={item}>
                        {item} - ฟรี
                      </option>
                    ))}
                    <option value="สีผสมพิเศษ">สีผสมพิเศษ - 200 บาท/ตร.ม.</option>
                  </select>
                </label>

                <label className="block">
                  <span className={labelClass}>งานฝ้า {validSize !== "L+" ? "(เฉพาะ L+)" : ""}</span>
                  <select
                    value={validSize === "L+" ? ceilingName : ""}
                    disabled={validSize !== "L+"}
                    onChange={(event) => setCeilingName(event.target.value)}
                    className={`mt-2 ${inputClass}`}
                  >
                    <option value="">ไม่เลือก</option>
                    {calculatorMainServices
                      .filter((service) => service.group === "งานฝ้า ใช้เฉพาะ L+")
                      .map((service) => (
                        <option key={service.name} value={service.name}>
                          {service.name} - {formatCurrency(service.price)}/ตร.ม.
                        </option>
                      ))}
                  </select>
                </label>

                <label className="block">
                  <span className={labelClass}>วัสดุรางน้ำ</span>
                  <select
                    value={gutterName}
                    onChange={(event) => setGutterName(event.target.value)}
                    className={`mt-2 ${inputClass}`}
                  >
                    <option value="">ไม่เลือก</option>
                    {calculatorGutters.map((service) => (
                      <option key={service.name} value={service.name}>
                        {service.group} - {service.name} ({formatCurrency(service.price)}/เมตร)
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className={labelClass}>ความยาวรางน้ำ (เมตร)</span>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={gutterLength}
                    disabled={!gutterName}
                    onChange={(event) => setGutterLength(Number(event.target.value))}
                    className={`mt-2 ${inputClass}`}
                  />
                </label>
              </div>

              <div className="mt-5">
                <p className={labelClass}>บริการเสริม</p>
                <div className="mt-2 grid gap-2">
                  {calculatorExtraServices.map((service) => {
                    const isSelected = extraServiceQuantities[service.name] !== undefined;

                    return (
                      <div
                        key={service.name}
                        className={`grid gap-3 rounded-lg border px-3 py-3 transition sm:grid-cols-[minmax(0,1fr)_110px] ${
                          isSelected
                            ? "border-[#314874] bg-[#eaf4ff]"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(event) => handleExtraServiceToggle(service.name, event.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#314874] focus:ring-[#314874]"
                          />
                          <span className="min-w-0">
                            <span className="block text-sm font-bold text-gray-900">
                              {service.group} - {service.name}
                            </span>
                            <span className="mt-1 block text-xs text-gray-500">
                              {formatCurrency(service.price)}/{unitLabels[service.unit]}
                            </span>
                          </span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={extraServiceQuantities[service.name] ?? 1}
                          disabled={!isSelected}
                          onChange={(event) => handleExtraQuantityChange(service.name, Number(event.target.value))}
                          className={inputClass}
                          aria-label={`จำนวน ${service.name}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </details>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <section className="overflow-hidden rounded-lg border border-[#1E2E4F]/20 bg-white shadow-sm">
            <div className="bg-[#1E2E4F] p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Estimated Total</p>
              <div className="mt-3 text-4xl font-black leading-none">{formatCurrency(estimate.total)}</div>
              <p className="mt-3 text-sm leading-6 text-white/75">
                ราคาเบื้องต้นจะอัปเดตตามตัวเลือกที่กรอก
              </p>
            </div>
            <div className="space-y-3 p-5 text-sm">
              <SummaryRow label="วัสดุ" value={formatCurrency(estimate.materialTotal)} />
              <SummaryRow label="ติดตั้ง/งานเสา" value={formatCurrency(estimate.postTotal)} />
              <SummaryRow label="ตัวเลือกเสริม" value={formatCurrency(extraAndGutterTotal)} />
              <div className="rounded-lg bg-[#eaf4ff] p-4 text-sm leading-6 text-[#314874]">
                ราคานี้เป็นตัวเลขประเมิน ทีมงานจะตรวจหน้างานก่อนยืนยันราคาอีกครั้ง
              </div>
            </div>
          </section>

          <form
            id="estimate-contact"
            onSubmit={handleSubmit}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#314874]">
                <FaCalculator />
              </div>
              <div>
                <h2 className="text-xl font-black">ขอใบเสนอราคา</h2>
                <p className="text-sm text-gray-500">ส่งข้อมูลให้ทีมงานติดต่อกลับ</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block">
                <span className={labelClass}>ชื่อ *</span>
                <input
                  value={customer.name}
                  onChange={(event) => setCustomer((data) => ({ ...data, name: event.target.value }))}
                  required
                  className={`mt-2 ${inputClass}`}
                />
              </label>
              <label className="block">
                <span className={labelClass}>เบอร์โทร *</span>
                <input
                  value={customer.phone}
                  onChange={(event) => setCustomer((data) => ({ ...data, phone: event.target.value }))}
                  required
                  inputMode="tel"
                  className={`mt-2 ${inputClass}`}
                />
              </label>
              <label className="block">
                <span className={labelClass}>LINE ID *</span>
                <input
                  value={customer.lineId}
                  onChange={(event) => setCustomer((data) => ({ ...data, lineId: event.target.value }))}
                  required
                  className={`mt-2 ${inputClass}`}
                />
              </label>
              <label className="block">
                <span className={labelClass}>อีเมล</span>
                <input
                  value={customer.email}
                  onChange={(event) => setCustomer((data) => ({ ...data, email: event.target.value }))}
                  type="email"
                  className={`mt-2 ${inputClass}`}
                />
              </label>
              <label className="block">
                <span className={labelClass}>ลิงก์รูปหน้างาน/แบบที่ชอบ</span>
                <input
                  value={customer.imageUrl}
                  onChange={(event) => setCustomer((data) => ({ ...data, imageUrl: event.target.value }))}
                  type="url"
                  placeholder="Google Drive, LINE album, URL รูป"
                  className={`mt-2 ${inputClass}`}
                />
              </label>
              <label className="block">
                <span className={labelClass}>รายละเอียดเพิ่มเติม</span>
                <textarea
                  value={customer.message}
                  onChange={(event) => setCustomer((data) => ({ ...data, message: event.target.value }))}
                  rows={3}
                  placeholder="เช่น พื้นที่ติดตั้ง มีเสาเดิม หรือข้อจำกัดหน้างาน"
                  className={`mt-2 ${inputClass}`}
                />
              </label>
            </div>

            {statusText && (
              <p
                className={`mt-4 rounded-lg px-4 py-3 text-sm ${
                  status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {statusText}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending" || !hasRequiredEstimateInputs}
              className="mt-5 w-full rounded-lg bg-[#314874] px-5 py-3 font-black text-white transition hover:bg-[#1E2E4F] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "กำลังส่งข้อมูล..." : "ส่งขอใบเสนอราคา"}
            </button>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href="tel:02-936-8841"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-bold text-[#314874] transition hover:bg-gray-50"
              >
                <FaPhoneAlt className="h-4 w-4" />
                โทรหาเรา
              </a>
              <a
                href="https://line.me/R/ti/p/@spkansard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#06C755] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#05B84E]"
              >
                <FaLine className="h-4 w-4" />
                LINE
              </a>
            </div>
          </form>
        </aside>
      </main>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-b-0">
      <span className="text-gray-500">{label}</span>
      <strong className="text-right text-gray-900">{value}</strong>
    </div>
  );
}
