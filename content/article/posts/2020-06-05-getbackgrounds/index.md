---
title: "【GAS】getBackgrounds()で複数セルの背景色を高速に一括取得する方法"
description: "GASで最も高速に複数セルの背景色を取得する`getBackgrounds()`を解説。16進数カラーコードの二次元配列を返すこのメソッドの基本から、`getBackgroundObjects()`との使い分け、バッチ処理によるパフォーマンス最適化、そして大量のデータを扱う実践的なテクニックまで紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "getBackgrounds", "バッチ処理", "パフォーマンス", "高速化"]
date: "2020-06-05T13:22:44.000Z"
url: "/gas/getbackgrounds"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-25T14:37:00+09:00"
---

Google Apps Script (GAS)でスプレッドシートの自動化を行う際、何千ものセルの背景色を扱う処理でパフォーマンスに悩んでいませんか？ `getBackgrounds()`は、そんな悩みを解決する**最も高速な**メソッドです。

この記事では、`getBackgrounds()`の基本から、パフォーマンスを最大化する実践的な使い方までを詳しく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## getBackgrounds()とは？

`getBackgrounds()`は、指定した範囲の全セルの背景色を、**16進数カラーコードの二次元配列**として一括で取得するメソッドです。

```javascript
function basicUsage() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:C2");

  // カラーコードの二次元配列を取得
  const colors = range.getBackgrounds();
  
  console.log(colors);
  // 出力例:
  // [['#ff0000', '#00ff00', '#0000ff'],  // 1行目の色 (A1, B1, C1)
  //  ['#ffffff', '#ffff00', '#00ffff']]  // 2行目の色 (A2, B2, C2)
}
```
API呼び出しを一度にまとめるため、ループ処理で1セルずつ`getBackground()`を呼び出すよりも劇的に高速です。

### getBackgrounds() vs getBackgroundObjects()

`getBackgrounds()`は速度に特化している一方、`getBackgroundObjects()`は`Color`オブジェクトを返すため機能性に優れます。

| メソッド | 戻り値 | こんな時に最適 |
|:---|:---|:---|
| `getBackgrounds()` | `String[][]` | **とにかく速さを求める時**。16進数文字列での比較で十分な場合に最適。 |
| `getBackgroundObjects()`| `Color[][]`| RGB値やテーマカラーなど、**色の詳細情報が必要な時**。 |

単純な色の比較であれば、`getBackgrounds()`が最も効率的です。

## 実践例1：特定の色を持つセルを検索する

`getBackgrounds()`は、`getValues()`と組み合わせることで、「特定の色を持つセルの値をリストアップする」といった処理を高速に実行できます。

```javascript
function findCellsByColor() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange(); // シート全体のデータ範囲

  // ① 値と背景色をそれぞれ一括取得
  const values = range.getValues();
  const backgrounds = range.getBackgrounds();
  
  const targetColor = "#fff2cc"; // 検索したい色（薄い黄色）
  const results = [];

  // ② メモリ上でループ処理
  for (let i = 0; i < backgrounds.length; i++) {
    for (let j = 0; j < backgrounds[i].length; j++) {
      if (backgrounds[i][j] === targetColor) {
        results.push(values[i][j]);
      }
    }
  }

  console.log(results); // ['タスクA', '重要事項B'] のように出力
}
```
この**「一括取得 → メモリ上で処理」**のパターンが、GASのパフォーマンスチューニングの基本です。

## 実践例2：色情報を基に一括でセルを更新する

`getBackgrounds()`で取得した色情報を加工し、`setBackgrounds()`で一括更新する例です。「白色のセルだけを薄いグレーに塗り替える」といった一括置換処理を高速に行えます。

```javascript
function replaceWhiteToGray() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();

  // ① 背景色を一括取得
  const originalColors = range.getBackgrounds();
  
  // ② メモリ上で新しい色の二次元配列を作成
  const newColors = originalColors.map(row => {
    return row.map(color => {
      // 白色（#ffffff）なら薄いグレー（#f3f3f3）に置換
      return (color === "#ffffff") ? "#f3f3f3" : color;
    });
  });

  // ③ 背景色を一括更新
  range.setBackgrounds(newColors);
}
```
この方法なら、何千セルあっても数秒で処理が完了します。

## まとめ

`getBackgrounds()`は、GASで複数セルの背景色を扱う上で、**パフォーマンスを最優先する**場合に最適なメソッドです。

-   **最速**: 16進数カラーコードの二次元配列を返すため、オーバーヘッドが最も少ない。
-   **バッチ処理の要**: `getValues()`や`setBackgrounds()`と組み合わせることで、大量のデータを効率的に処理できる。
-   **シンプル**: 戻り値が単純な文字列配列なため、扱いやすい。

色の詳細情報が不要な場合は、`getBackgrounds()`を積極的に活用し、高速で快適なスクリプトを目指しましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getbackgrounds" >}}

{{< blog-card "https://developers.google.com/apps-script/guides/support/best-practices" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" >}} 

{{< blog-card "https://hajiritsu.com/spreadsheet-gas-getbackground/" >}} 

{{< blog-card "https://caymezon.com/gas-background/" >}} 

{{< blog-card "https://gsuiteguide.jp/sheets/getbackgrounds/" >}} 

{{< blog-card "https://techuplife.tech/gas-ss-rbackgroundcolor/" >}}
