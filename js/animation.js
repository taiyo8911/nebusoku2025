// 描画設定をオブジェクトとして定義
const drawSettings = {
    fontSize: 30,
    color: "white",
    count: 5, // 描画する文字の数
    height: 50,
    fontFamily: "Arial",
    fontWeight: "bold",
    spacing: 50, // 各文字の間隔
    speed: 2 // スライド速度
};

// キャンバスの初期化と描画関数
function drawSlidingChars(settings) {
    const canvases = document.querySelectorAll("canvas"); // すべてのキャンバスを取得

    canvases.forEach((canvas) => {
        const text = canvas.getAttribute("data-char"); // data-char属性から文字を取得
        const {
            fontSize,
            color,
            count,
            height,
            fontFamily,
            fontWeight,
            spacing,
            speed
        } = settings;

        // キャンバスの幅を設定（文字のセットが途切れないように十分な幅を設定）
        // 画面幅が大きい場合は、countの数を増やすことで文字のセットを増やす
        canvas.width = (count + 1) * spacing;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        // 描画スタイルを設定
        ctx.fillStyle = color;
        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

        let offset = 0; // アニメーションの開始位置

        // アニメーションを描画する関数
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア

            // 2セットの文字を描画して途切れないようにする
            for (let j = 0; j < 2; j++) {
                // 2セットを描画
                for (let i = 0; i < count; i++) {
                    const x = i * spacing + offset - j * count * spacing; // 文字のセットが連続するように配置
                    const y = (canvas.height + fontSize) / 2 - 5; // y座標を中央に配置
                    ctx.fillText(text, x, y); // 文字を描画
                }
            }

            offset += speed; // スライド速度に応じて位置を更新

            // 位置が1セット分移動したらリセット
            if (offset >= count * spacing) {
                offset = 0;
            }

            // 再度アニメーションを呼び出す
            requestAnimationFrame(animate);
        }

        // アニメーションを開始
        animate();
    });
}

// 描画関数の実行
drawSlidingChars(drawSettings);
