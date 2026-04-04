import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { login, register } from "../../service/authService";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  setUser: (user: any) => void;
}

export function LoginModal({ isOpen, onClose,setUser }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 

  if (!isOpen) return null;

  /*const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login/register logic here
    console.log('Submit:', { email, password, type: activeTab });
    onClose();
  };*/
 



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (activeTab === "login") {
      const res = await login({ username, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      console.log("Login success:", res.data);
      alert("Đăng nhập thành công!");
      
      onClose(); // đóng modal
      setUser(res.data); // ✅ cập nhật UI ngay
    } else {
      // check confirm password
      if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
      }

      const res = await register({ username, password });

      console.log("Register success:", res.data);
      alert("Đăng ký thành công! Hãy đăng nhập");

      setActiveTab("login");
    }
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    alert("Có lỗi xảy ra!");
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {activeTab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 px-4 font-semibold transition-colors ${
              activeTab === 'login'
                ? 'text-[#0090DA] border-b-2 border-[#0090DA]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 px-4 font-semibold transition-colors ${
              activeTab === 'register'
                ? 'text-[#0090DA] border-b-2 border-[#0090DA]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Đăng ký
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-center text-sm text-gray-600 mb-4">
            Đăng tài khoản mạng xã hội
          </p>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-xs">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-xs">Facebook</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" fill="#0068FF" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.5 18.5h-1v-1h1v1zm0-2h-1v-5h1v5z"/>
              </svg>
              <span className="text-xs">Zalo</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Hoặc</span>
            </div>
          </div>

          {/* Login Form */}
         <form onSubmit={handleSubmit} className="space-y-4">

  {/* Username */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Tên đăng nhập
    </label>
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded"
      required
    />
  </div>

  {/* Password */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Mật khẩu
    </label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded"
      required
    />
  </div>

  {/* ✅ Confirm Password */}
  {activeTab === 'register' && (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Xác nhận mật khẩu
      </label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded"
        required
      />
    </div>
  )}

  {/* ✅ BUTTON LUÔN Ở CUỐI */}
  <button
    type="submit"
    className="w-full bg-[#0090DA] text-white py-3 rounded"
  >
    {activeTab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
  </button>

</form>
        </div>
      </div>
    </div>
  );  
}
