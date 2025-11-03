import PostFeed from '../../../components/common/Post/PostFeed';
import { Stories } from '../../../components/layout';

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Stories */}
      <Stories />
      {/* Posts Feed */}
      <PostFeed />
    </div>
  );
}
