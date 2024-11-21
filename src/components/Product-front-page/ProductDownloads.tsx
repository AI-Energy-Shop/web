import { muktaVaani } from '@/app/font';
import { Download } from 'lucide-react';

function ProductDownloads() {
  return (
    <div className={`${muktaVaani.className}`}>
      {new Array(5).fill(0).map((_, index) => {
        return (
          <div
            key={index}
            className={`py-2 px-4 ${index % 2 === 0 ? 'bg-gray-200/80' : 'bg-gray-50'} flex items-center justify-between`}
          >
            <h1 className="underline">Solplanet ASW5000-S-G2 Datasheet</h1>
            <Download className="w-5 h-5 text-purple-purp-aes" />
          </div>
        );
      })}
    </div>
  );
}

export default ProductDownloads;
