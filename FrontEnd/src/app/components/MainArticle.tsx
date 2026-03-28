import { ImageWithFallback } from './figma/ImageWithFallback';

interface MainArticleProps {
  id: number;
  image: string;
  title: string;
  description: string;
  onClick: (id: number) => void;
}

export function MainArticle({ id, image, title, description, onClick }: MainArticleProps) {
  return (
    <article 
      className="border-b border-gray-200 pb-6 mb-6 cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div className="flex gap-6">
        {/* Image on the left */}
        <div className="w-[45%] flex-shrink-0">
          <ImageWithFallback 
            src={image} 
            alt={title}
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Content on the right */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 leading-tight hover:text-[#0090DA]">
            {title}
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}