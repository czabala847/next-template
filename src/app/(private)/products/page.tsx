export const revalidate = 60;// ISR: revalida la página cada 60 segundos, para no cachear la página

import { getProductsAction } from '@/modules/private/products/application'
import Image from "next/image"

const ProductsPage = async () => {
  const products = await getProductsAction();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products Test</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <div className="relative w-full h-48 mb-4">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h2 className="font-semibold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-500 mt-2">{product.category}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Raw Data (First Item)</h3>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(products[0], null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ProductsPage;
