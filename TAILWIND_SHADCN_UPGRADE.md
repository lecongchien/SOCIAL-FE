# Cấu hình Tailwind CSS & shadcn/ui cho Social App

## Tổng quan

Đã hoàn thành việc cải tiến các common components và cấu hình Tailwind CSS để tương thích với shadcn/ui.

## Thay đổi chính

### 1. Cấu hình Tailwind CSS

**File: `tailwind.config.js`**
- Cấu hình cho Tailwind CSS v4
- Định nghĩa colors sử dụng CSS variables
- Thêm border radius và animations cho shadcn/ui
- Export default thay vì module.exports cho v4

**File: `styles/globals.css`**
- Sử dụng `@import "tailwindcss"` thay vì @tailwind directives
- Định nghĩa CSS variables cho theme colors (light/dark mode)
- Sử dụng HSL color space cho tương thích với shadcn/ui
- Thiết lập base styles cho border và typography

### 2. Common Components đã cập nhật

#### Button Component (`src/components/common/button/Button.tsx`)
- **Trước:** Custom implementation với style objects
- **Sau:** Wrapper around shadcn/ui Button
- **Cải tiến:**
  - Sử dụng `buttonVariants` từ shadcn/ui
  - Giữ nguyên API interface (loading, leftIcon, rightIcon, fullWidth)
  - Tương thích với class variance authority
  - Hỗ trợ `asChild` prop

#### Input Component (`src/components/common/Input/Input.tsx`)
- **Trước:** Custom styled input với hardcoded colors
- **Sau:** Sử dụng shadcn/ui Input component
- **Cải tiến:**
  - Semantic color system (text-foreground, text-muted-foreground)
  - Tự động focus states và error handling
  - Password visibility toggle được cải thiện
  - Responsive và accessible

#### Textarea Component (`src/components/common/Textarea/Textarea.tsx`)
- **Trước:** Custom implementation
- **Sau:** Wrapper around shadcn/ui Textarea
- **Cải tiến:**
  - Consistent styling với Input
  - Character count với color feedback
  - Better resize handling
  - Semantic colors

#### Avatar Component (`src/components/common/Avatar/Avatar.tsx`)
- **Trước:** Custom implementation với image error handling
- **Sau:** Sử dụng Radix UI Avatar primitive từ shadcn/ui
- **Cải tiến:**
  - Automatic fallback system
  - Better accessibility
  - Consistent size system
  - Status indicator vẫn được giữ nguyên

#### Modal Component (`src/components/common/Modal/Modal.tsx`)
- **Trước:** Custom portal-based modal
- **Sau:** Sử dụng shadcn/ui Dialog component
- **Cải tiến:**
  - Radix UI accessibility features
  - Better keyboard navigation
  - Focus management
  - Animation support
  - Backdrop blur và overlay

#### Loading Component (`src/components/common/Loading/Loading.tsx`)
- **Trước:** Custom spinner với hardcoded colors
- **Sau:** Sử dụng semantic colors
- **Cải tiến:**
  - `text-primary` thay vì `text-blue-500`
  - `text-muted-foreground` cho helper text
  - `bg-background/80` cho overlay
  - Tương thích với dark mode

### 3. Dependencies đã thêm

```json
{
  "tailwindcss-animate": "^1.0.7"  // For shadcn/ui animations
}
```

### 4. shadcn/ui Components đã cài đặt

- `button` - Versatile button component với variants
- `input` - Styled input với focus states
- `textarea` - Consistent với input styling
- `avatar` - Radix UI avatar với fallback
- `card` - Container component cho layouts
- `dialog` - Modal replacement với accessibility

## Lợi ích đạt được

1. **Consistency**: Tất cả components sử dụng cùng design system
2. **Accessibility**: Radix UI primitives có sẵn a11y features
3. **Dark Mode**: Automatic support thông qua CSS variables
4. **Maintainability**: Ít custom CSS, dễ bảo trì hơn
5. **Performance**: Tree-shaking friendly, smaller bundle
6. **Developer Experience**: Autocomplete và type safety tốt hơn

## Usage Examples

```tsx
// Button với các variants mới
<Button variant="default" size="lg" loading={isLoading}>
  Submit
</Button>

<Button variant="outline" leftIcon={<Icon />}>
  With Icon
</Button>

// Input với semantic colors
<Input 
  label="Email"
  error={errors.email}
  placeholder="Enter your email"
  type="email"
/>

// Modal với Dialog
<Modal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  description="This action cannot be undone"
>
  <p>Are you sure?</p>
</Modal>
```

## Các file cấu hình quan trọng

- `tailwind.config.js` - Tailwind CSS v4 configuration
- `styles/globals.css` - Global styles và CSS variables
- `components.json` - shadcn/ui configuration
- `src/components/ui/` - Generated shadcn/ui components

## Migration Notes

- Tất cả existing code sẽ continue work vì interface không đổi
- Chỉ có styling và internal implementation được cải thiện
- Dark mode sẽ work automatically khi add class "dark" vào html element
- Custom styles vẫn có thể override thông qua className prop

## Next Steps

1. Test thoroughly trên different browsers và devices
2. Implement dark mode toggle
3. Thêm more shadcn/ui components nếu cần (tooltip, dropdown, etc.)
4. Consider adding form validation library (react-hook-form + zod)
5. Optimize for mobile responsiveness
