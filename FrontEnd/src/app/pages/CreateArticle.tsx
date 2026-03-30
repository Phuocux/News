
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { LoginModal } from '../components/LoginModal';
import axios from 'axios';

export default function CreateArticle() {
  const navigate = useNavigate();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState<any>(null);

  // ✅ Form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    categoryId: 0,
  });

  // ================= LOAD CATEGORIES =================
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get("http://localhost:5257/api/categories");
        setCategories(res.data);

        // ✅ Auto chọn category đầu tiên
        if (res.data.length > 0) {
          setFormData(prev => ({
            ...prev,
            categoryId: res.data[0].id
          }));
        }

      } catch (err) {
        console.error("Lỗi load categories:", err);
      }
    };

    fetchCats();
  }, []);

  // ================= HANDLE INPUT =================
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === "categoryId" ? Number(value) : value
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    // ❌ chưa login
    if (!token) {
      setIsLoginModalOpen(true);
      setLoading(false);
      return;
    }

    // ❌ validate
    if (!formData.title || !formData.content) {
      setError("Vui lòng nhập đầy đủ thông tin");
      setLoading(false);
      return;
    }

    if (formData.categoryId === 0) {
      setError("Vui lòng chọn danh mục");
      setLoading(false);
      return;
    }

    try {
      console.log("DATA GỬI:", formData);

      const res = await axios.post(
        "http://localhost:5257/api/articles",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("RESPONSE:", res.data);

      setSuccess("Đăng bài thành công! 🎉");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err: any) {
      console.log("ERROR:", err.response?.data);

      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Lỗi đăng bài"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />

      <main className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 border">

          <h1 className="text-2xl font-bold mb-6">
            Viết bài báo mới
          </h1>

          {error && (
            <div className="p-3 bg-red-100 text-red-600 mb-4 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-100 text-green-600 mb-4 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* TITLE */}
            <div>
              <label>Tiêu đề</label>
              <input
                name="title"
                type="text"
                required
                className="w-full border p-2 rounded"
                onChange={handleInputChange}
              />
            </div>

            {/* CATEGORY + IMAGE */}
            <div className="grid grid-cols-2 gap-4">

              {/* CATEGORY */}
              <div>
                <label>Danh mục</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                >
                  <option value={0}>-- Chọn danh mục --</option>

                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* IMAGE */}
              <div>
                <label>Image URL</label>
                <input
                  name="imageUrl"
                  type="text"
                  className="w-full border p-2 rounded"
                  onChange={handleInputChange}
                />
              </div>

            </div>

            {/* CONTENT */}
            <div>
              <label>Nội dung</label>
              <textarea
                name="content"
                rows={10}
                required
                className="w-full border p-2 rounded"
                onChange={handleInputChange}
              />
            </div>

            {/* BUTTON */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border rounded"
              >
                Hủy
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? "Đang đăng..." : "Đăng bài"}
              </button>
            </div>

          </form>
        </div>
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        setUser={setUser}
      />
    </div>
  );
}
