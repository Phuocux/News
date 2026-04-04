// types/auth.ts (hoặc đặt ngay trong file Route)
export interface User {
  id: string;
  username: string;
  role: 'Admin' | 'User'; // Dùng Union Type để bắt lỗi chính tả ngay lập tức
}