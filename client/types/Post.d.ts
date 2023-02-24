export interface Post {
  user_id: string;
  display_name: string;
  profile_image: string;
  content: string; // markdown
  images: string[];
  created_at: Date;
  like_count: number;
  repost_count: number;
  reply_count: number;
  reposted_by: string[];
}

export type PostDB = Omit<Post, 'created_at'> & { created_at: string };

export interface PostInput
  extends Omit<
    Post,
    'created_at' | 'like_count' | 'repost_count' | 'reply_count' | 'reposted_by'
  > {}

export type PostWithId = Post & { post_id: string };
