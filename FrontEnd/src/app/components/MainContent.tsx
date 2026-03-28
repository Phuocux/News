import { ImageWithFallback } from './figma/ImageWithFallback';

interface NewsArticle {
  image: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
}

interface MainContentProps {
  articles: NewsArticle[];
}

export function MainContent({ articles }: MainContentProps) {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-black">TIN TỨC CHÍNH</h2>
      <div className="space-y-6">
        {articles.map((article, index) => (
          <article key={index} className="border-b border-gray-300 pb-6 last:border-0">
            <div className="flex gap-4">
              <ImageWithFallback 
                src={article.image} 
                alt={article.title}
                className="w-64 h-48 object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <span className="text-xs font-bold text-red-600 uppercase">
                  {article.category}
                </span>
                <h3 className="text-xl font-bold mt-1 mb-2 hover:text-blue-600 cursor-pointer">
                  {article.title}
                </h3>
                <p className="text-gray-700 mb-3">
                  {article.description}
                </p>
                <div className="text-xs text-gray-500">
                  <span>{article.author}</span> • <span>{article.date}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
