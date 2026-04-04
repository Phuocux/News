import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import api from "../../service/api";
import { FileText, MessageSquare, Calendar, User, ArrowLeft, Plus, Trash2, LogOut, CheckCircle } from 'lucide-react';
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export default function AccountPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Lấy thông tin User từ Storage để kiểm tra quyền
  const userString = localStorage.getItem("user");
  const userStorage = userString ? JSON.parse(userString) : null;
  let isAdmin = false;
  let currentUserId = null;

  if (userStorage && userStorage.token) {
    try {
      const decodedToken: any = jwtDecode(userStorage.token);
      currentUserId = decodedToken.Id;
      const roleKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
      isAdmin = decodedToken[roleKey] === "Admin";
    } catch (error) {
      console.error("Lỗi giải mã token", error);
    }
  }

  const isOwner = currentUserId && String(currentUserId) === String(id);
  const canDelete = isOwner || isAdmin;

  const fetchUserData = () => {
    if (!id) return;
    setLoading(true);
    api.get(`/users/${id}/activity`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);
  useEffect(() => {
      const user = localStorage.getItem("user");
      if (!user) {
        // Nếu không có user trong storage, đuổi về trang chủ ngay lập tức
        navigate("/");
        return;
      }
      fetchUserData();
    }, [id, navigate]);


  const handleDeleteArticle = async (e: React.MouseEvent, articleId: number) => {
    e.stopPropagation();
    if (!window.confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    try {
      await api.delete(`/articles/${articleId}`);
      toast.success("Đã xóa bài viết!");
      setData({
        ...data,
        articles: data.articles.filter((a: any) => a.id !== articleId)
      });
    } catch (error) {
      toast.error("Không thể xóa bài viết.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0090DA] mb-4"></div>
        <p className="text-gray-500 font-medium">Đang tải...</p>
      </div>
    );
  }
      const handleLogout = () => {
      // 1. Xóa thông tin user và token khỏi localStorage
      localStorage.removeItem("user");
      // 3. Hiển thị thông báo thành công
      toast.success("Đã đăng xuất thành công!");

      // 4. Chuyển hướng về trang chủ
      navigate("/");
      
      // 5. (Tùy chọn) Reload lại trang để xóa sạch trạng thái cũ trong các Context/State
      // window.location.reload(); 
    };
    
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Header onLoginClick={() => {}} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#0090DA] mb-6 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        {/* 1. PROFILE HEADER */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex flex-col md:flex-row items-center gap-6 r">
          {/* Nút Đăng xuất ở góc phải bên trên */}
            {isOwner && (
              <button 
                onClick={handleLogout} // Hàm này mình đã hướng dẫn ở trên
                className="absolute top-6 right-8 flex items-center gap-2 text-gray-400 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl transition-all font-bold text-sm border border-transparent hover:border-red-100"
              >
                <LogOut className="w-3.5 h-3.5" /> Đăng xuất
              </button>
            )}
          <div className="w-24 h-24 bg-gradient-to-br from-[#0090DA] to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl uppercase">
              {data.user.username.charAt(0)}
            </span>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-extrabold text-gray-900">{data.user.username}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 mt-2">
              <span className="flex items-center gap-1.5 bg-blue-50 text-[#0090DA] px-3 py-1 rounded-full font-medium">
                <User className="w-4 h-4" /> {isAdmin ? "Quản trị viên" : "Thành viên"}
              </span>
              {isAdmin && (
                <button 
                  onClick={() => navigate('/admin')} // Đường dẫn trang duyệt bài của bạn
                  className="flex items-center gap-1.5 bg-orange-500 text-white px-3 py-1 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-sm"
                >
                  <CheckCircle className="w-4 h-4" /> Duyệt bài viết
                </button>
              )}
              <span className="flex items-center gap-1.5 py-1">
                <Calendar className="w-4 h-4" /> Tham gia: {new Date(data.user.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 2. DANH SÁCH BÀI VIẾT */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" /> Bài viết ({data.articles.length})
              </h2>
              {isOwner && (
                <button 
                  onClick={() => navigate('/create-article')}
                  className="bg-[#0090DA] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Viết bài
                </button>
              )}
            </div>

            <div className="p-6">
              {data.articles.length === 0 ? (
                <p className="text-center text-gray-400 italic py-8">Chưa có bài viết nào.</p>
              ) : (
                <div className="space-y-4">
                  {data.articles.map((a: any) => {
                    // Kiểm tra status (string) không phân biệt hoa thường
                    const statusStr = a.status?.toLowerCase();
                    const isApproved = statusStr === "approved";

                    return (
                      <div 
                        key={a.id} 
                        className="group relative p-4 border border-gray-100 rounded-xl hover:bg-blue-50/30 hover:border-blue-100 transition-all cursor-pointer"
                        onClick={() => navigate(`/article/${a.id}`)}
                      >
                        <div className="pr-12">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border mb-2 inline-block ${
                            isApproved 
                            ? 'bg-green-100 text-green-700 border-green-200' 
                            : 'bg-orange-100 text-orange-700 border-orange-200'
                          }`}>
                            {a.status || "Pending"}
                          </span>
                          <p className="font-bold text-gray-800 group-hover:text-[#0090DA] line-clamp-2">{a.title}</p>
                          <div className="flex items-center text-[11px] text-gray-400 mt-1">
                             <Calendar className="w-3 h-3 mr-1" /> {new Date(a.createdAt).toLocaleDateString('vi-VN')}
                          </div>
                        </div>

                        {canDelete && (
                          <button
                            onClick={(e) => handleDeleteArticle(e, a.id)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                            title="Xóa bài"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* 3. DANH SÁCH BÌNH LUẬN */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" /> Bình luận ({data.comments.length})
              </h2>
            </div>
            <div className="p-6">
              {data.comments.length === 0 ? (
                <p className="text-center text-gray-400 italic py-8">Chưa có bình luận nào.</p>
              ) : (
                <div className="space-y-4">
                  {data.comments.map((c: any) => (
                    <div key={c.id} className="p-4 border-l-4 border-blue-100 bg-gray-50/50 rounded-r-xl">
                      <p className="text-gray-700 text-sm italic mb-2">"{c.content}"</p>
                      <div className="flex items-center text-[11px] text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" /> {new Date(c.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}