'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Printer, MoreHorizontal, Link, Hash, Smile } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface OrderPageProps {
  params: Promise<{ documentId: string }>;
}

const OrderPage = ({ params }: OrderPageProps) => {
  // Mock data - replace with real data later
  const mockOrder = {
    id: '0155777',
    date: 'April 30, 2025 at 10:21 pm',
    source: 'Online Store',
    status: 'Unfulfilled',
    items: [
      {
        name: 'Mock Flask Bottle',
        variant: 'Sample / 25oz',
        sku: 'FLSK-001',
        itemType: 'flask_bundle',
        bundleId: 'BUNDLE-001',
        bottleEngravingId: 'ENG-001',
        price: 995.0,
        quantity: 1,
      },
      {
        name: 'Mock Cap',
        variant: 'Sample',
        sku: 'CAP-001',
        itemType: 'flask_bundle',
        bundleId: 'BUNDLE-001',
        price: 300.0,
        quantity: 1,
      },
      {
        name: 'Mock Connector',
        variant: 'Sample',
        sku: 'CONN-001',
        itemType: 'flask_bundle',
        bundleId: 'BUNDLE-001',
        price: 0.0,
        quantity: 1,
      },
    ],
    payment: {
      subtotal: 1635.0,
      discount: {
        code: 'FREEGLIDER',
        amount: 145.0,
      },
      shipping: {
        method: 'Standard Shipping (for orders under ₱1995)',
        weight: 'Items 0 g, Package 0 g',
        cost: 150.0,
      },
      total: 1640.0,
      paid: 1640.0,
    },
    customer: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '',
      orders: 1,
      address: {
        street1: '123 Sample Street',
        street2: '',
        city: 'Sample City',
        state: 'Sample State',
        zipCode: '12345',
        country: 'Sample Country',
      },
    },
    timeline: [
      {
        time: '11 minutes ago',
        event: 'Order confirmation email was sent',
        email: 'preciouslejarde18@gmail.com',
        type: 'email',
      },
      {
        time: '11 minutes ago',
        event:
          'Discount Code for COD (SUNNIESBULKPURCHASE) was run on this order',
        type: 'discount',
      },
      {
        time: '11 minutes ago',
        event: 'Kids Backpack Promo #615 was run on this order',
        type: 'promo',
      },
      {
        time: '11 minutes ago',
        event:
          'A ₱1,640.00 PHP payment was processed on Secure Payments via PayMongo',
        type: 'payment',
      },
      {
        time: '11 minutes ago',
        event: 'Confirmation #IRZFTQDZP was generated for this order',
        type: 'confirmation',
      },
      {
        time: '11 minutes ago',
        event:
          'Pia Lejarde placed this order on Online Store (checkout #39035306508342)',
        type: 'order',
      },
    ],
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold">#{mockOrder.id}</h1>
          <Badge variant="outline" className="bg-yellow-100">
            {mockOrder.status}
          </Badge>
          <span className="text-sm text-gray-500">{mockOrder.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => {}}>
            Refund
          </Button>
          <Button size="sm" variant="outline" onClick={() => {}}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {}}
            className="flex items-center gap-2"
          >
            <Printer className="w-2 h-2" />
            Print
          </Button>
          <Button size="sm" variant="outline" onClick={() => {}}>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Badge variant="outline" className="bg-yellow-50">
                  {mockOrder.status} ({mockOrder.items.length})
                </Badge>
              </CardTitle>
              <Button size="sm" variant="ghost" className="text-sm">
                ...
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-xs text-gray-600">
                  <p>Delivery method</p>
                  <p>Standard Shipping (for orders under ₱1995)</p>
                </div>

                {/* Order Items */}
                <div className="space-y-6">
                  {mockOrder.items.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded"></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-600">
                              {item.variant}
                            </p>
                          </div>
                          <div className="text-right">
                            <p>₱{item.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-600">
                              × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          <p className="text-xs">SKU: {item.sku}</p>
                          <p className="text-xs">_item_type: {item.itemType}</p>
                          <p className="text-xs">_bundleID: {item.bundleId}</p>
                          {item.bottleEngravingId && (
                            <p>_bottleEngravingID: {item.bottleEngravingId}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment Details */}
                <div className="pt-4 border-t">
                  <Badge className="mb-4">Paid</Badge>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₱{mockOrder.payment.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="text-red-500">
                        -₱{mockOrder.payment.discount.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <span>Shipping</span>
                        <p className="text-xs text-gray-500">
                          {mockOrder.payment.shipping.weight}
                        </p>
                      </div>
                      <span>₱{mockOrder.payment.shipping.cost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Total</span>
                      <span>₱{mockOrder.payment.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Paid</span>
                      <span>₱{mockOrder.payment.paid.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button size="sm" className="px-5 rounded-lg">
                Fulfill
              </Button>
            </CardFooter>
          </Card>

          {/* Timeline */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-sm">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-px bg-gray-200"></div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs">
                      RC
                    </div>
                    <div className="flex-1">
                      <Input
                        className="w-full text-sm"
                        placeholder="Leave a comment..."
                      />
                      <div className="flex gap-2 mt-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Smile className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Hash className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Link className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Post
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 pl-12">
                    Only you and other staff can see comments
                  </div>

                  <div className="pl-12 text-sm font-medium">Today</div>

                  {mockOrder.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{event.event}</p>
                        {event.email && (
                          <button className="text-sm text-blue-600 hover:underline">
                            View email
                          </button>
                        )}
                        <span className="text-xs text-gray-500 block">
                          {event.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <div className="space-y-6">
            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No notes from customer</p>
              </CardContent>
            </Card>

            {/* Customer */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Customer
                  <Button variant="ghost" className="text-sm">
                    ...
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{mockOrder.customer.name}</h3>
                    <p className="text-sm text-gray-600">
                      {mockOrder.customer.orders} order
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Contact information</h4>
                    <p className="text-sm text-blue-600">
                      {mockOrder.customer.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {mockOrder.customer.phone || 'No phone number'}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Shipping address</h4>
                    <div className="text-sm text-gray-600">
                      <p>{mockOrder.customer.name}</p>
                      <p>{mockOrder.customer.address.street1}</p>
                      {mockOrder.customer.address.street2 && (
                        <p>{mockOrder.customer.address.street2}</p>
                      )}
                      <p>{mockOrder.customer.address.city}</p>
                      <p>{mockOrder.customer.address.state}</p>
                      <p>{mockOrder.customer.address.zipCode}</p>
                      <p>{mockOrder.customer.address.country}</p>
                      <p className="text-blue-600 mt-2">View map</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Billing address</h4>
                    <p className="text-sm text-gray-600">
                      Same as shipping address
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Risk */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  Order risk
                  <Button variant="ghost" className="text-sm">
                    ...
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div className="w-1/3 h-full bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className="text-green-600">Low</span>
                      <span className="text-gray-400">Medium</span>
                      <span className="text-gray-400">High</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Chargeback risk is low. You can fulfill this order.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
