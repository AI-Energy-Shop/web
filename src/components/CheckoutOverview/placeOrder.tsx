import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

function PlaceOrder() {
  return (
    <div className="space-y-4">
      <Button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center">
        Place Order
      </Button>

      <Button className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-300 transition-colors duration-200 flex items-center justify-center">
        <ArrowLeft size={16} className="mr-2" />
        Return to Cart
      </Button>
    </div>
  );
}

export default PlaceOrder;
