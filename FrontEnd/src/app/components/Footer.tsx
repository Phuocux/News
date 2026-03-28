export function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t-4 border-black">
      {/* Category Section */}
      <div className="border-b border-gray-700 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">CHUYÊN MỤC</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400">Thế giới</a></li>
                <li><a href="#" className="hover:text-blue-400">Trong nước</a></li>
                <li><a href="#" className="hover:text-blue-400">Chính trị</a></li>
                <li><a href="#" className="hover:text-blue-400">Xã hội</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">KINH DOANH</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400">Tài chính</a></li>
                <li><a href="#" className="hover:text-blue-400">Chứng khoán</a></li>
                <li><a href="#" className="hover:text-blue-400">Doanh nghiệp</a></li>
                <li><a href="#" className="hover:text-blue-400">Bất động sản</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">CÔNG NGHỆ</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400">Digital</a></li>
                <li><a href="#" className="hover:text-blue-400">AI & Robot</a></li>
                <li><a href="#" className="hover:text-blue-400">Khoa học</a></li>
                <li><a href="#" className="hover:text-blue-400">Startup</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">THỂ THAO</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400">Bóng đá</a></li>
                <li><a href="#" className="hover:text-blue-400">Tennis</a></li>
                <li><a href="#" className="hover:text-blue-400">Thể thao khác</a></li>
                <li><a href="#" className="hover:text-blue-400">SEA Games</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="py-6 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            © 2026 Trang Báo. Tất cả các quyền được bảo lưu.
          </p>
          <div className="mt-2 space-x-4 text-xs text-gray-500">
            <a href="#" className="hover:text-blue-400">Điều khoản sử dụng</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-400">Chính sách bảo mật</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-400">Liên hệ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
