
export default function NotificationsPage() {
    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Thông báo</h1>

                <div className="space-y-4">
                    {/* Placeholder notifications */}
                    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div>
                            <p className="text-sm">
                                <span className="font-semibold">user123</span> đã bắt đầu theo dõi bạn.
                            </p>
                                  <p className="text-xs text-gray-500">2 giờ trước</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div>
                            <p className="text-sm">
                                <span className="font-semibold">friend_user</span> đã thích bài viết của bạn.
                            </p>
                            <p className="text-xs text-gray-500">1 ngày trước</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
