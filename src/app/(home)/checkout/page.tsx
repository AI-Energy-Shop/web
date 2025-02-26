import { getCartItems } from '@/app/actions/cart';
import CartDetails from '@/components/checkout/CartDetails';
import { cookies } from 'next/headers';

async function CheckoutPage() {
  const cookieStore = await cookies();
  const a_token = cookieStore.get('a-token');
  const a_user = cookieStore.get('a-user');
  const { carts } = await getCartItems();

  return (
    <main className="bg-yellow-light-yellow pb-12">
      <CartDetails
        authToken={a_token?.value}
        userEmail={JSON.parse(a_user?.value || JSON.stringify({})).email}
        data={carts}
      />
    </main>
  );
}

export default CheckoutPage;
