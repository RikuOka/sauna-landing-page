# サウナブログ (Sauna Blog)

## プロジェクト概要

このプロジェクトは、サウナに関するブログ記事を管理・表示するためのNext.jsアプリケーションです。ユーザーは記事の閲覧、編集、そして新しい記事の作成が可能です。データ管理にはPrismaを使用しています。

## 主な機能

-   **ブログ記事一覧**: ホームページでサウナに関する記事を一覧表示します。
-   **記事詳細表示**: 各記事のタイトルをクリックすると、詳細ページで内容を閲覧できます。
-   **記事の編集**: 既存の記事を編集できます。
-   **新しい記事の作成**: 専用のページから、新しいサウナ記事を投稿できます。
-   **記事のホバーエフェクト**: 記事一覧で記事にマウスを重ねると、画像部分が白くオーバーレイ表示されます。
-   **レスポンシブデザイン**: 様々なデバイスサイズに対応した表示。
-   **「サウナとは」ページの画像改善**: ページ内の画像を見やすく、統一感のあるものに改善しました。

## 使用技術

-   **Next.js**: Reactフレームワーク (v14.2.3)
-   **React**: UIライブラリ
-   **TypeScript**: 型安全なJavaScript
-   **Tailwind CSS**: 高速なUI開発のためのユーティリティファーストCSSフレームワーク
-   **Framer Motion**: アニメーションライブラリ
-   **Prisma**: データベースORM

## 開発環境のセットアップ

以下の手順でローカル環境にプロジェクトをセットアップし、実行できます。

### 前提条件

-   Node.js (v18以上を推奨)
-   npm または Yarn

### インストール

1.  リポジトリをクローンします。
    ```bash
    git clone https://github.com/RikuOka/sauna-landing-page.git
    cd sauna-landing-page
    ```
2.  依存関係をインストールします。
    ```bash
    npm install
    # または
    yarn install
    ```

### 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

ブラウザで `http://localhost:3000` にアクセスすると、アプリケーションが表示されます。

## アプリケーションの使い方

-   **記事の閲覧**: ホームページに表示されている記事をクリックして詳細を閲覧します。
-   **記事の編集**: 記事詳細ページから「編集」ボタンをクリックし、フォームを送信することで記事を更新できます。
-   **新しい記事の作成**: ナビゲーションバーの「新規作成」リンクをクリックし、フォームに必要事項を入力して記事を投稿します。

## プロジェクト構造 (主要なファイル/ディレクトリ)

```
.next/              # Next.js ビルド出力
data/
└── posts.json      # (旧)ブログ記事データ - 現在はPrismaを使用
prisma/
├── dev.db          # SQLite データベースファイル
└── schema.prisma   # Prisma スキーマ定義
public/             # 静的ファイル (画像など)
src/
├── app/
│   ├── [id]/
│   │   └── page.tsx    # 記事詳細ページ
│   ├── api/
│   │   ├── posts/
│   │   │   └── route.ts  # 記事データAPI (取得/作成/更新)
│   │   └── upload/
│   │       └── route.ts  # 画像アップロードAPI
│   ├── edit-post/
│   │   └── [id]/
│   │       └── page.tsx    # 記事編集ページ
│   ├── new-post/
│   │   └── page.tsx    # 新規記事作成ページ
│   ├── sauna/
│   │   └── page.tsx    # 「サウナとは」ページ
│   ├── globals.css     # グローバルCSS
│   ├── layout.tsx      # ルートレイアウト (ナビゲーションバーなど)
│   └── page.tsx        # ホームページ (ブログ記事一覧)
├── components/     # 再利用可能なUIコンポーネント
│   ├── FadeInOnScroll.tsx
│   ├── PostForm.tsx
│   └── ...
└── types/
    └── index.ts      # 共通の型定義
.eslintrc.json
.gitignore
next.config.mjs
package.json
postcss.config.mjs
tailwind.config.ts
tsconfig.json
```

## 今後の展望 (Future Enhancements)

-   記事の削除機能
-   ユーザー認証・管理システム
-   コメント機能
-   画像アップロード機能の強化
-   SEO対策の強化
-   **キーワード検索機能**: 現在は一時的に無効化されていますが、今後の実装を予定しています。
-   **タグ検索機能**: 現在は一時的に無効化されていますが、今後の実装を予定しています。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 連絡先

-   RikuOka - [GitHub Profile](https://github.com/RikuOka)

