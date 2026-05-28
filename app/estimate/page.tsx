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
  extraServices,
  formatCurrency,
  freeColors,
  freeInstallOptions,
  getServiceTotal,
  gutters,
  mainServices,
  products,
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
  const [calculatorProducts, setCalculatorProducts] = useState<Product[]>(products);
  const [calculatorMainServices, setCalculatorMainServices] = useState<ServiceOption[]>(mainServices);
  const [calculatorExtraServices, setCalculatorExtraServices] = useState<ServiceOption[]>(extraServices);
  const [calculatorGutters, setCalculatorGutters] = useState<ServiceOption[]>(gutters);
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
  const [extraName, setExtraName] = useState("");
  const [extraQuantity, setExtraQuantity] = useState(1);
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
        console.warn("Estimate data fallback is active:", error);
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
        extraService: null,
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
    const extraService = calculatorExtraServices.find((service) => service.name === extraName) ?? null;
    const gutterService = calculatorGutters.find((service) => service.name === gutterName) ?? null;

    const postTotal = getServiceTotal(postService, postCount, squareMeters);
    const colorTotal = getServiceTotal(specialColorService, 1, squareMeters);
    const ceilingTotal = getServiceTotal(ceilingService, 1, squareMeters);
    const extraTotal = getServiceTotal(extraService, extraQuantity, squareMeters);
    const gutterTotal = getServiceTotal(gutterService, gutterLength, squareMeters);

    return {
      squareMeters,
      materialRate,
      materialTotal,
      postService,
      specialColorService,
      ceilingService,
      extraService,
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
    extraName,
    extraQuantity,
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

  const handleMaterialTypeChange = (type: MaterialType) => {
    setMaterialType(type);
    setProductName("");
    setSize("");
  };

  const handleProductChange = (name: string) => {
    const product = calculatorProducts.find((item) => item.name === name);
    setProductName(name);
    if (!product) {
      setSize("");
      return;
    }
    const firstSize = sizes.find((item) => product.prices[item] > 0);
    setSize(firstSize ?? "");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasRequiredEstimateInputs || !selectedProduct || !validSize) {
      setStatus("error");
      setStatusText("กรุณาเลือกวัสดุ สินค้า ไซซ์ราคา ขนาดพื้นที่ และรูปแบบติดตั้งก่อนส่งข้อมูล");
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
      estimate.extraService ? `บริการเสริม: ${estimate.extraService.name} x ${extraQuantity}` : "",
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
          services: [selectedProduct.name, validSize, "ประเมินราคาออนไลน์"],
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
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
      <section className="relative bg-linear-to-r from-[#1E2E4F] to-[#314874] py-8 text-white sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/75">
            <Link href="/" className="transition hover:text-white" aria-label="หน้าแรก">
              <FaHome className="h-4 w-4" />
            </Link>
            <FaChevronRight className="h-3 w-3" />
            <span>ประเมินราคา</span>
          </nav>

          <div className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/65 sm:text-sm">
              SP KANSARD ESTIMATE
            </p>
            <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              คำนวณราคากันสาดเบื้องต้น
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#eaf4ff] sm:text-lg">
              เลือกวัสดุ ขนาด และรูปแบบติดตั้งก่อน ระบบจะเริ่มคำนวณจาก 0 และอัปเดตยอดให้อัตโนมัติ
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_390px] lg:px-8 lg:py-10">
        <div className="space-y-5">
          <div className="rounded-lg border border-[#dbeafe] bg-[#eaf4ff] p-5 text-[#1E2E4F] sm:p-6">
            <h2 className="text-lg font-semibold">วิธีใช้งาน</h2>
            <div className="mt-3 grid gap-3 text-sm leading-6 text-gray-700 sm:grid-cols-3">
              <p><strong className="text-[#1E2E4F]">1.</strong> เลือกวัสดุและสินค้า</p>
              <p><strong className="text-[#1E2E4F]">2.</strong> ใส่ขนาดและรูปแบบติดตั้ง</p>
              <p><strong className="text-[#1E2E4F]">3.</strong> เพิ่มตัวเลือกเสริมแล้วส่งข้อมูล</p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-[#1E2E4F]">เลือกงานหลัก</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {(["โปร่งแสง", "ทึบแสง"] as MaterialType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleMaterialTypeChange(type)}
                      className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                        materialType === type
                          ? "border-[#314874] bg-[#eaf4ff] text-[#1E2E4F]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-[#314874]/40"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_190px]">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">สินค้า/วัสดุ</span>
                    <select
                      value={productName}
                      onChange={(event) => handleProductChange(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                      disabled={!materialType}
                    >
                      <option value="">เลือกสินค้า/วัสดุ</option>
                      {filteredProducts.map((product) => (
                        <option key={product.name} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">ไซซ์ราคา</span>
                    <select
                      value={validSize}
                      onChange={(event) => setSize(event.target.value as PriceSize)}
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                      disabled={!selectedProduct}
                    >
                      <option value="">เลือกไซซ์</option>
                      {availableSizes.map((item) => (
                        <option key={item} value={item}>
                          {item} - {formatCurrency(selectedProduct?.prices[item] ?? 0)}/ตร.ม.
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="lg:w-56">
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  {selectedProduct?.imageUrl ? (
                    <div
                      role="img"
                      aria-label={selectedProduct.imageAlt || selectedProduct.name}
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url("${selectedProduct.imageUrl}")` }}
                    />
                  ) : (
                    <div className="px-5 text-center text-sm leading-6 text-gray-500">
                      <FaImage className="mx-auto mb-2 h-8 w-8 text-[#314874]/60" />
                      รองรับรูปสินค้าในไฟล์ data
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
            <h2 className="text-xl font-semibold text-[#1E2E4F]">ขนาดและติดตั้ง</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">กว้าง (เมตร)</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={width}
                  onChange={(event) => setWidth(event.target.value)}
                  placeholder="เช่น 3"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">ยาว (เมตร)</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={length}
                  onChange={(event) => setLength(event.target.value)}
                  placeholder="เช่น 5"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
              <div className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700">
                <FaRulerCombined className="h-4 w-4 text-[#314874]" />
                พื้นที่ {estimate.squareMeters.toFixed(1)} ตร.ม.
              </div>
              {(["มีเสา", "ไร้เสา"] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setInstallStyle(style)}
                  className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                    installStyle === style
                      ? "border-[#314874] bg-[#314874] text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#314874]/40"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            {installStyle && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {installStyle === "มีเสา" ? (
                  <>
                    <label className="block">
                      <span className="text-sm font-medium text-gray-700">งานเสา</span>
                      <select
                        value={postServiceName}
                        onChange={(event) => setPostServiceName(event.target.value)}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
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
                      <span className="text-sm font-medium text-gray-700">จำนวนต้น</span>
                      <input
                        type="number"
                        min="0"
                        value={postCount}
                        onChange={(event) => setPostCount(Number(event.target.value))}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                      />
                    </label>
                  </>
                ) : (
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-gray-700">รูปแบบไร้เสา</span>
                    <select
                      value={freeInstallName}
                      onChange={(event) => setFreeInstallName(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
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
          </div>

          <details className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
            <summary className="cursor-pointer text-xl font-semibold text-[#1E2E4F]">
              ตัวเลือกเสริม
            </summary>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">สีโครงสร้าง</span>
                <select
                  value={useSpecialColor ? "สีผสมพิเศษ" : colorName}
                  onChange={(event) => {
                    const value = event.target.value;
                    setUseSpecialColor(value === "สีผสมพิเศษ");
                    if (value !== "สีผสมพิเศษ") setColorName(value);
                  }}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
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
                <span className="text-sm font-medium text-gray-700">งานฝ้า {validSize !== "L+" ? "(เฉพาะ L+)" : ""}</span>
                <select
                  value={validSize === "L+" ? ceilingName : ""}
                  disabled={validSize !== "L+"}
                  onChange={(event) => setCeilingName(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 disabled:bg-gray-100 disabled:text-gray-400 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
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
                <span className="text-sm font-medium text-gray-700">บริการเสริม</span>
                <select
                  value={extraName}
                  onChange={(event) => setExtraName(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                >
                  <option value="">ไม่เลือก</option>
                  {calculatorExtraServices.map((service) => (
                    <option key={service.name} value={service.name}>
                      {service.group} - {service.name} ({formatCurrency(service.price)}/{unitLabels[service.unit]})
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">จำนวนบริการเสริม</span>
                <input
                  type="number"
                  min="0"
                  value={extraQuantity}
                  disabled={!extraName}
                  onChange={(event) => setExtraQuantity(Number(event.target.value))}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 disabled:bg-gray-100 disabled:text-gray-400 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">วัสดุรางน้ำ</span>
                <select
                  value={gutterName}
                  onChange={(event) => setGutterName(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
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
                <span className="text-sm font-medium text-gray-700">ความยาวรางน้ำ (เมตร)</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={gutterLength}
                  disabled={!gutterName}
                  onChange={(event) => setGutterLength(Number(event.target.value))}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 disabled:bg-gray-100 disabled:text-gray-400 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
            </div>
          </details>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5">
            <div className="bg-[#314874] px-5 py-4 text-white sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Estimated Total
              </p>
              <h2 className="mt-1 text-lg font-semibold">รวมราคาเบื้องต้น</h2>
            </div>
            <div className="p-5 sm:p-6">
              <div className="text-3xl font-bold leading-tight text-[#1E2E4F]">
                {formatCurrency(estimate.total)}
              </div>
              {!hasRequiredEstimateInputs && (
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  เลือกวัสดุ สินค้า ไซซ์ ขนาด และรูปแบบติดตั้งก่อน ยอดรวมจะเริ่มคำนวณจาก 0
                </p>
              )}
              <div className="mt-5 space-y-3 border-t border-gray-100 pt-5 text-sm text-gray-600">
                <div className="flex justify-between gap-4">
                  <span>วัสดุ</span>
                  <strong className="text-right text-[#1E2E4F]">{formatCurrency(estimate.materialTotal)}</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span>ติดตั้ง/งานเสา</span>
                  <strong className="text-right text-[#1E2E4F]">{formatCurrency(estimate.postTotal)}</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span>ตัวเลือกเสริม</span>
                  <strong className="text-right text-[#1E2E4F]">
                    {formatCurrency(estimate.colorTotal + estimate.ceilingTotal + estimate.extraTotal + estimate.gutterTotal)}
                  </strong>
                </div>
              </div>
              <p className="mt-5 rounded-lg bg-[#eaf4ff] px-4 py-3 text-sm leading-6 text-gray-600">
                ราคาเบื้องต้นยังไม่ใช่ใบเสนอราคาสุดท้าย ทีมงานจะตรวจรายละเอียดหน้างานก่อนยืนยันราคา
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#314874]">
                <FaCalculator className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1E2E4F]">ขอใบเสนอราคา</h2>
                <p className="mt-1 text-sm text-gray-500">ส่งข้อมูลให้ทีมงานติดต่อกลับ</p>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">ชื่อ *</span>
                <input
                  value={customer.name}
                  onChange={(event) => setCustomer((data) => ({ ...data, name: event.target.value }))}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">เบอร์โทร *</span>
                <input
                  value={customer.phone}
                  onChange={(event) => setCustomer((data) => ({ ...data, phone: event.target.value }))}
                  required
                  inputMode="tel"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">LINE ID *</span>
                <input
                  value={customer.lineId}
                  onChange={(event) => setCustomer((data) => ({ ...data, lineId: event.target.value }))}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">อีเมล</span>
                <input
                  value={customer.email}
                  onChange={(event) => setCustomer((data) => ({ ...data, email: event.target.value }))}
                  type="email"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">ลิงก์รูปหน้างาน/แบบที่ชอบ</span>
                <input
                  value={customer.imageUrl}
                  onChange={(event) => setCustomer((data) => ({ ...data, imageUrl: event.target.value }))}
                  type="url"
                  placeholder="เช่น Google Drive, LINE album, รูปตัวอย่าง"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">รายละเอียดเพิ่มเติม</span>
                <textarea
                  value={customer.message}
                  onChange={(event) => setCustomer((data) => ({ ...data, message: event.target.value }))}
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                  placeholder="เช่น พื้นที่ติดตั้ง, มีเสาเดิมหรือยังไม่มีเสา"
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
              className="mt-5 w-full rounded-lg bg-[#314874] px-5 py-3 font-semibold text-white transition hover:bg-[#1E2E4F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "กำลังส่งข้อมูล..." : "ส่งขอใบเสนอราคา"}
            </button>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href="tel:02-936-8841"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-[#1E2E4F] transition hover:bg-gray-50"
              >
                <FaPhoneAlt className="h-4 w-4" />
                โทรหาเรา
              </a>
              <a
                href="https://line.me/R/ti/p/@spkansard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#06C755] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#05B84E]"
              >
                <FaLine className="h-4 w-4" />
                LINE
              </a>
            </div>
          </form>
        </aside>
      </section>
    </div>
  );
}
