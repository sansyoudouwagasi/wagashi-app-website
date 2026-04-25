document.addEventListener('DOMContentLoaded', () => {
    // スクロール時に要素をフェードインさせるIntersection Observerの設定
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 要素が画面に入ったら'appear'クラスを付与
                entry.target.classList.add('appear');
                
                // 一度表示されたら監視を解除（必要に応じて）
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を取得して監視を開始
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // スムーズスクロール (アンカーリンク)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // ナビゲーションバーの高さを考慮してスクロール
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // --- スマホモックアップ スライドショー制御 ---
    // 時間・バッテリー等の上部、下部ナビなどをCSSでフレーム外に隠しつつ、画像を一定間隔でフェードさせます。
    window.addEventListener('load', () => {
        const slides = document.querySelectorAll('.app-slideshow-body .slide');
        if (slides.length > 0) {
            let current = 0;
            setInterval(() => {
                slides[current].classList.remove('active');
                current = (current + 1) % slides.length;
                slides[current].classList.add('active');
            }, 3500); // 3.5秒ごとに画像を切り替え
        }
    });
});
