'use client';
import React, { useState } from 'react';
import { Locations } from '@/libs/types';

interface LocationTabProps {
  data: Locations[];
}
const LocationTab: React.FC<LocationTabProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(data[0].name);

  const handleButtonClick = (tab: any) => {
    setActiveTab(tab.name);
  };

  return (
    <div className="w-full mx-auto">
      {/* BUTTONS */}
      <div className="flex justify-between md:justify-center lg:justify-evenly md:gap-10">
        {data.map((tab) => (
          <button
            key={tab.name}
            className={`uppercase px-4 font-bold text-blue-navy-blue ${
              activeTab === tab.name && 'bg-yellow-aes-yellow rounded-t-md'
            }`}
            onClick={() => handleButtonClick(tab)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      {/* GRADIENT EFFECT */}
      <div className="gradient-effect h-[5px] w-full rounded-t-sm"></div>
      {/* CONTENT */}
      <div className="bg-blue-navy-blue md:min-h-[400px] p-3 rounded-b-3xl">
        {data.map(
          (tab) =>
            activeTab === tab.name && (
              <div
                key={tab.name}
                className="w-full flex flex-col items-center justify-center"
              >
                {/* ADDRESS */}
                <h1 className="address w-[200px] text-center text-white">
                  {tab.address}
                </h1>

                {/* OPEN HOURS */}
                <div className="font-bold my-5 text-white">
                  <h2 className="text-white text-center"> Monday - Friday</h2>
                  <div className="office-hours flex gap-5 ">
                    <div className="warehouse-hour flex flex-col">
                      <span className="text-sm text-center">
                        Warehouse Hours
                      </span>
                      <span className="text-sm font-normal">
                        {tab.warehouse_time}
                      </span>
                    </div>
                    <div className="office-hour flex flex-col">
                      <span className="text-sm text-center">Office Hours</span>
                      <span className="text-sm font-normal">
                        {tab.office_time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* MAPS */}
                <div className="map-container w-full rounded-2xl overflow-hidden">
                  <iframe
                    frameBorder={0}
                    style={{ border: 0 }}
                    allowFullScreen
                    src={tab.link}
                    aria-hidden="false"
                    className="w-full md:min-h-[300px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default LocationTab;
