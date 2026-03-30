import { ImageWithFallback } from './figma/ImageWithFallback';
import { Share2, Facebook, MessageCircle, ArrowLeft } from 'lucide-react';
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

export function ArticleDetail({ article, newNews, popularNews }: ArticleDetailProps) {
  const navigate = useNavigate();

  // 1. Xử lý trạng thái đang tải (Loading)
  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0090DA] mx-auto mb-4"></div>
        <p className="text-gray-500 font-medium">Đang tải bài viết...</p>
      </div>
    );
  }

  const handleNewsClick = (id: number) => {
    navigate(`/article/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- CỘT TRÁI (CHIẾM 2/3): PHÂN CẤP THÔNG TIN --- */}
        <div className="lg:col-span-2">
          
          {/* TẦNG 1: NỘI DUNG BÀI VIẾT CHÍNH */}
          <section className="mb-8 pb-8 border-b">
            <div className="mb-4">
              <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[#0090DA] hover:text-[#0080c0] mb-2 font-medium">
                <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
              </button>
              <nav className="text-sm">
                <a href="/" className="text-[#0090DA] hover:underline">Trang chủ</a>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-600">{article.category || "Tin tức"}</span>
              </nav>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{article.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-white text-sm uppercase">
                  {article.author?.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{article.author}</div>
                  <div className="text-xs text-gray-500">{article.date}</div>
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-transform active:scale-95">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-transform active:scale-95">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <ImageWithFallback src={article.image} alt={article.title} className="w-full h-auto mb-6 rounded-lg shadow-sm" />

            <div className="prose max-w-none mb-6">
              <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-line">
                {article.content}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["#ChínhTrị", "#NgoạiGiao", "#QuanHệQuốcTế"].map(tag => (
                <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700 font-medium">{tag}</span>
              ))}
            </div>
          </section>

          
          {/* TẦNG 3: THÔNG TIN LIÊN QUAN (Nằm dưới tin mới nhất) */}
          <section className="mb-12 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
               <span className="w-1.5 h-5 bg-[#0090DA] rounded-full"></span> Thông tin liên quan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {[1, 2, 3].map((item) => (
                 <div key={item} className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer group" onClick={() => handleNewsClick(2000+item)}>
                    <ImageWithFallback src={`https://picsum.photos/id/${item+40}/300/200`} className="w-full h-24 object-cover rounded mb-2" />
                    <h5 className="text-xs font-bold line-clamp-2 group-hover:text-[#0090DA] transition-colors">Tiêu đề bài viết liên quan đến chủ đề bạn đang quan tâm...</h5>
                 </div>
               ))}
            </div>
          </section>

          {/* TẦNG 4: BÌNH LUẬN (Dưới cùng) */}
          <section className="bg-white border rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-6 py-3 border-b">
               <h3 className="text-lg font-bold flex items-center gap-2 text-gray-700">
                 <MessageCircle className="w-5 h-5 text-[#0090DA]" /> Bình luận (0)
               </h3>
            </div>
            <div className="p-6">
              <textarea
                placeholder="Mời bạn chia sẻ ý kiến..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0090DA] focus:bg-white outline-none min-h-[100px] transition-all"
              />
              <div className="flex justify-end mt-4">
                <button className="px-8 py-2.5 bg-[#0090DA] text-white font-bold rounded-lg hover:bg-[#007bb8] shadow-md shadow-blue-100 active:scale-95 transition-all">
                  Gửi bình luận
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* --- CỘT PHẢI: SIDEBAR --- */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <NewsSidebar newNews={newNews} popularNews={popularNews} onNewsClick={handleNewsClick} />
          </div>
        </div>

      </div>
    </div>
  );
}