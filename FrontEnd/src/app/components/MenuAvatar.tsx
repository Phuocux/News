import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function UserMenu({ user, onLogout }: any) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // 2. Khởi tạo navigate

 const handleProfileClick = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation(); // Chặn sự kiện đóng menu làm gián đoạn điều hướng
  try {
      // Vì 'user' của bạn thực tế là { token: "ey..." }
      const token = user.token; 
      
      if (token) {
        const decoded: any = jwtDecode(token);
        console.log("Dữ liệu đã giải mã:", decoded);

        // Sửa dòng này: Thêm decoded.Id (viết hoa chữ I)
        const userId = decoded.Id || decoded.id || decoded.nameid || decoded.sub;

        if (userId) {
          navigate(`/account/${userId}`);
          setOpen(false);
        } else {
          console.error("Không tìm thấy ID trong token", decoded);
        }
      } else {
        console.error("Không tìm thấy token trong object user");
      }
    } catch (error) {
      console.error("Lỗi khi giải mã token:", error);
    }
  };
  return (
    <div className="relative">
      {/* Avatar */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img
          src="https://i.pravatar.cc/40"
          className="w-8 h-8 rounded-full"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md border z-50">
          
          {/* Thông tin cá nhân */}
          <button 
              onClick={handleProfileClick}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 transition-colors"
            >
              <span className="text-lg text-blue-500">👤</span>
              <span className="font-medium">Thông tin cá nhân</span>
            </button>

          {/* Divider */}
          <div className="border-t"></div>

          {/* Đăng xuất */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm text-red-500"
          >
            <span>🚪</span>
            <span>Đăng xuất</span>
          </button>

        </div>
      )}
    </div>
  );
}