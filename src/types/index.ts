export interface Post {
  id: string;
  title: string;
  content: string;
  date: Date; // stringからDateに変更
  tags: string; // string[]からstringに変更
  thumbnail: string;
}

export const ITEMS_PER_PAGE = 9;