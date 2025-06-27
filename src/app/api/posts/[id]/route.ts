import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await fs.readFile(postsFilePath, 'utf-8');
    const posts = JSON.parse(data);
    const post = posts.find((p: any) => p.id === id);

    if (post) {
      return NextResponse.json(post);
    } else {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to read post:', error);
    return NextResponse.json({ message: 'Failed to load post' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const updatedPostData = await request.json();
    const data = await fs.readFile(postsFilePath, 'utf-8');
    let posts = JSON.parse(data);

    const postIndex = posts.findIndex((p: any) => p.id === id);

    if (postIndex !== -1) {
      // 既存のタグとサムネイルを保持しつつ、新しいデータで更新
      const existingPost = posts[postIndex];
      const mergedPost = {
        ...existingPost,
        ...updatedPostData,
        tags: updatedPostData.tags ? updatedPostData.tags.split(',').map((tag: string) => tag.trim()) : existingPost.tags, // タグはカンマ区切りを配列に
        date: updatedPostData.date || existingPost.date, // 日付がない場合は既存の日付
        thumbnail: updatedPostData.thumbnail || existingPost.thumbnail, // サムネイルがない場合は既存のサムネイル
      };
      posts[postIndex] = mergedPost;
      await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2));
      return NextResponse.json(mergedPost);
    } else {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to update post:', error);
    return NextResponse.json({ message: 'Failed to update post' }, { status: 500 });
  }
}
