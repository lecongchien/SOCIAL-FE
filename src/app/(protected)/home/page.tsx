import { Post } from '../../../components/common/Post';
import { Stories } from '../../../components/layout';

// Mock data for posts
const mockPosts = [
    {
        id: '1',
        author: {
            id: '1',
            name: 'Miyoshi',
            username: 'miyoshi.aa',
            avatar: '',
            verified: true,
        },
        content: 'Thích một buổi chiều thư giãn ☀️',
        images: ['/placeholder-post.jpg'],
                    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        likes: 66663,
        comments: 125,
        shares: 45,
        isLiked: false,
        isBookmarked: false,
    },
];

export default function HomePage() {
    return (
        <div className="space-y-6">
            {/* Stories */}
            <Stories />

            {/* Posts Feed */}
            <div className="space-y-6">
                {mockPosts.map((post) => (
                    <Post key={post.id} {...post} />
                ))}
            </div>
        </div>
    );
}
