'use client';

import Image from 'next/image';

export default function SaunaPage() {
  return (
    <div className="min-h-screen bg-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-stone-200">
        <h1 className="text-5xl font-extrabold text-center text-stone-800 mb-10 leading-tight">
          <span className="block text-amber-700">♨️ サウナとは？</span>
          <span className="block text-3xl font-semibold text-stone-600 mt-2">心と体を「ととのえる」究極の体験</span>
        </h1>

        {/* 導入セクション */}
        <section className="mb-12 text-center bg-amber-50 p-6 rounded-lg shadow-inner border border-amber-200">
          <p className="text-lg text-amber-800 leading-relaxed">
            サウナは単なる温浴施設ではありません。それは心身を深くリフレッシュし、究極のリラックス状態へと導く、古くからの知恵と現代の健康法が融合した文化です。
            ここでは、サウナの魅力と、その奥深い世界をご紹介します。
          </p>
          {/* サウナのイメージ画像 */}
          <div className="mt-8 relative w-full aspect-video mx-auto rounded-lg overflow-hidden shadow-md border-2 border-amber-300 group">
            <Image
              src="/images/sauna-intro.jpg" 
              alt="サウナの紹介"
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
          </div>
        </section>

        {/* 歴史セクション */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-stone-800 mb-6 border-b-4 border-amber-500 pb-2 flex items-center">
            <span className="text-amber-700 mr-2">📜</span> 歴史：サウナのルーツ
          </h2>
          <p className="text-stone-700 leading-relaxed mb-4">
            サウナの起源は古く、紀元前にはフィンランドでその原型が使われていたとされています。当初は住居の一部として、暖房や調理、そして出産や病気の治療の場としても利用されていました。
            厳しい冬を乗り越えるための知恵として発展し、やがて心身を清める神聖な場所へと変化していきました。
          </p>
          <ul className="list-disc list-inside text-stone-700 space-y-2 pl-4">
            <li><strong className="text-amber-700">紀元前</strong>: フィンランドで原始的なサウナが誕生。</li>
            <li><strong className="text-amber-700">中世</strong>: ヨーロッパ各地に広がり、公衆浴場としても利用される。</li>
            <li><strong className="text-amber-700">現代</strong>: 健康志向の高まりとともに、世界中で人気を博す。</li>
          </ul>
        </section>

        {/* 効果セクション */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-stone-800 mb-6 border-b-4 border-amber-500 pb-2 flex items-center">
            <span className="text-amber-700 mr-2">✨</span> 効果：心身にもたらす恩恵
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-amber-50 p-6 rounded-lg shadow-md border border-amber-200">
              <h3 className="text-xl font-semibold text-amber-700 mb-3">血行促進・疲労回復</h3>
              <p className="text-stone-800">高温環境で血管が拡張し、血流が促進されます。これにより、体内の老廃物が排出されやすくなり、筋肉の疲労回復を助けます。</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg shadow-md border border-amber-200">
              <h3 className="text-xl font-semibold text-amber-700 mb-3">ストレス軽減・リラックス</h3>
              <p className="text-stone-800">温熱効果と発汗により、心身の緊張がほぐれ、深いリラックス状態へと導かれます。自律神経のバランスを整える効果も期待できます。</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg shadow-md border border-amber-200">
              <h3 className="text-xl font-semibold text-amber-700 mb-3">美肌効果・デトックス</h3>
              <p className="text-stone-800">大量の発汗により毛穴の汚れが排出され、新陳代謝が活発になります。これにより、肌のターンオーバーが促進され、美肌効果が期待できます。</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg shadow-md border border-amber-200">
              <h3 className="text-xl font-semibold text-amber-700 mb-3">睡眠の質の向上</h3>
              <p className="text-stone-800">サウナ後のクールダウンとリラックス効果により、副交感神経が優位になり、質の高い睡眠へとつながります。</p>
            </div>
          </div>
        </section>

        {/* 入り方セクション */}
        <section className="mb-12 bg-blue-50 p-8 rounded-lg shadow-xl border border-blue-200">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b-4 border-blue-500 pb-2 flex items-center">
            <span className="text-blue-700 mr-2">💧</span> 入り方：「ととのう」への道
          </h2>
          <ol className="list-decimal list-inside text-blue-800 space-y-4 pl-4">
            <li>
              <strong className="text-blue-700">体を清める</strong>: サウナに入る前にシャワーを浴び、体を清潔にします。
            </li>
            <li>
              <strong className="text-blue-700">サウナ室</strong>: 8分〜12分程度、無理のない範囲で体を温めます。発汗を促し、心拍数が上がるのを感じましょう。
              <div className="relative w-full aspect-video mt-4 rounded-lg overflow-hidden shadow-md border-2 border-amber-300 group">
                <Image
                  src="/images/sauna-room.jpg" 
                  alt="サウナ室"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
              </div>
            </li>
            <li>
              <strong className="text-blue-700">水風呂</strong>: サウナ室を出たら、かけ湯で汗を流し、1分〜2分程度水風呂に入ります。冷たさに慣れると、心地よさに変わります。
              <div className="relative w-full aspect-video mt-4 rounded-lg overflow-hidden shadow-md border-2 border-blue-300 group">
                <Image
                  src="/images/water-bath.jpg" 
                  alt="水風呂"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
              </div>
            </li>
            <li>
              <strong className="text-blue-700">外気浴（休憩）</strong>: 水風呂から上がり、体を拭いて休憩します。椅子に座ったり、横になったりして、心身の感覚に集中しましょう。この時に「ととのう」感覚を味わうことができます。
              <div className="relative w-full aspect-video mt-4 rounded-lg overflow-hidden shadow-md border-2 border-green-300 group">
                <Image
                  src="/images/outdoor-air.jpg" 
                  alt="外気浴"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
              </div>
            </li>
            <li>
              <strong className="text-blue-700">繰り返す</strong>: 2〜3セット繰り返すことで、より深いリラックス効果が得られます。
            </li>
          </ol>
          <p className="text-sm text-stone-600 mt-6 text-center">
            ※体調に合わせて無理なく行いましょう。水分補給も忘れずに。
          </p>
        </section>

        {/* 種類セクション */}
        <section>
          <h2 className="text-3xl font-bold text-stone-800 mb-6 border-b-4 border-amber-500 pb-2 flex items-center">
            <span className="text-amber-700 mr-2">♨️</span> サウナの種類
          </h2>
          <p className="text-stone-700 leading-relaxed mb-4">
            サウナには様々な種類があり、それぞれ異なる体験を提供します。
          </p>
          <ul className="list-disc list-inside text-stone-700 space-y-2 pl-4">
            <li><strong className="text-amber-700">ドライサウナ</strong>: 最も一般的で、高温低湿。</li>
            <li><strong className="text-amber-700">ロウリュサウナ</strong>: 熱した石に水をかけ、蒸気を発生させることで湿度を上げる。</li>
            <li><strong className="text-amber-700">スチームサウナ</strong>: 低温高湿で、ミスト状の蒸気が特徴。</li>
            <li><strong className="text-amber-700">フィンランド式サウナ</strong>: 本場フィンランドの伝統的なサウナ。</li>
          </ul>
        </section>

      </div>
    </div>
  );
}