import { get, getAll } from '@app/db';
import { PostInformation } from '@app/models/domain';

export const splitTextIntoParagraphs = (text: string): string[] => {
  return text.split('\n\n');
};

export const getPostInformation = (
  id: string,
): PostInformation & {
  totalParagraphs: number;
} => {
  const post = get(id);
  if (!post) return null;

  const { content, ...information } = post;
  return {
    ...information,
    totalParagraphs: splitTextIntoParagraphs(content).length,
  };
};

export const getPostsIds = (): string[] => {
  return Object.keys(getAll());
};
