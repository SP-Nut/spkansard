"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaCalculator,
  FaEdit,
  FaPlus,
  FaSave,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { AdminAuth } from "@/lib/auth";
import {
  formatCurrency,
  sizes,
  unitLabels,
  type MaterialType,
  type PriceSize,
  type Unit,
} from "@/app/estimate/estimateData";

type ServiceType = "main" | "extra" | "gutter";
type ActiveTab = "products" | "services";
type StatusFilter = "all" | "active" | "inactive";
type MessageState = { type: "success" | "error"; text: string } | null;

interface ProductRow {
  id: string;
  type: MaterialType;
  name: string;
  image_url?: string | null;
  image_alt?: string | null;
  prices: Record<PriceSize, number>;
  display_order: number;
  is_active: boolean;
}

interface ServiceRow {
  id: string;
  service_type: ServiceType;
  service_group: string;
  name: string;
  price: number;
  unit: Unit;
  only_size?: PriceSize | null;
  display_order: number;
  is_active: boolean;
}

const productTypes: MaterialType[] = ["โปร่งแสง", "ทึบแสง"];

const serviceTypeLabels: Record<ServiceType, string> = {
  main: "บริการหลัก",
  extra: "บริการเสริม",
  gutter: "รางน้ำ",
};

const serviceTypes: ServiceType[] = ["main", "extra", "gutter"];
const units: Unit[] = ["sqm", "post", "set", "point", "meter", "free"];

const createEmptyPrices = () =>
  sizes.reduce((acc, size) => ({ ...acc, [size]: 0 }), {} as Record<PriceSize, number>);

const createEmptyProduct = (): ProductRow => ({
  id: "",
  type: "โปร่งแสง",
  name: "",
  image_url: "",
  image_alt: "",
  prices: createEmptyPrices(),
  display_order: 0,
  is_active: true,
});

const createEmptyService = (): ServiceRow => ({
  id: "",
  service_type: "main",
  service_group: "งานเสา",
  name: "",
  price: 0,
  unit: "post",
  only_size: null,
  display_order: 0,
  is_active: true,
});

const normalizeProduct = (product: ProductRow): ProductRow => ({
  ...product,
  image_url: product.image_url || "",
  image_alt: product.image_alt || "",
  prices: { ...createEmptyPrices(), ...product.prices },
});

const normalizeService = (service: ServiceRow): ServiceRow => ({
  ...service,
  only_size: service.only_size || null,
});

const toProductPayload = (product: ProductRow) => ({
  kind: "products",
  id: product.id || undefined,
  type: product.type,
  name: product.name.trim(),
  image_url: product.image_url?.trim() || null,
  image_alt: product.image_alt?.trim() || null,
  prices: product.prices,
  display_order: product.display_order,
  is_active: product.is_active,
});

const toServicePayload = (service: ServiceRow) => ({
  kind: "services",
  id: service.id || undefined,
  service_type: service.service_type,
  service_group: service.service_group.trim(),
  name: service.name.trim(),
  price: service.price,
  unit: service.unit,
  only_size: service.only_size || null,
  display_order: service.display_order,
  is_active: service.is_active,
});

const statusMatches = (isActive: boolean, filter: StatusFilter) => {
  if (filter === "active") return isActive;
  if (filter === "inactive") return !isActive;
  return true;
};

const productPriceSummary = (product: ProductRow) =>
  sizes
    .filter((size) => product.prices[size] > 0)
    .slice(0, 4)
    .map((size) => `${size} ${formatCurrency(product.prices[size])}`)
    .join(" / ") || "ยังไม่ตั้งราคา";

