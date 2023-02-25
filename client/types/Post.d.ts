export interface Post {
  user_id: string;
  display_name: string;
  profile_image: string;
  content: string; // markdown
  images: string[];
  created_at: Date;
  like_count: string[];
  repost_count: number;
  reply_count: number;
  reposted_by: string[];
}

export interface PostDB extends Omit<Post, 'created_at'> {
  created_at: Date;
}

export interface PostDBInput extends Omit<Post, 'created_at'> {
  created_at: FirebaseTimestamp;
}

interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface PostInput
  extends Omit<
    Post,
    'created_at' | 'like_count' | 'repost_count' | 'reply_count' | 'reposted_by'
  > {}

export interface PostWithId extends Post {
  post_id: string;
}
