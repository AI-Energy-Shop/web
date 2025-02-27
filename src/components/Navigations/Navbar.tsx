import Image from 'next/image';
import Link from 'next/link';
import { User, ShoppingCart, Warehouse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavList from './NavList';
import NavSearchBar from './NavSearchBar';
import CartButton from './CartButton';
interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex max-w-[1200px] h-20 items-end justify-between mx-auto gap-10 py-[0.5rem]">
        <Link href="/" passHref>
          <div className="w-[100px] flex flex-col items-center justify-between gap-1">
            <div className="relative w-10 h-10 overflow-hidden">
              <Image
                width={10}
                height={10}
                alt="logo image"
                src="/images/logo/AES-Logomark_750px-M.png"
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <p
              className={`text-[10px] text-purple-purp-aes font-black text-center`}
            >
              AI ENERGY SHOP
            </p>
          </div>
        </Link>
        <NavList />
        <NavSearchBar />
        <div className="flex gap-2 items-end h-full">
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center m-0 w-auto h-auto px-1"
          >
            <Warehouse />
            <span className="text-sm font-normal">Sydney</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center m-0 w-auto h-auto px-1"
          >
            <User className="h-5 w-5" />
            <span className="text-sm font-normal">Username</span>
          </Button>
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
