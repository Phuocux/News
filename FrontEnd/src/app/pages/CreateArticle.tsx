import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { LoginModal } from '../components/LoginModal';
import axios from 'axios'; // Hoặc dùng service của bạn

export default function CreateArticle() {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    categoryId: 0,
  });

  // 1. Lấy danh mục khi load trang (Sử dụng Hardcode để test UI nếu chưa có DB)
  useEffect(() => {
    // Giả lập dữ liệu để test UI ngay
    const mockCategories = [
      { id: 1, name: "Chính trị" },
      { id: 2, name: "Thế giới" },
      { id: 3, name: "Công nghệ" }
    ];
    setCategories(mockCategories);
    setFormData(prev => ({ ...prev, categoryId: mockCategories[0].id }));

    /* KHI CÓ DATABASE - MỞ ĐOẠN NÀY RA:
    const fetchCats = async () => {
      try {
        const res = await axios.get("http://localhost:5257/api/Categories");
        setCategories(res.data);
      } catch (err) { console.error(err); }
    };
    fetchCats();
    */
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "categoryId" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Test UI: Giả lập chờ 1s rồi báo thành công
    setTimeout(() => {
      console.log("Dữ liệu gửi đi:", formData);
      alert("Đăng bài thành công!");
      setLoading(false);
      navigate("/"); // Về trang chủ
    }, 1000);

    /* KHI CHẠY THẬT VỚI BACKEND:
    const token = localStorage.getItem("token");
    if (!token) {
       setIsLoginModalOpen(true);
       setLoading(false);
       return;
    }
    try {
       await axios.post("http://localhost:5257/api/Articles", formData, {
         headers: { Authorization: `Bearer ${token}` }
       });
       navigate("/");
    } catch (err: any) {
       setError("Lỗi đăng bài, vui lòng kiểm tra lại.");
    } finally { setLoading(false); }
    */
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tận dụng lại Header từ file Article của bạn */}
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />

      <main className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Viết bài báo mới</h1>
          
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-md mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tiêu đề */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề bài viết</label>
              <input
                name="title"
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Nhập tiêu đề..."
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Danh mục */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Danh mục</label>
                <select
                  name="categoryId"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* URL Ảnh */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">URL Hình ảnh</label>
                <input
                  name="imageUrl"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none"
                  placeholder="https://images.unsplash.com/..."
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Nội dung */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nội dung chi tiết</label>
              <textarea
                name="content"
                required
                rows={12}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Viết nội dung bài báo tại đây..."
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Nút đăng bài */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              >
                {loading ? 'Đang đăng bài...' : 'Đăng ngay'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Tận dụng lại LoginModal từ file Article của bạn */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
}