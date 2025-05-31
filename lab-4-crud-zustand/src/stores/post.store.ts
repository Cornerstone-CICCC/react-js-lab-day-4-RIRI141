import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
}

interface PostStore {
  posts: Post[];
  addPost: (title: string, content: string, published: boolean) => void;
  updatePost: (id: string, title: string, content: string, published: boolean) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => Post | undefined;
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  addPost: (title: string, content: string, published: boolean) => {
    const newPost: Post = {
      id: uuidv4(),
      title,
      content,
      published,
      createdAt: new Date(),
    };
    set((state) => ({
      posts: [...state.posts, newPost],
    }));
  },

  updatePost: (id: string, title: string, content: string, published: boolean) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id
          ? { ...post, title, content, published }
          : post
      ),
    }));
  },

  deletePost: (id: string) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    }));
  },

  getPost: (id: string) => {
    return get().posts.find((post) => post.id === id);
  },
}));