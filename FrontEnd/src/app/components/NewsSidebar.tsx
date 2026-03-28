import { useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  time?: string;
}

interface NewsSidebarProps {
  newNews: NewsItem[];
  popularNews: NewsItem[];
  onNewsClick: (id: number) => void;
}

export function NewsSidebar({ newNews, popularNews, onNewsClick }: NewsSidebarProps) {
  const [activeTab, setActiveTab] = useState<'new' | 'popular'>('new');

  return (
    <div className="bg-white border border-gray-200 rounded">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors ${
            activeTab === 'new'
              ? 'bg-[#0090DA] text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          Tin mới
        </button>
        <button
          onClick={() => setActiveTab('popular')}
          className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors ${
            activeTab === 'popular'
              ? 'bg-[#0090DA] text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          Đọc nhiều
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'new' ? (
          <ul className="space-y-3">
            {newNews.map((item, index) => (
              <li key={index} className="border-b border-gray-100 pb-3 last:border-0">
                <div 
                  onClick={() => onNewsClick(item.id)}
                  className="block hover:text-[#0090DA] cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-[#0090DA] text-xs mt-0.5">▸</span>
                    <div className="flex-1">
                      <h4 className="text-sm leading-snug mb-1">{item.title}</h4>
                      {item.time && (
                        <span className="text-xs text-gray-500">{item.time}</span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-3">
            {popularNews.map((item, index) => (
              <li key={index} className="border-b border-gray-100 pb-3 last:border-0">
                <div 
                  onClick={() => onNewsClick(item.id)}
                  className="block hover:text-[#0090DA] cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-[#0090DA] text-xs mt-0.5">▸</span>
                    <h4 className="text-sm leading-snug">{item.title}</h4>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* See More */}
      <div className="border-t border-gray-200 py-2 text-center">
        <a href="#" className="text-sm text-[#0090DA] hover:text-[#0080c0] font-medium">
          Xem thêm »
        </a>
      </div>
    </div>
  );
}