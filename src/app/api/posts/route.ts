import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id'); // Add this line to get id from query params
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const itemsPerPage = parseInt(searchParams.get('itemsPerPage') || '9');

    const skip = (page - 1) * itemsPerPage;

    let where: any = {};

    if (id) { // If id is provided, fetch a single post
      const post = await prisma.post.findUnique({
        where: { id: id },
      });
      if (post) {
        return NextResponse.json(post);
      } else {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
      }
    }

    // Existing logic for fetching multiple posts
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    

    const posts = await prisma.post.findMany({
      where,
      skip,
      take: itemsPerPage,
      orderBy: {
        date: 'desc',
      },
    });

    const totalPosts = await prisma.post.count({ where });

    return NextResponse.json({ posts, totalPages: Math.ceil(totalPosts / itemsPerPage) });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ message: 'Failed to load posts' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, date, tags, thumbnail } = await request.json();

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        date: date ? new Date(date) : new Date(),
        tags: tags || '', // 配列からカンマ区切り文字列に変換
        thumbnail: thumbnail || '/images/default-thumbnail.jpg',
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Failed to create new post:', error);
    return NextResponse.json({ message: 'Failed to create post' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
    }

    const { title, content, date, tags, thumbnail } = await request.json();

    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: {
        title,
        content,
        date: date ? new Date(date) : new Date(),
        tags: tags || '',
        thumbnail: thumbnail || '/images/default-thumbnail.jpg',
      },
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error('Failed to update post:', error);
    return NextResponse.json({ message: 'Failed to update post' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}