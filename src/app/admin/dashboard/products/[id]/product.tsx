import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { product } from '@/app/actions';
import { redirect } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  description: string;
  images: string[];
  longDescription: string;
  rating: number;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Solar Panel',
    category: 'Apparel',
    price: 199.99,
    stock: 50,
    status: 'In Stock',
    description: 'The Cozy Chromatic Blend',
    images: [
      'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    longDescription:
      'Lorem ipsum odor amet, consectetuer adipiscing elit. Ex porttitor at congue ad proin? Auctor magnis curabitur nec velit platea. Metus diam varius neque condimentum ac dictum. Non porta scelerisque odio etiam curabitur, dictumst curae platea nostra. Tincidunt mauris ridiculus cursus tristique at. Condimentum ligula sodales leo mauris euismod. Consectetur libero conubia ridiculus quam cras vel! Vulputate ut torquent malesuada aliquam tempor libero purus suspendisse pulvinar. Lacus massa commodo cras risus ante. Facilisi condimentum eget mollis magna conubia elit cras. Feugiat urna nulla turpis eu eros sodales justo luctus. Lacinia ligula massa mattis netus conubia vivamus. Dapibus congue euismod aptent fermentum vitae pretium, habitasse accumsan. Himenaeos consectetur interdum vivamus, facilisis placerat ipsum.',
    rating: 4.5,
  },
];

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    redirect('/not-found');
  }

  const { data, error, loading } = await product(params.id);

  if (error) {
    return <div>ERROR {error.toString()} </div>;
  }

  if (!data) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto space-y-4 px-4">
        <Link
          href={'/admin/dashboard/products'}
          className="flex items-center gap-x-2 hover:underline text-orange-500"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back to Products</span>
        </Link>
        <nav className="flex items-center text-sm mb-8" aria-label="Breadcrumb">
          <Link
            href="/admin/dashboard/products"
            className="text-gray-500 hover:text-gray-700"
          >
            Products
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gray-900 font-medium">{data.product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-[600px] rounded-lg overflow-hidden shadow-lg">
              {/* <Image
                src={selectedImage}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              /> */}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {/* {product.images.map((image, index) => (
                <button
                  key={index}
                  // onClick={() => setSelectedImage(image)}
                  className="relative h-24 rounded-md overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </button>
              ))} */}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {data.product.name}
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                {data.product.description}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {/* {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))} */}
              </div>
              <span className="text-gray-600">
                {/* ({product.rating.toFixed(1)}) */}
              </span>
            </div>

            <div className="flex items-baseline space-x-4">
              <span className="text-5xl font-bold text-gray-900">
                {/* ${product.price.toFixed(2)} */}
              </span>
              <Badge variant="secondary" className="text-lg">
                {/* {product.category} */}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Availability</span>
                <Badge
                // variant={
                //   product.status === 'In Stock' ? 'default' : 'destructive'
                // }
                >
                  {/* {product.status} */}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Stock</span>
                {/* <span className="font-medium">{product.stock} units</span> */}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="flex-1 h-14 text-lg" size="lg">
                <ShoppingCart className="mr-2 h-6 w-6" /> Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="h-14 w-14">
                <Heart className="h-6 w-6" />
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Product Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {/* {product.longDescription} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
