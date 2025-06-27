import Link from 'next/link';

export default function SaunaPage() {
  return (
    <>
      <header>
        <nav>
          <Link href="/" className="logo">サウナブログ</Link>
          <ul>
            <li><Link href="/">ホーム</Link></li>
            <li><Link href="/sauna">サウナとは</Link></li>
            <li><a href="#">アクセス</a></li>
          </ul>
        </nav>
        <div className="header-bg-symbol">♨</div>
        <div className="hero-content">
          <h1>サウナとは？</h1>
          <p>その歴史と効果、楽しみ方</p>
        </div>
      </header>

      <main className="content-section" role="main">
        <h2>サウナの基本</h2>
        <p>サウナは、高温の部屋で体を温め、発汗を促す温浴方法です。フィンランドが発祥とされ、古くから健康維持やリフレッシュのために親しまれてきました。</p>
        <p>主な効果としては、血行促進、疲労回復、ストレス軽減、美肌効果などが挙げられます。適切な入り方をすることで、心身ともに「ととのう」感覚を味わうことができます。</p>
      </main>

      <footer>
        <p>📞 Contact | 🐦 <a href="#">Twitter</a> | 📸 <a href="#">Instagram</a></p>
      </footer>
    </>
  );
}
