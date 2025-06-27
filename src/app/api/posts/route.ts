import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');

export async function GET() {
  try {
    const data = await fs.readFile(postsFilePath, 'utf-8');
    const posts = JSON.parse(data);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to read posts.json:', error);
    return NextResponse.json({ message: 'Failed to load posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, date, tags, thumbnail } = await request.json();
    const data = await fs.readFile(postsFilePath, 'utf-8');
    const posts = JSON.parse(data);

    // 新しい記事にIDを付与 (簡易的なもの)
    const id = Date.now().toString();
    const postWithId = {
      id,
      title,
      content,
      date: date || new Date().toISOString().split('T')[0], // 日付がない場合は現在の日付
      tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [], // カンマ区切りを配列に
      thumbnail: thumbnail || '/images/default-thumbnail.jpg', // デフォルトのサムネイル
    };

    posts.push(postWithId);
    await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2));
    return NextResponse.json(postWithId, { status: 201 });
  } catch (error) {
    console.error('Failed to write new post:', error);
    return NextResponse.json({ message: 'Failed to create post' }, { status: 500 });
  }
}
