import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Post, { PostProps } from './Post';

const Timeline = () => {
  const testPosts = [
    {
      user_id: '123456abc',
      display_name: 'testuser',
      profile_image: '',
      content: `
        Euler-Lagrange Equetion:
        $$
        \\begin{align*}
          \\frac{\\partial L}{\\partial q} = \\frac{\\mathrm{d}}{\\mathrm{d}t}\\frac{\\partial L}{\\partial p}
        \\end{align*}
        $$
      `,
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
        Hamilton's Equation:
        $$
        \\begin{align*}
          \\dot{q} &= \\frac{\\partial H}{\\partial p} \\\\
          \\dot{p} &= -\\frac{\\partial H}{\\partial q}
        \\end{align*}
        $$
      `,
      images: [],
      created_at: new Date(),
      like_count: 1,
      repost_count: 2,
      reply_count: 3,
      reposted_by: 'testuser',
    },
  ];
  const [posts, setPosts] = useState<PostProps[]>(testPosts);
  // 無限スクロールを実装する

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
