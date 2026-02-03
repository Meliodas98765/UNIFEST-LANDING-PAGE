import { useProducts, useCategoryProducts } from '@/hooks/use-products';

/**
 * Example component showing how to use product data in your UI
 * You can use this as a reference for implementing your product pages
 */
export function ProductExample() {
  const { allProducts, counts, getByCategory } = useProducts();
  const iphones = useCategoryProducts('iphones');
  const ipads = useCategoryProducts('ipads');
  const macbooks = useCategoryProducts('macbooks');
  const watches = useCategoryProducts('watches');
  const airpods = useCategoryProducts('airpods');

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Product Data Overview</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 border rounded">
            <h3 className="font-semibold">iPhones</h3>
            <p className="text-sm text-gray-600">{counts.products.iphones} models</p>
            <p className="text-sm text-gray-600">{counts.variants.iphones} variants</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold">iPads</h3>
            <p className="text-sm text-gray-600">{counts.products.ipads} models</p>
            <p className="text-sm text-gray-600">{counts.variants.ipads} variants</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold">MacBooks</h3>
            <p className="text-sm text-gray-600">{counts.products.macbooks} models</p>
            <p className="text-sm text-gray-600">{counts.variants.macbooks} variants</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold">Watches</h3>
            <p className="text-sm text-gray-600">{counts.products.watches} models</p>
            <p className="text-sm text-gray-600">{counts.variants.watches} variants</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold">AirPods</h3>
            <p className="text-sm text-gray-600">{counts.products.airpods} models</p>
            <p className="text-sm text-gray-600">{counts.variants.airpods} variants</p>
          </div>
        </div>
      </div>

      {/* Example: Display iPhone products */}
      <div>
        <h2 className="text-2xl font-bold mb-4">iPhone Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {iphones.map((product) => (
            <div key={product.productCode} className="p-4 border rounded">
              <h3 className="font-semibold text-lg">{product.model}</h3>
              <p className="text-sm text-gray-600">{product.variants.length} variants</p>
              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  Variants: {product.variants.map((v: any) => 
                    `${v.storage || v.size || ''} ${v.color || ''}`.trim()
                  ).join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example: Display all products */}
      <div>
        <h2 className="text-2xl font-bold mb-4">All Products ({allProducts.length})</h2>
        <div className="space-y-2">
          {allProducts.map((product) => (
            <div key={product.productCode} className="p-3 border rounded">
              <div className="flex justify-between items-center">
                <span className="font-medium">{product.model}</span>
                <span className="text-sm text-gray-600">
                  {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
