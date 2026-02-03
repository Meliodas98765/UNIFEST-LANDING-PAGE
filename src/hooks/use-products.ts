import { useMemo } from 'react';
import {
  allProducts,
  productCategories,
  getProductsByCategory,
  getProductByModel,
  searchProducts,
  getAllVariants,
  productCounts,
  variantCounts,
} from '@/data';
import type { Product } from '@/data/types';

export function useProducts() {
  return useMemo(() => ({
    allProducts,
    categories: productCategories,
    counts: {
      products: productCounts,
      variants: variantCounts,
    },
    getByCategory: getProductsByCategory,
    getByModel: getProductByModel,
    search: searchProducts,
    getAllVariants,
  }), []);
}

export function useCategoryProducts(category: 'iphones' | 'ipads' | 'macbooks' | 'watches' | 'airpods') {
  return useMemo(() => getProductsByCategory(category), [category]);
}

export function useProductSearch(query: string) {
  return useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query);
  }, [query]);
}

export function useProductByModel(model: string) {
  return useMemo(() => getProductByModel(model), [model]);
}
