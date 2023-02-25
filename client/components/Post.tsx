import React, { useState, useMemo, useEffect } from 'react';
import { NextPage } from 'next';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ReplyIcon from '@mui/icons-material/Reply';
import RepeatIcon from '@mui/icons-material/Repeat';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Details from './Details';
import ReplyingToPost from './ReplyingToPost';
import { CardProps, IconButtonProps } from '@mui/material';
import type { PostDB, PostDBInput, PostWithId } from '../types/Post';
import RenderContent from './RenderContent';
import { removeLikeCount, upLikeCount, upreplyCount } from '../services/PostService';
import { useUser } from '../lib/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../services/firebase';

export type PostProps = CardProps &
  PostWithId & {
    enableReplyTree?: boolean;
  };

const Post: NextPage<PostProps> = React.forwardRef<HTMLDivElement, PostProps>(function PostImpl(
  {
    post_id,
    user_id,
    display_name,
    profile_image,
    content,
    images = [],
    created_at,
    like_count,
    repost_count,
    reply_count,
    reposted_by,
    enableReplyTree = true,
    ...card_props
  }: PostProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const user = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [raw, setRaw] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isReposted, setIsReposted] = useState<boolean>(false);
  const theme = useTheme();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const changeRaw = () => setRaw((raw) => !raw);

  const handleRepost = async () => {
    setIsReposted((isReposted) => !isReposted);
  };

  const handleLike = async () => {
    if (!user?.uid) return;
    if (isLiked) {
      // いいねを取り消す
      await removeLikeCount(post_id, user.uid);
    } else {
      // いいねをする
      await upLikeCount(post_id, user.uid);
    }
    setIsLiked((isLiked) => !isLiked);
  };

  useEffect(() => {
    if (!user?.uid) return;
    setIsLiked(like_count.includes(user.uid));
  }, [user, like_count]);

  const RenderedContent: JSX.Element = useMemo(
    () => <RenderContent content={content} images={images} />,
    [content, images]
  );

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const [expanded, setExpanded] = useState<boolean>(false);
  const [hasBeenExpanded, setHasBeenExpanded] = useState<boolean>(false);
  const [replies, setReplies] = useState<PostWithId[]>([]);

  const handleExpandClick = () => {
    setHasBeenExpanded(true);
    setExpanded(!expanded);
  };

  // 初期レンダリング後，初めてリプ欄展開ボタンを押したときに一度だけ返信をロードする
  useEffect(() => {
    onSnapshot(
      query(collection(db, 'posts', post_id, 'replies'), orderBy('created_at', 'desc')),
      (querySnapshot) => {
        console.log('loading replies...');
        const replies: PostWithId[] = [];
        querySnapshot.forEach((doc: any) => {
          const { created_at, ...rest }: PostDBInput = doc.data();
          const data: PostWithId = {
            created_at: new Date(created_at.seconds * 1000),
            ...rest,
            post_id: doc.id,
          };
          replies.push(data);
        });
        setReplies(replies);
      }
    );
  }, [hasBeenExpanded, post_id]);

  const ExpandMore: NextPage<ExpandMoreProps> = ({ expand, ...rest }: ExpandMoreProps) => {
    return (
      <IconButton
        {...rest}
        sx={{
          transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
          marginLeft: 'auto',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
          }),
        }}
      />
    );
  };

  return (
    <Card ref={ref} {...card_props}>
      <CardHeader
        avatar={<Avatar src={profile_image} aria-label='icon' />}
        action={
          <Stack direction='row'>
            <IconButton onClick={changeRaw}>
              {!raw ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
            </IconButton>
            {/* <Details postId={postId} /> */}
          </Stack>
        }
        title={display_name + '@' + user_id}
        subheader={created_at.toDateString()}
      />
      <CardContent>{!raw ? RenderedContent : <Typography>{content}</Typography>}</CardContent>
      <CardActions disableSpacing>
        <ReplyIcon onClick={handleOpen} />
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          sx={{ '& .MuiPaper-root-MuiCard-root': { padding: 0 } }}
        >
          <ReplyingToPost
            post_id={post_id}
            user_id={user_id}
            display_name={display_name}
            profile_image={profile_image}
            content={content}
            images={images}
            created_at={created_at}
            like_count={like_count}
            repost_count={repost_count}
            reply_count={reply_count}
            reposted_by={reposted_by}
            RenderedContent={RenderedContent}
            handleClose={handleClose}
          />
        </Modal>
        <Typography variant='body2'>{reply_count}</Typography>
        <IconButton aria-label='repost'>
          {/* Repost の処理の呼び出しを行う */}
          <RepeatIcon sx={isReposted ? { color: 'green' } : {}} />
        </IconButton>
        <Typography variant='body2'>{repost_count}</Typography>
        <IconButton aria-label='favorite' onClick={handleLike}>
          {/* Favorite の処理の呼び出しを行う */}
          <FavoriteIcon sx={isLiked ? { color: 'red' } : {}} />
        </IconButton>
        <Typography variant='body2'>{like_count.length}</Typography>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        {enableReplyTree && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Stack divider={<Divider />}>
            {replies.map((reply, index) => (
              <Grid key={index} container spacing={0}>
                <Grid item xs={1}>
                  <KeyboardReturnOutlinedIcon sx={{ transform: 'rotate(90deg)' }} />
                </Grid>
                <Grid item xs={11}>
                  <Post {...reply} sx={{ width: 530, marginRight: 0 }} enableReplyTree={false} />
                </Grid>
              </Grid>
            ))}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
});

export default Post;
