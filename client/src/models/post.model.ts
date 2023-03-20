export interface Post {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
}

export type PostInformation = Omit<Post, 'content'>;
