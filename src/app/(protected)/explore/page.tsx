
export default function ExplorePage() {
    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Khám phá</h1>

                <div className="grid grid-cols-3 gap-1">
                    {/* Grid of explore content */}
                    {Array.from({ length: 9 }).map((_, index) => (
                                 <div key={index} className="aspect-square bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
