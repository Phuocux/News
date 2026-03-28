import { TrendingUp } from 'lucide-react';

interface PopularArticle {
  title: string;
  views: string;
}

interface SidebarProps {
  popularArticles: PopularArticle[];
}

export function Sidebar({ popularArticles }: SidebarProps) {
  return (
    <div className="py-8">
      <div className="sticky top-4">
        {/* Most Read Section */}
        <div className="bg-white border-2 border-black p-4 mb-6">
          <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-black flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            ĐỌC NHIỀU NHẤT
          </h3>
          <ul className="space-y-3">
            {popularArticles.map((article, index) => (
              <li key={index} className="border-b border-gray-200 pb-3 last:border-0">
                <div className="flex gap-3">
                  <span className="text-2xl font-bold text-gray-300">{index + 1}</span>
                  <div>
                    <h4 className="font-semibold text-sm hover:text-blue-600 cursor-pointer">
                      {article.title}
                    </h4>
                    <span className="text-xs text-gray-500">{article.views} lượt xem</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Advertisement Placeholder */}
        <div className="bg-gray-100 border-2 border-black p-8 text-center">
          <div className="text-sm text-gray-500 mb-2">QUẢNG CÁO</div>
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-lg">Banner 300x250</span>
          </div>
        </div>
      </div>
    </div>
  );
}
