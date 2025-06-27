import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // UUIDを生成するためにuuidライブラリをインポート

// ファイルサイズ制限 (例: 5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// 許可するMIMEタイプ (画像のみ)
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json({ message: 'ファイルがアップロードされていません。' }, { status: 400 });
    }

    // 2. ファイルタイプの検証
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ message: '許可されていないファイル形式です。画像ファイル（JPEG, PNG, GIF, WEBP）のみアップロード可能です。' }, { status: 400 });
    }

    // 3. ファイルサイズの制限
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ message: `ファイルサイズが大きすぎます。${MAX_FILE_SIZE / (1024 * 1024)}MB以下のファイルをアップロードしてください。` }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 1. より堅牢なファイル名の生成 (UUID + オリジナルファイル名)
    const fileExtension = path.extname(file.name);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', uniqueFilename);

    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${uniqueFilename}`;
    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error('ファイルアップロード中にエラーが発生しました:', error);
    // 4. より詳細なエラーメッセージの返却
    return NextResponse.json({ message: 'ファイルのアップロードに失敗しました。' }, { status: 500 });
  }
}