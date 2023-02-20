import { useState } from 'react';
import Post, { PostProps } from './Post';

const Timeline = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  // 無限スクロールを実装する

  return (
    <>
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </>
  );
};

export default Timeline;
