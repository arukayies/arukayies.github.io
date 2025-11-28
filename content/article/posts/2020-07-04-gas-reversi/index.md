---
title: "【GASでゲーム作成】スプレッドシートがオセロ盤に！コピペで動く本格リバーシの作り方"
date: "2020-07-04T14:58:23.000Z"
description: "GASとスプレッドシートだけで、あのオセロ（リバーシ）が作れるって知ってましたか？本記事では、コピペOKの全ソースコードを公開し、ゲームの仕組みを丁寧に解説。onEditトリガーやPropertiesServiceなど、GASの重要テクニックを楽しく学びましょう。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "ゲーム作成", "オセロ", "リバーシ", "onEdit", "PropertiesService", "プログラミング学習"]
url: "/gas/gas-reversi"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年7月"]
lastmod: "2025-11-28T00:00:00+00:00"
---

「Google Apps Script (GAS) の勉強を始めたけど、何か面白いものを作ってみたい」
「身近なスプレッドシートで、プログラミングの楽しさを実感したい」

そんなあなたにピッタリなのが、**スプレッドシートを盤面にしたオセロ（リバーシ）ゲーム**の作成です。この記事では、プログラミング初心者の方でもコピペで実装できるよう、全ソースコードと詳しい解説を用意しました。

`onEdit`トリガーや`PropertiesService`を使った状態管理など、GAS開発における重要なテクニックを、ゲームを作りながら楽しく学んでいきましょう！

完成品のシートとコードは、以下のリンクから入手できます。すぐに遊びたい方はこちらからどうぞ。

