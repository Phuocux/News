import { ImageWithFallback } from './figma/ImageWithFallback';
import { Share2, Facebook, MessageCircle, ArrowLeft, Trash2, Edit2, X, Check } from 'lucide-react'; // Thêm icon mới
import { NewsSidebar } from './NewsSidebar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commentService } from "../../service/commentService";
import { jwtDecode } from "jwt-decode";
import api from '../../service/api';

interface ArticleDetailProps {
  article: {
    title: string;
    image: string;
    author: string;
    date: string;
    content: string;
    category: string;
    Views? : number; 
  };
  newNews: any[];
  popularNews: any[];
}

export function ArticleDetail({ article, newNews, popularNews }: ArticleDetailProps) {
  const navigate = useNavigate();
  const [comments, setComments] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null); // State lưu ID comment đang sửa
  const [editContent, setEditContent] = useState(""); // State lưu nội dung đang sửa
  const { id } = useParams();
  const userRaw = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  let currentUser: any = null;
  let currentUserName = "Khách";

  if (token) {
    try {
      currentUser = jwtDecode(token);
      currentUserName = currentUser.name  
                      || "Khách"; // Fallback nếu name không có
    } catch (e) {
      currentUser = null;
    }
  }

  useEffect(() => {
    if (!id) return;
    loadComments();
  }, [id]);
  useEffect(() => {
  if (!id) return;

  // Hàm gọi API tăng view
  const incrementView = async () => {
    try {
      // Giả định service của bạn có hàm này, nếu không hãy dùng api.post(`/articles/${id}/view`)
      await api.post(`/articles/${id}/view`); 
      console.log("Đã tăng 1 lượt xem");
    } catch (err) {
      console.error("Không thể cập nhật lượt xem:", err);
    }
  };

  incrementView();
}, [id]); // Chạy lại mỗi khi đổi bài báo
  const loadComments = async () => {
    try {
      const res = await api.get(`/comments/article/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Lỗi tải bình luận:", err);
    }
  };

  // --- XỬ LÝ THÊM ---
  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      await commentService.create({
        content,
        username: currentUserName,
        articleId: Number(id),
      });
      setContent("");
      loadComments();
    } catch (err) {
      console.error(err);
    }
  };

  // --- XỬ LÝ XÓA ---
  const handleDelete = async (commentId: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) return;
    try {
      await commentService.delete(commentId); // Giả định service có hàm delete
      loadComments();
    } catch (err) {
      console.error("Lỗi xóa bình luận:", err);
    }
  };

  // --- XỬ LÝ SỬA ---
  const handleEditClick = (comment: any) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleUpdate = async (commentId: number) => {
    if (!editContent.trim()) return;
    try {
      await commentService.update(commentId, { content: editContent }); // Giả định service có hàm update
      setEditingId(null);
      loadComments();
    } catch (err) {
      console.error("Lỗi cập nhật bình luận:", err);
    }
  };

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
    window.scrollTo(0, 4);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2">
          {/* NỘI DUNG BÀI VIẾT (Giữ nguyên) */}
          <section className="mb-8 pb-8 border-b">
             <div className="mb-4">
               <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[#0090DA] hover:text-[#0080c0] mb-2 font-medium">
                 <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
               </button>
               <nav className="text-sm text-gray-600">
                 <a href="/" className="text-[#0090DA] hover:underline">Trang chủ</a> / {article.category || "Tin tức"}
               </nav>
             </div>
             <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {article.author?.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{article.author}</div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                      {article.Views || 0} lượt xem
                    </span>
                  </div>
                </div>
             </div>
             <ImageWithFallback src={article.image} alt={article.title} className="w-full h-auto mb-6 rounded-lg" />
             <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-line">{article.content}</div>
          </section>

          {/* BÌNH LUẬN */}
          <section className="bg-white border rounded-xl shadow-sm">
            <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center">
               <h3 className="text-lg font-bold flex items-center gap-2 text-gray-700">
                 <MessageCircle className="w-5 h-5 text-[#0090DA]" /> Bình luận ({comments.length})
               </h3>
            </div>

            <div className="p-6">
              {/* Ô nhập bình luận mới */}
              <div className="mb-8">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Mời bạn chia sẻ ý kiến..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0090DA] outline-none min-h-[100px]"
                />
                <div className="flex justify-end mt-2">
                  <button 
                    className="px-6 py-2 bg-[#0090DA] text-white font-bold rounded-lg hover:bg-[#007bb8] transition-all"
                    onClick={handleSubmit}
                  >
                    Gửi bình luận
                  </button>
                </div>
              </div>

              {/* Danh sách bình luận */}
              <div className="space-y-6">
                {comments.map((c) => {
                  // 1. Xác định quyền hạn dựa trên currentUser đã lấy từ localStorage ở trên
                  // Lưu ý: c.userId phải được Backend trả về trong object comment
                  const isOwner = currentUser && currentUser.id === c.userId;
                  const isAdmin = currentUser && currentUser.role === 'Admin';
                  
                  const canEdit = isOwner; 
                  const canDelete = isOwner || isAdmin;

                  return (
                    <div key={c.id} className="group border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 text-[#0090DA] rounded-full flex items-center justify-center text-xs font-bold uppercase">
                            {c.username?.charAt(0) || "U"}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-gray-800">{c.username || "Người dùng"}</div>
                            <div className="text-[10px] text-gray-400">{new Date(c.createdAt).toLocaleString('vi-VN')}</div>
                          </div>
                        </div>
                        
                        {/* Nhóm nút Sửa/Xóa - Chỉ hiển thị khi có quyền tương ứng */}
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          
                          {/* Nút SỬA: Chỉ hiện nếu là chủ nhân bình luận */}
                          {canEdit && (
                            <button 
                              onClick={() => handleEditClick(c)} 
                              className="p-1 text-gray-400 hover:text-blue-500"
                              title="Sửa bình luận"
                            >
                              <Edit2 size={14}/>
                            </button>
                          )}

                          {/* Nút XÓA: Hiện nếu là chủ nhân HOẶC là Admin */}
                          {canDelete && (
                            <button 
                              onClick={() => handleDelete(c.id)} 
                              className="p-1 text-gray-400 hover:text-red-500"
                              title="Xóa bình luận"
                            >
                              <Trash2 size={14}/>
                            </button>
                          )}
                          
                        </div>
                      </div>

                      {editingId === c.id ? (
                        /* Giao diện khi đang SỬA */
                        <div className="mt-2">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-2 border rounded-md focus:ring-1 ring-blue-400 outline-none text-sm"
                          />
                          <div className="flex gap-2 mt-1">
                            <button onClick={() => handleUpdate(c.id)} className="flex items-center gap-1 text-xs bg-green-500 text-white px-2 py-1 rounded">
                              <Check size={12}/> Lưu
                            </button>
                            <button onClick={() => setEditingId(null)} className="flex items-center gap-1 text-xs bg-gray-400 text-white px-2 py-1 rounded">
                              <X size={12}/> Hủy
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Giao diện hiển thị BÌNH THƯỜNG */
                        <div className="text-gray-700 text-sm mt-1">{c.content}</div>
                      )}

                      <div className="text-[10px] text-gray-400 mt-1">
                        {new Date(c.createdAt).toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* SIDEBAR (Giữ nguyên) */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <NewsSidebar newNews={newNews} popularNews={popularNews} onNewsClick={handleNewsClick} />
          </div>
        </div>

      </div>
    </div>
  );
}