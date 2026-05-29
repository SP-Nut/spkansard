"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  freeColors,
  freeInstallOptions,
  sizes,
  type MaterialType,
  type PriceSize,
  type Product,
  type ServiceOption,
} from "../estimateData";
import { calculateEstimate } from "../lib/calculateEstimate";
import { formatEstimateMessage } from "../lib/formatEstimateMessage";
import type {
  CustomerInfo,
  EstimateProductRow,
  EstimateSelectionSummary,
  EstimateServiceRow,
  InstallType,
} from "../types/estimate.types";
import { ContactLeadForm } from "./ContactLeadForm";
import { DimensionStep } from "./DimensionStep";
import { EstimateSummary } from "./EstimateSummary";
import { InstallTypeStep } from "./InstallTypeStep";
import { OptionsStep } from "./OptionsStep";
import { ProductStep } from "./ProductStep";
import { RoofTypeStep } from "./RoofTypeStep";
import { SizeStep } from "./SizeStep";
import { StepProgress } from "./StepProgress";

const initialCustomer: CustomerInfo = {
  name: "",
  phone: "",
  lineId: "",
  email: "",
  location: "",
  imageUrl: "",
  message: "",
};

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

export function EstimateCalculator() {
  const [products, setProducts] = useState<Product[]>([]);
  const [mainServices, setMainServices] = useState<ServiceOption[]>([]);
  const [extraServices, setExtraServices] = useState<ServiceOption[]>([]);
  const [gutters, setGutters] = useState<ServiceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [selectedRoofType, setSelectedRoofType] = useState<MaterialType | "">("");
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedSize, setSelectedSize] = useState<PriceSize | "">("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [installType, setInstallType] = useState<InstallType>("");
  const [postServiceName, setPostServiceName] = useState("เสาเดี่ยว");
  const [postCount, setPostCount] = useState(2);
  const [freeInstallName, setFreeInstallName] = useState(freeInstallOptions[0]);
  const [selectedColor, setSelectedColor] = useState(freeColors[0]);
  const [selectedCeiling, setSelectedCeiling] = useState("");
  const [selectedGutter, setSelectedGutter] = useState("");
  const [gutterMeters, setGutterMeters] = useState(5);
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({});
  const [customer, setCustomer] = useState<CustomerInfo>(initialCustomer);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusText, setStatusText] = useState("");

  const fetchCalculatorData = async () => {
    setLoading(true);
    setLoadError("");

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

      if (productResult.error) throw productResult.error;
      if (serviceResult.error) throw serviceResult.error;

      setProducts(((productResult.data || []) as EstimateProductRow[]).map(mapProductRow));
      const rawServiceRows = (serviceResult.data || []) as EstimateServiceRow[];
      setMainServices(rawServiceRows.filter((row) => row.service_type === "main").map(mapServiceRow));
      setExtraServices(rawServiceRows.filter((row) => row.service_type === "extra").map(mapServiceRow));
      setGutters(rawServiceRows.filter((row) => row.service_type === "gutter").map(mapServiceRow));
    } catch (error) {
      console.warn("Estimate data could not be loaded from Supabase:", error);
      setLoadError("load-failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalculatorData();
  }, []);

  const filteredProducts = useMemo(
    () => (selectedRoofType ? products.filter((product) => product.type === selectedRoofType) : []),
    [products, selectedRoofType]
  );

  const selectedProduct = useMemo(
    () => products.find((product) => product.name === selectedProductName && product.type === selectedRoofType) ?? null,
    [products, selectedProductName, selectedRoofType]
  );

  const estimate = useMemo(
    () =>
      calculateEstimate({
        selectedProduct,
        selectedSize,
        width,
        length,
        installType,
        postServiceName,
        postCount,
        selectedColor,
        selectedCeiling,
        selectedGutter,
        gutterMeters,
        selectedServices,
        mainServices,
        extraServices,
        gutters,
      }),
    [
      selectedProduct,
      selectedSize,
      width,
      length,
      installType,
      postServiceName,
      postCount,
      selectedColor,
      selectedCeiling,
      selectedGutter,
      gutterMeters,
      selectedServices,
      mainServices,
      extraServices,
      gutters,
    ]
  );

  const currentStep = useMemo(() => {
    if (!selectedRoofType) return 0;
    if (!selectedProduct) return 1;
    if (!selectedSize) return 2;
    if (!estimate.width || !estimate.length) return 3;
    if (!installType) return 4;
    return 5;
  }, [estimate.length, estimate.width, installType, selectedProduct, selectedRoofType, selectedSize]);

  const selection: EstimateSelectionSummary = useMemo(
    () => ({
      roofType: selectedRoofType,
      product: selectedProduct,
      size: selectedSize,
      installType,
      postCount,
      color: selectedColor,
      ceiling: selectedCeiling,
      gutterMeters,
    }),
    [gutterMeters, installType, postCount, selectedCeiling, selectedColor, selectedProduct, selectedRoofType, selectedSize]
  );

  const formattedMessage = useMemo(
    () => formatEstimateMessage(selection, estimate, customer),
    [customer, estimate, selection]
  );

  const missingText = estimate.missingFields.length
    ? `${estimate.missingFields.join(" / ")} ก่อนส่งประเมิน`
    : "เลือกสินค้าและกรอกขนาดก่อนส่งประเมิน";

  const handleRoofTypeChange = (type: MaterialType) => {
    setSelectedRoofType(type);
    setSelectedProductName("");
    setSelectedSize("");
    setSelectedCeiling("");
  };

  const handleProductChange = (name: string) => {
    const product = products.find((item) => item.name === name && item.type === selectedRoofType);
    setSelectedProductName(name);
    const firstSize = product ? sizes.find((size) => product.prices[size] > 0) : "";
    setSelectedSize(firstSize || "");
    setSelectedCeiling("");
  };

  const handleSizeChange = (size: PriceSize) => {
    setSelectedSize(size);
    if (size !== "L+") setSelectedCeiling("");
  };

  const handleExtraToggle = (serviceName: string, checked: boolean) => {
    setSelectedServices((current) => {
      if (checked) return { ...current, [serviceName]: current[serviceName] ?? 1 };
      const next = { ...current };
      delete next[serviceName];
      return next;
    });
  };

  const handleExtraQuantityChange = (serviceName: string, quantity: number) => {
    setSelectedServices((current) => ({ ...current, [serviceName]: quantity }));
  };

  const handleSaveSummaryImage = async () => {
    if (!estimate.isReady) return;
    try {
      const canvas = document.createElement("canvas");
      const widthPx = 1200;
      const heightPx = 1600;
      canvas.width = widthPx;
      canvas.height = heightPx;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas is not supported");

      context.fillStyle = "#f4fbff";
      context.fillRect(0, 0, widthPx, heightPx);
      context.fillStyle = "#30318B";
      context.fillRect(0, 0, widthPx, 260);
      context.fillStyle = "#ffffff";
      context.font = "700 34px Arial, sans-serif";
      context.fillText("SP Kansard Estimate", 72, 86);
      context.font = "900 58px Arial, sans-serif";
      context.fillText("ราคาประเมินเบื้องต้น", 72, 165);
      context.font = "900 66px Arial, sans-serif";
      context.fillText(new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(estimate.total), 72, 240);

      context.fillStyle = "#ffffff";
      context.beginPath();
      context.roundRect(56, 300, widthPx - 112, heightPx - 380, 32);
      context.fill();

      context.fillStyle = "#0f172a";
      context.font = "700 30px Arial, sans-serif";
      const lines = formattedMessage.split("\n").filter(Boolean);
      let y = 360;
      const maxWidth = widthPx - 180;
      const lineHeight = 44;

      lines.forEach((line) => {
        const words = line.split(" ");
        let currentLine = "";
        words.forEach((word) => {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          if (context.measureText(testLine).width > maxWidth && currentLine) {
            context.fillText(currentLine, 90, y);
            y += lineHeight;
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        });
        context.fillText(currentLine, 90, y);
        y += lineHeight;
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "sp-kansard-estimate.png";
      link.click();
      setStatus("success");
      setStatusText("บันทึกผลประเมินเป็นรูปภาพแล้ว");
    } catch {
      setStatus("error");
      setStatusText("ไม่สามารถบันทึกรูปผลประเมินได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!estimate.isReady || !selectedProduct || !selectedSize) {
      setStatus("error");
      setStatusText(missingText);
      return;
    }

    setStatus("sending");
    setStatusText("");

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
            selectedSize,
            "ประเมินราคาออนไลน์",
            selectedRoofType,
            installType,
            ...estimate.extraServiceItems.map((item) => item.service.name),
          ],
          message: formattedMessage,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "ส่งข้อมูลไม่สำเร็จ");

      setStatus("success");
      setStatusText("ส่งข้อมูลแล้ว ทีมงานจะติดต่อกลับพร้อมรายละเอียดหน้างานครับ");
      setCustomer(initialCustomer);
    } catch (error) {
      setStatus("error");
      setStatusText(error instanceof Error ? error.message : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <section id="estimate-calculator" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <StepProgress currentStep={currentStep} />
      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="space-y-5">
          <RoofTypeStep selectedType={selectedRoofType} onSelect={handleRoofTypeChange} />
          <ProductStep
            roofType={selectedRoofType}
            products={filteredProducts}
            selectedProductName={selectedProductName}
            loading={loading}
            error={loadError}
            onRetry={fetchCalculatorData}
            onSelect={handleProductChange}
          />
          <SizeStep product={selectedProduct} selectedSize={selectedSize} onSelect={handleSizeChange} />
          <DimensionStep
            width={width}
            length={length}
            area={estimate.squareMeters}
            onWidthChange={setWidth}
            onLengthChange={setLength}
          />
          <InstallTypeStep
            installType={installType}
            postServiceName={postServiceName}
            postCount={postCount}
            freeInstallName={freeInstallName}
            mainServices={mainServices}
            freeInstallOptions={freeInstallOptions}
            onInstallTypeChange={setInstallType}
            onPostServiceChange={setPostServiceName}
            onPostCountChange={setPostCount}
            onFreeInstallChange={setFreeInstallName}
          />
          <OptionsStep
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            selectedCeiling={selectedCeiling}
            selectedGutter={selectedGutter}
            gutterMeters={gutterMeters}
            selectedServices={selectedServices}
            mainServices={mainServices}
            extraServices={extraServices}
            gutters={gutters}
            freeColors={freeColors}
            area={estimate.squareMeters}
            onColorChange={setSelectedColor}
            onCeilingChange={setSelectedCeiling}
            onGutterChange={setSelectedGutter}
            onGutterMetersChange={setGutterMeters}
            onExtraToggle={handleExtraToggle}
            onExtraQuantityChange={handleExtraQuantityChange}
          />
        </div>

        <EstimateSummary
          selection={selection}
          estimate={estimate}
          freeInstallName={freeInstallName}
          missingText={missingText}
          onOpenContact={() => {
            setContactOpen(true);
            setMobileSummaryOpen(false);
          }}
          onSaveSummaryImage={handleSaveSummaryImage}
          mobileOpen={mobileSummaryOpen}
          onMobileOpenChange={setMobileSummaryOpen}
        />
      </div>

      <ContactLeadForm
        open={contactOpen}
        customer={customer}
        status={status}
        statusText={statusText}
        onClose={() => setContactOpen(false)}
        onCustomerChange={setCustomer}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
