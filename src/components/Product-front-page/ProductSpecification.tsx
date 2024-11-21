import { firaSans, muktaVaani } from '@/app/font';

function ProductSpecification() {
  return (
    <>
      <h1
        className={`hidden md:block ${firaSans.className} text-2xl font-bold text-blue-navy-blue mb-4`}
      >
        Specifications
      </h1>
      {new Array(5).fill(0).map((_, index) => {
        return (
          <div
            key={index}
            className={`flex items-center px-4 gap-x-2 py-2 ${muktaVaani.className} ${index % 2 === 0 ? 'bg-gray-200/80' : 'bg-gray-50'}`}
          >
            <h1 className="flex-1 text-right font-semibold">Brand</h1>
            <h1 className="flex-1 text-left">Solplanet</h1>
          </div>
        );
      })}
    </>
  );
}

export default ProductSpecification;
