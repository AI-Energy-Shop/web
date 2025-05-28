import { firaSans } from '@/app/font';
import React from 'react';
import { Check } from 'lucide-react';

interface PickupLocationProps {
  productData: any;
  pickLocation: any;
}

const PickupLocation = ({ productData, pickLocation }: PickupLocationProps) => {
  return (
    <div>
      <div className="max-md:py-4 max-md:px-2 max-md:space-y-2">
        {/* Select Order Location */}
        <h1 className="font-2xl font-bold md:hidden">Select Order Location</h1>
        <div
          className={`${firaSans.className} max-md:space-y-3 leading-none w-full md:flex md:flex-wrap md:justify-center md:gap-2`}
        >
          {productData?.inventory?.map((location: any) => (
            <div
              className={`p-0.5 rounded-2xl md:basis-[48.31%] cursor-pointer 
                        ${pickLocation === location?.id ? 'gradient-effect' : 'bg-black '}
                        ${location?.quantity === 0 && 'opacity-50 cursor-no-drop'}
                        `}
              key={location?.id}
            >
              <div className="md:py-1 max-md:h-12 md:h-full flex justify-between items-center pl-6 pr-5 rounded-2xl relative bg-white">
                {pickLocation === location?.id && (
                  <span className="absolute bg-green-900 p-0.5 rounded-full left-1.5 top-1/2 transform -translate-y-1/2">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                )}
                <h1 className="font-medium text-[20px]">
                  {location?.location}
                </h1>
                <div className="text-right">
                  <p className="font-semibold text-[16px]">
                    {location?.quantity! < 1 ? 'Out of Stock' : `In Stock`}
                  </p>
                  <p className="text-sm font-light text-[14px]">
                    {location?.quantity! > 100
                      ? 'Qty.100+'
                      : location?.quantity === 0
                        ? 'On Request'
                        : `Qty.${location?.quantity}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PickupLocation;
