import { Search, LogIn, Calendar, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onLoginClick?: () => void;
}

export function Header({ onLoginClick }: HeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = {
    'Chính trị': [
      { title: 'Sự kiện', href: '#' },
      { title: 'Thời luận', href: '#' },
      { title: 'Ngày hội bầu cử', href: '#' }
    ],
    'Thế giới': [
      { title: 'Châu Á', href: '#' },
      { title: 'Châu Âu', href: '#' },
      { title: 'Châu Mỹ', href: '#' }
    ],
    'Kinh tế': [
      { title: 'Tài chính', href: '#' },
      { title: 'Chứng khoán', href: '#' },
      { title: 'Doanh nghiệp', href: '#' }
    ]
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar with Logo */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left - Search and Menu */}
          <div className="flex items-center gap-4">
            <button 
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-700"></div>
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Tìm kiếm"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#0090DA] w-64"
              />
            </div>
          </div>

          {/* Center - Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="bg-[#0090DA] p-2 rounded">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <span className="text-3xl font-bold text-[#0090DA] tracking-wide">HAU NEWS</span>
          </a>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-yellow-400 text-xs font-semibold rounded hover:bg-yellow-500">
              Quảng cáo 💰
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white text-xs font-semibold rounded hover:bg-orange-600">
              Đặt báo 📰
            </button>
            <button className="px-4 py-2 bg-[#0090DA] text-white text-xs font-semibold rounded hover:bg-[#0080c0]">
              Kênh hình 📺
            </button>
            <button 
              onClick={onLoginClick}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded hover:bg-gray-200 flex items-center gap-1"
            >
              <LogIn className="w-3 h-3" />
              Đăng nhập
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b-2 border-[#0090DA]">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-6 py-3 text-sm overflow-x-auto">
            <li>
              <a href="/" className="flex items-center gap-1 text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
              </a>
            </li>
            {Object.keys(categories).map((category) => (
              <li 
                key={category}
                className="relative"
                onMouseEnter={() => setActiveDropdown(category)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href="#" 
                  className="flex items-center gap-1 text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap"
                >
                  {category}
                  <ChevronDown className="w-3 h-3" />
                </a>
                {activeDropdown === category && (
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200 py-2 min-w-[200px] z-50">
                    {categories[category as keyof typeof categories].map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#0090DA]"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Thế sự</a></li>
            <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Đời sống</a></li>
            <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Sức khỏe</a></li>
            <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Giáo dục</a></li>
            <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Du lịch</a></li>
            <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Văn hóa</a></li>
            <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Giải trí</a></li>
            <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Thể thao</a></li>
            <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Công nghệ</a></li>
            <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Xe</a></li>
            <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Video</a></li>
            <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Tiêu dùng</a></li>
            <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Thời trang trẻ</a></li>
          </ul>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-80 h-full bg-white shadow-lg z-50 overflow-y-auto">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <h3 className="text-lg font-bold text-[#0090DA]">DANH MỤC</h3>
              <button 
                className="p-2 hover:bg-gray-100 rounded"
                onClick={() => setMenuOpen(false)}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <ul className="space-y-2">
              <li>
                <a href="/" className="flex items-center gap-1 text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                </a>
              </li>
              {Object.keys(categories).map((category) => (
                <li 
                  key={category}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(category)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a 
                    href="#" 
                    className="flex items-center gap-1 text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap"
                  >
                    {category}
                    <ChevronDown className="w-3 h-3" />
                  </a>
                  {activeDropdown === category && (
                    <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200 py-2 min-w-[200px] z-50">
                      {categories[category as keyof typeof categories].map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#0090DA]"
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Thế sự</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Đời sống</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Sức khỏe</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Giáo dục</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Du lịch</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Văn hóa</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Giải trí</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Thể thao</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Công nghệ</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Xe</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Video</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Tiêu dùng</a></li>
              <li><a href="#" className="text-gray-700 hover:text-[#0090DA] font-medium whitespace-nowrap">Thời trang trẻ</a></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}