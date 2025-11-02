import type { PostProps } from './Post';
import { Post } from './Post';

const mockPosts: PostProps[] = [
  {
    id: '1',
    author: {
      id: '1',
      name: 'here_film',
      username: 'here_film',
      avatar:
        'https://i.pinimg.com/75x75_RS/55/d1/4c/55d14c6dc304326c77c18f45d58df4bc.jpg',
      verified: false,
    },
    content: 'Sunrise (2025)...',
    images: [
      'https://kittenalarm.com/cdn/shop/files/Ribbed-High-Neck-Jacket-6.jpg?v=1756804521&width=713',
    ],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    likes: 2108,
    comments: 49,
    shares: 10,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    author: {
      id: '2',
      name: 'ZARFA',
      username: 'ZARFA',
      avatar:
        'https://i.pinimg.com/75x75_RS/7d/8f/29/7d8f2985b5623b67dbd16b884d96b75d.jpg',
      verified: false,
    },
    content: 'Is it in? ',
    images: [
      'https://i.pinimg.com/736x/99/89/9d/99899de13d52e4c6fdc41cd43963ab6e.jpg',
    ],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    likes: 2108,
    comments: 49,
    shares: 10,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '3',
    author: {
      id: '3',
      name: 'Vintage Plaid',
      username: 'Vintage Plaid',
      avatar:
        'https://i.pinimg.com/75x75_RS/73/f6/10/73f610cfd717166f004197d7f6a41476.jpg',
      verified: false,
    },
    content: '너의 이름은 실사화 촬영 현장',
    images: [
      'https://i.pinimg.com/736x/5a/fe/e3/5afee30df979fe8bf739a2290a55854d.jpg',
    ],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    likes: 2108,
    comments: 49,
    shares: 10,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '4',
    author: {
      id: '4',
      name: 'Vintage Plaid',
      username: 'Vintage Plaid',
      avatar:
        'https://i.pinimg.com/75x75_RS/73/f6/10/73f610cfd717166f004197d7f6a41476.jpg',
      verified: false,
    },
    content: 'Lang thang sai gon',
    images: [
      'https://i.pinimg.com/736x/6b/a6/ae/6ba6ae9b6c125e3145e586e2000bb03d.jpg',
      'https://i.pinimg.com/1200x/5a/27/a5/5a27a5e54a2d8c225d32f947c57e6238.jpg',
      'https://i.pinimg.com/1200x/7f/a6/5d/7fa65d713521cdfb32c904e9162c2669.jpg',
      'https://i.pinimg.com/736x/ff/bc/d9/ffbcd9d83dce6db87ae78db8ce034ca5.jpg',
    ],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    likes: 2108,
    comments: 49,
    shares: 10,
    isLiked: false,
    isBookmarked: false,
  },
];

const PostFeed = () => (
  <div className="flex flex-col gap-6">
    {mockPosts.map((post) => (
      <Post key={post.id} {...post} />
    ))}
  </div>
);

export default PostFeed;
