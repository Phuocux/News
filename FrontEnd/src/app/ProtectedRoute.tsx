import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Thư viện giải mã token
import { JSX } from 'react';

interface JwtPayload {
  role?: string; 
  // Lưu ý: Tên field 'role' phải khớp với tên Claim bạn đặt ở Backend (C#)
  // Thường .NET đặt là: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token'); // Lấy chuỗi token

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded: any = jwtDecode(token);
    
    // Kiểm tra Role trong Token (Log ra để xem chính xác tên thuộc tính là gì)
    console.log("Dữ liệu giải mã từ Token:", decoded);

    // .NET 8 thường dùng key dài, hoặc bạn đã custom thành "role"
    const userRole = decoded["role"] || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (userRole !== 'Admin') {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};
export default ProtectedRoute;