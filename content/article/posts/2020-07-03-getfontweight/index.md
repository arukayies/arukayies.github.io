---
title: "【GAS】getFontWeightで太字(bold)を判定！複数セルはgetFontWeightsで高速化"
description: "GASで太字のセルを判別する方法とは？getFontWeight()は単一セル用、複数セルはgetFontWeights()での高速な一括取得が必須です。太字のセルをまとめてハイライトする効率的なコード例や、書式チェックへの応用方法を解説します。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getFontWeight", "getFontWeights", "太字", "bold", "パフォーマンス", "高速化", "一括取得"]
date: "2020-07-03T12:48:22.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfontweight"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年7月"]
---

Google Apps Script (GAS)で、「太字（Bold）になっているセルだけを抜き出して処理したい」「ヘッダー行がすべて太字になっているかチェックしたい」といった、フォントの太さに基づく自動化ニーズは非常に多いです。

その際に使用するのが`getFontWeight()`メソッドですが、複数セルを扱う際には注意しないと、意図通りに動作しないだけでなく、スクリプトのパフォーマンスを著しく低下させる原因にもなります。

この記事では、`getFontWeight()`と`getFontWeights()`の正しい使い分けと、パフォーマンスを最大化する実践的なコーディング手法を解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `getFontWeight()`の基本と複数範囲の罠

`getFontWeight()`は、指定したセルのフォントの太さを文字列で返すメソッドです。

戻り値は以下の2種類です。
- **`'bold'`**: 太字
- **`'normal'`**: 標準

しかし、このメソッドを**複数セルの範囲に対して使用すると、範囲の左上隅のセルの値しか返しません。** これはGAS初心者が陥りがちな罠の一つです。

```javascript
// A1は "bold", B1は "normal" だとする
const range = SpreadsheetApp.getActiveSheet().getRange("A1:B1");
// A1の値である "bold" しか返ってこない
const weight = range.getFontWeight(); 
console.log(weight); // "bold"
```

## 解決策: `getFontWeights()`による高速一括取得

複数セルのフォントの太さを正しく、かつ高速に取得するには、必ず**`getFontWeights()`**（複数形）を使用します。

このメソッドは、範囲全体のフォントウェイト情報を**二次元配列 (`String[][]`)** として、たった1回のAPI呼び出しで取得します。ループで`getFontWeight()`を呼び出すよりも劇的に高速です。

```javascript
function fetchAllFontWeights() {
  const range = SpreadsheetApp.getActiveSheet().getRange("A1:B2");
  const weights = range.getFontWeights();
  
  console.log(weights); // 例: [["bold", "normal"], ["bold", "normal"]]
}
```

## 実践！読み書き両方の一括処理テクニック

GASの高速化の真髄は、**読み込みだけでなく、書き込みも一括で行うこと**にあります。

### シナリオ1：太字のセルを効率的にハイライトする

シート内のすべての太字セルをハイライトするスクリプトです。ループ内で`setBackground()`を呼び出すのではなく、配列上で処理を完結させ、最後に一度だけシートに書き込むのがポイントです。

```javascript
/**
 * データ範囲内の太字のセルを黄色でハイライトする
 */
function highlightBoldCells() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  
  // フォントウェイトと背景色をそれぞれ一括取得
  const weights = range.getFontWeights();
  const backgrounds = range.getBackgrounds();
  
  let isChanged = false;

  weights.forEach((row, r) => {
    row.forEach((weight, c) => {
      // 太字で、まだ色が設定されていないセルを対象
      if (weight === 'bold' && backgrounds[r][c] !== '#ffff00') {
        backgrounds[r][c] = '#ffff00'; // 配列上で背景色を変更
        isChanged = true;
      }
    });
  });

  // 変更があった場合のみ、一括で書き込む
  if (isChanged) {
    range.setBackgrounds(backgrounds);
  }
}
```

### シナリオ2：ヘッダー行の書式を自動で統一する

表の1行目がヘッダーであると仮定し、すべてが太字でない場合に自動で太字に修正するスクリプトです。

```javascript
function unifyHeaderFormat() {
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getLastRow() === 0) return; // シートが空の場合は何もしない

  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  
  const weights = headerRange.getFontWeights()[0]; // 1行だけの二次元配列なので[0]で一次元化
  
  let needsCorrection = false;
  
  // 元の配列を元に、新しい設定値の配列を作成
  const newWeights = weights.map(weight => {
    if (weight !== 'bold') {
      needsCorrection = true;
      return 'bold';
    }
    return 'bold'; // 既存のboldもそのままboldに
  });

  // 修正が必要な場合のみ、一括で書き込む
  if (needsCorrection) {
    // setFontWeightsに渡すために、再度二次元配列に戻す
    headerRange.setFontWeights([newWeights]); 
    SpreadsheetApp.getUi().alert('ヘッダー行を太字に統一しました。');
  }
}
```

## まとめ

フォントの太さを扱う際は、以下の原則を徹底しましょう。

-   **単一セル**の場合のみ `getFontWeight()` を使う。
-   **複数セル**の場合は、パフォーマンスのために必ず `getFontWeights()` で一括取得する。
-   書式を変更する際も、`setBackgrounds()` や `setFontWeights()` を使い、**読み書き両方の一括処理**を心がける。

この原則を守ることで、大量のデータを扱っても安定して高速に動作する、信頼性の高いGASを開発できます。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontweight" >}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontweights" >}}
