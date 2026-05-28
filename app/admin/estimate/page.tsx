"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCalculator, FaDatabase, FaPlus, FaSave, FaTrash } from "react-icons/fa";
import { AdminAuth } from "@/lib/auth";
import {
  extraServices as fallbackExtraServices,
  gutters as fallbackGutters,
  mainServices as fallbackMainServices,
  products as fallbackProducts,
  sizes,
  type MaterialType,
  type PriceSize,
  type Product,
  type ServiceOption,
  type Unit,
} from "@/app/estimate/estimateData";

type ServiceType = "main" | "extra" | "gutter";

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

const emptyPrices = sizes.reduce((acc, size) => ({ ...acc, [size]: 0 }), {} as Record<PriceSize, number>);

const emptyProduct: ProductRow = {
  id: "",
  type: "โปร่งแสง",
  name: "",
  image_url: "",
  image_alt: "",
  prices: emptyPrices,
  display_order: 0,
  is_active: true,
};

const emptyService: ServiceRow = {
  id: "",
  service_type: "main",
  service_group: "งานเสา",
  name: "",
  price: 0,
  unit: "post",
  only_size: null,
  display_order: 0,
  is_active: true,
};

const toProductPayload = (product: ProductRow) => ({
  kind: "products",
  id: product.id || undefined,
  type: product.type,
  name: product.name,
  image_url: product.image_url || null,
  image_alt: product.image_alt || null,
  prices: product.prices,
  display_order: product.display_order,
  is_active: product.is_active,
});

const toServicePayload = (service: ServiceRow) => ({
  kind: "services",
  id: service.id || undefined,
  service_type: service.service_type,
  service_group: service.service_group,
  name: service.name,
  price: service.price,
  unit: service.unit,
  only_size: service.only_size || null,
  display_order: service.display_order,
  is_active: service.is_active,
});

const fallbackProductToRow = (product: Product, index: number): ProductRow => ({
  id: "",
  type: product.type,
  name: product.name,
  image_url: product.imageUrl || "",
  image_alt: product.imageAlt || "",
  prices: product.prices,
  display_order: index,
  is_active: true,
});

const fallbackServiceToRow = (service: ServiceOption, serviceType: ServiceType, index: number): ServiceRow => ({
  id: "",
  service_type: serviceType,
  service_group: service.group,
  name: service.name,
  price: service.price,
  unit: service.unit,
  only_size: service.onlySize || null,
  display_order: index,
  is_active: true,
});

