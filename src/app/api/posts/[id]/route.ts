import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 特定のIDの記事を取得 (GET)
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post) {
      // tagsを配列に戻す
      const postWithTagsArray = {
        ...post,
        tags: post.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      };
      return NextResponse.json(postWithTagsArray);
    } else {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(`Failed to read post with ID ${id}:`, error);
    return NextResponse.json({ message: 'Failed to load post' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// 特定のIDの記事を更新 (PUT)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const { title, content, date, tags, thumbnail } = await request.json();

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        date: date ? new Date(date) : undefined,
        tags: tags ? tags.join(',') : undefined,
        thumbnail: thumbnail || undefined,
      },
    });
    // tagsを配列に戻して返す
    const postWithTagsArray = {
      ...updatedPost,
      tags: updatedPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    };
    return NextResponse.json(postWithTagsArray);
  } catch (error) {
    console.error(`Failed to update post with ID ${id}:`, error);
    return NextResponse.json({ message: 'Failed to update post' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// 特定のIDの記事を削除 (DELETE)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(`Failed to delete post with ID ${id}:`, error);
    return NextResponse.json({ message: 'Failed to delete post' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
