import { ImageWithFallback } from './figma/ImageWithFallback';

interface SubNewsItemProps {
  image: string;
  title: string;
  category: string;
}

interface SubNewsProps {
  news: SubNewsItemProps[];
}

export function SubNews({ news }: SubNewsProps) {
  return (
    <div className="border-b-2 border-black py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <div key={index} className="bg-white border border-black">
              <ImageWithFallback 
                src={item.image} 
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs font-bold text-blue-600 uppercase">
                  {item.category}
                </span>
                <h3 className="font-bold mt-2 hover:text-blue-600 cursor-pointer">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
