import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Post from './Post';
import { Post as PostType } from '../types/Post';
import { getPosts } from '../services/PostService';

const Timeline = () => {
  const testPosts = [
    {
      user_id: '123456abc',
      display_name: 'testuser',
      profile_image: '',
      content: `Equation: $$\\rho \\frac{D \\bm{u}}{Dt} = -\\nabla p + (\\lambda + \\mu ) \\nabla (\\nabla \\cdot \\bm{u}) + \\mu \\nabla ^{2} \\bm{u} +\\rho \\tilde{\\bm{F}}$$`,
      images: [],
      created_at: new Date(),
      like_count: 1,
      repost_count: 2,
      reply_count: 3,
      reposted_by: 'testuser',
    },
    {
      user_id: '123456abc',
      display_name: 'testuser',
      profile_image: '',
      content: `
      $$
      L = \\frac{1}{2} \\rho v^2 S C_L
      $$`,
      images: [],
      created_at: new Date(),
      like_count: 1,
      repost_count: 2,
      reply_count: 3,
      reposted_by: 'testuser',
    },
    {
      user_id: '123456abc',
      display_name: 'testuser',
      profile_image: '',
      content: '\n  # Hello World\n  $$\n  L = \\frac{1}{2} \\rho v^2 S C_L\n  $$\n  ',
      images: [],
      created_at: new Date(),
      like_count: 1,
      repost_count: 2,
      reply_count: 3,
      reposted_by: 'testuser',
    },
  ];
  const [posts, setPosts] = useState<PostType[]>(testPosts);
  useEffect(() => {
    // setPosts(testPosts);
    // (async () => setPosts(await getPosts()))();
  }, []);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Stack divider={<Divider />}>
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </Stack>
  );
};

export default Timeline;
