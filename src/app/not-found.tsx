import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import NotFoundImage from '/public/images/not-found.jpg';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-7xl w-full p-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="md:w-1/2 lg:w-2/5 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-orange-500">Oops! Page Not Found</span>
            </h1>
            <p className="text-xl mb-8 text-gray-600 max-w-md">
              It looks like the page you&apos;re looking for doesn&apos;t exist
              or has moved. Let&apos;s get you back on track!
            </p>
            <Button
              asChild
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
          <div className="md:w-1/2 lg:w-3/5 flex justify-center items-center">
            <Image
              src={NotFoundImage}
              alt="404 Illustration"
              width={500}
              height={500}
              className="max-w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
