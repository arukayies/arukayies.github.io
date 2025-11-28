---
title: "GASで文字色を高速一括取得！getFontColorObjects()でパフォーマンスを改善する方法"
description: "GASで大量のセルの文字色を取得するならgetFontColorObjects()が必須です。forループ処理との圧倒的な速度差、取得したColorオブジェクトの二次元配列を効率的に加工する方法、色の一括置換など、パフォーマンスを最大化するテクニックを解説します。"
tags: ["GAS", "getFontColorObjects", "Google Apps Script", "スプレッドシート", "パフォーマンス", "高速化", "一括取得", "Color Object"]
date: "2020-06-23T15:39:23.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfontcolorobjects"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
---

Google Apps Script (GAS) で、広範囲のセルの文字色を一つずつチェックするスクリプトを書いた結果、「処理が遅すぎてタイムアウトしてしまう…」という経験はありませんか？ その原因は、セルの情報を何度も取得するためにAPIを繰り返し呼び出していることにあります。

このパフォーマンス問題を解決する鍵が、**`getFontColorObjects()`** メソッドです。

この記事では、`getFontColorObjects()` を使って複数セルの文字色情報を**一括で高速に取得し**、効率的に処理する方法を、具体的なコード例と共に徹底的に解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## なぜ `getFontColorObjects()` が速いのか？ - 一括取得の重要性

多数のセルの文字色を取得する際、`for` ループの中で `getFontColorObject()` (単数形) を使うのは典型的なパフォーマンスのボトルネックです。

```javascript
// 【非推奨】絶対に避けるべき遅いコード
function slowWay() {
  const range = SpreadsheetApp.getActiveSheet().getRange("A1:C100");
  const colors = [];
  for (let r = 1; r <= 100; r++) {
    const rowColors = [];
    for (let c = 1; c <= 3; c++) {
      // 100x3 = 300回のAPI呼び出しが発生！
      rowColors.push(range.getCell(r, c).getFontColorObject());
    }
    colors.push(rowColors);
  }
}

// 【推奨】一瞬で終わる高速なコード
function fastWay() {
  const range = SpreadsheetApp.getActiveSheet().getRange("A1:C100");
  // API呼び出しはたったの1回！
  const colors = range.getFontColorObjects();
}
```

スプレッドシートへのアクセス（API呼び出し）は時間のかかる処理です。`getFontColorObjects()` は、この**API呼び出しを一度に集約する**ことで、スクリプトの実行速度を劇的に向上させます。

## `getFontColorObjects()` の基本的な使い方

`getFontColorObjects()` は、指定した範囲の文字色を **`Color` オブジェクトの二次元配列**として返します。この配列の構造は、スプレッドシートの行列と一致しているため、直感的に扱うことができます。

```javascript
function fetchFontColorsInBulk() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:B3");
  // Colorオブジェクトの二次元配列を取得
  const colorMatrix = range.getFontColorObjects();

  // 取得した配列をループ処理
  colorMatrix.forEach((row, rowIndex) => {
    row.forEach((color, colIndex) => {
      const cellAddress = String.fromCharCode(65 + colIndex) + (rowIndex + 1);
      const hex = color.asRgbColor().asHexString(); // Colorオブジェクトを16進数に変換
      console.log(`${cellAddress} の色は ${hex} です。`);
    });
  });
}
```

## 応用テクニック：取得した色の配列を効率的に加工・活用する

`getFontColorObjects()` で取得した二次元配列は、JavaScriptの配列メソッドと組み合わせることで、様々な処理に応用できます。

### 1. 特定の色のセルの情報を抽出する

範囲内から文字色が赤 (`#ff0000`) のセルだけを検出し、そのセルの値とアドレスをオブジェクト配列としてまとめます。

```javascript
function findRedFontCells() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const colors = range.getFontColorObjects();
  const values = range.getValues(); // 値も一括取得しておくと効率的
  const redCells = [];

  colors.forEach((row, r) => {
    row.forEach((color, c) => {
      if (color.asRgbColor().asHexString() === '#ff0000') {
        redCells.push({
          address: range.getCell(r + 1, c + 1).getA1Notation(),
          value: values[r][c]
        });
      }
    });
  });
  console.log('赤文字のセル情報:', redCells);
}
```

### 2. 色を一括で置換する

`map()` メソッドを使って新しい色の二次元配列を効率的に作成し、`setFontColorObjects()` で一括更新します。これにより、シート上の色を高速に書き換えることができます。

```javascript
function replaceColorsInBulk() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:D10");
  const currentColorObjects = range.getFontColorObjects();

  // 新しいColorオブジェクトの二次元配列を生成
  const newColorObjects = currentColorObjects.map(row =>
    row.map(cellColor => {
      // 現在の色が赤なら、青に置き換える
      if (cellColor.asRgbColor().asHexString() === '#ff0000') {
        // 新しいColorオブジェクトをビルダーで作成
        return SpreadsheetApp.newColor().setRgbColor("#0000ff").build();
      }
      // それ以外の色はそのまま維持
      return cellColor;
    })
  );

  // setFontColorObjects()で一括更新
  range.setFontColorObjects(newColorObjects);
}
```

## まとめ

`getFontColorObjects()` は、スプレッドシートの文字色を扱うスクリプトのパフォーマンスを飛躍的に向上させるための必須メソッドです。

-   **パフォーマンス第一**: `for`ループでセルを一つずつ叩くのではなく、必ず一括取得する。
-   **`Color`オブジェクトの活用**: 取得した二次元配列から、色情報の詳細な分析や加工が可能。
-   **書き込みも一括で**: `setFontColorObjects()` と組み合わせることで、読み書き両方の処理を高速化できる。

大量のセルの書式を扱う際は、常に「一括処理」を意識することで、安定して高速に動作する堅牢なスクリ-プトを構築できます。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontcolorobjects" >}} 

{{< blog-card "https://www.suzu-dev.com/gas-getfontcolorobjects/" >}}
