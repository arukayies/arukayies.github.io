---
title: "GAS getFontColors()解説 (旧メソッド) - なぜ新getFontColorObjects()へ移行すべきか"
description: "GASの旧メソッドgetFontColors()の仕様と、なぜ新しいgetFontColorObjects()への移行が強く推奨されるのかを解説。テーマカラーが扱えない等の違いを理解し、既存コードを安全にリファクタリングする方法を学びましょう。"
tags: ["GAS", "getFontColors", "Google Apps Script", "スプレッドシート", "旧メソッド", "リファクタリング", "getFontColorObjects"]
date: "2020-06-24T16:13:16.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfontcolors"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
---

Google Apps Script (GAS) でスプレッドシートの文字色を一括取得する際、`getFontColors()` というメソッドが存在します。しかし、これは現在 **旧式 (Legacy)** となっており、より高機能な `getFontColorObjects()` の使用が強く推奨されています。

この記事では、`getFontColors()` の基本的な仕様を解説すると共に、**なぜ新しいメソッドへ移行すべきなのか**、その決定的な違いと具体的な移行方法を解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `getFontColors()` の基本仕様

`getFontColors()` は、指定した範囲の各セルの文字色を、`#ff0000` のような**16進数カラーコードの文字列の二次元配列 (`String[][]`)** として取得します。

```javascript
function getFontColorsLegacy() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const targetRange = sheet.getRange('A1:B2');
  // 文字列の二次元配列が返ってくる
  const colorMatrix = targetRange.getFontColors();
  
  console.log(colorMatrix);
  // 実行結果の例:
  // [ ['#000000', '#ff0000'],
  //   ['#0000ff', '#008000'] ]
  
  // A2セルの色を取得
  console.log(colorMatrix[1][0]); // '#0000ff'
}
```
単純なカラーコードの比較だけであれば、このメソッドでも目的を達成することは可能です。

## なぜ `getFontColorObjects()` への移行が推奨されるのか？

`getFontColors()` には、現代のスプレッドシート開発において無視できない大きな弱点があります。

| 比較項目 | `getFontColors()` (旧) | `getFontColorObjects()` (新・推奨) |
|:--- |:--- |:--- |
| **返り値の型** | 文字列の二次元配列 `String[][]` | **`Color` オブジェクトの二次元配列** `Color[][]` |
| **情報量** | 16進数コードのみ | RGB値、テーマカラー情報など、**詳細な情報を含む** |
| **テーマカラー** | **対応不可** (実際のRGB値に変換されてしまう) | **完全対応** (`getColorType()`で判別可能) |

**最大の弱点は、テーマカラーを判別できないこと**です。`getFontColors()` は、セルにテーマカラーが設定されていても、その時点での具体的なRGBカラーコード (`#4a86e8` など) を返してしまいます。これでは、「このセルがテーマの“アクセント1”の色である」という情報を知ることができません。

ドキュメント全体で統一感のあるデザインを保つ上で、テーマカラーを正しく扱える `getFontColorObjects()` の方が圧倒的に優れています。

## 既存コードからの移行（リファクタリング）ガイド

もし既存のスクリプトで `getFontColors()` が使われている場合、`getFontColorObjects()` に簡単に移行できます。

**▼ 旧コード: 特定の色のセルをハイライトする**

```javascript
function highlightRedCells_Legacy() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const colors = range.getFontColors(); // 旧メソッド

  for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < colors[i].length; j++) {
      if (colors[i][j] === '#ff0000') {
        range.getCell(i + 1, j + 1).setBackground('#fce5cd');
      }
    }
  }
}
```

**▼ 新コード: `getFontColorObjects` を使ったリファクタリング**

```javascript
function highlightRedCells_Modern() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const colorObjects = range.getFontColorObjects(); // 新メソッド

  colorObjects.forEach((row, i) => {
    row.forEach((color, j) => {
      // Colorオブジェクトを16進数に変換して比較
      if (color.asRgbColor().asHexString() === '#ff0000') {
        range.getCell(i + 1, j + 1).setBackground('#fce5cd');
      }
    });
  });
}
```
`getFontColorObjects()` で取得した `Color` オブジェクトに `.asRgbColor().asHexString()` を追加するだけで、旧コードとほぼ同じロジックで動作させつつ、将来的な拡張性（テーマカラー対応など）を持たせることができます。

## まとめ

`getFontColors()` は、過去のスクリプトとの互換性のために残されていますが、その機能は限定的です。

-   **旧 `getFontColors()`**: 単純な16進数カラーコードの配列を返す。テーマカラーを判別できない。
-   **新 `getFontColorObjects()`**: 詳細な情報を持つ `Color` オブジェクトの配列を返す。テーマカラーにも完全対応。

**これから新しくスクリプトを作成する場合は、必ず `getFontColorObjects()` を使用してください。** 既存のコードも、この記事を参考にぜひモダンな記述へとアップデートすることをお勧めします。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontcolorobjects" >}} 

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontcolors" >}}
