import { firaSans } from '@/app/font';

function ProductKeyFeatures() {
  return (
    <div className="md:w-4/5 md:mt-8">
      <h1
        className={`${firaSans.className} hidden md:block font-bold text-2xl text-purple-purp-aes mb-4`}
      >
        Key Features
      </h1>
      <ul className="list-disc px-4 md:px-0">
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
          molestias?
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
          molestias?
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
          molestias?
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
          molestias?
        </li>
      </ul>
    </div>
  );
}

export default ProductKeyFeatures;
