document.addEventListener('DOMContentLoaded', () => {
  // アニメーションを適用したい要素をすべて取得
  const features = document.querySelectorAll('.feature');

  // 要素が画面に入ったかどうかを監視するオブザーバーを作成
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // isIntersectingプロパティがtrueなら、要素が画面内に入ったことを意味する
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // .visibleクラスを追加して表示
        observer.unobserve(entry.target); // 一度表示したら監視を停止
      }
    });
  }, { threshold: 0.1 }); // 要素が10%見えたら実行

  // 各要素の監視を開始
  features.forEach(feature => {
    observer.observe(feature);
  });
});