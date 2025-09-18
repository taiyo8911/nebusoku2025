/**
 * Lack of Sleep イベントサイト - 軽量版
 */

document.addEventListener('DOMContentLoaded', function () {
    initAnimations();
    initImageModal();
});

/**
 * 基本アニメーション
 */
function initAnimations() {
    // ページロード時のフェードイン
    const elements = document.querySelectorAll('.main-header, .headliner-sidebar, .main-program, .info-sidebar');

    elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';

        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, i * 150);
    });

    // 統計カウンター
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll('.stat-number').forEach(stat => observer.observe(stat));
    }
}

/**
 * 数字カウンターアニメーション（整数値専用）
 */
function animateCounter(element) {
    const num = parseInt(element.textContent, 10);

    if (isNaN(num)) return;

    const start = performance.now();
    const duration = 1000;

    function update(time) {
        const progress = Math.min((time - start) / duration, 1);
        const current = num * (1 - Math.pow(1 - progress, 3)); // ease-out

        element.textContent = Math.floor(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = num; // 最終値を確実に設定
        }
    }

    requestAnimationFrame(update);
}

/**
 * 画像拡大モーダル機能
 */
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const bandLogos = document.querySelectorAll('.band-logo');

    // 各バンドロゴにクリックイベントを追加
    bandLogos.forEach(logo => {
        logo.addEventListener('click', function () {
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            modal.style.display = 'block';
        });
    });

    // モーダル背景をクリックして閉じる（画像以外の部分）
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // モーダル画像をクリックして閉じる
    modalImage.addEventListener('click', function () {
        modal.style.display = 'none';
    });
}