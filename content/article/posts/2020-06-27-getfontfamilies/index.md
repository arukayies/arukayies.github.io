---
title: "【GAS高速化】getFontFamilies()でAPI呼び出しを1回に！スプレッドシートのフォント取得が遅い問題を解決"
description: "GASでforループを使ってセルのフォントを一つずつ取得していませんか？処理が遅くなるその実装はもうやめましょう。getFontFamilies()を使えば、大量のセルのフォント情報をたった1回のAPI呼び出しで一括取得可能。スクリプトを劇的に高速化する実践的な方法を解説します。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "高速化", "パフォーマンス改善", "getFontFamilies", "GAS 遅い", "API"]
date: "2020-06-26T15:24:49.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfontfamilies"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
---

Google Apps Script (GAS) を使ってスプレッドシートのセル書式を操作する際、特に大量のセルのフォント情報を取得しようとして、処理が異常に遅くなったり、タイムアウトエラーが発生したりした経験はありませんか？

その問題、原因は**APIの呼び出し回数**にあります。

この記事では、`getFontFamily()` (単数形) をループで呼び出すアンチパターンを卒業し、**`getFontFamilies()`** を使ってフォント情報を一括取得することで、スクリプトを劇的に高速化する必須テクニックを解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## なぜ`getFontFamily()`のループはNGなのか？

複数セルのフォントを取得する際、`for`ループの中で`getFontFamily()`をセルごとに呼び出すのは、パフォーマンスを著しく低下させる最も典型的な実装です。

```javascript
// 【非推奨】1000回のAPI呼び出しが発生する遅いコード
function slowFontCheck() {
  const range = SpreadsheetApp.getActiveSheet().getRange("A1:E200"); // 1000セル
  const fonts = [];
  for (let r = 1; r <= 200; r++) {
    for (let c = 1; c <= 5; c++) {
      // ループのたびにAPIを呼び出すため、極端に遅くなる
      const font = range.getCell(r, c).getFontFamily();
      fonts.push(font);
    }
  }
}
```

上記のコードでは、1000個のセルに対して1000回のAPI呼び出しが発生します。API呼び出しはネットワーク越しの通信であるため、非常に時間がかかります。これが「GASが遅い」と感じる主な原因です。

## 解決策: `getFontFamilies()`でAPI呼び出しを1回に集約

このパフォーマンス問題を解決する正しいアプローチが、`getFontFamilies()`を使った一括取得です。

```javascript
// 【推奨】API呼び出しはたった1回！劇的に速いコード
function fastFontCheck() {
  const range = SpreadsheetApp.getActiveSheet().getRange("A1:E200");
  // API呼び出しはここでの1回だけ！
  const fontFamilies = range.getFontFamilies();
  
  // 取得した二次元配列を後から自由に処理できる
  console.log(fontFamilies); 
}
```
`getFontFamilies()`は、指定した範囲のすべてのフォント情報を**たった1回のAPI呼び出し**で取得し、二次元配列として返します。これにより、スクリプトの実行時間は劇的に短縮されます。

## `getFontFamilies()`の基本的な使い方

`getFontFamilies()`が返すのは、範囲の行と列に対応した**二次元配列 (`String[][]`)** です。この配列をループで処理することで、各セルのフォント情報にアクセスします。

```javascript
function fetchAllFonts() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:B3");
  const fontMatrix = range.getFontFamilies();

  // 取得した二次元配列をループで処理
  fontMatrix.forEach((row, rowIndex) => {
    row.forEach((font, colIndex) => {
      const cellAddress = range.getCell(rowIndex + 1, colIndex + 1).getA1Notation();
      console.log(`セル ${cellAddress} のフォントは「${font}」です。`);
    });
  });
}
```

## 実践！`getFontFamilies()`活用シナリオ

取得したフォント情報の配列は、他のデータと組み合わせることで、より高度で実用的な自動化処理に応用できます。

### シナリオ1: スタイルガイド違反のフォントを検出する

企業のスタイルガイドで許可されたフォント以外が使われているセルを特定し、背景色を変えて警告するスクリプトです。

```javascript
function auditFontCompliance() {
  const ALLOWED_FONTS = ['Arial', 'メイリオ', 'Times New Roman']; // 許可フォントのリスト
  
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();

  // フォントと背景色をそれぞれ一括取得
  const fonts = range.getFontFamilies();
  const backgrounds = range.getBackgrounds();

  fonts.forEach((row, r) => {
    row.forEach((font, c) => {
      // 許可リストに含まれていないフォントかチェック
      if (!ALLOWED_FONTS.includes(font)) {
        backgrounds[r][c] = '#f4cccc'; // 背景を薄い赤に変更
      }
    });
  });

  // 変更した背景色の配列をまとめて一括書き込み
  range.setBackgrounds(backgrounds);
}
```
このコードのポイントは、読み込み（`getFontFamilies`, `getBackgrounds`）だけでなく、書き込み（`setBackgrounds`）も一括で行っている点です。これにより、読み書き両方でパフォーマンスを最適化できます。

### シナリオ2: シート全体のフォント使用状況レポートを作成する

シート内で使用されている全フォントを種類別に集計し、新しいシートにレポートを自動生成します。

```javascript
function createFontUsageReport() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // flat()で二次元配列を一次元配列に変換
  const fonts = sheet.getDataRange().getFontFamilies().flat(); 
  const fontStats = {};

  // フォントごとの使用回数を集計
  fonts.forEach(font => {
    fontStats[font] = (fontStats[font] || 0) + 1;
  });

  // 新しいシートを作成してレポートを出力
  const reportSheet = SpreadsheetApp.getActive().insertSheet('FontUsageReport_' + new Date().getTime());
  reportSheet.appendRow(['フォント名', '使用セル数']);
  
  // 使用回数の多い順にソートして出力
  const sortedData = Object.entries(fontStats).sort((a, b) => b[1] - a[1]);
  
  if (sortedData.length > 0) {
    reportSheet.getRange(2, 1, sortedData.length, 2).setValues(sortedData);
  }
}
```

## まとめ: GAS高速化の鍵は「一括処理」

`getFontFamilies()`は、スプレッドシートのフォント情報を扱うスクリプトのパフォーマンスを劇的に改善するための必須メソッドです。

-   **ループでAPIを叩かない**: `getFontFamily()`をセルごとに呼び出すのは避け、常に一括取得を心がける。
-   **データは配列で操作**: 取得した二次元配列を`map`や`forEach`で効率的に処理する。
-   **書き込みも一括で**: `setFontFamilies()`や`setBackgrounds()`といったメソッドと組み合わせ、読み書き両方のパフォーマンスを最適化する。

`getValues()`や`getBackgrounds()`など、GASには他にも多くの一括処理メソッドが用意されています。大量のセルを扱う際は、常に「一括処理」を意識することが、高速で安定したスクリ-プトを構築するための鍵となります。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontfamilies" >}}

{{< blog-card "https://auto-worker.com/blog/gas-getfontfamilies/" >}}
