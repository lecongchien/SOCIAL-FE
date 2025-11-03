export default function SearchPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white  rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Tìm kiếm</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <p className="text-gray-500 text-center">
          Nhập từ khóa để tìm kiếm người dùng hoặc nội dung
        </p>
      </div>
    </div>
  );
}
