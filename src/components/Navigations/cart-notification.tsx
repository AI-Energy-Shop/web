export function CartNotification() {
  return (
    <div className="fixed right-4 top-20 z-50 w-72 rounded-lg border bg-white p-4 shadow-lg">
      <div className="text-lg font-semibold text-green-600 mb-4">
        Added to Cart
      </div>
      <div className="flex items-start space-x-4">
        <div className="h-16 w-16 bg-gray-100 rounded"></div>
        <div className="flex-1">
          <h4 className="font-medium">
            Haier Monoblock 200L Heat Pump Water Heater
          </h4>
          <div className="mt-1 text-sm text-muted-foreground">
            Qty: 2
            <br />
            $4,500.00
          </div>
        </div>
      </div>
    </div>
  );
}
