import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { ArticleDetail } from '../components/ArticleDetail';
import { LoginModal } from '../components/LoginModal';
import { getArticleById } from '../../service/articleService';
import api from '../../service/api';  

export default function Article() {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newNews, setNewNews] = useState<any[]>([]);
  const [popularNews, setPopularNews] = useState<any[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
   const [user, setUser] = useState<any>(null);

  const { id } = useParams();
 useEffect(() => {
    if (!id) return;

    setLoading(true);
    api.get(`/Articles/${id}`) // Gọi đúng endpoint chi tiết bài báo
      .then(res => {
        // QUAN TRỌNG: Mapping dữ liệu từ Backend (thường viết Hoa) sang Frontend (viết thường)
        const rawData = res.data;
        const formattedData = {
          title: rawData.title || rawData.Title,
          image: rawData.image || rawData.Image,
          author: rawData.author || rawData.Author || "Tác giả",
          date: rawData.date || rawData.Date || "Vừa xong",
          content: rawData.content || rawData.Content,
          category: rawData.category || rawData.Category || "Tin tức"
        };
        setArticle(formattedData);
      })
      .catch(err => {
        console.error("Lỗi lấy chi tiết bài báo:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);



  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        {/* Vòng xoay Loading */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Đang tải bài viết...</p>
      </div>
    </div>
  ;

  if (!article) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />
      <ArticleDetail 
      article={article}
      newNews={newNews}
      popularNews={popularNews}
    />
      <LoginModal isOpen={isLoginModalOpen} 
      onClose={() => setIsLoginModalOpen(false)}
      setUser={setUser}

       />
    </div>
  );
}