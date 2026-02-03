import iphonesData from './iphones.json';
import ipadsData from './ipads.json';
import macbooksData from './macbooks.json';
import watchesData from './watches.json';
import airpodsData from './airpods.json';
import type { ProductsData, Product } from './types';

// Export all product data
export const iphones = iphonesData as ProductsData;
export const ipads = ipadsData as ProductsData;
export const macbooks = macbooksData as ProductsData;
export const watches = watchesData as ProductsData;
export const airpods = airpodsData as ProductsData;

// Combined products array
export const allProducts: Product[] = [
  ...iphones.products,
  ...ipads.products,
  ...macbooks.products,
  ...watches.products,
  ...airpods.products,
];

// Product categories
export const productCategories = {
  iphones: iphones.products,
  ipads: ipads.products,
  macbooks: macbooks.products,
  watches: watches.products,
  airpods: airpods.products,
};

// Helper function to get products by category
export function getProductsByCategory(category: 'iphones' | 'ipads' | 'macbooks' | 'watches' | 'airpods'): Product[] {
  return productCategories[category];
}

// Helper function to get a product by model name
export function getProductByModel(model: string): Product | undefined {
  return allProducts.find(product => product.model.toLowerCase() === model.toLowerCase());
}

// Helper function to search products by name
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(product =>
    product.model.toLowerCase().includes(lowerQuery) ||
    product.productCode.toLowerCase().includes(lowerQuery)
  );
}

// Helper function to get all variants from a category
export function getAllVariants(category: 'iphones' | 'ipads' | 'macbooks' | 'watches' | 'airpods') {
  const products = getProductsByCategory(category);
  return products.flatMap(product => product.variants);
}

// Export product counts
export const productCounts = {
  iphones: iphones.products.length,
  ipads: ipads.products.length,
  macbooks: macbooks.products.length,
  watches: watches.products.length,
  airpods: airpods.products.length,
  total: allProducts.length,
};

// Export total variant counts
export const variantCounts = {
  iphones: iphones.products.reduce((sum, p) => sum + p.variants.length, 0),
  ipads: ipads.products.reduce((sum, p) => sum + p.variants.length, 0),
  macbooks: macbooks.products.reduce((sum, p) => sum + p.variants.length, 0),
  watches: watches.products.reduce((sum, p) => sum + p.variants.length, 0),
  airpods: airpods.products.reduce((sum, p) => sum + p.variants.length, 0),
  total: allProducts.reduce((sum, p) => sum + p.variants.length, 0),
};
