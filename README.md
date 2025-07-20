# nebusoku2025

## プロジェクト概要
「Lack of Sleepと寝不足にならNight 10」のイベントサイト

### 開催情報
- **イベント名**: Lack of Sleepと寝不足にならNight 10
- **主催**: Lack of Sleep
- **日程**: 9月29日(月)・30日(火)
- **時間**: 未定
- **会場**: LIVE HOUSE ANGA
- **料金**: 未定

## プロジェクト構成

```
nebusoku2025/
├── index.html          # メインHTMLファイル
├── css/
│   └── style.css       # メインスタイルシート
├── js/
│   └── animation.js    # アニメーション・インタラクション処理
├── fonts/
│   └── JF-Dot-K14.ttf  # カスタムフォント
└── README.md           # このファイル
```

## 技術仕様

### HTML
- セマンティックなマークアップ
- アクセシビリティ対応（ARIA属性、キーボードナビゲーション）
- レスポンシブ対応のメタタグ
- OGP設定

### CSS
- CSS Grid Layout（3カラム → 1カラム）
- CSS Custom Properties（変数）
- レスポンシブデザイン
- ダークテーマ
- アニメーション・トランジション
- プリント用スタイル

### JavaScript
- モジュラー設計
- Intersection Observer API
- パフォーマンス最適化
- エラーハンドリング
- アクセシビリティ機能

## レスポンシブデザイン

### ブレークポイント
- **デスクトップ**: 1200px以上（3カラムレイアウト）
- **タブレット**: 768px-1199px（1カラムレイアウト）
- **モバイル**: 767px以下（1カラムレイアウト）

### モバイル表示順序
1. ヘッダー
2. ヘッドライナー
3. プログラム
4. イベント統計
5. フッター

## 機能一覧

### アニメーション
- ページロード時のフェードイン
- スクロール連動アニメーション
- クリックリップルエフェクト
- 統計カウンターアニメーション

### インタラクション
- スムーズスクロール
- キーボードナビゲーション

### アクセシビリティ
- ARIA属性
- フォーカス管理
- キーボード操作対応
- スクリーンリーダー対応
- 色彩コントラスト配慮

## カスタマイズ

### 色彩設定
`style.css`の`:root`セレクター内のCSS変数で色彩を変更可能：

```css
:root {
    --bg-dark: #0d1117;
    --bg-medium: #161b22;
    --bg-light: #21262d;
    --accent-blue: #58a6ff;
    --accent-purple: #bc8cff;
    --accent-green: #7ee787;
    --accent-orange: #ffa657;
    --text-primary: #f0f6fc;
    --text-secondary: #8b949e;
}
```

### アニメーション設定
`animation.js`の`CONFIG`オブジェクトで調整可能：

```javascript
const CONFIG = {
    animations: {
        staggerDelay: 100, // ms
        duration: 300,     // ms
        easing: 'ease-out'
    },
    interactions: {
        hoverDelay: 50,
        clickEffect: true
    }
};
```

## ブラウザサポート
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## パフォーマンス最適化
- CSS Grid Layout使用
- `will-change`プロパティ活用
- Intersection Observer API
- 遅延読み込み対応
- メモリリーク防止
