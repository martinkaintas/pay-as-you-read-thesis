import { AxiosResponse } from 'axios';
import { PostInformation } from '../../models/post.model';
import { getPostById, getPosts } from './api';

export const fetchPostById = async ({ queryKey }: any): Promise<PostInformation> => {
  const [, id] = queryKey;
  const { data }: AxiosResponse<PostInformation> = await getPostById(id);
  return data;
};

export const fetchPosts = async (): Promise<string[]> => {
  const { data }: AxiosResponse<string[]> = await getPosts();
  return data;
};
