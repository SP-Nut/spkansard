import { getServiceTotal } from "../estimateData";
import type { EstimateInputs, EstimateResult } from "../types/estimate.types";

const toPositiveNumber = (value: string) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) && numberValue > 0 ? numberValue : 0;
};

export function calculateEstimate(inputs: EstimateInputs): EstimateResult {
  const width = toPositiveNumber(inputs.width);
  const length = toPositiveNumber(inputs.length);
  const squareMeters = width * length;
  const hasArea = width > 0 && length > 0;
  const missingFields: string[] = [];

  if (!inputs.selectedProduct) missingFields.push("เลือกสินค้า");
  if (!inputs.selectedSize) missingFields.push("เลือกไซซ์ราคา");
  if (!hasArea) missingFields.push("กรอกขนาดพื้นที่");
  if (!inputs.installType) missingFields.push("เลือกรูปแบบติดตั้ง");

  if (!inputs.selectedProduct || !inputs.selectedSize || !hasArea || !inputs.installType) {
    return {
      isReady: false,
      missingFields,
      width,
      length,
      squareMeters,
      materialRate: 0,
      materialTotal: 0,
      postService: null,
      specialColorService: null,
      ceilingService: null,
      gutterService: null,
      extraServiceItems: [],
      postTotal: 0,
      colorTotal: 0,
      ceilingTotal: 0,
      gutterTotal: 0,
      extraTotal: 0,
      total: 0,
    };
  }

  const materialRate = inputs.selectedProduct.prices[inputs.selectedSize] || 0;
  const materialTotal = squareMeters * materialRate;
  const postService =
    inputs.installType === "มีเสา"
      ? inputs.mainServices.find((service) => service.name === inputs.postServiceName) ?? null
      : null;
  const specialColorService =
    inputs.selectedColor === "สีผสมพิเศษ"
      ? inputs.mainServices.find((service) => service.name === "สีผสมพิเศษ") ?? null
      : null;
  const ceilingService =
    inputs.selectedSize === "L+" && inputs.selectedCeiling
      ? inputs.mainServices.find((service) => service.name === inputs.selectedCeiling) ?? null
      : null;
  const gutterService = inputs.selectedGutter
    ? inputs.gutters.find((service) => service.name === inputs.selectedGutter) ?? null
    : null;

  const extraServiceItems = inputs.extraServices
    .filter((service) => inputs.selectedServices[service.name] !== undefined)
    .map((service) => {
      const quantity = Math.max(0, inputs.selectedServices[service.name] ?? 1);
      return {
        service,
        quantity,
        total: getServiceTotal(service, quantity, squareMeters),
      };
    });

  const postTotal = getServiceTotal(postService, inputs.postCount, squareMeters);
  const colorTotal = getServiceTotal(specialColorService, 1, squareMeters);
  const ceilingTotal = getServiceTotal(ceilingService, 1, squareMeters);
  const gutterTotal = getServiceTotal(gutterService, inputs.gutterMeters, squareMeters);
  const extraTotal = extraServiceItems.reduce((sum, item) => sum + item.total, 0);

  return {
    isReady: true,
    missingFields,
    width,
    length,
    squareMeters,
    materialRate,
    materialTotal,
    postService,
    specialColorService,
    ceilingService,
    gutterService,
    extraServiceItems,
    postTotal,
    colorTotal,
    ceilingTotal,
    gutterTotal,
    extraTotal,
    total: materialTotal + postTotal + colorTotal + ceilingTotal + gutterTotal + extraTotal,
  };
}
