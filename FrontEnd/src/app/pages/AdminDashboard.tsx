import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import api from "../../service/api";
// Thêm icon Eye từ lucide-react
import { CheckCircle, Trash2, Clock, FileText, User, Eye } from 'lucide-react';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Thêm navigate để chuyển trang

export default function AdminDashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllArticles = async () => {
    try {
      const res = await api.get("/articles/pending"); 
      setArticles(res.data);
      setLoading(false);
    } catch (err) {
      toast.error("Không thể tải danh sách bài viết");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await api.put(`/articles/${id}/approve`, { status: "Approved" });
      toast.success("Đã duyệt bài viết!");
      setArticles(prev => prev.map(a => a.id === id ? { ...a, status: "Approved" } : a));
    } catch (err) {
      toast.error("Lỗi khi duyệt");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Xóa bài viết này?")) return;
    try {
      await api.delete(`/articles/${id}`);
      toast.success("Đã xóa!");
      setArticles(articles.filter(a => a.id !== id));
    } catch (err) {
      toast.error("Lỗi khi xóa");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FileText className="text-blue-600" /> Quản lý nội dung hệ thống
        </h1>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Bài viết</th>
                <th className="p-4 font-semibold text-gray-600">Tác giả</th>
                <th className="p-4 font-semibold text-gray-600">Trạng thái</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    {/* Cho phép click vào tiêu đề để xem bài viết */}
                    <p 
                      onClick={() => navigate(`/article/${a.id}`)}
                      className="font-medium text-gray-900 line-clamp-1 cursor-pointer hover:text-blue-600 hover:underline"
                    >
                      {a.title}
                    </p>
                    <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> {new Date(a.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600 italic">
                    <span className="flex items-center gap-1"><User className="w-3 h-3"/> {a.authorName || "Ẩn danh"}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border 
                      ${a.status?.toLowerCase() === "approved" 
                        ? "bg-green-50 text-green-600 border-green-200" 
                        : "bg-orange-50 text-orange-600 border-orange-200"}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      {/* NÚT XEM CHI TIẾT */}
                      <button 
                        onClick={() => navigate(`/article/${a.id}`)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      {a.status?.toLowerCase() !== "approved" && (
                        <button 
                          onClick={() => handleApprove(a.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Duyệt bài"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      
                      <button 
                        onClick={() => handleDelete(a.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa bài"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {articles.length === 0 && !loading && (
            <div className="p-10 text-center text-gray-400">Không có bài viết nào.</div>
          )}
        </div>
      </div>
    </div>
  );
}