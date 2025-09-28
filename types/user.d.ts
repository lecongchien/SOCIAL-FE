export interface User {
  id: string; // ID duy nhất
  username: string; // Tên đăng nhập
  email: string; // Email người dùng
  fullName?: string; // Họ và tên (có thể có hoặc không)
  avatarUrl?: string; // Ảnh đại diện
  phoneNumber?: string; // Số điện thoại
  role: "admin" | "user" | "moderator"; // Quyền hạn
  createdAt: Date; // Ngày tạo
  updatedAt?: Date; // Ngày cập nhật
  isActive: boolean; // Tài khoản còn hoạt động không
}
