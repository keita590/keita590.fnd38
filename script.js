'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// 使う変数

let count = 0;          //正ショット数
let missShoot = 0;      //誤ショット数
let timeScore = 0;      //秒数カウント用変数
let countDown = 0;      //開始カウントダウン用変数
let lastScore = 0;      //最終スコア
let hardMaxScore = 0;   //ハードモード最大スコア
let normalMaxScore = 0; //ノーマルモード最大スコア
let PositionX = 0;      //的のX座標
let PositionY = 0;      //的のY座標
let scoreTimer;         //タイムスコア用のインターバルID
let countDownTimer;     //スタートカウントダウン用のインターバルID

function modeSelect(mode) {  //モード選択関数
    preparation();
    targetPosition(mode);
    gameStart(mode);
    console.log(mode + "を選択");
}


function preparation() {  //モード選択ボタンを隠す
    const button1 = document.getElementById("normalButton"); // ボタン要素を取得
    const button2 = document.getElementById("hardButton"); // ボタン要素を取得

    button1.style.visibility = "hidden";// ボタンを非表示
    button2.style.visibility = "hidden";// ボタンを非表示

}



function targetPosition(mode) {  //的の座標初期化
    const button = document.getElementById(mode + "Target");
    // 引数に応じた的の要素を取得

    const maxWidth = 550 - button.offsetWidth;  //的座標の最大幅
    const maxHeight = 550 - button.offsetHeight;  //的座標の最大高さ

    const minWidth = button.offsetWidth;  //的座標の最小幅
    const minHeight = button.offsetHeight;  //的座標の最小幅

    const randomX = Math.floor(Math.random() * maxWidth) + minWidth;
    const randomY = Math.floor(Math.random() * maxHeight) + minHeight;
    //randomを用いてX,Y座標のランダム化を実施

    button.style.left = randomX + "px";  //的の座標要素に代入
    button.style.top = randomY + "px";  //的の座標要素に代入

    PositionX = randomX;  //変数に格納
    PositionY = randomY;  //変数に格納
}


function targetShoot(mode) {  //的ボタンをクリックしたときの挙動
    count = count + 1;  //カウント追加

    const button = document.getElementById(mode + "Target"); //引数に応じた的要素の取得
    const text = document.getElementById("text");  //テキスト要素を取得

    button.style.visibility = "hidden";// ボタンを非表示

    targetPosition(mode);
    document.getElementById("count").textContent = "Shoot:" + count;  //countテキスト変更
    document.getElementById("randomNumber1").textContent = "X:" + PositionX;  //座標テキスト変更
    document.getElementById("randomNumber2").textContent = "Y:" + PositionY;

    button.style.visibility = "visible";// ボタンを再表示

    if (count === 10) {  //カウントが10になったら終了させる
        countStop();
        scoreCal(mode);
        maxScore(mode);
        button.style.visibility = "hidden";// ボタンを非表示
        text.textContent = "終了！！！";
        text.style.visibility = "visible";// テキストを表示
        console.log("finish");
    }
}


function misscount() {  //誤ショットのカウントとテキスト変更
    missShoot = missShoot + 1
    document.getElementById("misscount").textContent = "miss:" + missShoot;
}


function gameStart(mode) {  //ゲームスタートカウント
    countDown = 3;   // カウンタのリセット
    document.getElementById("text").textContent = "開始まで" + countDown;   // 表示更新
    countDownTimer = setInterval(gameStartCount, 1000, mode);   // 繰り返し(1s間隔)
}

function gameStartCount(mode) {  //カウントダウン用繰り返し関数
    countDown--;   // カウント
    const text = document.getElementById("text") //テキスト要素取得
    text.textContent = "開始まで" + countDown;  //表示更新

    if (countDown === 0) {  //カウントダウンが0になったら
        missShoot = 0;

        text.style.visibility = "hidden"// カウント非表示

        document.getElementById("count").textContent = "Shoot:" + count;
        document.getElementById("misscount").textContent = "miss:" + missShoot;
        document.getElementById("randomNumber1").textContent = "X:" + PositionX;
        document.getElementById("randomNumber2").textContent = "Y:" + PositionY;
        //表示をすべて初期化

        countStart(mode);  //的クリックタイム計測開始
        clearInterval(countDownTimer);  //カウントダウン繰り返し終了
    }
}


function countStart(mode) {  //タイム計測用関数
    timeScore = 0;   // カウンタのリセット
    const button = document.getElementById(mode + "Target");  // ボタン要素を取得
    button.style.visibility = "visible";  // ボタンを表示
    scoreTimer = setInterval(timeScoreCount, 100);  //繰り返し(0.1s間隔)
}

function timeScoreCount() {  //繰り返し用関数
    timeScore++;   // カウントアップ
    document.getElementById("PassageArea").textContent = "score:" + timeScore;   // 表示更新
}

function countStop() {  //タイム計測修了
    clearInterval(scoreTimer);   // 繰り返し終了
}


function scoreCal(mode) {  //スコア計算関数
    lastScore = 170 - timeScore - missShoot * 10;  //170からかかった時間と誤ショット*10を減算
    document.getElementById("lastResult").textContent = "前回スコア：" + lastScore + "(" + mode + ")";
}

function maxScore(mode) {  //modeごとに最大スコアを残してハイスコアコメントを表示
    if (mode === "normal") {
        if (lastScore > normalMaxScore) {
            normalMaxScore = lastScore;
            document.getElementById("normalMaxResult").textContent = "最大スコア(normal)：" + normalMaxScore;
            document.getElementById("comment").style.visibility = "visible"
        }
    } else if (mode === "hard") {
        if (lastScore > hardMaxScore) {
            hardMaxScore = lastScore;
            document.getElementById("hardMaxResult").textContent = "最大スコア(hard)：" + hardMaxScore;
            document.getElementById("comment").style.visibility = "visible"
        }
    }
}


function reset() {  //再度挑戦用のリセット関数　スコアはリセットしない
    count = 0;       //正ショット数
    missShoot = 0;   //ミスショット数
    timeScore = 0;   //タイムスコア
    countDown = 0;   //スタート前カウントダウン
    lastScore = 0;   //最終スコア
    PositionX = 0;   //的のX座標
    PositionY = 0;   //的のY座標
    clearInterval(scoreTimer);
    clearInterval(countDownTimer);

    document.getElementById("normalButton").style.visibility = "visible";// ボタンを表示
    document.getElementById("hardButton").style.visibility = "visible"; // ボタンを表示
    document.getElementById("normalTarget").style.visibility = "hidden"; // ボタンを非表示
    document.getElementById("hardTarget").style.visibility = "hidden"; // ボタンを非表示
    document.getElementById("text").style.visibility = "visible";  // テキストを表示
    document.getElementById("comment").style.visibility = "hidden" // テキストを非表示

    document.getElementById("randomNumber1").textContent = "X:" + PositionX;
    document.getElementById("randomNumber2").textContent = "Y:" + PositionY;
    document.getElementById("count").textContent = "Shoot:" + count;
    document.getElementById("misscount").textContent = "miss:" + missShoot;
    document.getElementById("PassageArea").textContent = "score:" + timeScore;
    document.getElementById("text").textContent = "難易度選択";
    //表示テキストの初期化

    console.log("reset")
}
