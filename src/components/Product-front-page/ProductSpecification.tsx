function ProductSpecification() {
  return (
    <>
      {' '}
      {new Array(5).fill(0).map((_, index) => {
        return (
          <div
            key={index}
            className={`flex items-center px-4 gap-x-2 py-2  ${index % 2 === 0 ? 'bg-gray-200/80' : 'bg-gray-50'}`}
          >
            <h1 className="flex-1 text-right font-bold">Brand</h1>
            <h1 className="flex-1 text-left">Solplanet</h1>
          </div>
        );
      })}
    </>
  );
}

export default ProductSpecification;
