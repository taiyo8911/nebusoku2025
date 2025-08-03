/**
 * Lack of Sleep イベントサイト - 簡略化版
 * 必要最小限の機能のみ実装
 */

document.addEventListener('DOMContentLoaded', function () {
    initializeBasicAnimations();
    initializeInteractions();
    console.log('イベントサイト初期化完了');
});

/**
 * 基本的なアニメーション
 */
function initializeBasicAnimations() {
    // ページロード時のフェードイン
    const mainElements = [
        '.main-header',
        '.headliner-sidebar',
        '.main-program',
        '.info-sidebar'
    ];

    mainElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';

            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });

    // 統計カウンターアニメーション
    initializeStatCounters();
}

/**
 * 統計カウンター（簡略版）
 */
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = element.textContent;

                    // 数字のみ抽出
                    const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));

                    if (!isNaN(numericValue)) {
                        animateNumber(element, numericValue, finalValue);
                    }

                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }
}

/**
 * 数字アニメーション（簡略版）
 */
function animateNumber(element, targetNumber, originalText) {
    const duration = 1000; // 1秒
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // イージング関数（ease-out）
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = targetNumber * easedProgress;

        // 元のテキスト形式を保持
        if (originalText.includes('+')) {
            element.textContent = Math.floor(currentValue) + '+';
        } else if (originalText.includes('.')) {
            element.textContent = currentValue.toFixed(1);
        } else {
            element.textContent = Math.floor(currentValue);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = originalText; // 最終値を正確に設定
        }
    }

    requestAnimationFrame(update);
}

/**
 * インタラクション機能
 */
function initializeInteractions() {
    // スムーズスクロール
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // キーボードアクセシビリティ（会場リンクのみ）
    const venueLinks = document.querySelectorAll('.venue-link');
    venueLinks.forEach(link => {
        link.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// エラーハンドリング（最小限）
window.addEventListener('error', function (e) {
    console.error('エラーが発生しました:', e.message);
});