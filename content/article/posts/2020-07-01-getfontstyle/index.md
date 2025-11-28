---
title: "【GAS】getFontStyleでイタリック体を判定！複数セルはgetFontStylesで高速化"
description: "GASでイタリック体（斜体）のセルを判別する方法を知りたいですか？getFontStyle()は単一セル用、複数セルはgetFontStyles()での高速な一括取得が必須です。リッチテキストの注意点や、イタリック体のセルをまとめてハイライトする効率的なコード例を解説します。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getFontStyle", "getFontStyles", "イタリック", "斜体", "パフォーマンス", "高速化", "一括取得", "リッチテキスト"]
date: "2020-07-01T13:37:02.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfontstyle"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年7月"]
---

Google Apps Script (GAS)で、「イタリック体（斜体）に設定されているセルを特定したい」といった、セルのフォントスタイルに基づいた自動化を行いたい場面があります。

その際に使用するのが`getFontStyle()`メソッドですが、複数セルを扱う場合には大きな落とし穴があります。

この記事では、`getFontStyle()`と`getFontStyles()`の正しい使い分け、リッチテキストを扱う際の注意点、そしてパフォーマンスを意識した実践的なコードを解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `getFontStyle()`の基本と「左上セル」の罠

`getFontStyle()`は、指定したセルのフォントスタイルを文字列で返すメソッドです。

戻り値は以下の3種類です。
- **`'normal'`**: 標準のスタイル
- **`'italic'`**: イタリック体
- **`'oblique'`**: 傾斜体（スプレッドシート上では通常`italic`と区別されません）

ただし、`getFontSize()`などと同様に、**複数セルの範囲に対して使用すると左上隅のセルの値しか返さない**という重要な注意点があります。

```javascript
// A1は "normal", B1は "italic" だとする
const range = SpreadsheetApp.getActiveSheet().getRange("A1:B1");
// A1の値である "normal" しか返ってこない
const style = range.getFontStyle(); 
console.log(style); // "normal"
```

## 複数セルは`getFontStyles()`で高速一括取得

複数セルのフォントスタイルを正しく、かつ高速に取得するには、必ず**`getFontStyles()`**（複数形）を使いましょう。

このメソッドは、範囲全体のスタイル情報を**二次元配列 (`String[][]`)** として、たった1回のAPI呼び出しで取得します。これにより、ループで`getFontStyle()`を呼び出すよりも劇的にパフォーマンスが向上します。

```javascript
function fetchAllFontStyles() {
  const range = SpreadsheetApp.getActiveSheet().getRange("A1:B2");
  const styles = range.getFontStyles();
  
  console.log(styles); // 例: [["normal", "italic"], ["normal", "normal"]]
}
```

## 注意点：リッチテキストの扱いは？

セル内の一部の文字だけスタイルが異なる「リッチテキスト」の場合、`getFontStyle()`や`getFontStyles()`は**セルの先頭文字のスタイルを返します**。

例えば、セルに「通常**イタリック**」と入力されている場合、これらのメソッドが返す値は先頭の "通" に適用されている `'normal'` となります。セル内の複雑な書式を正確に取得したい場合は、`getRichTextValue()` を使う必要があります。

## 実践的コード例：イタリック体のセルを効率的にハイライト

`getFontStyles()` を使って、シート内のすべてのイタリック体のセルをハイライトするスクリプトです。**読み込みと書き込みの両方を一括処理で行う**のがパフォーマンス上の鍵です。

```javascript
/**
 * データ範囲内のイタリック体のセルを薄い黄色でハイライトする
 */
function highlightItalicCells() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  
  // スタイルと背景色をそれぞれ一括取得
  const styles = range.getFontStyles();
  const backgrounds = range.getBackgrounds();
  
  let isChanged = false;

  styles.forEach((row, r) => {
    row.forEach((style, c) => {
      // イタリック体で、まだ色が設定されていないセルを対象
      if (style === 'italic' && backgrounds[r][c] !== '#fff2cc') {
        backgrounds[r][c] = '#fff2cc'; // 背景を薄い黄色に変更
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
このコードでは、ループ内で`setBackground()`を呼び出すのではなく、まず`backgrounds`配列上で変更を行い、最後に`setBackgrounds()`で一度にシートに書き込んでいます。これがGASにおける高速化のセオリーです。

## まとめ

フォントスタイルを扱う際は、以下の点を押さえておきましょう。

-   **単一セル**の場合のみ `getFontStyle()` を使う。
-   **複数セル**の場合は、パフォーマンスのために必ず `getFontStyles()` で一括取得する。
-   **リッチテキスト**の場合、先頭文字のスタイルしか取得できない点に注意する。
-   書式を変更する際も、`setBackgrounds()` のように一括書き込み用のメソッドを使い、**読み書き両方の一括処理**を心がける。

これらの原則を守ることで、安定して高速に動作するGASを開発できます。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontstyle" >}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontstyles" >}}
