export const dynamic = 'force-dynamic';

import AddressList from '@/components/Address/AddressList';
import { getAddress } from '@/app/actions/address';
import AddNewAddress from '@/components/Address/AddNewAddress';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

async function AddressPage() {
  const { data } = await getAddress();

  return (
    <main className="pt-[75px] min-h-screen ae-mobile-container ae-non-mobile-container space-y-4 pb-16">
      <div className="flex items-center gap-x-1 border border-black p-2 rounded-lg w-fit">
        <ChevronLeft className="w-5 h-5" />
        <Link href="/cart" className="md:flex md:gap-x-1">
          Back to Cart
        </Link>
      </div>
      <div className="max-sm:space-y-2 sm:flex sm:justify-between sm:items-center">
        <h1 className="text-2xl font-semibold">My Adresses</h1>
        <AddNewAddress data={data} />
      </div>
      <AddressList data={data} />
    </main>
  );
}

export default AddressPage;
