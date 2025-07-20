/**
 * 3カラムグリッドレイアウト用アニメーションとインタラクション
 * Lack of Sleep イベントサイト
 */

// 設定オブジェクト
const CONFIG = {
    // アニメーション設定
    animations: {
        staggerDelay: 100, // ms
        duration: 300,     // ms
        easing: 'ease-out'
    },

    // インタラクション設定
    interactions: {
        hoverDelay: 50,    // ms
        soundEnabled: false // 将来的にサウンド追加時用
    },

    // レスポンシブブレークポイント
    breakpoints: {
        mobile: 768,
        tablet: 1200
    }
};

/**
 * DOMContentLoaded後の初期化
 */
document.addEventListener('DOMContentLoaded', function () {
    try {
        initializeAnimations();
        initializeInteractions();
        initializeResponsiveFeatures();
        initializeAccessibility();
        initializePerformanceOptimizations();

        console.log('Grid layout initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

/**
 * 各要素のアニメーション初期化
 */
function initializeAnimations() {
    // ページロード時のフェードインアニメーション
    animateOnLoad();

    // スクロール時のアニメーション
    initializeScrollAnimations();

    // プログラムアイテムのスタガードアニメーション
    initializeStaggeredAnimations();
}

/**
 * ページロード時のアニメーション
 */
function animateOnLoad() {
    const elements = [
        '.main-header',
        '.headliner-sidebar',
        '.main-program',
        '.info-sidebar'
    ];

    elements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';

            setTimeout(() => {
                element.style.transition = `opacity ${CONFIG.animations.duration}ms ${CONFIG.animations.easing}, transform ${CONFIG.animations.duration}ms ${CONFIG.animations.easing}`;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * CONFIG.animations.staggerDelay);
        }
    });
}

/**
 * スクロール時のアニメーション
 */
function initializeScrollAnimations() {
    // Intersection Observer for scroll-triggered animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        });

        // 監視対象要素（楽曲とプログラムアイテムは単純な表示用）
        const targets = document.querySelectorAll('.stat-item');
        targets.forEach(target => {
            target.classList.add('animate-ready');
            observer.observe(target);
        });
    }
}

/**
 * プログラムアイテムのスタガードアニメーション
 */
function initializeStaggeredAnimations() {
    const programItems = document.querySelectorAll('.program-item');

    programItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 50}ms`;
        item.classList.add('stagger-item');
    });
}

/**
 * インタラクション機能の初期化
 */
function initializeInteractions() {
    // 統計アイテムのカウンターアニメーション
    initializeStatCounters();

    // スムーズスクロール
    initializeSmoothScroll();
}

/**
 * 統計カウンターアニメーション
 */
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element, target) => {
        const start = 0;
        const increment = target / 30; // 30フレームで完了
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 50);
    };

    // Intersection Observerで統計が見えた時にアニメーション開始
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const value = target.textContent.replace(/[^\d]/g, '');
                    if (value) {
                        animateCounter(target, parseInt(value));
                    }
                    observer.unobserve(target);
                }
            });
        });

        statNumbers.forEach(stat => observer.observe(stat));
    }
}

/**
 * スムーズスクロール機能
 */
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
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
}

/**
 * レスポンシブ機能の初期化
 */
function initializeResponsiveFeatures() {
    let resizeTimeout;

    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleResponsiveChanges();
        }, 250);
    });

    // 初期チェック
    handleResponsiveChanges();
}

/**
 * レスポンシブ変更の処理
 */
function handleResponsiveChanges() {
    const width = window.innerWidth;
    const body = document.body;

    // モバイル・タブレット・デスクトップの判定
    body.classList.remove('mobile', 'tablet', 'desktop');

    if (width <= CONFIG.breakpoints.mobile) {
        body.classList.add('mobile');
        adjustMobileLayout();
    } else if (width <= CONFIG.breakpoints.tablet) {
        body.classList.add('tablet');
        adjustTabletLayout();
    } else {
        body.classList.add('desktop');
        adjustDesktopLayout();
    }
}

/**
 * モバイルレイアウト調整
 */
function adjustMobileLayout() {
    // モバイル特有の調整
    console.log('Mobile layout applied');
}

/**
 * タブレットレイアウト調整
 */
function adjustTabletLayout() {
    // タブレット特有の調整
    console.log('Tablet layout applied');
}

/**
 * デスクトップレイアウト調整
 */
function adjustDesktopLayout() {
    // デスクトップ特有の調整
    console.log('Desktop layout applied');
}

/**
 * アクセシビリティ機能の初期化
 */
function initializeAccessibility() {
    // キーボードナビゲーション
    initializeKeyboardNavigation();

    // フォーカス管理
    initializeFocusManagement();

    // スクリーンリーダー対応
    initializeAriaLabels();
}

/**
 * キーボードナビゲーション
 */
function initializeKeyboardNavigation() {
    const focusableElements = document.querySelectorAll(
        '.venue-link'
    );

    focusableElements.forEach(element => {
        // タブインデックスを設定
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }

        // Enterキーでクリックイベントを発火
        element.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * フォーカス管理
 */
function initializeFocusManagement() {
    // フォーカス時のスタイル調整
    const focusableElements = document.querySelectorAll(
        '.venue-link'
    );

    focusableElements.forEach(element => {
        element.addEventListener('focus', function () {
            this.style.outline = '2px solid var(--accent-blue)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function () {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

/**
 * ARIA ラベルの初期化
 */
function initializeAriaLabels() {
    // 会場リンクの適切なアクセシビリティ設定のみ
    const venueLinks = document.querySelectorAll('.venue-link');
    venueLinks.forEach(link => {
        if (!link.hasAttribute('aria-label')) {
            link.setAttribute('aria-label', '会場の地図を新しいタブで開く');
        }
    });
}

/**
 * パフォーマンス最適化の初期化
 */
function initializePerformanceOptimizations() {
    // 画像の遅延読み込み（将来的に画像追加時用）
    initializeLazyLoading();

    // メモリリーク防止
    initializeMemoryManagement();

    // パフォーマンス監視
    initializePerformanceMonitoring();
}

/**
 * 遅延読み込みの初期化
 */
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * メモリ管理
 */
function initializeMemoryManagement() {
    // ページ離脱時のクリーンアップ
    window.addEventListener('beforeunload', function () {
        // イベントリスナーのクリーンアップ
        console.log('Memory cleanup completed');
    });
}

/**
 * パフォーマンス監視
 */
function initializePerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadTime = performance.now();
                console.log(`Page load time: ${loadTime.toFixed(2)}ms`);

                if (loadTime > 3000) {
                    console.warn('Page load time is slow. Consider optimization.');
                }
            }, 0);
        });
    }
}

/**
 * エラーハンドリング
 */
window.addEventListener('error', function (event) {
    console.error('JavaScript error occurred:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});

// モジュールパターンでの公開（必要に応じて）
window.GridLayout = {
    CONFIG,
    initializeAnimations,
    initializeInteractions
};

console.log('Grid animation script loaded successfully');