import { Post } from '@app/models/domain';
import posts from './content';

export const get = (id: string): Post => {
  return posts[id];
};

export const getAll = (): Record<string, Post> => {
  return posts;
};
