'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

import { Post, ITEMS_PER_PAGE } from '@/types';

interface ApiResponse {
  posts: Post[];
  totalPages: number;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
  const initialSearchQuery = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('itemsPerPage', ITEMS_PER_PAGE.toString());
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const res = await fetch(`/api/posts?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: ApiResponse = await res.json();
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // URLのsearchパラメータが変更されたらsearchQueryを更新
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `/?${params.toString()}`;
  };

  if (loading) return <div className="text-center py-10">記事を読み込み中...</div>;
  if (error) return <div className="text-center py-10 text-red-500">エラー: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">ブログ一覧</h1>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <Link href="/new-post" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            新しい記事を書く
          </Link>
          <div className="flex flex-col md:flex-row gap-4 flex-grow justify-end">
          </div>
        </div>
        {
          posts.length === 0 ? (
            <p className="text-center text-gray-600">該当する記事がありません。</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-200">
                    <Link href={`/${post.id}`} className="block group">
                      <div className="relative w-full h-48 bg-gray-200 group">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* ホバー時のオーバーレイ */}
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <p className="text-sm text-gray-500 mb-2">
                          {post.date && !isNaN(new Date(post.date).getTime()) ? new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(post.date)) : '日付不明'}
                        </p>
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 cursor-pointer mb-2 flex-grow">
                          {post.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {post.tags.split(',').filter(tag => tag.trim() !== '').map((tag, index) => (
                            <span key={index} className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <nav className="flex justify-center mt-10">
                  <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                      <Link
                        href={createPageLink(currentPage - 1)}
                        className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                      </Link>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index}>
                        <Link
                          href={createPageLink(index + 1)}
                          className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === index + 1 ? 'z-10 bg-indigo-50 border-indigo-300 text-indigo-600' : 'text-gray-500 bg-white'}`}
                        >
                          {index + 1}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={createPageLink(currentPage + 1)}
                        className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}                      >
                        <span className="sr-only">Next</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4"/>
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )
        }
      </div>
    </div>
  );
}