export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Skeleton */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="px-3 py-4 space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center px-3 py-3 space-x-3">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="ml-64">
        <div className=" py-8 px-4 space-y-6">
          {/* Stories Skeleton */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex space-x-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 text-center">
                  <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Posts Skeleton */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg">
              {/* Post Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Post Image */}
              <div className="w-full h-96 bg-gray-200 animate-pulse"></div>

              {/* Post Actions */}
                                                <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
                
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions Panel Skeleton */}
      <div className="fixed right-8 top-0 w-80 h-screen py-8">
        <div className="space-y-6">
          {/* Current User Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
          </div>

          {/* Suggestions */}
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
