// Base variant interface for iPhone
export interface ProductVariant {
  color: string;
  colorCode: string;
  storage: string;
  itemName: string;
  mrp: number;
  discount: number;
  indentDiscount: number | null;
  cashBack: number | null;
  exchangeValue: number | null;
  effectivePrice: number | null;
  freeGift: string | null;
}

// Extended variant interface for iPad (includes connectivity and exchangeBonus)
export interface iPadVariant extends Omit<ProductVariant, 'indentDiscount' | 'exchangeValue' | 'freeGift'> {
  connectivity: string;
  sku: string;
  instantDiscount: number;
  exchangeBonus: number;
  exchangeRate: string;
}

// Extended variant interface for MacBook (includes instantDiscount and exchangeBonus)
export interface MacBookVariant extends Omit<ProductVariant, 'indentDiscount' | 'freeGift'> {
  instantDiscount: number | null;
  exchangeBonus: number | null;
  exchangeValue: number | null;
}

// Extended variant interface for Apple Watch (includes size, band, and watch-specific fields)
export interface WatchVariant extends Omit<ProductVariant, 'storage' | 'indentDiscount' | 'freeGift'> {
  size: string;
  band: string;
  insertAmount: number;
  exchangeBonus: number;
  exchangeValue: number;
}

// Extended variant interface for AirPods (includes itemAlias and AirPods-specific fields)
export interface AirPodsVariant extends Omit<ProductVariant, 'storage' | 'indentDiscount' | 'freeGift'> {
  itemAlias: string;
  instantDiscount: number;
  exchangeBonus: number;
  exchangeValue: number;
}

export interface Product {
  model: string;
  productCode: string;
  variants: ProductVariant[] | iPadVariant[] | MacBookVariant[] | WatchVariant[] | AirPodsVariant[];
}

export interface ProductsData {
  products: Product[];
}

// Type guards
export function isIPadVariant(variant: ProductVariant | iPadVariant | MacBookVariant | WatchVariant | AirPodsVariant): variant is iPadVariant {
  return 'connectivity' in variant && 'sku' in variant;
}

export function isMacBookVariant(variant: ProductVariant | iPadVariant | MacBookVariant | WatchVariant | AirPodsVariant): variant is MacBookVariant {
  return 'instantDiscount' in variant && !('connectivity' in variant) && !('band' in variant) && !('itemAlias' in variant);
}

export function isWatchVariant(variant: ProductVariant | iPadVariant | MacBookVariant | WatchVariant | AirPodsVariant): variant is WatchVariant {
  return 'band' in variant && 'size' in variant;
}

export function isAirPodsVariant(variant: ProductVariant | iPadVariant | MacBookVariant | WatchVariant | AirPodsVariant): variant is AirPodsVariant {
  return 'itemAlias' in variant && 'instantDiscount' in variant;
}
