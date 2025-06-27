'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types';

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Post[] = await res.json();
        const foundPost = data.find(p => p.id === id);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('記事が見つかりませんでした。');
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) return <div className="text-center py-10">記事を読み込み中...</div>;
  if (error) return <div className="text-center py-10 text-red-500">エラー: {error}</div>;
  if (!post) return <div className="text-center py-10">記事が見つかりませんでした。</div>;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {post.date && !isNaN(new Date(post.date).getTime()) ? new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(post.date)) : '日付不明'}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
              {tag}
            </span>
          ))}
        </div>
        {post.thumbnail && (
          <div className="relative w-full h-64 mb-6">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
            />
          </div>
        )}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          <p>{post.content}</p>
        </div>
        <div className="mt-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
            &larr; ブログ一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
