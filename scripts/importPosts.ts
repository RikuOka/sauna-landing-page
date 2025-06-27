import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  try {
    const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');
    const data = await fs.readFile(postsFilePath, 'utf-8');
    const posts = JSON.parse(data);

    for (const post of posts) {
      // tags配列をカンマ区切りの文字列に変換
      const tagsString = post.tags.join(',');

      await prisma.post.create({
        data: {
          id: post.id,
          title: post.title,
          content: post.content,
          date: new Date(post.date),
          tags: tagsString,
          thumbnail: post.thumbnail,
        },
      });
    }
    console.log('Posts imported successfully!');
  } catch (error) {
    console.error('Error importing posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
