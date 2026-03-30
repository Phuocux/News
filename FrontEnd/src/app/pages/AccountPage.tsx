import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import api from "../../service/api";
import { FileText, MessageSquare, Calendar, User, ArrowLeft } from 'lucide-react';

export default function AccountPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0090DA] mb-4"></div>
        <p className="text-gray-500 font-medium">Đang tải thông tin tài khoản...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Header onLoginClick={() => {}} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Nút quay lại nhanh */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#0090DA] mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        {/* 1. PROFILE HEADER SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-[#0090DA] to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-100">
            <span className="text-white font-bold text-3xl uppercase">
              {data.user.username.charAt(0)}
            </span>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
              {data.user.username}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 mt-2">
              <span className="flex items-center gap-1.5 bg-blue-50 text-[#0090DA] px-3 py-1 rounded-full font-medium">
                <User className="w-4 h-4" /> Thành viên
              </span>
              <span className="flex items-center gap-1.5 py-1">
                <Calendar className="w-4 h-4" /> Đã tham gia: {new Date().toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 2. ARTICLES LIST */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" /> Bài viết ({data.articles.length})
              </h2>
            </div>
            <div className="p-6">
              {data.articles.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 italic">Người dùng chưa đăng bài viết nào.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.articles.map((a: any) => (
                    <div
                      key={a.id}
                      className="group p-4 border border-gray-50 rounded-xl hover:border-blue-100 hover:bg-blue-50/30 transition-all cursor-pointer"
                      onClick={() => navigate(`/article/${a.id}`)}
                    >
                      <p className="font-bold text-gray-800 group-hover:text-[#0090DA] transition-colors line-clamp-2 mb-2">
                        {a.title}
                      </p>
                      <div className="flex items-center text-[12px] text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(a.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* 3. COMMENTS LIST */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" /> Bình luận ({data.comments.length})
              </h2>
            </div>
            <div className="p-6">
              {data.comments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 italic">Người dùng chưa có bình luận nào.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.comments.map((c: any) => (
                    <div key={c.id} className="p-4 border-l-4 border-blue-100 bg-gray-50/50 rounded-r-xl">
                      <p className="text-gray-700 text-sm italic mb-2">"{c.content}"</p>
                      <div className="flex items-center text-[11px] text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(c.createdAt).toLocaleDateString('vi-VN')}
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