import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl my-4">Úi! Trang bạn tìm kiếm không tồn tại.</p>
      <Link to="/" className="text-blue-600 underline">Quay lại trang chủ</Link>
    </div>
  );
}