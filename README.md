🏨 Hệ Thống Quản Lý Khách Sạn - Web Customer
Đây là giao diện web dành cho khách hàng trong hệ thống quản lý khách sạn. Khách hàng có thể tra cứu phòng, đặt phòng, quản lý đặt phòng, thanh toán, thay đổi hoặc hủy booking…

🚀 Công nghệ sử dụng
ReactJS: Xây dựng giao diện người dùng.
React Router DOM: Điều hướng trang.
Axios: Gọi API kết nối backend.
React Bootstrap / CSS thuần: Thiết kế giao diện (form, button, layout).
Font Awesome / Icon: Biểu tượng trực quan.
Day.js: Xử lý ngày tháng.

📂 Cấu trúc thư mục chính
frontend/
│── src/
│   ├── api/                # Các file gọi API (AuthAPI.js, RoomAPI.js, BookingAPI.js…)
│   ├── components/         # Component dùng chung (Header, Footer, SearchBox, Pagination…)
│   ├── css/                # File CSS riêng cho từng trang
│   ├── pages/              # Các trang chính (Home, RoomDetail, BookingHistory…)
│   ├── App.js              # Định nghĩa route chính
│   └── index.js            # Điểm khởi chạy React
│
│── public/                 # Static assets
│── package.json
│── README.md

⚙️ Cài đặt và chạy
1. Clone dự án
git clone https://github.com/Hotel-Ecommerce/web_customer.git
cd web_customer/frontend

2. Cài đặt dependencies
npm install

3. Chạy ứng dụng
npm start
Ứng dụng sẽ chạy tại: http://localhost:3000

🔑 Các tính năng chính
👤 Xác thực
Đăng ký / Đăng nhập / Đăng xuất.
Đổi mật khẩu.
Cập nhật thông tin cá nhân.

🏠 Trang chủ (Home)
Tìm phòng theo ngày nhận/trả, loại phòng, số khách.
Hiển thị danh sách phòng còn trống.
Xem chi tiết phòng.

🛏️ Đặt phòng
Chọn ngày, và đặt phòng.
Chuyển sang trang thanh toán sau khi đặt thành công.
Thanh toán online/offline.

📜 Quản lý booking
Xem lịch sử đặt phòng (Booking History).
Yêu cầu thay đổi phòng hoặc ngày.
Yêu cầu hủy booking.
Nhận thông báo khi admin duyệt yêu cầu.

💳 Thanh toán
Nếu chọn online → chuyển sang PaymentPage để xác nhận.
Trạng thái booking cập nhật: Paid hoặc Unpaid.

🖼️ Giao diện
Responsive, hoạt động tốt trên desktop và mobile.
Có phân trang cho danh sách phòng và lịch sử booking.

🔗 API Backend
Frontend kết nối tới Backend NodeJS/Express qua các endpoint:
POST /auth/signup - Đăng ký
POST /auth/login - Đăng nhập
GET /rooms/list - Danh sách phòng
GET /rooms/list/available - Phòng còn trống
POST /bookings - Đặt phòng
GET /bookings/my-booking - Lịch sử đặt phòng
POST /bookings/bookingChangeRequests/update - Yêu cầu thay đổi booking
POST /bookings/bookingChangeRequests/cancel - Yêu cầu hủy booking
PUT /bookings/:id/pay - Thanh toán booking
(Cấu hình axiosInstance.js đã định sẵn baseURL trỏ về server backend)

🛠️ Ghi chú phát triển
File axiosInstance.js: cấu hình URL backend + interceptor token.
File Pagination.jsx: phân trang hiện đại (có dấu ..., hiển thị 3 số trang + đầu/cuối).
Cần chỉnh lại baseURL trong axiosInstance.js khi deploy thực tế.
 
 
