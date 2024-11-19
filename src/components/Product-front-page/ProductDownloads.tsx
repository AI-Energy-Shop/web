function ProductDownloads() {
  return (
    <div>
      {new Array(5).fill(0).map((_, index) => {
        return (
          <div
            key={index}
            className={`py-2 px-4 ${index % 2 === 0 ? 'bg-gray-200/80' : 'bg-gray-50'}`}
          >
            <h1 className="underline">Solplanet ASW5000-S-G2 Datasheet</h1>
          </div>
        );
      })}
    </div>
  );
}

export default ProductDownloads;
