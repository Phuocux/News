import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { AdBanner } from '../components/AdBanner';
import { MainArticle } from '../components/MainArticle';
import { SmallArticles } from '../components/SmallArticles';
import { RedBanner } from '../components/RedBanner';
import { NewsSidebar } from '../components/NewsSidebar';
import { LoginModal } from '../components/LoginModal';
import api from "../../service/api";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const navigate = useNavigate();
  const handleArticleClick = (id: number) => {
    navigate(`/article/${id}`);
  };
 useEffect(() => {
    console.log("ENV:", import.meta.env.VITE_API_URL);

    api.get("/articles")
      .then(res => {
        console.log("DATA:", res.data);
        setArticles(res.data);
      })
      .catch(err => console.log("ERROR:", err));
  }, []);

 const mainArticle = articles[0] || {};
  const smallArticles = articles.slice(1, 4);
  const otherNews = articles.slice(4, 7);

  const newNews = [
    { id: 8, title: 'TNsv THAICO Cup 15.3: 1 đội điền cạc chịu siêu dự kiện, Thủy Lợi chạm trận Mỹ Nam', time: '3 giờ trước' },
    { id: 9, title: 'Cả nước: 03 có hơn 76 triệu cử tri đi bỏ phiếu, đạt tỷ lệ 99,38%', time: '4 giờ trước' },
    { id: 10, title: 'Triển động binnars Hầu Quốc về đích với tên bắn tương Thống Lại bản thách ở Việt Nam', time: '5 giờ trước' },
    { id: 11, title: 'Ti���u Sử Thương tròi ở TPHCM: Thuỷ nhưng không độ SS, HLV Huỳnh Đức lên là SHC cho Hoàng Lạnh', time: '6 giờ trước' },
    { id: 12, title: 'Iran nổi cần câm biu Mỹ, Israeli qua ơn biển Hormuz', time: '7 giờ trước' }
  ];

  const popularNews = [
    { id: 8, title: 'TNST THAICO Cup 15.3: 1 đội điền các chịu siêu dự kiết, Thủy Lợi chạm trận Mỹ Nam' },
    { id: 9, title: 'Cả nước: 03 có hơn 76 triệu cử tri đi bỏ phiếu, đạt tỷ lệ 99,38%' },
    { id: 10, title: 'Triển động binnars Hầu Quốc về đích với tên bắn tương Thống Lại bản thách ở Việt Nam' },
    { id: 11, title: 'Tiểu Sử Thương tròi ở TPHCM: Thuỷ nhưng không độ SS, HLV Huỳnh Đức lên là SHC cho Hoàng Lạnh' },
    { id: 12, title: 'Iran nổi cần câm biu Mỹ, Israeli qua ơn biển Hormuz' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />
      <AdBanner />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <MainArticle 
            id={mainArticle?.id}
            image={mainArticle?.image}
            title={mainArticle?.title}
            description={mainArticle?.description}
            onClick={handleArticleClick}
          />
            <SmallArticles articles={smallArticles} onArticleClick={handleArticleClick} />
            <RedBanner />
            
            {/* Additional content */}
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Tin tức khác</h3>
              <div className="space-y-4">
                {otherNews.map((article) => (
                  <div 
                    key={article.id} 
                    className="border-b border-gray-200 pb-3 cursor-pointer hover:bg-gray-50 -mx-3 px-3 py-2"
                    onClick={() => handleArticleClick(article.id)}
                  >
                    <h4 className="font-semibold hover:text-[#0090DA] mb-1">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-600">{article.description}...</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <NewsSidebar 
                newNews={newNews} 
                popularNews={popularNews} 
                onNewsClick={handleArticleClick}
              />
              
              {/* Advertisement in sidebar */}
              <div className="mt-6 bg-red-600 text-white p-6 rounded shadow-md">
                <div className="text-center">
                  <div className="mb-3">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">NHỮNG TÂM GỐI HỒ QUỐC</h4>
                  <p className="text-sm mb-4">CHỈ TRẬN TỔ QUỐC ĐẤT LÀ TRỊ VỊ TRỊ XI</p>
                  <div className="bg-white text-red-600 py-2 px-4 rounded font-bold text-sm inline-block">
                    Xem chi tiết
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
}