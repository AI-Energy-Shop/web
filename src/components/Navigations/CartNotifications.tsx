import Image from 'next/image';

export function CartNotification() {
  return (
    <div className="absolute right-0 top-11 bg-white shadow-lg hidden group-hover:block">
      <div className="text-lg font-semibold bg-[#29294d] p-2 text-white text-center">
        Added to Cart
      </div>
      <div className="flex items-start rounded-sm">
        <div className="flex border p-3 justify-between">
          <div className="left w-20 h-20">
            <Image
              alt="product"
              width={100}
              height={100}
              src="/no-product-image.jpg"
            />
          </div>
          <div className="right">
            <h4 className="text-sm font-medium w-[200px] text-wrap text-left">
              Haier Monoblock 200L Heat Pump Water Heater
            </h4>
            <div className="mt-1 text-sm text-muted-foreground text-left">
              Qty: 2
              <br />
              $4,500.00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
