import CartDetails from '@/components/Checkout/CartDetails';
import { cookies } from 'next/headers';

function CheckoutPage() {
  const cookieStore = cookies();
  const a_token = cookieStore.get('a-token');
  const a_user = cookieStore.get('a-user');
  return (
    <main className="bg-yellow-light-yellow pb-96">
      <CartDetails
        authToken={a_token?.value}
        userEmail={JSON.parse(a_user?.value || JSON.stringify({})).email}
      />
    </main>
  );
}

export default CheckoutPage;
