'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PostForm } from '@/components/PostForm';

export default function NewPostPage() {
  const router = useRouter();

  const handleSubmit = async (data: { title: string; content: string; date: string; tags: string; thumbnail: string }) => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/blog'); // 成功したらブログ一覧ページにリダイレクト
    } else {
      alert('記事の作成に失敗しました。');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            新しい記事を作成
          </h2>
        </div>
        <PostForm onSubmit={handleSubmit} buttonText="記事を公開" />
        <div className="text-center">
          <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
