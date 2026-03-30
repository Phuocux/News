import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../service/api";
import { ArticleDetail } from '../components/ArticleDetail';

export default function ArticlePage() {
  const { id } = useParams(); // Lấy ID từ URL (ví dụ: /article/1008)
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="text-center py-20">Đang tải...</div>;

  return (
    <ArticleDetail 
      article={article} 
      newNews={[]} // Bạn có thể gọi thêm API cho danh sách này
      popularNews={[]} 
    />
  );
}