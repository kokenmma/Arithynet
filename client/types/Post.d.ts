export interface Post {
  user_id: string;
  display_name: string;
  profile_image: string;
  content: string;// markdown
  images: string[];
  created_at: Date;
  like_count: number;
  repost_count: number;
  replay_count: number;
  reposted_by: string | null;
}

export interface PostInput extends Omit<Post, 'created_at' | 'like_count' | 'repost_count' | 'replay_count' | 'reposted_by' | 'replay'> {

}