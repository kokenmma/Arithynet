import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
      postText: 'Welcome to UEC!(text)',
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
      postText:
        "Here is a sample post that includes LaTeX and TikZ code. Now we are able to use like $x^2$\
        and TikZ code like:\
        $$$\begin{tikzpicture}[->,>=stealth',shorten >=1pt,auto,\
      node distance=2.8cm,semithick,\
      accepting/.style={double distance=1.5pt}]\
      \node[initial, state] (q0) {$q_0$};\
      \node[state] (q1) [right of=q0] {$q_1$};\
      \node[state, accepting] (q2) [right of=q1] {$q_2$};\
      path\
          (q0) edge [loop above] node {$0,,1$} (q0)\
               edge node {1} (q1)\
          (q1) edge node {0} (q2);\
end{tikzpicture}$$$",
      replyCount: 1,
      repostCount: 2,
      favCount: 5,
      postTime: 'February 21, 2023',
      isFavedByU: true,
      isRepostedByU: true,
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
