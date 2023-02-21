import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Post, { PostProps } from './Post';

const Timeline = () => {
  const testPosts = [
    {
      postId: 123456,
      photoURL: '',
      userName: 'testuser',
      userId: '123456abc',
      postText: 'Welcome to UEC!',
      replyCount: 1,
      repostCount: 2,
      favCount: 3,
      postTime: 'February 21, 2023',
      isFavedByU: true,
      isRepostedByU: true,
    },
    {
      postId: 123456,
      photoURL: '',
      userName: 'testuser',
      userId: '123456abc',
      postText: 'Welcome to UEC!',
      replyCount: 1,
      repostCount: 2,
      favCount: 3,
      postTime: 'February 21, 2023',
      isFavedByU: true,
      isRepostedByU: true,
    },
  ];
  const [posts, setPosts] = useState<PostProps[]>(testPosts);
  // 無限スクロールを実装する

  return (
    <Stack divider={<Divider />}>
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </Stack>
  );
};

export default Timeline;
