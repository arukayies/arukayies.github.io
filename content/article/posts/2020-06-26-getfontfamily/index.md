---
title: "GASでフォントを自動統一！getFontFamily()でドキュメント整形を効率化する方法"
description: "GASでスプレッドシートのフォントを自動で統一・整形しませんか？getFontFamily()メソッドでフォント名を取得し、特定のフォントを一括置換する方法や、シート内のフォント使用状況を分析する実践的テクニックを解説します。"
tags: ["GAS", "getFontFamily", "getFontFamilies", "Google Apps Script", "スプレッドシート", "フォント", "自動化", "ドキュメント整形"]
date: "2020-06-25T15:19:28.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfontfamily"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
---

複数人でスプレッドシートを編集していると、「一部のセルだけフォントが違う」「意図しないフォントが使われていて見栄えが悪い」といった問題が起こりがちです。手作業で修正するのは大変ですが、Google Apps Script (GAS) を使えば、こうしたフォントの整形作業を自動化できます。

この記事では、セルのフォント名を取得する **`getFontFamily()`** と **`getFontFamilies()`** メソッドを中心に、ドキュメントの品質を保つための実践的なスクリプトテクニックを解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## フォント取得の基本: `getFontFamily()` と `getFontFamilies()`

### 1. 単一セルのフォント名を取得 (`getFontFamily`)

`getFontFamily()` は、指定したセルのフォント名（例: "Arial", "メイリオ"）を文字列として取得します。

```javascript
function getSingleFont() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const cell = sheet.getRange("A1");
  const fontFamily = cell.getFontFamily();
  
  console.log(`A1セルのフォントは「${fontFamily}」です。`);
}
```
**注意:** 範囲に複数セルを指定しても、`getFontFamily()` が返すのは左上のセルの情報だけです。

### 2. 複数セルのフォント名を高速で一括取得 (`getFontFamilies`)

複数セルのフォントを扱う場合は、API呼び出しを1回に抑えられる `getFontFamilies()` (複数形) を使うのがパフォーマンスの鉄則です。フォント名が**二次元配列**で返されます。

```javascript
function getMultipleFonts() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:B3");
  const fontFamilies = range.getFontFamilies(); // フォント名の二次元配列を取得

  console.log(fontFamilies);
  // 実行結果の例:
  // [ ["Arial", "メイリオ"],
  //   ["Arial", "Arial"],
  //   ["Times New Roman", "Arial"] ]
}
```

## 実践！GASを使ったフォント整形・分析テクニック

### 1. 特定のフォントを標準フォントに一括置換する

シート内で意図せず使われている特定のフォント（例: 'MS Pゴシック'）を、標準のフォント（例: 'Arial'）に一括で置換します。ドキュメントの見た目を統一するのに非常に便利です。

```javascript
function unifyFonts() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const currentFonts = range.getFontFamilies();

  // 新しいフォントの二次元配列を生成
  const newFonts = currentFonts.map(row =>
    row.map(font => {
      // 置換したいフォントを指定
      if (font === 'MS Pゴシック' || font === 'Comic Sans MS') {
        return 'Arial'; // 標準フォントに置換
      }
      return font; // それ以外のフォントは維持
    })
  );

  // setFontFamilies()で一括更新
  range.setFontFamilies(newFonts);
  console.log("フォントの統一処理が完了しました。");
}
```

### 2. シート内で使用されているフォントを棚卸しする

シート全体をスキャンし、どのフォントが、いくつ使われているかを分析・集計します。これにより、意図しないフォントが使われていないかを簡単にチェックできます。

```javascript
function analyzeFontUsage() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  // flat()で二次元配列を一次元に変換
  const allFonts = range.getFontFamilies().flat();
  
  const fontCount = {};
  
  allFonts.forEach(font => {
    fontCount[font] = (fontCount[font] || 0) + 1;
  });

  console.log("フォント使用状況レポート:", fontCount);
  // 実行結果の例:
  // { Arial: 250, 'メイリオ': 30, 'MS Pゴシック': 5 }
}
```

### 3. セルの値に応じてフォントを動的に変更する

セルの内容に応じてフォントを自動で変更する条件付き書式のような処理も可能です。例えば、セルの値に「【重要】」というテキストが含まれていたら、フォントを 'Impact' に変更します。

```javascript
function setConditionalFont() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:A" + sheet.getLastRow());
  const values = range.getValues();
  const fonts = range.getFontFamilies();

  const newFonts = fonts.map((row, i) => {
    const cellValue = values[i][0].toString();
    if (cellValue.includes("【重要】")) {
      return ['Impact']; // 変更後のフォント
    }
    return row; // 元のフォントを維持
  });

  range.setFontFamilies(newFonts);
}
```

## 注意点: リッチテキストのフォント

セル内の一部の文字だけフォントが異なる**リッチテキスト**の場合、`getFontFamily()` や `getFontFamilies()` はセルの先頭文字のフォントを返します。リッチテキスト内の各フォントを取得するには、`getRichTextValue()` を使ったより高度な処理が必要になるため注意してください。

## まとめ

`getFontFamily()` と `getFontFamilies()` を使えば、手作業では面倒なフォントの確認や統一作業を自動化できます。

-   **単一セルは `getFontFamily()`**, **複数セルは `getFontFamilies()`** で効率的に取得。
-   **フォントの一括置換**で、ドキュメントの見た目を簡単に統一できる。
-   **フォントの棚卸し**で、意図しない書式設定を検出できる。

これらのテクニックを活用して、誰が見ても分かりやすい、品質の高いスプレッドシートを維持しましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontfamily" >}} 

{{< blog-card "https://www.officesolution.tokyo/google-apps-script/google-spreadsheet/post-565/" >}}
