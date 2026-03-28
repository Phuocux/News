import { ImageWithFallback } from './figma/ImageWithFallback';

interface SmallArticle {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface SmallArticlesProps {
  articles: SmallArticle[];
  onArticleClick: (id: number) => void;
}

export function SmallArticles({ articles, onArticleClick }: SmallArticlesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-gray-200 mb-6">
      {articles.map((article) => (
        <article 
          key={article.id} 
          className="group cursor-pointer"
          onClick={() => onArticleClick(article.id)}
        >
          <ImageWithFallback 
            src={article.image} 
            alt={article.title}
            className="w-full h-48 object-cover mb-3"
          />
          <h3 className="font-bold text-base mb-2 leading-tight group-hover:text-[#0090DA]">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {article.description}
          </p>
        </article>
      ))}
    </div>
  );
}