{{< blog-card "https://docs.google.com/spreadsheets/d/1LJkfLs2C8yl325tf39PdPFykvceWJAdoOGzuYQDv12w/edit#gid=0" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}


## ゲームのセットアップと遊び方

### 1. スプレッドシートを自分のドライブにコピー

まず、上記のリンクからスプレッドシートにアクセスし、メニューの `ファイル` → `コピーを作成` を選択して、自分のGoogleドライブにコピーを保存してください。

{{< custom-figure src="スクリーンショット-2020-07-04-21.57.51.png" title="コピーを作成" Fit="1280x1280 webp q90" >}}

### 2. スクリプトの実行を承認（初回のみ）

シート内の「対戦開始」ボタンを初めてクリックすると、スクリプトの実行許可を求めるダイアログが表示されます。

- 「続行」をクリックし、自分のGoogleアカウントを選択します。
- 「このアプリはGoogleで確認されていません」という画面が出たら、「詳細」→「オセロ（安全ではないページ）に移動」をクリックして承認を進めてください。

承認後、再度「対戦開始」ボタンをクリックし、「対戦を開始します。先攻は黒です」と表示されれば準備完了です。

### 3. ゲームのルール

- **石の置き方**: 黒または白の石が置かれているセルを**コピー**し、置きたいマスに**貼り付け**ます。ルール上置ける場所であれば、相手の石が自動でひっくり返ります。
- **パス**: 石を置ける場所がない場合は、「パス」ボタンをクリックします。
- **勝敗**: 盤面が埋まるか、両者パスでゲーム終了。石の数が多い方の勝ちです。
- **エラー**: 順番が違う、ルール上置けない場所に石を置こうとするとエラーが表示されます。

{{< custom-figure src="スクリーンショット-2020-07-04-22.19.00.png" title="ゲームプレイ画面" Fit="1280x1280 webp q90" >}}

## GASコード徹底解説

それでは、このオセロゲームがどのようなコードで動いているのか、機能ごとに見ていきましょう。

### 1. 全体設定と定数

まず、スクリプト全体で使う変数や定数を定義します。

```javascript
// --- 定数定義 ---
const prop = PropertiesService.getScriptProperties(); // ゲームの状態を保存する領域
const ss = SpreadsheetApp.getActiveSpreadsheet();
const sh = ss.getActiveSheet();

// 石の画像（Google Drive上の公開画像を利用）
const STONE_BLACK = '=IMAGE("https://drive.google.com/uc?export=download&id=1UNMP2KZys7SkMXcef_PaFqFmTGzoAj-K")';
const STONE_WHITE = '=IMAGE("https://drive.google.com/uc?export=download&id=1LuNQiU5p4-4-h6RE5n7y6VBrvCZL2MmS")';

// 盤面管理用の内部的な値
const BLACK = "B";
const WHITE = "W";
const EMPTY = "C"; // 空白マス
const WALL = "Z";  // 盤外（番兵）

const OFFSET = 6; // シート上の盤面左上のオフセット（G7セル）

// 初期盤面データ (番兵を含む10x10)
const startField = [
  [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
  [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
  // ... (中略) ...
  [WALL, EMPTY, EMPTY, EMPTY, WHITE, BLACK, EMPTY, EMPTY, EMPTY, WALL],
  [WALL, EMPTY, EMPTY, EMPTY, BLACK, WHITE, EMPTY, EMPTY, EMPTY, WALL],
  // ... (中略) ...
  [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
  [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
];
```
- **`PropertiesService`**: GASでキーと値のペアを永続的に保存できる仕組みです。今回は「現在の盤面の状態」や「どちらのターンか」を保存するために使います。シートが閉じられても値が保持されるのが特徴です。
- **番兵（`WALL`）**: 盤の周囲を「壁」で囲むことで、石をひっくり返すロジックを書く際に、盤外かどうかを毎回チェックする手間を省くためのテクニックです。

### 2. ゲームの開始とリセット

「対戦開始」ボタンに割り当てられている関数です。

```javascript
// --- 盤面初期化 ---
function btn1_Click() {
  // 盤面クリア
  sh.getRange("G7:N14").clearContent();

  // プロパティ（ゲームの状態）を初期化
  prop.setProperty("FIELD", fieldToString(startField));
  prop.setProperty("TURN", BLACK);

  // 初期配置の4つの石を置く
  sh.getRange("K10").setValue(STONE_BLACK);
  sh.getRange("J11").setValue(STONE_BLACK);
  sh.getRange("J10").setValue(STONE_WHITE);
  sh.getRange("K11").setValue(STONE_WHITE);

  Browser.msgBox("対戦を開始します。先攻は黒です");
  setFont("V13", "黒の番です", "white", "black");
  countStone(startField);
}
```

### 3. メイン処理：セルが編集されたら動く`onEdit`トリガー

このゲームの中核となるのが、**`onEdit(e)`** という特別な名前の関数です。この関数は、ユーザーがシートのセルを編集（今回は石のコピペ）するたびに自動で実行されます。

```javascript
// --- セル編集時のメイン処理 ---
function onEdit(e) {
  if (!e) return; // スクリプトエディタからの直接実行を無視
  
  let turn = prop.getProperty("TURN");
  let y = e.range.getRow();    // 編集された行
  let x = e.range.getColumn(); // 編集された列

  // 編集されたのが盤面の範囲内かチェック
  if (y > OFFSET && y <= OFFSET + 8 && x > OFFSET && x <= OFFSET + 8) {
    let field = stringToField(prop.getProperty("FIELD")); // 現在の盤面を復元
    let fy = y - OFFSET; // 配列上のY座標
    let fx = x - OFFSET; // 配列上のX座標

    // 石が置けるか判定し、置けるなら盤面を更新
    if (playable(fy, fx, turn, field)) {
      // ターンを交代
      turn = (turn === BLACK) ? WHITE : BLACK;
      prop.setProperty("TURN", turn);
      // ... (UI更新処理) ...
    } else {
      // 置けない場合はエラー表示して、置こうとした石を消す
      setFont("V13", "エラーです", "red", "white");
      sh.getRange(y, x).clearContent();
      return;
    }

    // ... (石の数カウントとゲーム終了判定) ...
  }
}
```
イベントオブジェクト `e` から編集されたセルの情報を取得し、ゲームのルールに沿って処理を進めています。

### 4. オセロの核！石をひっくり返すロジック

`playable`関数が、オセロの最も重要なルール「相手の石を挟んでひっくり返す」処理を担っています。

```javascript
// --- 石が置けるか判定し、盤面を更新 ---
function playable(y, x, player, field) {
  if (field[y][x] !== EMPTY) return false; // 空白マスでなければ置けない

  let opponent = (player === BLACK) ? WHITE : BLACK;
  // 8方向（上、右上、右、...）をチェックするための差分
  let delta_y = [-1, -1, 0, 1, 1, 1, 0, -1];
  let delta_x = [0, 1, 1, 1, 0, -1, -1, -1];
  let flipped = false; // 1つでも石をひっくり返せたらtrueになるフラグ

  // 8方向をループでチェック
  for (let dir = 0; dir < 8; dir++) {
    let n = y + delta_y[dir];
    let m = x + delta_x[dir];
    let stonesToFlip = []; // その方向にひっくり返す候補の石

    // 1. 隣が相手の石でなければ、その方向は無効
    if (field[n][m] !== opponent) continue;

    // 2. 相手の石が続く限り、さらに先を探索
    while (field[n][m] === opponent) {
      stonesToFlip.push([n, m]);
      n += delta_y[dir];
      m += delta_x[dir];
    }

    // 3. 相手の石の先に自分の石があれば、挟んだ石をひっくり返す
    if (stonesToFlip.length > 0 && field[n][m] === player) {
      flipped = true;
      stonesToFlip.forEach(([fy, fx]) => {
        field[fy][fx] = player; // 配列上のデータを更新
        changeStone(fy, fx, player); // シート上の見た目を更新
      });
    }
  }

  // 1つでもひっくり返せたなら、最初に置いた石も有効化する
  if (flipped) {
    field[y][x] = player;
    changeStone(y, x, player);
    prop.setProperty("FIELD", fieldToString(field)); // 最新の盤面を保存
    return true;
  }
  return false; // どの方向にも返せなかったので、ここには置けない
}
```

### 5. 補助的な関数群

その他、盤面データを文字列に変換したり、石の数を数えたりといった補助的な関数です。

```javascript
// --- 盤面配列<->文字列の相互変換 ---
function fieldToString(array) { /* ... */ }
function stringToField(str) { /* ... */ }

// --- 指定座標の石の見た目を変更 ---
function changeStone(y, x, player) { /* ... */ }

// --- 石の数を数えて画面に反映 ---
function countStone(field) { /* ... */ }

// --- メッセージ表示部分の書式設定 ---
function setFont(cell, value, fontColor, background) { /* ... */ }
```

## まとめと次のステップ

いかがでしたか？Google Apps Scriptとスプレッドシートという身近なツールだけで、本格的なオセロゲームが作れることがお分かりいただけたかと思います。

このプロジェクトを通じて、以下のGASの重要な概念を学ぶことができます。
- **`onEdit`トリガー**: ユーザーのアクションをきっかけにスクリプトを動かす仕組み。
- **`PropertiesService`**: スクリプトの実行をまたいでデータを保持する方法。
- **二次元配列の操作**: ゲームの盤面のような格子状のデータを扱うテクニック。

このゲームをベースに、以下のような改造に挑戦してみるのも面白いでしょう。
- **CPU対戦機能**: 簡単な思考ルーチンを持つコンピュータ対戦相手を作る。
- **デザインの変更**: 石の画像や盤面の色を自分好みに変えてみる。
- **棋譜の保存**: プレイヤーが石を置いた履歴を別のシートに記録する。

ぜひ、今回のコードを応用して、自分だけのオリジナル作品作りに挑戦してみてください！

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
