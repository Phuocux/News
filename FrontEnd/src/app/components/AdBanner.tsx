export function AdBanner() {
  return (
    <div className="bg-gradient-to-r from-teal-50 via-blue-50 to-green-50 py-3 px-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-lg shadow-md">
          {/* Banner with gradient background matching the image */}
          <div className="h-24 bg-gradient-to-r from-blue-400 via-teal-300 to-blue-300 flex items-center justify-center relative">
            {/* Decorative elements to simulate a real estate ad */}
            <div className="absolute inset-0 flex items-center justify-around px-8">
              <div className="text-center">
                <div className="text-white font-bold text-3xl mb-1">68%</div>
                <div className="text-white text-xs">Lãi suất</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-3xl mb-1">70%</div>
                <div className="text-white text-xs">Ưu đãi</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg">24 THÁNG</div>
                <div className="text-white text-xs">Trả góp 0%</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg">1900 0111</div>
                <div className="text-white text-xs">Hotline</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}