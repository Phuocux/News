import { ImageWithFallback } from './figma/ImageWithFallback';
import { Share2, Facebook, Twitter, Link2, Printer, MessageCircle, ArrowLeft } from 'lucide-react';
import { NewsSidebar } from './NewsSidebar';
import { useNavigate } from 'react-router-dom';

interface ArticleDetailProps {
  article: {
    title: string;
    image: string;
    author: string;
    date: string;
    content: string;
    category: string;
  };
  newNews: any[];
  popularNews: any[];
}

export function ArticleDetail({  article, newNews, popularNews  }: ArticleDetailProps) {
  const navigate = useNavigate();
  
  const handleNewsClick = (id: number) => {
    navigate(`/article/${id}`);
    window.scrollTo(0, 0); // Scroll to top when navigating to new article
  };
  <NewsSidebar 
  newNews={newNews} 
  popularNews={popularNews} 
  onNewsClick={handleNewsClick} 
/>

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Article Content */}
        <div className="lg:col-span-2">
          {/* Back Button and Breadcrumb */}
          <div className="mb-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[#0090DA] hover:text-[#0080c0] mb-2 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại trang chủ
            </button>
            <nav className="text-sm">
              <a href="/" className="text-[#0090DA] hover:underline">Trang chủ</a>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-600">{article.category}</span>
            </nav>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Author and Date */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {article.author.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-semibold text-sm">{article.author}</div>
                <div className="text-xs text-gray-500">{article.date}</div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="ml-auto flex items-center gap-2">
              <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                <span className="text-xs font-semibold px-1">Chia sẻ</span>
              </button>
              <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Image */}
          <ImageWithFallback 
            src={article.image}
            alt={article.title}
            className="w-full h-auto mb-6"
          />

          {/* Article Content */}
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4 text-base">
              {article.content}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 text-base">
              Theo nguồn tin từ Bộ Ngoại giao, cuộc gặp diễn ra trong bối cảnh quan hệ hai nước đang phát triển tích cực trên nhiều lĩnh vực. Hai bên đã trao đổi sâu rộng về các vấn đề hợp tác song phương và khu vực, đặc biệt là trong các lĩnh vực kinh tế, thương mại, đầu tư và văn hóa.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 text-base">
              Ngoại trưởng Vương Nghị khẳng định Trung Quốc coi trọng quan hệ với Việt Nam, sẵn sàng cùng phía Việt Nam tăng cường tin cậy chính trị, đẩy mạnh hợp tác thực chất trên các lĩnh vực, góp phần vào hòa bình, ổn định và phát triển của khu vực.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 text-base">
              Bộ trưởng Lê Hoài Trung cảm ơn sự quan tâm của phía Trung Quốc, nhấn mạnh Việt Nam luôn coi trọng quan hệ láng giềng hữu nghị và hợp tác toàn diện với Trung Quốc. Việt Nam mong muốn hai bên tiếp tục phát huy hiệu quả các cơ chế hợp tác hiện có, thúc đẩy hợp tác song phương đi vào chiều sâu, thiết thực và hiệu quả.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                #ChínhTrị
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                #NgoạiGiao
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                #QuanHệQuốcTế
              </span>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Tin liên quan</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 pb-4 border-b border-gray-200 hover:bg-gray-50 p-2 -m-2 rounded cursor-pointer">
                  <ImageWithFallback 
                    src={`https://images.unsplash.com/photo-${1650532924043 + i}-ace81d44a7f3?w=200&h=150&fit=crop`}
                    alt="Related article"
                    className="w-32 h-24 object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1 hover:text-[#0090DA]">
                      Tin tức liên quan số {i}: Diễn biến mới trong quan hệ ngoại giao
                    </h4>
                    <p className="text-xs text-gray-500">2 giờ trước</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8 bg-gray-50 p-6 rounded">
            <h3 className="text-xl font-bold mb-4">Bình luận (0)</h3>
            <textarea
              placeholder="Viết bình luận của bạn..."
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#0090DA] min-h-[100px]"
            />
            <button className="mt-3 px-6 py-2 bg-[#0090DA] text-white rounded hover:bg-[#0080c0] transition-colors">
              Gửi bình luận
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <NewsSidebar newNews={newNews} popularNews={popularNews} onNewsClick={handleNewsClick} />
          </div>
        </div>
      </div>
    </div>
  );
}