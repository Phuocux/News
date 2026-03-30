import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { MainArticle } from '../components/MainArticle';
import { SmallArticles } from '../components/SmallArticles';
import { NewsSidebar } from '../components/NewsSidebar';
import { LoginModal } from '../components/LoginModal';
import api from "../../service/api";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();

  const handleArticleClick = (id: number) => {
    navigate(`/article/${id}`);
  };

  // ================= LOAD ARTICLES =================
  useEffect(() => {
    api.get("/articles")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setArticles(data);
      })
      .catch(err => {
        console.error("Lỗi load articles:", err);
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // ================= HANDLE EMPTY =================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>⚠️ Chưa có bài viết nào (có thể chưa được duyệt)</p>
      </div>
    );
  }

  // ================= DATA =================
  const mainArticle = articles[0];
  const smallArticles = articles.slice(1, 4);
  const otherNews = articles.slice(4, 10);

  // Sidebar data từ API
  const newNews = articles.slice(0, 5);
  const popularNews = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />


      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        setUser={setUser}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* MAIN CONTENT */}
          <div className="lg:col-span-2">

            <MainArticle
              id={mainArticle.id}
              image={mainArticle.imageUrl}   // ✅ FIX đúng field
              title={mainArticle.title}
              description={mainArticle.content?.slice(0, 150) || ""}
              onClick={handleArticleClick}
            />

            <SmallArticles
              articles={smallArticles.map(a => ({
                id: a.id,
                title: a.title,
                image: a.imageUrl,
                description: "..." // hoặc a.content?.slice(0, 100)
              }))}
              onArticleClick={handleArticleClick}
            />

            

            {/* OTHER NEWS */}
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="text-xl font-bold mb-4">Tin tức khác</h3>

              <div className="space-y-4">
                {otherNews.map(article => (
                  <div
                    key={article.id}
                    className="border-b pb-3 cursor-pointer hover:bg-gray-50 px-2 py-2"
                    onClick={() => handleArticleClick(article.id)}
                  >
                    <h4 className="font-semibold hover:text-blue-600">
                      {article.title}
                    </h4>

                    <p className="text-sm text-gray-600">
                      {article.content?.slice(0, 100)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">

              <NewsSidebar
                newNews={newNews.map(n => ({
                  id: n.id,
                  title: n.title
                }))}
                popularNews={popularNews.map(p => ({
                  id: p.id,
                  title: p.title
                }))}
                onNewsClick={handleArticleClick}
              />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}