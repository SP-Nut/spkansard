import type { MaterialType, PriceSize, Product, ServiceOption } from "../estimateData";

export type InstallType = "มีเสา" | "ไร้เสา" | "";
export type ServiceType = "main" | "extra" | "gutter";

export interface EstimateProductRow {
  id: string;
  type: MaterialType;
  name: string;
  image_url?: string | null;
  image_alt?: string | null;
  prices: Record<PriceSize, number>;
  display_order?: number | null;
  is_active?: boolean | null;
}

export interface EstimateServiceRow {
  id: string;
  service_type: ServiceType;
  service_group: string;
  name: string;
  price: number;
  unit: ServiceOption["unit"];
  only_size?: PriceSize | null;
  display_order?: number | null;
  is_active?: boolean | null;
}

export interface SelectedExtraService {
  service: ServiceOption;
  quantity: number;
  total: number;
}

export interface EstimateInputs {
  selectedProduct: Product | null;
  selectedSize: PriceSize | "";
  width: string;
  length: string;
  installType: InstallType;
  postServiceName: string;
  postCount: number;
  selectedColor: string;
  selectedCeiling: string;
  selectedGutter: string;
  gutterMeters: number;
  selectedServices: Record<string, number>;
  mainServices: ServiceOption[];
  extraServices: ServiceOption[];
  gutters: ServiceOption[];
}

export interface EstimateResult {
  isReady: boolean;
  missingFields: string[];
  width: number;
  length: number;
  squareMeters: number;
  materialRate: number;
  materialTotal: number;
  postService: ServiceOption | null;
  specialColorService: ServiceOption | null;
  ceilingService: ServiceOption | null;
  gutterService: ServiceOption | null;
  extraServiceItems: SelectedExtraService[];
  postTotal: number;
  colorTotal: number;
  ceilingTotal: number;
  gutterTotal: number;
  extraTotal: number;
  total: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  lineId: string;
  email: string;
  location: string;
  imageUrl: string;
  message: string;
}

export interface EstimateSelectionSummary {
  roofType: MaterialType | "";
  product: Product | null;
  size: PriceSize | "";
  installType: InstallType;
  postCount: number;
  color: string;
  ceiling: string;
  gutterMeters: number;
}
