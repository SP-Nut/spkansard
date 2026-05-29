import { formatCurrency } from "../estimateData";
import type {
  CustomerInfo,
  EstimateResult,
  EstimateSelectionSummary,
} from "../types/estimate.types";

export function formatEstimateMessage(
  selection: EstimateSelectionSummary,
  estimate: EstimateResult,
  customer: CustomerInfo
) {
  const product = selection.product;
  const selectedServices = estimate.extraServiceItems
    .map((item) => `${item.service.group} - ${item.service.name} x ${item.quantity} = ${formatCurrency(item.total)}`)
    .join(", ");

  return [
    "ข้อมูลประเมินราคากันสาดเบื้องต้นจากหน้า /estimate",
    `ประเภทหลังคา: ${selection.roofType || "-"}`,
    `สินค้า: ${product?.name || "-"}`,
    product?.imageUrl ? `รูปสินค้า: ${product.imageUrl}` : "",
    `ไซซ์ราคา: ${selection.size || "-"} (${formatCurrency(estimate.materialRate)}/ตร.ม.)`,
    `ขนาดพื้นที่: ${estimate.width || "-"} x ${estimate.length || "-"} ม. (${estimate.squareMeters.toFixed(2)} ตร.ม.)`,
    `รูปแบบติดตั้ง: ${selection.installType || "-"}`,
    selection.installType === "มีเสา" && estimate.postService
      ? `งานเสา: ${estimate.postService.name} x ${selection.postCount} = ${formatCurrency(estimate.postTotal)}`
      : "",
    `สีโครงสร้าง: ${selection.color || "-"}`,
    estimate.specialColorService ? `ค่าสีผสมพิเศษ: ${formatCurrency(estimate.colorTotal)}` : "",
    estimate.ceilingService ? `งานฝ้า: ${estimate.ceilingService.name} = ${formatCurrency(estimate.ceilingTotal)}` : "",
    estimate.gutterService
      ? `รางน้ำ: ${estimate.gutterService.group} - ${estimate.gutterService.name} x ${selection.gutterMeters} เมตร = ${formatCurrency(estimate.gutterTotal)}`
      : "",
    selectedServices ? `บริการเสริม: ${selectedServices}` : "",
    "สรุปราคา",
    `ราคาวัสดุ: ${formatCurrency(estimate.materialTotal)}`,
    `ราคางานเสา: ${formatCurrency(estimate.postTotal)}`,
    `ราคาสีพิเศษ: ${formatCurrency(estimate.colorTotal)}`,
    `ราคางานฝ้า: ${formatCurrency(estimate.ceilingTotal)}`,
    `ราคารางน้ำ: ${formatCurrency(estimate.gutterTotal)}`,
    `ราคารวมบริการเสริม: ${formatCurrency(estimate.extraTotal)}`,
    `รวมราคาเบื้องต้น: ${formatCurrency(estimate.total)}`,
    customer.location ? `พื้นที่ติดตั้ง/จังหวัด: ${customer.location}` : "",
    customer.imageUrl ? `ลิงก์รูปหน้างาน/แบบที่ชอบ: ${customer.imageUrl}` : "",
    customer.message ? `รายละเอียดเพิ่มเติม: ${customer.message}` : "",
    "หมายเหตุ: ราคานี้เป็นราคาเบื้องต้น อาจเปลี่ยนแปลงตามสภาพหน้างาน ระยะติดตั้ง รายละเอียดโครงสร้าง และการตรวจสอบจริงจากทีมงาน",
  ]
    .filter(Boolean)
    .join("\n");
}
