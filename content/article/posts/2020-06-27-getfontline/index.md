---
title: "【GAS】getFontLine()でセルの下線・取り消し線を判定する方法"
description: "GASでスプレッドシートのセルに引かれた下線や取り消し線を判定したいですか？getFontLine()メソッドを使えば、'underline'や'line-through'といった文字装飾を簡単に取得できます。getFontLines()による複数セルの一括判定や、キャンセル行の特定など実用的なコード例も解説。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getFontLine", "getFontLines", "下線", "取り消し線", "文字装飾"]
date: "2020-06-27T13:44:16.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfontline"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
---

Google Apps Script (GAS)で、スプレッドシートの特定の行やセルに「取り消し線が引かれていたら処理対象外にする」といった自動化を実装したいと考えたことはありませんか？

セルのテキストに設定された**下線**や**取り消し線**といった文字装飾は、見た目だけでなく、データの状態を示すマーカーとしても活用できます。

この記事では、セルの線種を取得する`getFontLine()`メソッドと、その複数セル版である`getFontLines()`の使い方を、基本的な構文から実践的な業務自動化のコード例まで詳しく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `getFontLine()`とは？

`getFontLine()`は、指定したセルの文字装飾（フォント線）の種類を文字列で返すRangeオブジェクトのメソッドです。

### 基本構文と戻り値

非常にシンプルで、対象のRangeオブジェクトに対して呼び出すだけです。

```javascript
const range = SpreadsheetApp.getActiveSheet().getRange("A1");
const fontLine = range.getFontLine();
```

戻り値は、以下の3種類の文字列のいずれかです。

-   `'underline'`: セルに**下線**が設定されている場合
-   `'line-through'`: セルに**取り消し線**が設定されている場合
-   `'none'`: 上記の装飾が何も設定されていない場合

### 基本的な使い方

特定のセルの状態を確認する簡単なサンプルコードを見てみましょう。

```javascript
function checkCellFontLine() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const targetCell = sheet.getRange('A1');
  const fontLine = targetCell.getFontLine();
  
  if (fontLine === 'underline') {
    console.log('A1セルには下線が引かれています。');
  } else if (fontLine === 'line-through') {
    console.log('A1セルには取り消し線が引かれています。');
  } else {
    console.log('A1セルに線はありません。');
  }
}
```

## パフォーマンスの鍵！`getFontLines()`による一括取得

複数のセルを扱う際に、`getFontLine()`を`for`ループ内で呼び出すのは非効率です。API呼び出しが多発し、処理が遅くなる原因となります。

必ず**`getFontLines()`** (複数形) を使って、一度に情報を取得しましょう。

```javascript
function checkMultipleCellFontLines() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange('A1:C5');
  const fontLinesMatrix = range.getFontLines(); // 複数セルを一括取得

  // 取得結果は二次元配列で返される
  fontLinesMatrix.forEach((row, rowIndex) => {
    row.forEach((status, colIndex) => {
      if (status !== 'none') {
        const cellName = String.fromCharCode(65 + colIndex) + (rowIndex + 1);
        console.log(`セル ${cellName} の装飾: ${status}`);
      }
    });
  });
}
```
`getFontLines()`は、対象範囲の各セルの装飾情報を二次元配列で返すため、API呼び出しを1回に抑えることができ、パフォーマンスが大幅に向上します。

## 実践的な活用例：キャンセルされた注文を検出する

`getFontLine()`は、実際の業務アプリケーションで非常に役立ちます。例えば、注文管理シートで「**取り消し線が引かれた行 ＝ キャンセルされた注文**」として扱い、それを自動で検出する処理を実装してみましょう。

```javascript
function processCancelledOrders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('注文リスト');
  // A列の文字装飾をチェック対象とする
  const range = sheet.getRange('A2:A' + sheet.getLastRow()); 
  const fontLines = range.getFontLines();

  fontLines.forEach((row, index) => {
    // row[0]は各行のA列のステータス
    if (row[0] === 'line-through') {
      const rowNum = index + 2; // 配列のインデックスと行番号のズレを調整
      // キャンセル行の背景色をグレーに変更
      sheet.getRange(rowNum, 1, 1, sheet.getLastColumn()).setBackground('#cccccc');
      
      console.warn(`行 ${rowNum} の注文はキャンセルとして処理しました。`);
      // ここに在庫の戻し処理や、関係者への通知処理などを追加できる
    }
  });
}
```
このスクリプトは、A列に取り消し線が引かれている行全体をグレーアウトし、キャンセルされた注文であることを視覚的に分かりやすくします。

## まとめ

`getFontLine()`および`getFontLines()`を使いこなすことで、スプレッドシート上の文字装飾をトリガーとした高度な自動化が可能になります。

-   **単一セル**: `getFontLine()`で手軽にチェック。
-   **複数セル**: パフォーマンスのために必ず`getFontLines()`で一括取得する。
-   **応用**: 「取り消し線 = 無効」のような業務ルールを定義し、データ検証やタスク管理の自動化に活かす。

本記事で紹介したテクニックを、ぜひあなたの業務改善に応用してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontline" >}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontlines" >}}
