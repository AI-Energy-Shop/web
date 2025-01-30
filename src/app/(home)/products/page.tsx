import Products from '@/components/products/Products';
import ProductsFilterSidebar from '@/components/products/ProductsFilterSidebar';
import Breadcrumb from '@/components/products/Breadcrumb';
import Categories from '@/components/products/Categories';
import Brands from '@/components/products/Brands';
import { products } from '@/app/actions/products';
import { FILTERS, PRODUCT_CATEGORIES } from '@/constant';
export default async function ProductsPage() {
  const { data } = await products();

  const { getProducts } = data
  

  const categories = getProducts.map((product: any) => {
    return {
      id: product.documentId,
      name: product.category,
      value: product.category.toLowerCase(),
    }
  })

  const brands = getProducts.map((product: any) => {
    return {
      id: product.documentId,
      name: product.vendor,
      value: product.vendor.toLowerCase(),
    }
  })


  // create new array from categories and brands and remove the duplicates



  const filters = [
    {
      id: 1,
      name: 'Brands',
      value: brands,
    },
    {
      id: 1,
      name: 'Categories',
      value: categories,
    }
  ]

  console.log(filters)


  return (
    <div className="min-h-screen bg-[#fdf6ed]">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Category Icons */}
      <Categories categories={PRODUCT_CATEGORIES} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8">Solar Panels</h1>

        {/* Brands */}
        <Brands brands={brands} />

        {/* Filter and Products */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <ProductsFilterSidebar filters={FILTERS} />

          {/* Products Grid */}
          <Products products={getProducts} />
        </div>
      </div>
    </div>
  );
}