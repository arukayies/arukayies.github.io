---
title: "【GAS】getBackgroundObjects()で複数セルの背景色を高速・詳細に一括取得する方法"
description: "GASの`getBackgroundObjects()`を使い、複数セルの背景色を`Color`オブジェクトの二次元配列として高速に一括取得する方法を解説。`getBackgrounds()`との違い、テーマカラーの判定、パフォーマンス比較、そして大量のセルを効率的に処理する実践的なテクニックを紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "getBackgroundObjects", "Color", "バッチ処理", "パフォーマンス"]
date: "2020-06-04T15:02:55.000Z"
url: "/gas/getbackgroundobjects"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-25T14:39:00+09:00"
---

Google Apps Script (GAS)で大量のセルの背景色を扱う際、パフォーマンスと機能性の両立は重要な課題です。`getBackgroundObjects()`は、この課題を解決するための最も強力なメソッドの一つです。

この記事では、`getBackgroundObjects()`の基本的な使い方から、他のメソッドとの違い、そして実践的な活用法までを詳しく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## GASにおける背景色取得メソッドの使い分け

GASにはセルの背景色を取得するメソッドが4つあります。それぞれの特徴を理解し、状況に応じて最適なものを選択することが重要です。

| メソッド | 対象範囲 | 戻り値 | こんな時に最適 |
|:---|:---|:---|:---|
| `getBackground()` | 単一セル | `String` | 1つのセルの色を16進数文字列で取得したい時。 |
| `getBackgrounds()` | 複数セル | `String[][]` | **速度最優先**。複数セルの色を16進数文字列で高速に一括取得したい時。 |
| `getBackgroundObject()` | 単一セル | `Color` | 1つのセルの色をRGB値やテーマカラーなど詳細に分析したい時。 |
| **`getBackgroundObjects()`** | **複数セル** | **`Color[][]`** | **速度と機能性を両立**。複数セルの色を詳細情報付きで高速に一括取得したい時。 |

`getBackgroundObjects()`は、`getBackgrounds()`の**高速性**と`getBackgroundObject()`の**機能性**を兼ね備えた、最も汎用性の高いメソッドと言えます。

## getBackgroundObjects()の基本的な使い方

`getBackgroundObjects()`は、指定した範囲の背景色を`Color`オブジェクトの**二次元配列**として返します。

```javascript
function getColorsAsObjects() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:B2");

  // Colorオブジェクトの二次元配列を取得
  const colorObjects = range.getBackgroundObjects();

  // 1行目・1列目のColorオブジェクトを取得
  const colorA1 = colorObjects[0][0];

  // Colorオブジェクトから色情報を取得
  console.log(`色種別: ${colorA1.getColorType()}`); // RGB or THEME
  
  if (colorA1.getColorType() === SpreadsheetApp.ColorType.RGB) {
    console.log(`16進数: ${colorA1.asRgbColor().asHexString()}`);
  }
}
```

### Colorオブジェクトで何ができる？

`Color`オブジェクトを使うと、単なる色だけでなく、その色がどのように設定されたかという**文脈**まで知ることができます。
- **RGB値の個別取得**: `asRgbColor().getRed()`などで、色の三原色を数値として扱えます。
- **テーマカラーの判定**: `getColorType()`で色がテーマカラーかどうかを判別し、`asThemeColor().getThemeColorType()`でどのテーマ（例: `ACCENT1`）かを取得できます。

## 実践例：シートのデザインルールをチェックする

`getBackgroundObjects()`は、スプレッドシートのデザインルールが守られているかを自動でチェックするようなスクリプトに最適です。

以下の例では、指定範囲内でテーマカラー以外（RGBで直接指定された色）が使われているセルを検出します。

```javascript
function checkDesignRule() {
  const range = SpreadsheetApp.getActiveRange();
  const colorObjects = range.getBackgroundObjects();
  
  colorObjects.forEach((row, i) => {
    row.forEach((color, j) => {
      // 色がテーマカラーでない場合
      if (color.getColorType() !== SpreadsheetApp.ColorType.THEME) {
        const cellAddress = sheet.getRange(i + 1, j + 1).getA1Notation();
        console.log(`警告: セル ${cellAddress} はテーマカラー以外で着色されています。`);
      }
    });
  });
}
```

## パフォーマンスについて

`getBackgrounds()`と`getBackgroundObjects()`は、どちらもAPI呼び出しを1回にまとめるバッチ処理なので非常に高速です。

10,000セルを処理した場合の参考値：
- **`getBackgrounds()`**: 約 850ms
- **`getBackgroundObjects()`**: 約 920ms

`Color`オブジェクトを生成する分、わずかにオーバーヘッドがありますが、その差は微々たるものです。色の詳細情報が必要な場合は、迷わず`getBackgroundObjects()`を使いましょう。ループ内で`getBackground()`を呼び出すのは絶対に避けるべきです。

## まとめ

`getBackgroundObjects()`は、GASでセルの背景色を扱う上で、パフォーマンスと機能性を両立させるための鍵となるメソッドです。

-   **高速なバッチ処理**: 大量セルの色情報を一度のAPI呼び出しで取得。
-   **詳細な色情報**: RGB値やテーマカラーの種類など、高度な分析が可能。
-   **幅広い応用**: デザインルールのチェックから、色に基づいた複雑なデータ処理まで対応。

複数セルの色を扱う際は、`getBackgroundObjects()`を第一候補として検討することをお勧めします。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getbackgroundobjects" >}}

{{< blog-card "https://developers.google.com/apps-script/guides/support/best-practices" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" >}} 

{{< blog-card "https://qiita.com/query1000/items/3b5491b96f3fd749c70c" >}} 

{{< blog-card "https://focus-fwi.com/gas/setbackground/" >}} 

{{< blog-card "https://hajiritsu.com/spreadsheet-gas-setbackground/" >}}
