'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import TagFilter from '@/components/TagFilter';

import { Post, ITEMS_PER_PAGE } from '@/types';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const initialSearchQuery = searchParams.get('search') || '';

  // searchQuery は URL パラメータから初期化される
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // URLのsearchパラメータが変更されたらsearchQueryを更新
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearchQuery = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => post.tags.includes(tag));

      return matchesSearchQuery && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter(t => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedPosts = filteredPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

  if (loading) return <div className="text-center py-10">記事を読み込み中...</div>;
  if (error) return <div className="text-center py-10 text-red-500">エラー: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">ブログ</h1>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <Link href="/new-post" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            新しい記事を書く
          </Link>
          <div className="flex flex-col md:flex-row gap-4 flex-grow justify-end">
            {/* SearchBar は GlobalSearchBar に移動したため削除 */}
            <TagFilter tags={allTags} onTagClick={handleTagClick} selectedTags={selectedTags} />
          </div>
        </div>
        {
          filteredPosts.length === 0 ? (
            <p className="text-center text-gray-600">該当する記事がありません。</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                    <Link href={`/${post.id}`} className="block">
                      <div className="relative w-full h-48 bg-gray-200">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <p className="text-sm text-gray-500 mb-2">
                          {post.date && !isNaN(new Date(post.date).getTime()) ? new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(post.date)) : '日付不明'}
                        </p>
                        <h2 className="text-xl font-bold text-gray-900 hover:text-indigo-600 cursor-pointer mb-2 flex-grow">
                          {post.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                              {tag}
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
                        href={`/?page=${currentPage - 1}`}
                        className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
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
                          href={`/?page=${index + 1}`}
                          className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === index + 1 ? 'z-10 bg-indigo-50 border-indigo-300 text-indigo-600 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white dark:bg-gray-800'}`}
                        >
                          {index + 1}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={`/?page=${currentPage + 1}`}
                        className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                      >
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
