export interface Article {
  id: number;
  title: string;
  image: string;
  description: string;
  author: string;
  date: string;
  category: string;
  content: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: 'Ngoại trưởng Vương Nghị: Trung Quốc sẵn sàng cùng Việt Nam tăng cường tin cậy chiến lược',
    image: 'https://images.unsplash.com/photo-1773096943925-6171636e897b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBvZmZpY2lhbHxlbnwxfHx8fDE3NzM1NjQ2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Bộ trưởng Lê Hoài Trung và Ngoại trưởng Vương Nghị đã thảo luận về các vấn đề hợp tác song phương và những thách thức chung trong khu vực. Trung Quốc nhấn mạnh sẵn sàng thúc đẩy quan hệ chiến lược toàn diện giữa hai nước...',
    author: 'Đậu Tiến Đạt',
    date: '16/03/2026 19:14 GMT+7',
    category: 'Chính trị',
    content: 'Chiều ngày 16.3, Tổng Bí thư Tô Lâm đã tiếp Ngoại trưởng Trung Quốc Vương Nghị đang thăm Việt Nam. Cũng trong ngày này, Bộ trưởng Bộ Ngoại giao Lê Hoài Trung cũng đã tiếp và làm việc với Ngoại trưởng Vương Nghị.'
  },
  {
    id: 2,
    title: 'Học phí tăng nhất Trường ĐH Tôn Đức Thắng năm 2026 ở mức 20% so với năm học 2025-2026',
    image: 'https://images.unsplash.com/photo-1770385799308-67453ad59d14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGJ1c2luZXNzJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NzM1ODk5NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Trường ĐH Tôn Đức Thắng công bố kế hoạch đào tạo cho năm học 2026-2027 gồm nhiều mức học phí cho các ngành khác nhau, so với hiện nay, mức khung tăng tối đa 20%, không quá 6 triệu đồng/năm...',
    author: 'Phương Linh',
    date: '16/03/2026 18:30 GMT+7',
    category: 'Giáo dục',
    content: 'Trường ĐH Tôn Đức Thắng vừa công bố phương án tuyển sinh và mức học phí dự kiến cho năm học 2026-2027. Theo đó, học phí các ngành đào tạo sẽ tăng từ 15-20% so với năm học hiện tại. Đại diện nhà trường cho biết, việc điều chỉnh học phí là cần thiết để đảm bảo chất lượng đào tạo, cải thiện cơ sở vật chất và nâng cao đời sống giảng viên. Mức học phí cao nhất dự kiến khoảng 30 triệu đồng/năm cho các ngành kỹ thuật, công nghệ.'
  },
  {
    id: 3,
    title: 'Mỹ: Trận Finalissima giữa Tây Ban Nha và Argentina chính thức bị hủy, Messi tỏ tiếc nuối',
    image: 'https://images.unsplash.com/photo-1764019097365-639b5bd93cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbW9kZXJuJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzczNTc3MDMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Trận Siêu cúp Liên lục địa (Finalissima) giữa đội vô địch châu Âu Tây Ban Nha và đội vô địch Nam Mỹ Argentina đã chính thức bị hủy. Người hâm mộ cả về quyết định này đã không được...',
    author: 'Minh Tuấn',
    date: '16/03/2026 17:45 GMT+7',
    category: 'Thể thao',
    content: 'FIFA và CONMEBOL đã chính thức thông báo hủy trận Finalissima giữa Tây Ban Nha và Argentina dự kiến diễn ra vào tháng 6/2026. Quyết định này được đưa ra do lịch thi đấu dày đặc của các cầu thủ sau mùa giải câu lạc bộ. Lionel Messi bày tỏ sự tiếc nuối khi không có cơ hội đối đầu với đội tuyển Tây Ban Nha, đương kim vô địch châu Âu. Đây vốn là trận đấu được mong đợi nhất trong năm 2026.'
  },
  {
    id: 4,
    title: 'Chán đời NSƯT Vũ Linh vốn trách cái gọi phải là Mẹ Linh: "Tiếng oan Linh khóc ở Yết Kiêu"',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBtYXJrZXR8ZW58MXx8fHwxNzczNTg5NDIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Thùy Dương - chủ giải NSƯT Vũ Linh vốn phải hỏi cô Hồng Loan nhắng truyền hình tương trung nhằn để lại Mẹ Linh, đã chính thức đội bạch với hành động gọi là đời khóc ở Yết Kiêu...',
    author: 'Thu Hà',
    date: '16/03/2026 16:20 GMT+7',
    category: 'Giải trí',
    content: 'Vụ việc tranh chấp di sản của cố NSƯT Vũ Linh tiếp tục có những diễn biến mới. Thùy Dương, người được cho là chủ giải của cố nghệ sĩ, đã có những chia sẻ gây chú ý trên mạng xã hội. Theo đó, bà cho biết những thông tin xung quanh việc tranh chấp tài sản đã gây ảnh hưởng nghiêm trọng đến danh dự của gia đình. Nhiều người hâm mộ cải lương đã bày tỏ sự quan tâm và mong muốn vụ việc sớm được giải quyết ổn thỏa.'
  },
  {
    id: 5,
    title: 'Chính phủ ban hành nghị định mới về phát triển kinh tế số',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY2l0eXxlbnwxfHx8fDE3NzM1ODk0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Nghị định có hiệu lực từ ngày 1/4/2026, tạo hành lang pháp lý cho các doanh nghiệp công nghệ và startup phát triển...',
    author: 'Hoàng Nam',
    date: '16/03/2026 15:10 GMT+7',
    category: 'Kinh tế',
    content: 'Chính phủ vừa ban hành Nghị định số 15/2026/NĐ-CP về phát triển kinh tế số và xã hội số. Nghị định quy định chi tiết về các hoạt động kinh doanh trên nền tảng số, thương mại điện tử, và các dịch vụ công trực tuyến. Đây được coi là bước đột phá trong việc thúc đẩy chuyển đổi số quốc gia, tạo điều kiện thuận lợi cho doanh nghiệp và người dân tiếp cận các dịch vụ số hiện đại.'
  },
  {
    id: 6,
    title: 'Giá xăng dầu dự kiến giảm mạnh vào tuần tới',
    image: 'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXMlMjBzdGF0aW9ufGVufDF8fHx8MTc3MzU4OTQyMXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Theo dự báo từ các chuyên gia, giá xăng có thể giảm 500-700 đồng/lít do giá dầu thế giới giảm mạnh...',
    author: 'Quốc Anh',
    date: '16/03/2026 14:00 GMT+7',
    category: 'Kinh tế',
    content: 'Giá xăng dầu trong nước dự kiến sẽ có đợt giảm mạnh vào kỳ điều chỉnh ngày 20/3 tới. Nguyên nhân là do giá dầu thô thế giới giảm sâu trong tuần qua, xuống còn khoảng 75 USD/thùng. Các chuyên gia dự báo giá xăng RON 95 có thể giảm 500-700 đồng/lít, xăng E5 giảm 400-600 đồng/lít. Đây là tin vui cho người tiêu dùng và doanh nghiệp vận tải trong bối cảnh giá cả hàng hóa đang tăng cao.'
  },
  {
    id: 7,
    title: 'Khai mạc Festival Hoa Đà Lạt lần thứ 9',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NzM1ODk0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Hàng nghìn du khách tham dự lễ khai mạc sự kiện lớn nhất năm tại thành phố ngàn hoa...',
    author: 'Thanh Tâm',
    date: '16/03/2026 13:30 GMT+7',
    category: 'Du lịch',
    content: 'Tối 15/3, Festival Hoa Đà Lạt lần thứ 9 - Đà Lạt 2026 đã chính thức khai mạc với chủ đề "Đà Lạt - Thành phố của những sắc hoa". Sự kiện quy tụ hàng triệu bông hoa các loại từ khắp nơi trên thế giới, tạo nên một không gian rực rỡ sắc màu. Nhiều hoạt động đặc sắc như triển lãm hoa nghệ thuật, trình diễn ánh sáng, và các chương trình văn hóa - nghệ thuật đặc sắc sẽ diễn ra trong suốt 2 tuần.'
  },
  {
    id: 8,
    title: 'TNsv THAICO Cup 15.3: 1 đội điền các chịu siêu dự kiết, Thủy Lợi chạm trận Mỹ Nam',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmaWVsZHxlbnwxfHx8fDE3NzM1ODk0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Giải bóng đá TNsv THAICO Cup tiếp tục những trận đấu hấp dẫn với sự tham gia của các đội mạnh...',
    author: 'Tuấn Anh',
    date: '17/03/2026 10:00 GMT+7',
    category: 'Thể thao',
    content: 'Giải bóng đá TNsv THAICO Cup 2026 đã bước vào vòng loại trực tiếp với những trận cầu kịch tính. Đặc biệt, trận đấu giữa Thủy Lợi và Mỹ Nam được dự đoán sẽ rất căng thẳng. Cả hai đội đều có phong độ ổn định và quyết tâm giành chiến thắng để tiến xa hơn tại giải đấu. Trận đấu dự ki���n diễn ra vào 18h00 ngày 18/3 tại sân vận động Thống Nhất.'
  },
  {
    id: 9,
    title: 'Cả nước: 03 có hơn 76 triệu cử tri đi bỏ phiếu, đạt tỷ lệ 99,38%',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b3RpbmclMjBib290aHxlbnwxfHx8fDE3NzM1ODk0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Cuộc bầu cử diễn ra thành công tốt đẹp với tỷ lệ cử tri đi bỏ phiếu cao kỷ lục...',
    author: 'Ngọc Hân',
    date: '17/03/2026 09:30 GMT+7',
    category: 'Chính trị',
    content: 'Theo báo cáo của Ủy ban Bầu cử Trung ương, cuộc bầu cử đại biểu Quốc hội và HĐND các cấp đã diễn ra thành công với tỷ lệ cử tri đi bỏ phiếu đạt 99,38%, tương đương hơn 76 triệu cử tri. Đây là tỷ lệ cao nhất trong nhiều kỳ bầu cử vừa qua, thể hiện tinh thần trách nhiệm cao của người dân đối với đất nước.'
  },
  {
    id: 10,
    title: 'Triển động binnars Hầu Quốc về đích với tên bắn tương Thống Lại bản thách ở Việt Nam',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzczNTg5NDIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Diễn đàn kinh doanh quốc tế quy tụ các doanh nghiệp hàng đầu thế giới và Việt Nam...',
    author: 'Minh Khoa',
    date: '17/03/2026 08:45 GMT+7',
    category: 'Kinh tế',
    content: 'Diễn đàn Kinh doanh Quốc tế Việt Nam 2026 đã chính thức khai mạc với sự tham gia của hàng trăm doanh nghiệp trong và ngoài nước. Sự kiện tập trung vào các chủ đề về chuyển đổi số, phát triển bền vững và hội nhập quốc tế. Nhiều hợp đồng hợp tác trị giá hàng tỷ USD dự kiến sẽ được ký kết trong khuôn khổ diễn đàn.'
  },
  {
    id: 11,
    title: 'Tiểu Sử Thương tròi ở TPHCM: Thuỷ nhưng không độ SS, HLV Huỳnh Đức lên là SHC cho Hoàng Lạnh',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW18ZW58MXx8fHwxNzczNTg5NDIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'HLV Huỳnh Đức có những chia sẻ về chiến thuật và lực lượng cầu thủ cho trận đấu sắp tới...',
    author: 'Văn Toàn',
    date: '17/03/2026 08:00 GMT+7',
    category: 'Thể thao',
    content: 'Trong buổi họp báo trước trận, HLV Huỳnh Đức đã chia sẻ về kế hoạch sử dụng cầu thủ cho trận đấu quan trọng tại TPHCM. Ông cho biết sẽ có sự thay đổi trong đội hình xuất phát để đảm bảo sự cân bằng giữa phòng ngự và tấn công. Cầu thủ Hoàng Lạnh được kỳ vọng sẽ có màn trình diễn ấn tượng trong vai trò mới.'
  },
  {
    id: 12,
    title: 'Iran nổi cần câm biu Mỹ, Israeli qua ơn biển Hormuz',
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwcG9saXRpY3N8ZW58MXx8fHwxNzczNTg5NDIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Tình hình căng thẳng tại eo biển Hormuz tiếp tục có diễn biến phức tạp...',
    author: 'Hải Đăng',
    date: '17/03/2026 07:30 GMT+7',
    category: 'Quốc tế',
    content: 'Tình hình tại khu vực Trung Đông tiếp tục căng thẳng khi Iran cảnh báo về việc đóng cửa eo biển Hormuz. Đây là tuyến đường vận chuyển dầu mỏ quan trọng nhất thế giới. Mỹ và Israel đã có những động thái ngoại giao để giải quyết vấn đề. Cộng đồng quốc tế kêu gọi các bên kiềm chế và giải quyết mọi bất đồng thông qua đối thoại.'
  }
];

export function getArticleById(id: number): Article | undefined {
  return articles.find(article => article.id === id);
}