# Chức năng Đăng ký (Register)

## Mô tả

Chức năng đăng ký cho phép người dùng tạo tài khoản mới trên hệ thống.

## API Endpoint

- **URL**: `http://localhost:5000/api/auth/register`
- **Method**: `POST`
- **Content-Type**: `application/json`

## Request Body

```json
{
  "email": "test@example.com",
  "password": "Test@123",
  "name": "testuser"
}
```

## Validation Rules (Zod Schema)

### Email

- Phải là email hợp lệ
- Thông báo lỗi: "Email không hợp lệ"

### Password

- Độ dài: 6-100 ký tự
- Phải chứa ít nhất:
  - 1 chữ hoa (A-Z)
  - 1 chữ thường (a-z)
  - 1 số (0-9)
  - 1 ký tự đặc biệt (@$!%\*?&)
- Thông báo lỗi: "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"

### Name

- Độ dài: 2-256 ký tự
- Thông báo lỗi: "Tên phải có ít nhất 2 ký tự"

### Confirm Password

- Phải khớp với mật khẩu
- Thông báo lỗi: "Mật khẩu xác nhận không khớp"

## Implementation Files

### 1. Schema Validation

📄 `src/schemaValidations/auth.schema.ts`

- Định nghĩa `RegisterBody` và `RegisterBodyType` với Zod
- Định nghĩa `RegisterRes` và `RegisterResType` cho response

### 2. API Request

📄 `src/apiRequests/auth.ts`

- `SRegister`: Gọi trực tiếp đến backend server
- `register`: Gọi qua Next.js API route

### 3. Custom Hook

📄 `src/queries/useAuth.tsx`

- `useRegisterMutation`: React Query mutation hook

### 4. API Route Handler

📄 `src/app/api/auth/register/route.ts`

- Xử lý request từ client
- Gọi API backend
- Lưu token vào HTTP-only cookies
- Trả về response

### 5. UI Component

📄 `src/app/(public)/(auth)/signup/signup-form.tsx`

- Form đăng ký với validation
- Xử lý submit và hiển thị thông báo
- Redirect sau khi đăng ký thành công

## Cách test

### 1. Cấu hình môi trường

Đảm bảo file `.env` có cấu hình đúng:

```env
NEXT_PUBLIC_API_ENDPOINT=http://localhost:5000/api
NEXT_PUBLIC_URL=http://localhost:3000
```

### 2. Khởi động Backend Server

```bash
cd social-media-server
npm run dev
# Server chạy ở http://localhost:5000
```

### 3. Khởi động Frontend

```bash
cd SOCIAL-FE
npm run dev
# hoặc
pnpm dev
# App chạy ở http://localhost:3000
```

### 4. Test trên giao diện

1. Truy cập: http://localhost:3000/signup
2. Nhập thông tin:
   - Name: testuser
   - Email: test@example.com
   - Password: Test@123
   - Confirm Password: Test@123
3. Click "Tạo tài khoản"
4. Kiểm tra:
   - Toast notification hiển thị
   - Redirect đến trang /home
   - Token được lưu trong localStorage và cookies

### 5. Test validation

Thử các trường hợp:

- Email không hợp lệ: `test@`
- Mật khẩu yếu: `123456`
- Mật khẩu không khớp
- Tên quá ngắn: `A`

### 6. Test API trực tiếp

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test2@example.com",
    "password": "Test@123",
    "name": "testuser2"
  }'
```

## Response Example

### Success Response (200)

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "account": {
      "id": 1,
      "name": "testuser",
      "email": "test@example.com",
      "role": "User"
    }
  },
  "message": "Đăng ký thành công"
}
```

### Error Response (400/422/500)

```json
{
  "message": "Email đã tồn tại"
}
```

## Flow Diagram

```
Client (Browser)
    ↓
    | 1. Submit form
    ↓
signup-form.tsx (useRegisterMutation)
    ↓
    | 2. POST /api/auth/register
    ↓
Next.js API Route (/api/auth/register/route.ts)
    ↓
    | 3. POST /auth/register
    ↓
Backend Server (http://localhost:5000/api/auth/register)
    ↓
    | 4. Return tokens + user data
    ↓
Next.js API Route
    ↓
    | 5. Set HTTP-only cookies
    | 6. Return response
    ↓
signup-form.tsx
    ↓
    | 7. Save to localStorage
    | 8. Show toast notification
    | 9. Redirect to /home
    ↓
User Dashboard
```

## Lưu ý

1. **Security**:

   - Tokens được lưu trong HTTP-only cookies (server-side)
   - AccessToken cũng lưu trong localStorage (client-side) để dùng cho các API calls
   - Production nên dùng HTTPS

2. **Error Handling**:

   - Tất cả lỗi đều được catch và hiển thị thông báo cho user
   - Validation errors hiển thị ngay tại form field

3. **TypeScript**:

   - Full type safety với Zod schema
   - Auto-completion cho request/response

4. **React Query**:
   - Tự động handle loading state
   - Easy error handling
   - Cache management

## Troubleshooting

### Lỗi CORS

Nếu gặp lỗi CORS, kiểm tra backend server có cấu hình cho phép origin từ `http://localhost:3000`

### Lỗi Network

- Kiểm tra backend server đang chạy
- Kiểm tra URL trong `.env` file

### Token không được lưu

- Kiểm tra response từ backend có đúng format không
- Check browser console và Network tab

### Validation không hoạt động

- Clear cache và reload
- Kiểm tra RegisterBody schema có import đúng không