export default function AdminEstimatePage() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [productForm, setProductForm] = useState<ProductRow>(createEmptyProduct);
  const [serviceForm, setServiceForm] = useState<ServiceRow>(createEmptyService);
  const [activeTab, setActiveTab] = useState<ActiveTab>("products");
  const [productQuery, setProductQuery] = useState("");
  const [serviceQuery, setServiceQuery] = useState("");
  const [productTypeFilter, setProductTypeFilter] = useState<MaterialType | "all">("all");
  const [serviceTypeFilter, setServiceTypeFilter] = useState<ServiceType | "all">("all");
  const [productStatusFilter, setProductStatusFilter] = useState<StatusFilter>("all");
  const [serviceStatusFilter, setServiceStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<MessageState>(null);

  const serviceGroups = useMemo(() => {
    const groups = new Set(services.map((service) => service.service_group).filter(Boolean));
    groups.add("งานเสา");
    groups.add("สีโครงสร้าง");
    groups.add("งานฝ้า ใช้เฉพาะ L+");
    groups.add("งานรากฐาน");
    groups.add("งานไฟฟ้า");
    groups.add("งานท่อน้ำ");
    groups.add("รางน้ำพับพิเศษ");
    groups.add("รางน้ำมาตรฐาน");
    groups.add("รางน้ำไวนิล");
    return Array.from(groups).sort((a, b) => a.localeCompare(b, "th"));
  }, [services]);

  const productStats = useMemo(
    () => ({
      total: products.length,
      active: products.filter((product) => product.is_active).length,
      translucent: products.filter((product) => product.type === "โปร่งแสง").length,
      opaque: products.filter((product) => product.type === "ทึบแสง").length,
    }),
    [products]
  );

  const serviceStats = useMemo(
    () => ({
      total: services.length,
      active: services.filter((service) => service.is_active).length,
      main: services.filter((service) => service.service_type === "main").length,
      extra: services.filter((service) => service.service_type === "extra").length,
      gutter: services.filter((service) => service.service_type === "gutter").length,
    }),
    [services]
  );

  const filteredProducts = useMemo(() => {
    const query = productQuery.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query);
      const matchesType = productTypeFilter === "all" || product.type === productTypeFilter;
      return matchesQuery && matchesType && statusMatches(product.is_active, productStatusFilter);
    });
  }, [productQuery, productStatusFilter, productTypeFilter, products]);

  const filteredServices = useMemo(() => {
    const query = serviceQuery.trim().toLowerCase();
    return services.filter((service) => {
      const matchesQuery =
        !query ||
        service.name.toLowerCase().includes(query) ||
        service.service_group.toLowerCase().includes(query);
      const matchesType = serviceTypeFilter === "all" || service.service_type === serviceTypeFilter;
      return matchesQuery && matchesType && statusMatches(service.is_active, serviceStatusFilter);
    });
  }, [serviceQuery, serviceStatusFilter, serviceTypeFilter, services]);

  const fetchData = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/estimate-data");
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Fetch estimate data failed");

      setProducts(((result.products || []) as ProductRow[]).map(normalizeProduct));
      setServices(((result.services || []) as ServiceRow[]).map(normalizeService));
    } catch (error) {
      console.error("Fetch estimate data error:", error);
      const detail = error instanceof Error ? error.message : "ไม่ทราบสาเหตุ";
      setMessage({ type: "error", text: `ยังโหลดข้อมูลไม่ได้: ${detail}` });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!AdminAuth.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }
    fetchData();
  }, [router]);

  const saveProduct = async () => {
    if (!productForm.name.trim()) {
      setMessage({ type: "error", text: "กรุณากรอกชื่อสินค้า" });
      return;
    }

    setSaving(true);
    const response = await fetch("/api/admin/estimate-data", {
      method: productForm.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toProductPayload(productForm)),
    });
    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage({ type: "error", text: result.error || "บันทึกสินค้าไม่สำเร็จ" });
      return;
    }

    setProductForm(createEmptyProduct());
    setMessage({ type: "success", text: "บันทึกสินค้าแล้ว" });
    fetchData();
  };

  const saveService = async () => {
    if (!serviceForm.service_group.trim() || !serviceForm.name.trim()) {
      setMessage({ type: "error", text: "กรุณากรอกกลุ่มและชื่อบริการ" });
      return;
    }

    setSaving(true);
    const response = await fetch("/api/admin/estimate-data", {
      method: serviceForm.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toServicePayload(serviceForm)),
    });
    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage({ type: "error", text: result.error || "บันทึกบริการไม่สำเร็จ" });
      return;
    }

    setServiceForm(createEmptyService());
    setMessage({ type: "success", text: "บันทึกบริการแล้ว" });
    fetchData();
  };

  const toggleProductStatus = async (product: ProductRow) => {
    const nextProduct = { ...product, is_active: !product.is_active };
    setProducts((items) => items.map((item) => (item.id === product.id ? nextProduct : item)));

    const response = await fetch("/api/admin/estimate-data", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toProductPayload(nextProduct)),
    });
    const result = await response.json();

    if (!response.ok) {
      setProducts((items) => items.map((item) => (item.id === product.id ? product : item)));
      setMessage({ type: "error", text: result.error || "อัปเดตสถานะสินค้าไม่สำเร็จ" });
      return;
    }

    setMessage({ type: "success", text: "อัปเดตสถานะสินค้าแล้ว" });
  };

  const toggleServiceStatus = async (service: ServiceRow) => {
    const nextService = { ...service, is_active: !service.is_active };
    setServices((items) => items.map((item) => (item.id === service.id ? nextService : item)));

    const response = await fetch("/api/admin/estimate-data", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toServicePayload(nextService)),
    });
    const result = await response.json();

    if (!response.ok) {
      setServices((items) => items.map((item) => (item.id === service.id ? service : item)));
      setMessage({ type: "error", text: result.error || "อัปเดตสถานะบริการไม่สำเร็จ" });
      return;
    }

    setMessage({ type: "success", text: "อัปเดตสถานะบริการแล้ว" });
  };

  const deleteItem = async (kind: "products" | "services", id: string, name: string) => {
    if (!confirm(`ต้องการลบ "${name}" หรือไม่?`)) return;

    const response = await fetch(`/api/admin/estimate-data?kind=${kind}&id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    const result = await response.json();

    if (!response.ok) {
      setMessage({ type: "error", text: result.error || "ลบข้อมูลไม่สำเร็จ" });
      return;
    }

    if (kind === "products") {
      setProducts((items) => items.filter((item) => item.id !== id));
      if (productForm.id === id) setProductForm(createEmptyProduct());
    } else {
      setServices((items) => items.filter((item) => item.id !== id));
      if (serviceForm.id === id) setServiceForm(createEmptyService());
    }

    setMessage({ type: "success", text: "ลบข้อมูลแล้ว" });
  };

  const startNewProduct = () => {
    setActiveTab("products");
    setProductForm(createEmptyProduct());
  };

  const startNewService = () => {
    setActiveTab("services");
    setServiceForm(createEmptyService());
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#1E2E4F]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white shadow-sm">
        <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-[#1E2E4F] hover:text-[#314874]" aria-label="กลับแดชบอร์ด">
              <FaArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">จัดการข้อมูลคำนวณราคา</h1>
              <p className="text-sm text-gray-500">แก้สินค้า ราคา รูปสินค้า และตัวเลือกบริการของหน้า /estimate</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={startNewProduct}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[#314874]"
            >
              <FaPlus /> สินค้าใหม่
            </button>
            <button
              type="button"
              onClick={startNewService}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1E2E4F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#314874]"
            >
              <FaPlus /> บริการใหม่
            </button>
          </div>
        </div>
      </header>

      <main className="space-y-5 p-4 sm:p-6">
        {message && (
          <div
            className={`rounded-lg border px-4 py-3 text-sm ${
              message.type === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">สินค้า</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{productStats.total}</div>
            <div className="mt-1 text-xs text-gray-500">เปิด {productStats.active} รายการ</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">วัสดุ</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{productStats.translucent}/{productStats.opaque}</div>
            <div className="mt-1 text-xs text-gray-500">โปร่งแสง / ทึบแสง</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">บริการ</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{serviceStats.total}</div>
            <div className="mt-1 text-xs text-gray-500">เปิด {serviceStats.active} รายการ</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">ชนิดบริการ</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{serviceStats.main}/{serviceStats.extra}/{serviceStats.gutter}</div>
            <div className="mt-1 text-xs text-gray-500">หลัก / เสริม / รางน้ำ</div>
          </div>
        </section>

        <div className="rounded-lg bg-white shadow-sm">
          <div className="flex border-b">
            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`flex-1 px-4 py-3 text-sm font-semibold sm:flex-none sm:px-6 ${
                activeTab === "products"
                  ? "border-b-2 border-[#1E2E4F] text-[#1E2E4F]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              สินค้าและราคา
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("services")}
              className={`flex-1 px-4 py-3 text-sm font-semibold sm:flex-none sm:px-6 ${
                activeTab === "services"
                  ? "border-b-2 border-[#1E2E4F] text-[#1E2E4F]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              บริการและตัวเลือกเสริม
            </button>
          </div>

          {activeTab === "products" ? (
            <section className="grid gap-0 xl:grid-cols-[420px_1fr]">
              <ProductForm
                product={productForm}
                saving={saving}
                onCancel={() => setProductForm(createEmptyProduct())}
                onChange={setProductForm}
                onSave={saveProduct}
              />
              <div className="min-w-0 border-t xl:border-l xl:border-t-0">
                <div className="grid gap-3 border-b bg-gray-50 p-4 lg:grid-cols-[1fr_160px_140px]">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      value={productQuery}
                      onChange={(event) => setProductQuery(event.target.value)}
                      placeholder="ค้นหาชื่อสินค้า"
                      className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                    />
                  </div>
                  <select
                    value={productTypeFilter}
                    onChange={(event) => setProductTypeFilter(event.target.value as MaterialType | "all")}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="all">ทุกประเภท</option>
                    {productTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <select
                    value={productStatusFilter}
                    onChange={(event) => setProductStatusFilter(event.target.value as StatusFilter)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="all">ทุกสถานะ</option>
                    <option value="active">เปิด</option>
                    <option value="inactive">ปิด</option>
                  </select>
                </div>
                <ProductTable
                  products={filteredProducts}
                  onDelete={deleteItem}
                  onEdit={(product) => setProductForm(normalizeProduct(product))}
                  onToggleStatus={toggleProductStatus}
                />
              </div>
            </section>
          ) : (
            <section className="grid gap-0 xl:grid-cols-[420px_1fr]">
              <ServiceForm
                groups={serviceGroups}
                service={serviceForm}
                saving={saving}
                onCancel={() => setServiceForm(createEmptyService())}
                onChange={setServiceForm}
                onSave={saveService}
              />
              <div className="min-w-0 border-t xl:border-l xl:border-t-0">
                <div className="grid gap-3 border-b bg-gray-50 p-4 lg:grid-cols-[1fr_160px_140px]">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      value={serviceQuery}
                      onChange={(event) => setServiceQuery(event.target.value)}
                      placeholder="ค้นหาบริการหรือกลุ่ม"
                      className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                    />
                  </div>
                  <select
                    value={serviceTypeFilter}
                    onChange={(event) => setServiceTypeFilter(event.target.value as ServiceType | "all")}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="all">ทุกชนิด</option>
                    {serviceTypes.map((type) => (
                      <option key={type} value={type}>{serviceTypeLabels[type]}</option>
                    ))}
                  </select>
                  <select
                    value={serviceStatusFilter}
                    onChange={(event) => setServiceStatusFilter(event.target.value as StatusFilter)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="all">ทุกสถานะ</option>
                    <option value="active">เปิด</option>
                    <option value="inactive">ปิด</option>
                  </select>
                </div>
                <ServiceTable
                  services={filteredServices}
                  onDelete={deleteItem}
                  onEdit={(service) => setServiceForm(normalizeService(service))}
                  onToggleStatus={toggleServiceStatus}
                />
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

function ProductForm({
  product,
  saving,
  onCancel,
  onChange,
  onSave,
}: {
  product: ProductRow;
  saving: boolean;
  onCancel: () => void;
  onChange: (product: ProductRow) => void;
  onSave: () => void;
}) {
  return (
    <div className="p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <FaCalculator /> {product.id ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">กำหนดประเภท รูปภาพ และราคาตามไซซ์</p>
        </div>
        {product.id && (
          <button type="button" onClick={onCancel} className="rounded-lg border p-2 text-gray-500 hover:text-gray-900" aria-label="ยกเลิก">
            <FaTimes />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm text-gray-600">ประเภท</span>
            <select
              value={product.type}
              onChange={(event) => onChange({ ...product, type: event.target.value as MaterialType })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              {productTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">ลำดับ</span>
            <input
              type="number"
              value={product.display_order}
              onChange={(event) => onChange({ ...product, display_order: Number(event.target.value) })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm text-gray-600">ชื่อสินค้า</span>
          <input
            value={product.name}
            onChange={(event) => onChange({ ...product, name: event.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600">URL รูปสินค้า</span>
          <input
            value={product.image_url || ""}
            onChange={(event) => onChange({ ...product, image_url: event.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600">Alt รูป</span>
          <input
            value={product.image_alt || ""}
            onChange={(event) => onChange({ ...product, image_alt: event.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>

        <div>
          <div className="mb-2 text-sm font-medium text-gray-700">ราคา</div>
          <div className="grid grid-cols-2 gap-3">
            {sizes.map((size) => (
              <label key={size} className="block">
                <span className="text-xs text-gray-500">{size}</span>
                <input
                  type="number"
                  min="0"
                  value={product.prices[size]}
                  onChange={(event) =>
                    onChange({
                      ...product,
                      prices: { ...product.prices, [size]: Number(event.target.value) },
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={product.is_active}
            onChange={(event) => onChange({ ...product, is_active: event.target.checked })}
            className="h-4 w-4 rounded border-gray-300"
          />
          เปิดใช้งานบนหน้าเว็บ
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1E2E4F] px-4 py-2 font-semibold text-white hover:bg-[#314874] disabled:opacity-60"
          >
            <FaSave /> {product.id ? "บันทึกสินค้า" : "เพิ่มสินค้า"}
          </button>
          <button type="button" onClick={onCancel} className="rounded-lg border px-4 py-2 text-gray-700">
            ล้างฟอร์ม
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceForm({
  groups,
  service,
  saving,
  onCancel,
  onChange,
  onSave,
}: {
  groups: string[];
  service: ServiceRow;
  saving: boolean;
  onCancel: () => void;
  onChange: (service: ServiceRow) => void;
  onSave: () => void;
}) {
  return (
    <div className="p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <FaPlus /> {service.id ? "แก้ไขบริการ" : "เพิ่มบริการ"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">กำหนดชนิด กลุ่ม ราคา หน่วย และเงื่อนไขไซซ์</p>
        </div>
        {service.id && (
          <button type="button" onClick={onCancel} className="rounded-lg border p-2 text-gray-500 hover:text-gray-900" aria-label="ยกเลิก">
            <FaTimes />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm text-gray-600">ชนิด</span>
            <select
              value={service.service_type}
              onChange={(event) => onChange({ ...service, service_type: event.target.value as ServiceType })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              {serviceTypes.map((type) => (
                <option key={type} value={type}>{serviceTypeLabels[type]}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">ลำดับ</span>
            <input
              type="number"
              value={service.display_order}
              onChange={(event) => onChange({ ...service, display_order: Number(event.target.value) })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm text-gray-600">กลุ่ม</span>
          <input
            list="estimate-service-groups"
            value={service.service_group}
            onChange={(event) => onChange({ ...service, service_group: event.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          <datalist id="estimate-service-groups">
            {groups.map((group) => (
              <option key={group} value={group} />
            ))}
          </datalist>
        </label>

        <label className="block">
          <span className="text-sm text-gray-600">ชื่อบริการ</span>
          <input
            value={service.name}
            onChange={(event) => onChange({ ...service, name: event.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>

        <div className="grid grid-cols-3 gap-3">
          <label className="block">
            <span className="text-sm text-gray-600">ราคา</span>
            <input
              type="number"
              min="0"
              value={service.price}
              onChange={(event) => onChange({ ...service, price: Number(event.target.value) })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">หน่วย</span>
            <select
              value={service.unit}
              onChange={(event) => onChange({ ...service, unit: event.target.value as Unit })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>{unitLabels[unit]}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">เฉพาะไซซ์</span>
            <select
              value={service.only_size || ""}
              onChange={(event) => onChange({ ...service, only_size: (event.target.value || null) as PriceSize | null })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="">ทั้งหมด</option>
              {sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={service.is_active}
            onChange={(event) => onChange({ ...service, is_active: event.target.checked })}
            className="h-4 w-4 rounded border-gray-300"
          />
          เปิดใช้งานบนหน้าเว็บ
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1E2E4F] px-4 py-2 font-semibold text-white hover:bg-[#314874] disabled:opacity-60"
          >
            <FaSave /> {service.id ? "บันทึกบริการ" : "เพิ่มบริการ"}
          </button>
          <button type="button" onClick={onCancel} className="rounded-lg border px-4 py-2 text-gray-700">
            ล้างฟอร์ม
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductTable({
  products,
  onDelete,
  onEdit,
  onToggleStatus,
}: {
  products: ProductRow[];
  onDelete: (kind: "products" | "services", id: string, name: string) => void;
  onEdit: (product: ProductRow) => void;
  onToggleStatus: (product: ProductRow) => void;
}) {
  if (products.length === 0) {
    return <EmptyState text="ไม่พบสินค้าในเงื่อนไขนี้" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-white text-left text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">สินค้า</th>
            <th className="px-4 py-3">ราคา</th>
            <th className="px-4 py-3">ลำดับ</th>
            <th className="px-4 py-3">สถานะ</th>
            <th className="px-4 py-3 text-right">จัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900">{product.name}</div>
                <div className="mt-1 text-xs text-gray-500">{product.type}</div>
              </td>
              <td className="max-w-md px-4 py-3 text-gray-600">{productPriceSummary(product)}</td>
              <td className="px-4 py-3 text-gray-600">{product.display_order}</td>
              <td className="px-4 py-3">
                <StatusButton active={product.is_active} onClick={() => onToggleStatus(product)} />
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => onEdit(product)} className="rounded border p-2 text-gray-600 hover:text-[#1E2E4F]" aria-label="แก้ไขสินค้า">
                    <FaEdit />
                  </button>
                  <button type="button" onClick={() => onDelete("products", product.id, product.name)} className="rounded border p-2 text-red-600 hover:bg-red-50" aria-label="ลบสินค้า">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ServiceTable({
  services,
  onDelete,
  onEdit,
  onToggleStatus,
}: {
  services: ServiceRow[];
  onDelete: (kind: "products" | "services", id: string, name: string) => void;
  onEdit: (service: ServiceRow) => void;
  onToggleStatus: (service: ServiceRow) => void;
}) {
  if (services.length === 0) {
    return <EmptyState text="ไม่พบบริการในเงื่อนไขนี้" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-white text-left text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">บริการ</th>
            <th className="px-4 py-3">ชนิด</th>
            <th className="px-4 py-3">ราคา</th>
            <th className="px-4 py-3">ลำดับ</th>
            <th className="px-4 py-3">สถานะ</th>
            <th className="px-4 py-3 text-right">จัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {services.map((service) => (
            <tr key={service.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900">{service.name}</div>
                <div className="mt-1 text-xs text-gray-500">{service.service_group}</div>
              </td>
              <td className="px-4 py-3 text-gray-600">{serviceTypeLabels[service.service_type]}</td>
              <td className="px-4 py-3 text-gray-600">
                {formatCurrency(service.price)} / {unitLabels[service.unit]}
                {service.only_size ? <span className="ml-2 rounded bg-gray-100 px-2 py-1 text-xs">เฉพาะ {service.only_size}</span> : null}
              </td>
              <td className="px-4 py-3 text-gray-600">{service.display_order}</td>
              <td className="px-4 py-3">
                <StatusButton active={service.is_active} onClick={() => onToggleStatus(service)} />
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => onEdit(service)} className="rounded border p-2 text-gray-600 hover:text-[#1E2E4F]" aria-label="แก้ไขบริการ">
                    <FaEdit />
                  </button>
                  <button type="button" onClick={() => onDelete("services", service.id, service.name)} className="rounded border p-2 text-red-600 hover:bg-red-50" aria-label="ลบบริการ">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
      }`}
    >
      {active ? "เปิด" : "ปิด"}
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex min-h-60 items-center justify-center p-8 text-center text-sm text-gray-500">
      {text}
    </div>
  );
}