export default function AdminEstimatePage() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [productForm, setProductForm] = useState<ProductRow>(emptyProduct);
  const [serviceForm, setServiceForm] = useState<ServiceRow>(emptyService);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const serviceGroups = useMemo(() => {
    const groups = new Set(services.map((service) => service.service_group));
    fallbackMainServices.concat(fallbackExtraServices, fallbackGutters).forEach((service) => groups.add(service.group));
    return Array.from(groups);
  }, [services]);

  const fetchData = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/estimate-data");
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Fetch estimate data failed");

      setProducts((result.products || []) as ProductRow[]);
      setServices((result.services || []) as ServiceRow[]);
    } catch (error) {
      console.error("Fetch estimate data error:", error);
      setMessage("ยังโหลดข้อมูลไม่ได้ ตรวจว่าได้รัน supabase-estimate.sql แล้วหรือยัง");
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
      setMessage("กรุณากรอกชื่อสินค้า");
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
      setMessage(result.error || "บันทึกสินค้าไม่สำเร็จ");
      return;
    }

    setProductForm(emptyProduct);
    setMessage("บันทึกสินค้าแล้ว");
    fetchData();
  };

  const saveService = async () => {
    if (!serviceForm.name.trim()) {
      setMessage("กรุณากรอกชื่อบริการ");
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
      setMessage(result.error || "บันทึกบริการไม่สำเร็จ");
      return;
    }

    setServiceForm(emptyService);
    setMessage("บันทึกบริการแล้ว");
    fetchData();
  };

  const deleteItem = async (kind: "products" | "services", id: string, name: string) => {
    if (!confirm(`ต้องการลบ "${name}" หรือไม่?`)) return;
    const response = await fetch(`/api/admin/estimate-data?kind=${kind}&id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      setMessage(result.error || "ลบข้อมูลไม่สำเร็จ");
      return;
    }
    setMessage("ลบข้อมูลแล้ว");
    fetchData();
  };

  const seedDefaults = async () => {
    if (!confirm("นำข้อมูลราคาเริ่มต้นทั้งหมดเข้า Supabase หรือไม่? ควรใช้ตอนตารางยังว่าง")) return;
    setSaving(true);

    const defaultProducts = fallbackProducts.map(fallbackProductToRow);
    const defaultServices = [
      ...fallbackMainServices.map((service, index) => fallbackServiceToRow(service, "main", index)),
      ...fallbackExtraServices.map((service, index) => fallbackServiceToRow(service, "extra", index)),
      ...fallbackGutters.map((service, index) => fallbackServiceToRow(service, "gutter", index)),
    ];

    for (const product of defaultProducts) {
      await fetch("/api/admin/estimate-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toProductPayload(product)),
      });
    }

    for (const service of defaultServices) {
      await fetch("/api/admin/estimate-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toServicePayload(service)),
      });
    }

    setSaving(false);
    setMessage("นำข้อมูลเริ่มต้นเข้า Supabase แล้ว");
    fetchData();
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
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-[#1E2E4F] hover:text-[#314874]">
              <FaArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">จัดการข้อมูลคำนวณราคา</h1>
              <p className="text-sm text-gray-500">สินค้า ราคา รูปสินค้า และบริการเสริมของหน้า /estimate</p>
            </div>
          </div>
          <button
            type="button"
            onClick={seedDefaults}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1E2E4F] px-4 py-2 font-semibold text-white hover:bg-[#314874] disabled:opacity-60"
          >
            <FaDatabase />
            Seed ราคาเริ่มต้น
          </button>
        </div>
      </header>

      <main className="space-y-6 p-6">
        {message && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            {message}
          </div>
        )}

        <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
              <FaCalculator /> สินค้าและราคา
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-sm text-gray-600">ประเภท</span>
                  <select
                    value={productForm.type}
                    onChange={(event) => setProductForm((data) => ({ ...data, type: event.target.value as MaterialType }))}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  >
                    <option value="โปร่งแสง">โปร่งแสง</option>
                    <option value="ทึบแสง">ทึบแสง</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-gray-600">ลำดับ</span>
                  <input
                    type="number"
                    value={productForm.display_order}
                    onChange={(event) => setProductForm((data) => ({ ...data, display_order: Number(event.target.value) }))}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm text-gray-600">ชื่อสินค้า</span>
                <input
                  value={productForm.name}
                  onChange={(event) => setProductForm((data) => ({ ...data, name: event.target.value }))}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-600">URL รูปสินค้า</span>
                <input
                  value={productForm.image_url || ""}
                  onChange={(event) => setProductForm((data) => ({ ...data, image_url: event.target.value }))}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-600">Alt รูป</span>
                <input
                  value={productForm.image_alt || ""}
                  onChange={(event) => setProductForm((data) => ({ ...data, image_alt: event.target.value }))}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                {sizes.map((size) => (
                  <label key={size} className="block">
                    <span className="text-sm text-gray-600">{size}</span>
                    <input
                      type="number"
                      min="0"
                      value={productForm.prices[size]}
                      onChange={(event) =>
                        setProductForm((data) => ({
                          ...data,
                          prices: { ...data.prices, [size]: Number(event.target.value) },
                        }))
                      }
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                    />
                  </label>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={productForm.is_active}
                  onChange={(event) => setProductForm((data) => ({ ...data, is_active: event.target.checked }))}
                />
                เปิดใช้งาน
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={saveProduct}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1E2E4F] px-4 py-2 font-semibold text-white disabled:opacity-60"
                >
                  <FaSave /> {productForm.id ? "บันทึก" : "เพิ่มสินค้า"}
                </button>
                {productForm.id && (
                  <button type="button" onClick={() => setProductForm(emptyProduct)} className="rounded-lg border px-4 py-2">
                    ยกเลิก
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="border-b px-5 py-4">
              <h2 className="text-xl font-semibold text-gray-900">รายการสินค้า</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3">สินค้า</th>
                    <th className="px-4 py-3">ประเภท</th>
                    <th className="px-4 py-3">ราคา M-L+</th>
                    <th className="px-4 py-3">สถานะ</th>
                    <th className="px-4 py-3 text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                      <td className="px-4 py-3">{product.type}</td>
                      <td className="px-4 py-3 text-gray-600">
                        M {product.prices.M} / M+ {product.prices["M+"]} / L {product.prices.L} / L+ {product.prices["L+"]}
                      </td>
                      <td className="px-4 py-3">{product.is_active ? "เปิด" : "ปิด"}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button type="button" onClick={() => setProductForm(product)} className="rounded border px-3 py-1">
                            แก้ไข
                          </button>
                          <button type="button" onClick={() => deleteItem("products", product.id, product.name)} className="rounded border px-3 py-1 text-red-600">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
              <FaPlus /> บริการและตัวเลือกเสริม
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-sm text-gray-600">ประเภทข้อมูล</span>
                  <select
                    value={serviceForm.service_type}
                    onChange={(event) => setServiceForm((data) => ({ ...data, service_type: event.target.value as ServiceType }))}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  >
                    <option value="main">บริการหลัก</option>
                    <option value="extra">บริการเสริม</option>
                    <option value="gutter">รางน้ำ</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-gray-600">ลำดับ</span>
                  <input
                    type="number"
                    value={serviceForm.display_order}
                    onChange={(event) => setServiceForm((data) => ({ ...data, display_order: Number(event.target.value) }))}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm text-gray-600">กลุ่ม</span>
                <input
                  list="estimate-service-groups"
                  value={serviceForm.service_group}
                  onChange={(event) => setServiceForm((data) => ({ ...data, service_group: event.target.value }))}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
                <datalist id="estimate-service-groups">
                  {serviceGroups.map((group) => <option key={group} value={group} />)}
                </datalist>
              </label>
              <label className="block">
                <span className="text-sm text-gray-600">ชื่อตัวเลือก</span>
                <input
                  value={serviceForm.name}
                  onChange={(event) => setServiceForm((data) => ({ ...data, name: event.target.value }))}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label className="block">
                  <span className="text-sm text-gray-600">ราคา</span>
                  <input
                    type="number"
                    min="0"
                    value={serviceForm.price}
                    onChange={(event) => setServiceForm((data) => ({ ...data, price: Number(event.target.value) }))}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-600">หน่วย</span>
                  <select
                    value={serviceForm.unit}
                    onChange={(event) => setServiceForm((data) => ({ ...data, unit: event.target.value as Unit }))}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  >
                    <option value="sqm">ตร.ม.</option>
                    <option value="post">ต้น</option>
                    <option value="set">ชุด</option>
                    <option value="point">จุด</option>
                    <option value="meter">เมตร</option>
                    <option value="free">ฟรี</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-gray-600">เฉพาะไซซ์</span>
                  <select
                    value={serviceForm.only_size || ""}
                    onChange={(event) => setServiceForm((data) => ({ ...data, only_size: event.target.value as PriceSize || null }))}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  >
                    <option value="">ทั้งหมด</option>
                    {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
                  </select>
                </label>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={serviceForm.is_active}
                  onChange={(event) => setServiceForm((data) => ({ ...data, is_active: event.target.checked }))}
                />
                เปิดใช้งาน
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={saveService}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1E2E4F] px-4 py-2 font-semibold text-white disabled:opacity-60"
                >
                  <FaSave /> {serviceForm.id ? "บันทึก" : "เพิ่มบริการ"}
                </button>
                {serviceForm.id && (
                  <button type="button" onClick={() => setServiceForm(emptyService)} className="rounded-lg border px-4 py-2">
                    ยกเลิก
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="border-b px-5 py-4">
              <h2 className="text-xl font-semibold text-gray-900">รายการบริการ</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3">บริการ</th>
                    <th className="px-4 py-3">ชนิด</th>
                    <th className="px-4 py-3">ราคา/หน่วย</th>
                    <th className="px-4 py-3">สถานะ</th>
                    <th className="px-4 py-3 text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{service.name}</div>
                        <div className="text-xs text-gray-500">{service.service_group}</div>
                      </td>
                      <td className="px-4 py-3">{service.service_type}</td>
                      <td className="px-4 py-3">{service.price} / {service.unit}</td>
                      <td className="px-4 py-3">{service.is_active ? "เปิด" : "ปิด"}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button type="button" onClick={() => setServiceForm(service)} className="rounded border px-3 py-1">
                            แก้ไข
                          </button>
                          <button type="button" onClick={() => deleteItem("services", service.id, service.name)} className="rounded border px-3 py-1 text-red-600">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
