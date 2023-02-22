/* Post Service */

import { Post, PostInput } from '../types/Post';
import { db } from './firebase';
import { collection, getDoc, getDocs, addDoc, doc, updateDoc, increment } from "firebase/firestore";

export const getPosts = async (): Promise<Post[]> => {
  // Get Posts from firebase for timeline
  const querySnapshot = await getDocs(collection(db, 'posts'));
  const posts: Post[] = [];
  querySnapshot.forEach((doc) => {
    posts.push(doc.data() as Post);
  });
  return posts;
}

export const addPost = async (post: PostInput, reposted_by: string | null = null): Promise<string> => {
  // Add Post to firebase
  const newRecord: Post = {
    ...post,
    created_at: new Date(),
    like_count: 0,
    repost_count: 0,
    reply_count: 0,
    reposted_by: reposted_by
  }
  const docRef = await addDoc(collection(db, "posts"), newRecord);
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
}

export const upLikeCount = async (post_id: string): Promise<void> => {
  // Update like count
  const docRef = doc(db, "posts", post_id);
  await updateDoc(docRef, {
    like_count: increment(1)
  });
}

export const upreplyCount = async (post_id: string): Promise<void> => {
  // Update like count
  const docRef = doc(db, "posts", post_id);
  await updateDoc(docRef, {
    reply_count: increment(1)
  });
}

export const getPost = async (post_id: string): Promise<Post> => {
  // Get Post from firebase
  const docRef = doc(db, "posts", post_id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as Post;
  } else {
    throw new Error("No such document!");
  }
}

export const rePost = async (post_id: string, user_id: string): Promise<void> => {
  // Repost
  const docRef = doc(db, "posts", post_id);
  const post = await getPost(post_id);
  // Add Post to firebase
  await addPost({
    user_id: post.user_id,
    display_name: post.display_name,
    profile_image: post.profile_image,
    content: post.content,
    images: post.images
  }, user_id);
  // Update repost count
  await updateDoc(docRef, {
    repost_count: increment(1)
  });
}

export const getRepaly = async (post_id: string): Promise<Post[]> => {
  // Get Posts from firebase for timeline
  const querySnapshot = await getDocs(collection(db, 'posts', post_id, 'replys'));
  const posts: Post[] = [];
  querySnapshot.forEach((doc) => {
    posts.push(doc.data() as Post);
  });
  return posts;
}

export const replyToPost = async (post_id: string, reply: PostInput): Promise<string> => {
  // Update reply count
  await upreplyCount(post_id);
  // Update reply
  const docRef = await addDoc(
    collection(db, 'posts', post_id, 'replys'),
    {
      ...reply,
      created_at: new Date(),
      like_count: 0,
      repost_count: 0,
      reply_count: 0,
      reposted_by: null
    });
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
}