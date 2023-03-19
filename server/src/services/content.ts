import { get } from '@app/db';
import { PostInformation } from '@app/models/domain';

export const getPostInformation = (id: string): PostInformation => {
  const post = get(id);
  if (!post) return null;

  const { content, ...information } = post;
  return information;
};
