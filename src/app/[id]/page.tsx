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
        const res = await fetch(`/api/posts?id=${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Post = await res.json(); // Expect a single Post object
        setPost(data);
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
          {(post.tags ? post.tags.split(',') : []).map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
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
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mt-6">
          <p>{post.content}</p>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200">
            &larr; ブログ一覧に戻る
          </Link>
          <Link href={`/edit-post/${post.id}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
            編集
          </Link>
        </div>
      </div>
    </div>
  );
}
