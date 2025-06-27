export interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  thumbnail: string;
}

export const ITEMS_PER_PAGE = 9;
