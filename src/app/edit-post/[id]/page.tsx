'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PostForm } from '@/components/PostForm';
import { Post } from '@/types';

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
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
        const data: Post = await res.json();
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

  const handleSubmit = async (formData: { title: string; content: string; date: string; tags: string; thumbnail: string }) => {
    try {
      const res = await fetch(`/api/posts?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      router.push(`/${id}`); // 編集後に詳細ページへリダイレクト
    } catch (e: any) {
      alert(`記事の更新に失敗しました: ${e.message}`);
    }
  };

  if (loading) return <div className="text-center py-10">記事を読み込み中...</div>;
  if (error) return <div className="text-center py-10 text-red-500">エラー: {error}</div>;
  if (!post) return <div className="text-center py-10">記事が見つかりませんでした。</div>;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">記事を編集</h2>
        <PostForm
          initialData={{
            title: post.title,
            content: post.content,
            date: post.date ? new Date(post.date).toISOString().split('T')[0] : '',
            tags: post.tags.split(',').map(tag => tag.trim()),
            thumbnail: post.thumbnail,
          }}
          onSubmit={handleSubmit}
          buttonText="更新"
        />
      </div>
    </div>
  );
}