import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Search, User, ShoppingCart, Warehouse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex max-w-[1200px] h-20 items-center justify-between mx-auto gap-10">
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
            <p className={`text-[10px] text-purple-purp-aes font-black text-center`}>
              AI ENERGY SHOP
            </p>
          </div>
        </Link>
        <nav className="flex items-end h-full text-sm font-medium py-[0.5rem] gap-3">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 transition-colors hover:text-primary font-normal">
              <span>Products</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-normal">
              <DropdownMenuItem>
                <Link href="/products/solar-panel">Solar Panel</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/products/inverter">Inverter</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/products/battery">Energy Storage</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/products/charger">Charger</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/products/electrical">Electrical</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/about" className="transition-colors hover:text-primary font-normal">
            About Us
          </Link>
          <Link href="/contact-us" className="text-primary font-normal">
            Contact Us
          </Link>
          <Link
            href="/downloads"
            className="transition-colors hover:text-primary font-normal"
          >
            Downloads
          </Link>
          <Link
            href="/stc-trading"
            className="transition-colors hover:text-primary font-normal"
          >
            STC Trading
          </Link>
          <Link
            href="/shift-trade"
            className="transition-colors hover:text-primary font-normal"
          >
            Shift Trade
          </Link>
        </nav>
        <div className="flex gap-2 items-end h-full py-[0.5rem]">
          <div className="relative w-48 p-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
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
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center m-0 w-auto h-auto px-1 relative"
          >
            <ShoppingCart />
            <span className="text-sm font-normal">Cart(0)</span>
            {/* <span className="absolute -right-3 -top-3 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
              4
            </span> */}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
