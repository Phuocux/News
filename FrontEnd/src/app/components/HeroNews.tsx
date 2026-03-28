import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroNewsProps {
  image: string;
  title: string;
  description: string;
  category: string;
}

export function HeroNews({ image, title, description, category }: HeroNewsProps) {
  return (
    <div className="border-b-2 border-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">TIN TỨC NỔI BẬT</h2>
          <p className="text-sm text-gray-600">(Large Image + Headline)</p>
        </div>
        
        <div className="relative">
          <ImageWithFallback 
            src={image} 
            alt={title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <span className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold mb-2">
              {category}
            </span>
            <h1 className="text-white text-3xl font-bold mb-2">{title}</h1>
            <p className="text-white/90 text-lg">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
