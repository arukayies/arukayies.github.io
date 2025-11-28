---
title: "GASでスプレッドシート内の文字列を効率的に検索・置換する方法"
description: "Google Apps Script（GAS）のcreateTextFinderメソッドを利用して、スプレッドシート内の特定文字列を効率的に検索・置換する方法を解説します。基本的な使い方から正規表現を使った応用テクニックまで、サンプルコード付きで分かりやすく紹介します。"
tags: ["GAS","Google Apps Script","スプレッドシート","createTextFinder"]
date: "2020-05-25T14:16:04.000Z"
url: "/gas/createtextfinder"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年5月"]
lastmod: "2025-11-25T15:00:18.000Z"
---

Google Apps Script（GAS）を利用すると、スプレッドシート内のテキスト検索や置換作業を簡単に自動化できます。特に`createTextFinder`メソッドは、シート全体や特定の範囲を対象に、柔軟な文字列検索を実現するための強力な機能です。

この記事では、`createTextFinder`の基本的な使い方から応用テクニックまで、実践的なサンプルコードを交えて詳しく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## createTextFinderとは？

`createTextFinder`は、スプレッドシート内から特定の文字列を検索するためのGASのメソッドです。以下のように、検索したい文字列を指定するだけで簡単に利用を開始できます。

```js
const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
const textFinder = spreadsheet.createTextFinder('検索したい文字列');
```

このメソッドは`TextFinder`オブジェクトを返します。このオブジェクトが持つ`.findAll()`や`.replaceAllWith()`といったメソッドを呼び出すことで、検索結果の取得や文字列の置換といった操作が可能になります。

## スプレッドシート内の文字列を検索する

`TextFinder`オブジェクトを使って文字列を検索し、結果を取得するには主に以下の3つのメソッドがあります。

*   **findAll()**: 条件に一致するすべてのセル（Range）を配列で取得します。
*   **findNext()**: 現在位置から見て、次に見つかった一致セルを取得します。
*   **findPrevious()**: 現在位置から見て、前に見つかった一致セルを取得します。

例えば、スプレッドシート内にあるすべての「重要」という文字列を検索し、そのセルの位置をログに出力するコードは以下のようになります。

```js
const ranges = textFinder.findAll();
ranges.forEach(range => {
  console.log(`「重要」が見つかりました。行: ${range.getRow()}, 列: ${range.getColumn()}`);
});
```

このように`.findAll()`を使えば、一致したすべてのセルの行番号と列番号を簡単に取得できます。

## 文字列を置換する

文字列の置換はさらに簡単です。`.replaceAllWith()`メソッドを使えば、検索した文字列を一括で置換できます。

```js
const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
spreadsheet.createTextFinder('古いキーワード')
  .replaceAllWith('新しいキーワード');
```

このコードを実行するだけで、シート内にあるすべての「古いキーワード」が「新しいキーワード」に置き換えられます。

また、置換したセルの数を取得したい場合は、以下のように戻り値を変数に格納します。

```js
const replacementCount = textFinder.replaceAllWith('新しいデータ');
console.log(`${replacementCount}件のセルを置換しました。`);
```

## 応用編: 高度な検索オプションを使いこなす

`createTextFinder`は、より高度な検索を実現するための便利なオプションメソッド（チェーンメソッド）を提供しています。

```js
textFinder
  .matchCase(true) // 大文字と小文字を区別する
  .matchEntireCell(true) // セルの内容が完全に一致する場合のみ検索
  .useRegularExpression(true) // 正規表現を使用した検索を有効にする
  .ignoreDiacritics(true); // アクセント記号などを無視する
```

例えば、電話番号のような特定のパターンを持つ文字列を検索したい場合、正規表現を利用すると非常に便利です。

```js
const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
const regexFinder = spreadsheet.createTextFinder('\\d{3}-\\d{4}-\\d{4}')
  .useRegularExpression(true)
  .findAll();
```

上記のコードは、「090-1234-5678」のような形式の電話番号をすべて検索します。

## すべてのシートを対象に検索・置換する方法

「スプレッドシート内の全シートに対して、特定の単語を一括で置換したい」という場面はよくあります。その場合は、以下のコードで実現できます。

```js
function replaceAcrossAllSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = spreadsheet.getSheets();
  
  sheets.forEach(sheet => {
    // 各シートに対して検索と置換を実行
    sheet.createTextFinder('変更前のテキスト')
      .replaceAllWith('変更後のテキスト');
  });
}
```

この関数を実行すれば、すべてのシートに対して一度に置換処理が実行されるため、作業効率が大幅に向上します。

## まとめ

`createTextFinder`メソッドは、スプレッドシート内のテキスト検索や置換を自動化するための非常に強力なツールです。基本的な検索・置換はもちろん、正規表現を使った高度な検索や、複数シートを横断する一括処理も簡単に行えます。

この機能を活用すれば、手作業によるミスを減らし、面倒な定型業務から解放されます。ぜひ日々の業務効率化に役立ててください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://hajiritsu.com/spreadsheet-gas-createtextfinder/" >}} 
  
{{< blog-card "https://qiita.com/wezardnet/items/210eafa0530ec0c4a2c7" >}}
