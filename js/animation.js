/**
 * Lack of Sleep イベントサイト - 軽量版
 */

document.addEventListener('DOMContentLoaded', function () {
    initAnimations();
    initInteractions();
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
 * 数字カウンターアニメーション
 */
function animateCounter(element) {
    const text = element.textContent;
    const num = parseFloat(text.replace(/[^\d.]/g, ''));

    if (isNaN(num)) return;

    const start = performance.now();
    const duration = 1000;

    function update(time) {
        const progress = Math.min((time - start) / duration, 1);
        const current = num * (1 - Math.pow(1 - progress, 3)); // ease-out

        if (text.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else if (text.includes('.')) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = text;
        }
    }

    requestAnimationFrame(update);
}

/**
 * インタラクション
 */
function initInteractions() {
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 会場リンクのキーボード対応
    document.querySelectorAll('.venue-link').forEach(link => {
        link.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });
}