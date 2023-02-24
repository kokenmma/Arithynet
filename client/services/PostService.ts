/* Post Service */

import { useEffect, useState } from 'react';
import { Post, PostDB, PostInput, PostWithId } from '../types/Post';
import { db } from './firebase';
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  increment,
  CollectionReference,
  DocumentReference,
  DocumentData,
  QuerySnapshot,
  QueryDocumentSnapshot,
  WithFieldValue,
  setDoc,
  DocumentSnapshot,
  onSnapshot,
} from 'firebase/firestore';

// export const getPosts = async (): Promise<PostWithId[]> => {
//   const [posts, setPosts] = useState<PostWithId[]>([]);
//   useEffect(() => {
//     onSnapshot(collection(db, 'posts'), (querySnapshot) => {
//       const posts: PostWithId[] = [];
//       querySnapshot.forEach((doc: any) => {
//         const { created_at, ...rest }: PostDB = doc.data();
//         const data: PostWithId = { created_at: new Date(created_at), ...rest, post_id: doc.id };
//         posts.push(data);
//       });
//       setPosts(posts);
//     });
//   }, []);
//   return posts;
// };

export const addPost = async (post: PostInput): Promise<string> => {
  // Add Post to firebase
  const newRecord: PostDB = {
    ...post,
    created_at: new Date().toDateString(),
    like_count: [],
    repost_count: 0,
    reply_count: 0,
    reposted_by: [],
  };
  const docRef: DocumentReference<PostDB> = await addDoc(
    collection(db, 'posts') as CollectionReference<PostDB>,
    newRecord
  );
  console.log('Document written with ID: ', docRef.id);
  return docRef.id;
};

const getWhoLiked = async (post_id: string): Promise<string[]> => {
  // Get Post from firebase
  const docRef = doc(db, 'posts', post_id) as DocumentReference<PostDB>;
  const docSnap: DocumentSnapshot<PostDB> = await getDoc(docRef);
  if (docSnap.exists()) {
    const { like_count }: PostDB = docSnap.data();
    return like_count;
  } else {
    throw new Error('No such document!');
  }
};

export const upLikeCount = async (post_id: string, user: string): Promise<void> => {
  // Update like count
  const docRef: DocumentReference<DocumentData> = doc(db, 'posts', post_id);
  const current = await getWhoLiked(post_id);
  await updateDoc(docRef, {
    like_count: current.includes(user) ? current : [...current, user],
  });
};

export const removeLikeCount = async (post_id: string, user: string): Promise<void> => {
  // Remove like count
  const docRef: DocumentReference<DocumentData> = doc(db, 'posts', post_id);
  const current = await getWhoLiked(post_id);
  await updateDoc(docRef, {
    like_count: current.filter((item) => item !== user),
  });
};

export const upreplyCount = async (post_id: string): Promise<void> => {
  // Update like count
  const docRef: DocumentReference<DocumentData> = doc(db, 'posts', post_id);
  await updateDoc(docRef, {
    reply_count: increment(1),
  });
};

export const getPost = async (post_id: string): Promise<Post> => {
  // Get Post from firebase
  const docRef = doc(db, 'posts', post_id) as DocumentReference<PostDB>;
  const docSnap: DocumentSnapshot<PostDB> = await getDoc(docRef);
  if (docSnap.exists()) {
    const { created_at, ...rest }: PostDB = docSnap.data();
    const post: Post = { created_at: new Date(created_at), ...rest };
    return post;
  } else {
    throw new Error('No such document!');
  }
};

export const rePost = async (post_id: string, user_id: string): Promise<void> => {
  // Repost
  const docRef = doc(db, 'posts', post_id) as DocumentReference<PostDB>;
  const { reposted_by, created_at, ...rest }: Post = await getPost(post_id);
  // Add Post to firebase
  const reposted_byAddedPost: WithFieldValue<PostDB> = {
    reposted_by: [user_id, ...reposted_by],
    created_at: created_at.toDateString(),
    ...rest,
  };
  await setDoc(docRef, reposted_byAddedPost);
  // Update repost count
  await updateDoc(docRef, {
    repost_count: increment(1),
  });
};

export const getReply = async (post_id: string): Promise<PostWithId[]> => {
  // Get Posts from firebase for timeline
  const querySnapshot: QuerySnapshot<PostDB> = await getDocs(
    collection(db, 'posts', post_id, 'replys') as CollectionReference<PostDB>
  );
  const posts: PostWithId[] = [];
  querySnapshot.forEach((doc: QueryDocumentSnapshot<PostDB>) => {
    const { created_at, ...rest }: PostDB = doc.data();
    const data: PostWithId = { created_at: new Date(created_at), ...rest, post_id: doc.id };
    posts.push(data);
  });
  return posts;
};

export const replyToPost = async (post_id: string, reply_input: PostInput): Promise<string> => {
  // Update reply count
  await upreplyCount(post_id);
  // Update reply
  const reply: WithFieldValue<PostDB> = {
    ...reply_input,
    created_at: new Date().toDateString(),
    like_count: [],
    repost_count: 0,
    reply_count: 0,
    reposted_by: [],
  };
  const docRef: DocumentReference<PostDB> = await addDoc(
    collection(db, 'posts', post_id, 'replys') as CollectionReference<PostDB>,
    reply
  );
  console.log('Document written with ID: ', docRef.id);
  return docRef.id;
};
