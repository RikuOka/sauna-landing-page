'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PostFormProps {
  initialData?: {
    title: string;
    content: string;
    date: string;
    tags: string[];
    thumbnail: string;
  };
  onSubmit: (data: { title: string; content: string; date: string; tags: string; thumbnail: string }) => void;
  buttonText: string;
}

export const PostForm: React.FC<PostFormProps> = ({ initialData, onSubmit, buttonText }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [tags, setTags] = useState(Array.isArray(initialData?.tags) ? initialData.tags.join(', ') : initialData?.tags || '');
  const [thumbnail, setThumbnail] = useState<File | string>(initialData?.thumbnail || '');
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(initialData?.thumbnail || null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setDate(initialData.date);
      setTags(initialData.tags.join(', '));
      setThumbnail(initialData.thumbnail);
      setThumbnailPreview(initialData.thumbnail);
    }
  }, [initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalThumbnail = thumbnail;
    if (thumbnail instanceof File) {
      const formData = new FormData();
      formData.append('file', thumbnail);

      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const data = await uploadRes.json();
          finalThumbnail = data.imageUrl;
        } else {
          alert('画像のアップロードに失敗しました。');
          return; // アップロード失敗時は処理を中断
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('画像のアップロード中にエラーが発生しました。');
        return; // アップロード失敗時は処理を中断
      }
    }

    onSubmit({ title, content, date, tags, thumbnail: finalThumbnail as string });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="title" className="sr-only">タイトル</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content" className="sr-only">内容</label>
          <textarea
            id="content"
            name="content"
            required
            rows={10}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="記事の内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date" className="sr-only">日付</label>
          <input
            id="date"
            name="date"
            type="date"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tags" className="sr-only">タグ (カンマ区切り)</label>
          <input
            id="tags"
            name="tags"
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="タグ (例: サウナ, 水風呂, ととのい)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="thumbnail-upload" className="block text-sm font-medium text-gray-700 mt-4">サムネイル画像</label>
          <input
            id="thumbnail-upload"
            name="thumbnail-upload"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            onChange={handleFileChange}
          />
          {thumbnailPreview && (
            <div className="mt-4 w-32 h-32 relative rounded-md overflow-hidden border border-gray-300">
              <Image src={thumbnailPreview} alt="Thumbnail Preview" fill style={{ objectFit: 'cover' }} />
            </div>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};