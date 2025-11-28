---
title: "【GAS】getFontSizeとgetFontSizesの違いとは？セルのフォントサイズを正しく取得する方法"
description: "GASでセルのフォントサイズを取得しようとして、getFontSize()を使ったら想定外の値が返ってきた経験はありませんか？このメソッドは範囲の左上のセルしか見ていません。複数セルのフォントサイズを正しく、かつ高速に取得するにはgetFontSizes()が必要です。その違いと実践的な使い方を解説します。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getFontSize", "getFontSizes", "フォントサイズ", "パフォーマンス", "一括取得"]
date: "2020-06-29T15:04:02.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfontsize"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
---

Google Apps Script (GAS)で、スプレッドシートのセルのフォントサイズを条件にして処理を自動化したい、と考えたことはありませんか？ 例えば、「フォントサイズが12pt以上のセルだけ色を変える」といった処理です。

その際に使うのが`getFontSize()`や`getFontSizes()`ですが、この2つのメソッドの違いを正しく理解していないと、思わぬバグの原因になります。

この記事では、`getFontSize()`のよくある罠と、複数セルのフォントサイズを正しく高速に取得するための`getFontSizes()`の使い方を徹底解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `getFontSize()`のよくある罠：複数範囲に使うと...

`getFontSize()`は、指定したセルのフォントサイズを数値（単位：ポイント）で取得するメソッドです。しかし、**複数セルの範囲（例: "A1:C3"）に対して使用すると、範囲全体のフォントサイズではなく、左上隅のセル（この場合はA1）の値だけが返されます。**

```javascript
function fontSizeTrap() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // A1は10pt, B1は14pt, C1は18ptだとする
  const range = sheet.getRange("A1:C1"); 
  
  // 範囲を指定しているにもかかわらず、A1の値である「10」しか返ってこない
  const fontSize = range.getFontSize(); 
  
  console.log(fontSize); // 結果は「10」
}
```
これを知らずに使うと、「範囲内のフォントサイズが正しく取得できない」という問題に直面します。`getFontSize()`は、あくまで**単一セル専用**のメソッドだと覚えておきましょう。

## 複数セルのフォントサイズは`getFontSizes()`で一括取得する

複数のセルのフォントサイズを正しく、かつ効率的に取得するための解決策が**`getFontSizes()`**（複数形）です。

このメソッドは、指定した範囲の全セルのフォントサイズを**二次元配列 (`Number[][]`)** として、たった1回のAPI呼び出しで取得します。

```javascript
function correctWayToGetFontSizes() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // A1は10pt, B1は14pt, C1は18pt
  const range = sheet.getRange("A1:C1");
  
  // API呼び出しは1回だけ！
  const fontSizes = range.getFontSizes(); 
  
  console.log(fontSizes); // 結果は [[10, 14, 18]]
  
  // 配列をループすれば、各セルの値にアクセスできる
  fontSizes[0].forEach(size => {
    console.log(`フォントサイズ: ${size}pt`);
  });
}
```
ループの中で`getFontSize()`を何度も呼び出すのに比べて、API呼び出しが1回で済むため、パフォーマンスが劇的に向上します。

## 実践的コード例：特定のフォントサイズより大きいセルを強調表示する

`getFontSizes()`の実用例として、シート内で指定したサイズより大きいフォントが使われているセルを検出し、背景色を変えてハイライトするスクリプトを紹介します。

```javascript
/**
 * データ範囲内で、フォントサイズが12ptより大きいセルを黄色でハイライトする
 */
function highlightLargeFonts() {
  const HIGHLIGHT_THRESHOLD = 12; // 強調表示するフォントサイズのしきい値
  
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  
  // フォントサイズと背景色をそれぞれ一括取得
  const fontSizes = range.getFontSizes();
  const backgrounds = range.getBackgrounds();
  
  let isChanged = false;

  fontSizes.forEach((row, r) => {
    row.forEach((size, c) => {
      // しきい値より大きく、まだ色が設定されていないセルを対象
      if (size > HIGHLIGHT_THRESHOLD && backgrounds[r][c] !== '#ffff00') {
        backgrounds[r][c] = '#ffff00'; // 背景を黄色に変更
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
このコードは、読み込み（`getFontSizes`, `getBackgrounds`）と書き込み（`setBackgrounds`）をすべて一括処理で行う、非常に効率的な実装になっています。

## まとめ

GASでセルのフォントサイズを扱う際の鉄則は、以下の通りです。

-   **単一セル**のサイズを取得したい場合のみ、`getFontSize()` を使う。
-   **複数セル**を扱う場合は、必ず `getFontSizes()` を使って一括取得する。
-   `getFontSize()`を複数セル範囲に使うと、**左上のセルの値しか返らない**ことを常に意識する。

この2つのメソッドの違いを正しく理解し、常に「一括処理」を意識することが、バグが少なく高速なスクリプトを開発するための鍵となります。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontsize" >}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontsizes" >}}
