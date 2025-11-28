---
title: "【GAS高速化】getFontLines()で複数セルのフォント装飾を一括取得！API呼び出しを最適化"
description: "GASで複数セルの下線や取り消し線をチェックする際に、forループでAPIを何度も呼び出していませんか？getFontLines()を使えば、たった1回のAPI呼び出しで全ての情報を二次元配列として一括取得できます。スクリプトを高速化する必須テクニックを解説します。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getFontLines", "高速化", "パフォーマンス", "一括取得", "API"]
date: "2020-06-28T18:19:16.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfontlines"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
---

Google Apps Script (GAS) でスプレッドシートの書式を扱う際、スクリプトの実行速度が遅くなる主な原因の一つが、**APIの過剰な呼び出し**です。特に、ループ処理の中でセル一つひとつの情報を取得するコードは、パフォーマンスを著しく低下させます。

この問題を解決し、スクリプトを劇的に高速化するのが**`getFontLines()`**メソッドです。

この記事では、`getFontLine()`（単数形）をループで使うことの非効率性を解説し、`getFontLines()`による一括取得がいかに重要かを、具体的なコードと共に徹底解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## なぜ一括取得（`getFontLines()`）が必須なのか？

例えば、100個のセルの文字装飾（下線・取り消し線）をチェックする場合を考えてみましょう。

```javascript
// 【非推奨】APIを100回呼び出すため非常に遅いコード
function slowCheck() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:A100");
  for (let i = 1; i <= 100; i++) {
    // ループのたびにAPI呼び出しが発生
    const fontLine = range.getCell(i, 1).getFontLine();
    if (fontLine === 'line-through') {
      // 何らかの処理
    }
  }
}

// 【推奨】API呼び出しは1回のみ。高速なコード
function fastCheck() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:A100");
  // ここでAPI呼び出しは1回だけ！
  const fontLines = range.getFontLines();
  
  // 取得済みの配列データをメモリ上で高速に処理
  fontLines.forEach((row, index) => {
    if (row[0] === 'line-through') {
      // 何らかの処理
    }
  });
}
```
`slowCheck`関数では、100回のネットワーク通信が発生し、実行に多くの時間がかかります。一方、`fastCheck`関数は、**たった1回の通信**で全ての情報を取得し、その後の処理は高速なメモリ上で行うため、実行時間は比較にならないほど短くなります。

## `getFontLines()` の使い方と戻り値

`getFontLines()`は、指定した範囲の各セルのフォント装飾情報を**二次元配列 (`String[][]`)** として返します。

### 戻り値の構造

返される配列の各要素には、以下の3種類の文字列のいずれかが含まれます。

-   `'underline'` (下線)
-   `'line-through'` (取り消し線)
-   `'none'` (装飾なし)

例えば、`A1:B2`の範囲で、A1に下線、B2に取り消し線が設定されている場合、戻り値は以下のようになります。

```json
[
  ["underline", "none"],
  ["none", "line-through"]
]
```

## 実践的コード例：完了タスクにタイムスタンプを自動入力

`getFontLines()` を使った実用的な例として、タスクリストで取り消し線が引かれた項目（完了タスク）の隣のセルに、完了日時を自動で追記するスクリプトを紹介します。

```javascript
/**
 * B列のタスクに取り消し線が引かれたら、C列に完了日時を自動入力する
 */
function recordCompletionTimestamp() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('タスクリスト');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const taskRange = sheet.getRange(`B2:B${lastRow}`);
  const statusRange = sheet.getRange(`C2:C${lastRow}`);
  
  // フォント装飾と、書き込み先のセルの値を両方一括取得
  const fontLines = taskRange.getFontLines();
  const timestamps = statusRange.getValues();

  let isChanged = false;
  
  fontLines.forEach((row, r) => {
    // 取り消し線が引かれていて、かつタイムスタンプが未入力の場合
    if (row[0] === 'line-through' && timestamps[r][0] === '') {
      timestamps[r][0] = new Date(); // 現在時刻をセット
      isChanged = true;
    }
  });
  
  // 変更があった場合のみ、一括で書き込む
  if (isChanged) {
    statusRange.setValues(timestamps);
  }
}
```
このコードのポイントは、読み込み（`getFontLines`, `getValues`）と書き込み（`setValues`）の両方を一括で行っている点です。これにより、スクリプト全体のパフォーマンスを最大限に高めています。

## まとめ

GASのパフォーマンスを考える上で、**「API呼び出し回数をいかに減らすか」**は最も重要な原則です。`getFontLines()`は、まさにその原則を体現したメソッドです。

-   複数セルの書式を扱う際は、必ず`getFontLines()`のような一括取得メソッドを使う。
-   取得したデータは二次元配列として変数に格納し、メモリ上で効率的に処理する。
-   書き込みも`setValues()`や`setBackgrounds()`などを使い、一括で行う。

この「一括処理」の考え方は、`getValues()`, `getBackgrounds()`, `getFontFamilies()`など、他の多くのメソッドにも共通します。高速で安定したGASを開発するために、必ずマスターしておきましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontlines" >}}
