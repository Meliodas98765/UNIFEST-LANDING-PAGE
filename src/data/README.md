# Product Data Documentation

This directory contains all product data for the application in JSON format.

## 📁 Files

- `iphones.json` - iPhone products (7 models, 54 variants)
- `ipads.json` - iPad products (2 models, 29 variants)
- `macbooks.json` - MacBook products (2 models, 16 variants)
- `watches.json` - Apple Watch products (4 models, 71 variants)
- `airpods.json` - AirPods products (5 models, 6 variants)
- `types.ts` - TypeScript type definitions
- `index.ts` - Centralized data access and helper functions

## 🚀 Quick Start

### Import All Products

```typescript
import { allProducts, iphones, ipads, macbooks, watches, airpods } from '@/data';
```

### Use React Hooks

```typescript
import { useProducts, useCategoryProducts } from '@/hooks/use-products';

function MyComponent() {
  const { allProducts, counts } = useProducts();
  const iphones = useCategoryProducts('iphones');
  
  return (
    <div>
      <p>Total Products: {counts.products.total}</p>
      <p>Total Variants: {counts.variants.total}</p>
    </div>
  );
}
```

## 📊 Data Structure

### Product Structure

```typescript
interface Product {
  model: string;           // e.g., "iPhone 15"
  productCode: string;     // e.g., "iPhone_15"
  variants: ProductVariant[]; // Array of product variants
}
```

### Variant Types

Each product category has specific variant fields:

#### iPhone Variants
```typescript
{
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
```

#### iPad Variants
```typescript
{
  color: string;
  colorCode: string;
  storage: string;
  connectivity: string;      // "WIFI" or "WIFI + Cellular"
  itemName: string;
  sku: string;
  mrp: number;
  discount: number;
  instantDiscount: number;
  cashBack: number;
  exchangeBonus: number;
  exchangeRate: string;
  effectivePrice: number;
}
```

#### MacBook Variants
```typescript
{
  color: string;
  colorCode: string;
  storage: string;
  itemName: string;
  mrp: number;
  discount: number;
  instantDiscount: number | null;
  cashBack: number;
  exchangeBonus: number | null;
  exchangeValue: number | null;
  effectivePrice: number | null;
}
```

#### Watch Variants
```typescript
{
  color: string;
  colorCode: string;
  size: string;            // e.g., "42 mm", "46 mm", "49mm"
  band: string;            // Band type and size
  itemName: string;
  mrp: number;
  discount: number;
  insertAmount: number;
  cashBack: number;
  exchangeBonus: number;
  exchangeValue: number;
  effectivePrice: number;
}
```

#### AirPods Variants
```typescript
{
  color: string;
  colorCode: string;
  itemName: string;
  itemAlias: string;       // SKU/model number
  mrp: number;
  discount: number;
  instantDiscount: number;
  cashBack: number;
  exchangeBonus: number;
  exchangeValue: number;
  effectivePrice: number;
}
```

## 🔧 Helper Functions

### Get Products by Category

```typescript
import { getProductsByCategory } from '@/data';

const iphones = getProductsByCategory('iphones');
const ipads = getProductsByCategory('ipads');
const macbooks = getProductsByCategory('macbooks');
const watches = getProductsByCategory('watches');
const airpods = getProductsByCategory('airpods');
```

### Search Products

```typescript
import { searchProducts } from '@/data';

const results = searchProducts('iPhone 15');
// Returns all products matching "iPhone 15"
```

### Get Product by Model

```typescript
import { getProductByModel } from '@/data';

const product = getProductByModel('iPhone 15');
// Returns the iPhone 15 product or undefined
```

### Get All Variants from Category

```typescript
import { getAllVariants } from '@/data';

const allIphoneVariants = getAllVariants('iphones');
// Returns flat array of all iPhone variants
```

## 📈 Product Counts

```typescript
import { productCounts, variantCounts } from '@/data';

console.log(productCounts);
// {
//   iphones: 7,
//   ipads: 2,
//   macbooks: 2,
//   watches: 4,
//   airpods: 5,
//   total: 20
// }

console.log(variantCounts);
// {
//   iphones: 54,
//   ipads: 29,
//   macbooks: 16,
//   watches: 71,
//   airpods: 6,
//   total: 176
// }
```

## 💡 Usage Examples

### Display All iPhone Models

```typescript
import { iphones } from '@/data';

function IPhoneList() {
  return (
    <div>
      {iphones.products.map((product) => (
        <div key={product.productCode}>
          <h3>{product.model}</h3>
          <p>{product.variants.length} variants</p>
        </div>
      ))}
    </div>
  );
}
```

### Display Product Variants

```typescript
import { getProductByModel } from '@/data';

function ProductVariants({ model }: { model: string }) {
  const product = getProductByModel(model);
  
  if (!product) return <div>Product not found</div>;
  
  return (
    <div>
      <h2>{product.model}</h2>
      {product.variants.map((variant, index) => (
        <div key={index}>
          <p>{variant.itemName}</p>
          <p>MRP: ₹{variant.mrp.toLocaleString()}</p>
          <p>Effective Price: ₹{variant.effectivePrice?.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
```

### Filter Variants by Color

```typescript
import { useCategoryProducts } from '@/hooks/use-products';

function IPhoneColors() {
  const iphones = useCategoryProducts('iphones');
  
  const colors = new Set(
    iphones.flatMap(product => 
      product.variants.map((v: any) => v.color)
    )
  );
  
  return (
    <div>
      {Array.from(colors).map(color => (
        <span key={color}>{color}</span>
      ))}
    </div>
  );
}
```

### Search and Filter

```typescript
import { useProductSearch } from '@/hooks/use-products';

function ProductSearch() {
  const [query, setQuery] = useState('');
  const results = useProductSearch(query);
  
  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      {results.map(product => (
        <div key={product.productCode}>{product.model}</div>
      ))}
    </div>
  );
}
```

## 🎯 Best Practices

1. **Use TypeScript types**: Import types from `@/data/types` for type safety
2. **Use React hooks**: Prefer `useProducts` and related hooks for React components
3. **Memoize expensive operations**: Use `useMemo` when filtering or transforming large arrays
4. **Handle null values**: Some fields like `effectivePrice` can be `null`, always check before displaying

## 📝 Notes

- All prices are in Indian Rupees (₹)
- Discount percentages are whole numbers (e.g., 5 means 5%)
- Some products may have `null` values for optional fields
- Product codes are unique identifiers for each product model
