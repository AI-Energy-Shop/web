'use client';

import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createSetupIntent } from '@/app/actions/stripe';

function CardCollectionForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cardElementOptions: StripeCardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) return;

    const { clientSecret, error } = await createSetupIntent();

    if (!clientSecret || error) {
      setError('Something went wrong');
      return;
    }

    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: name || undefined, // Send name if filled
        },
      },
    });

    console.log(result);

    if (result.error) {
      setError(result.error.message || 'Something went wrong');
    } else {
      alert('Card saved successfully!');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <Label htmlFor="name" className=" text-gray-700 text-sm font-bold mb-2">
          Name on Card
        </Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <Label className="text-gray-700 text-sm font-bold mb-2">
          Card Details
        </Label>
        <div className="p-3 border border-gray-300 rounded-lg shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Saving...' : 'Save Card'}
      </Button>
    </form>
  );
}

export default CardCollectionForm;
