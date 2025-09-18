/**
 * ページのアニメーション効果と画像モーダル機能を管理するJavaScriptファイル
 */

// ページが完全に読み込まれた後に初期化処理を実行
document.addEventListener('DOMContentLoaded', function () {
    initAnimations();
    initImageModal();
    initSimpleSlideshow();
});

/**
 * シンプルスライドショー
 */
function initSimpleSlideshow() {
    const images = document.querySelectorAll('.header-image');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelector('.slides');

    if (!images.length) return;

    let current = 0;
    let startX = 0;

    // スライド表示
    function showSlide(n) {
        images[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (n + images.length) % images.length;
        images[current].classList.add('active');
        dots[current].classList.add('active');
    }

    // ドット クリック
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });

    // タッチ開始
    slides.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    // タッチ終了
    slides.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            showSlide(current + (diff > 0 ? 1 : -1));
        }
    }, { passive: true });

    // マウス操作
    slides.addEventListener('mousedown', e => {
        startX = e.clientX;
        const handleMouseUp = e2 => {
            const diff = startX - e2.clientX;
            if (Math.abs(diff) > 50) {
                showSlide(current + (diff > 0 ? 1 : -1));
            }
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mouseup', handleMouseUp);
    });
}

/**
 * 基本アニメーション機能の初期化
 * ページロード時のフェードイン効果と統計カウンターアニメーションを設定
 */
function initAnimations() {
    // ===== ページロード時のフェードインアニメーション =====

    // アニメーション対象の要素を取得（メインセクション）
    const elements = document.querySelectorAll('.main-header, .headliner-sidebar, .main-program, .info-sidebar');

    // 各要素に対して順次フェードイン効果を適用
    elements.forEach((el, i) => {
        // 初期状態：透明で少し下にずらす
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';

        // 150ms間隔で順次アニメーション開始
        setTimeout(() => {
            // CSS transitionを設定してスムーズな変化を実現
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            // 最終状態：不透明で元の位置に戻す
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, i * 150); // 要素のインデックス × 150msで遅延実行
    });

    // ===== 統計カウンターのスクロール連動アニメーション =====

    // Intersection Observer APIが利用可能かチェック
    if ('IntersectionObserver' in window) {
        // 要素が画面に入った時の処理を定義
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // 要素が画面に入ったら
                if (entry.isIntersecting) {
                    animateCounter(entry.target);    // カウンターアニメーション実行
                    observer.unobserve(entry.target); // 一度実行したら監視を停止
                }
            });
        });

        // 統計数値の要素を全て監視対象に追加
        document.querySelectorAll('.stat-number').forEach(stat => observer.observe(stat));
    }
}

/**
 * 数字カウンターアニメーション（整数値専用）
 * 統計数値を0から目標値まで滑らかにカウントアップする
 *
 * @param {HTMLElement} element - アニメーション対象の数値要素
 */
function animateCounter(element) {
    // 要素のテキストから目標数値を取得
    const num = parseInt(element.textContent, 10);

    // 数値でない場合は処理を中断
    if (isNaN(num)) return;

    // アニメーション開始時刻を記録
    const start = performance.now();

    // アニメーション時間（1秒）
    const duration = 1000;

    /**
     * アニメーションフレーム更新関数
     * requestAnimationFrameで呼び出され、数値を段階的に更新
     *
     * @param {number} time - 現在時刻（performance.now()）
     */
    function update(time) {
        // アニメーション進行率を計算（0から1の範囲）
        const progress = Math.min((time - start) / duration, 1);

        // ease-out効果を適用した現在値を計算
        // 1 - Math.pow(1 - progress, 3) でゆっくり止まる効果
        const current = num * (1 - Math.pow(1 - progress, 3));

        // 計算された値を整数で表示
        element.textContent = Math.floor(current);

        // アニメーションが完了していない場合
        if (progress < 1) {
            // 次のフレームで再度update関数を呼び出し
            requestAnimationFrame(update);
        } else {
            // アニメーション完了時：最終値を確実に設定
            element.textContent = num;
        }
    }

    // アニメーション開始
    requestAnimationFrame(update);
}

/**
 * 画像拡大モーダル機能の初期化
 * バンドロゴをクリックして拡大表示する機能を設定
 */
function initImageModal() {
    // ===== モーダル要素の取得 =====
    const modal = document.getElementById('imageModal');        // モーダル背景
    const modalImage = document.getElementById('modalImage');   // モーダル内の拡大画像
    const bandLogos = document.querySelectorAll('.band-logo');  // 全てのバンドロゴ

    // ===== バンドロゴクリック時の処理 =====
    // 各バンドロゴにクリックイベントリスナーを追加
    bandLogos.forEach(logo => {
        logo.addEventListener('click', function () {
            // クリックされたロゴの画像をモーダルに設定
            modalImage.src = this.src;   // 画像URLをコピー
            modalImage.alt = this.alt;   // alt属性をコピー（アクセシビリティ）

            // モーダルを表示
            modal.style.display = 'block';
        });
    });

    // ===== モーダル背景クリック時の処理 =====
    // モーダル背景（画像以外の部分）をクリックして閉じる
    modal.addEventListener('click', function (e) {
        // クリックされた要素がモーダル背景自体の場合のみ閉じる
        // （画像をクリックした場合は閉じない）
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // ===== モーダル画像クリック時の処理 =====
    // 拡大画像自体をクリックして閉じる
    modalImage.addEventListener('click', function () {
        modal.style.display = 'none';
    });
}