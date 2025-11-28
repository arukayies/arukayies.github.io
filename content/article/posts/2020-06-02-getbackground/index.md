---
title: "【GAS】getBackground()でセルの背景色を取得・活用する最適な方法"
description: "GASの`getBackground()`と`getBackgrounds()`の基本から応用まで解説。単一セルの色取得、複数セルの色を一括で高速に処理するバッチ処理、そして色をトリガーにした条件付き書式の自動化など、具体的なコードでパフォーマンスを最適化する実践的テクニックを紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "getBackground", "getBackgrounds", "パフォーマンス", "バッチ処理"]
date: "2020-06-02T12:30:15.000Z"
url: "/gas/getbackground"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-25T14:45:00+09:00"
---

Google Apps Script (GAS)でスプレッドシートを操作する際、「セルの色に応じて処理を分けたい」「ステータスごとに色を変えたい」といったニーズは頻繁に発生します。この記事では、セルの背景色を取得する`getBackground()`と`getBackgrounds()`メソッドの正しい使い方と、処理を高速化するための実践的なテクニックを解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## getBackground()とgetBackgrounds()の違い

GASでセルの背景色を取得するメソッドは2種類あり、対象となるセルの数によって使い分けます。

### 単一セルの色を取得する `getBackground()`

`getBackground()`は、**単一のセル**を対象とし、その背景色を16進数のカラーコード（例: `#ffffff`）で返します。

```javascript
function getSingleCellColor() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1");
  const color = range.getBackground();
  
  console.log(color); // 例: "#ff0000" (A1セルが赤色の場合)
}
```

**注意点**: `"A1:B5"`のような複数セル範囲に対して`getBackground()`を使うと、範囲の左上のセル（この場合は`A1`）の色しか返されません。複数セルの色を知りたい場合は、このメソッドは不適切です。

### 複数セルの色をまとめて取得する `getBackgrounds()`

`getBackgrounds()`は、指定した**範囲内のすべてのセル**の背景色を**二次元配列**で一括取得します。

```javascript
function getMultipleCellColors() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:B2");
  const colors = range.getBackgrounds();

  console.log(colors);
  // [['#ff0000', '#00ff00'], ['#0000ff', '#ffffff']] のように出力される
}
```
このメソッドは、ループ処理と組み合わせることで、各セルの色を効率的に処理できます。

## パフォーマンスの鍵は「バッチ処理」

数百、数千行のデータを扱う場合、`for`ループの中で何度も`getBackground()`を呼び出すのは**最悪のアンチパターン**です。APIの呼び出し回数が増え、スクリプトの実行時間が大幅に増加してしまいます。

パフォーマンスを最適化するなら、**バッチ処理（一括取得・一括書き込み）**が鉄則です。

```javascript
function processColorsInBatch() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:C1000"); // 1000行3列の範囲

  // ① 背景色を一括で取得（API呼び出しは1回）
  const backgroundColors = range.getBackgrounds();
  
  // ② メモリ上でデータを処理
  for (let i = 0; i < backgroundColors.length; i++) {
    for (let j = 0; j < backgroundColors[i].length; j++) {
      // 背景色が特定の色（例: 警告色の#fff000）の場合に処理
      if (backgroundColors[i][j] === '#fff000') {
        console.log(`セル (${i + 1}, ${j + 1}) は警告色です`);
      }
    }
  }
}
```
このように、最初に`getBackgrounds()`で全データを取得し、その後ループ処理を行うことで、API呼び出しを最小限に抑え、処理速度を劇的に改善できます。

## 実践例：色をトリガーにした複雑な自動化

`getBackgrounds()`を使えば、標準の条件付き書式では難しい、より複雑なロジックを実装できます。

例えば、「タスクが完了（背景色が緑）なら、隣のセルに完了日時を自動入力する」といった処理も可能です。

```javascript
function setCompletionDateByColor() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A2:A" + sheet.getLastRow()); // A列をステータス列とする
  
  const backgrounds = range.getBackgrounds();
  const values = range.getValues();
  const completionColor = "#d9ead3"; // 薄い緑色
  
  for (let i = 0; i < backgrounds.length; i++) {
    // 背景色が緑で、隣のB列が空欄の場合
    if (backgrounds[i][0] === completionColor && sheet.getRange(i + 2, 2).getValue() === "") {
      // B列に現在の日時をセット
      sheet.getRange(i + 2, 2).setValue(new Date());
    }
  }
}
```

## まとめ

セルの背景色をGASで扱う際は、`getBackground()`と`getBackgrounds()`の使い分けが重要です。

-   **単一セル**なら `getBackground()`
-   **複数セル**なら `getBackgrounds()` での**バッチ処理**が必須
-   大量のデータを扱う際は、ループ内でのAPI呼び出しを避け、パフォーマンスを意識する

これらのテクニックを活用すれば、スプレッドシート業務の自動化の幅が大きく広がります。ぜひ試してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getbackgrounds" >}}

{{< blog-card "https://developers.google.com/apps-script/guides/support/best-practices" >}}
