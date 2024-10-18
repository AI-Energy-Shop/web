import React from 'react';
import LocationTab from '../custom-ui/Tabs/LocationTab';
import { ComponentSectionsWarehouseLocations } from '@/lib/types';

interface WarehouseSectionProps {
  data: ComponentSectionsWarehouseLocations;
}

const WarehouseSection: React.FC<WarehouseSectionProps> = ({ data }) => {
  return (
    <section className="w-full h-auto">
      {/* DETAILS */}
      <div className="w-full md:w-[50%] lg:w-[25%] md:mx-auto h-auto p-5 rounded-[10px] overflow-hidden my-5 flex flex-col justify-center items-center">
        <h1 className="uppercase text-lg font-bold">{data?.heading}</h1>
        <p className="text-sm text-center">{data?.sub_heading}</p>
      </div>

      <LocationTab data={data?.locations} />
    </section>
  );
};

export default WarehouseSection;
