---
title: "GASでスプレッドシートのオートフィル機能を活用してデータ入力を効率化する方法"
description: "Google Apps Script（GAS）のautoFill()メソッドを使って、スプレッドシートのデータ入力を自動化する方法を解説。連続データやパターンの自動展開で作業効率を向上させる基本から応用、エラー処理まで具体的なコードを交えて紹介します。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "autoFill", "自動入力"]
date: "2020-03-09T15:06:49.000Z"
url: "/gas/autofill"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年3月"]
lastmod: "2025-11-27T09:31:33.000Z"
---

Google Apps Script（GAS）の`autoFill()`メソッドは、スプレッドシート上での面倒なデータ入力を自動化し、作業効率を飛躍的に向上させる強力な機能です。

この記事では、`autoFill()`メソッドの基本的な使い方から、より複雑なデータ構造に対応するための応用テクニックまで、具体的なコード例を交えて分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `autoFill()`メソッドの基本的な使い方

`autoFill()`メソッドは、基となるセル範囲（`sourceRange`）のデータパターンを解析し、指定した展開先の範囲（`destination`）にデータを自動で補完・展開する機能です。数値の連番、日付、特定のテキストパターンなどを自動で拡張できます。

### メソッドの構文

```js
sourceRange.autoFill(destination, seriesType);
```

-   **sourceRange**: オートフィルの基となるデータが含まれる範囲。パターンの解析には通常2つ以上のセルが必要です。
-   **destination**: データを展開したい先の範囲。
-   **seriesType**: データの展開方法を指定するシリーズタイプ。以下のいずれかを指定します。
    -   `SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES`: 数値の増加など、標準的なパターンで展開します。
    -   `SpreadsheetApp.AutoFillSeries.ALTERNATE_SERIES`: データを交互に繰り返すパターンで展開します。

### 具体的な動作例

例えば、`[10, 20]`というデータが`sourceRange`にある場合、`autoFill`は「10ずつ増加する」というパターンを認識し、展開先には`[30, 40, 50, ...]`といった連続データを自動で入力します。

## 系列タイプ（seriesType）による挙動の違い

`seriesType`パラメータを使い分けることで、データの展開方法を制御できます。

### `DEFAULT_SERIES`：連続データの生成

数値や日付などの連続データを生成する場合に使用します。例えば、`[1, 2, 3]`というデータを基にすると、`[4, 5, 6]`と続く等差数列を自動で作成します。

```js
function defaultSeriesExample() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const sourceRange = sheet.getRange("A1:A3"); // A1=1, A2=2, A3=3 が入力されている想定
  const destinationRange = sheet.getRange("A1:A10");
  
  sourceRange.autoFill(destinationRange, SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
}
```

### `ALTERNATE_SERIES`：交互パターンの繰り返し

特定のパターンを繰り返したい場合に使用します。例えば`['赤', '青']`というデータを指定すると、展開先には`['赤', '青', '赤', '青', ...]`という繰り返しパターンが入力されます。

```js
function alternateSeriesExample() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const sourceRange = sheet.getRange("B1:B2"); // B1="赤", B2="青" が入力されている想定
  const destinationRange = sheet.getRange("B1:B8");

  sourceRange.autoFill(destinationRange, SpreadsheetApp.AutoFillSeries.ALTERNATE_SERIES);
}
```

## `autoFill()`の応用的な使い方

### 1. 縦横の多次元オートフィル

`autoFill()`は通常、一方向（縦または横）への展開を行いますが、工夫次第で縦横両方向への展開も可能です。例えば、まず横方向にオートフィルを実行し、その結果を基に縦方向へ展開することで、クロス集計表のような複雑なデータも生成できます。

### 2. 隣接セルに合わせて自動展開 (`autoFillToNeighbor`)

`autoFillToNeighbor()`メソッドを使用すると、隣接する列や行のデータ量に合わせて動的に展開範囲を決定できます。

```js
function autoFillToNeighborExample() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // A列にデータがあり、B1にオートフィルしたいデータがある想定
  const sourceRange = sheet.getRange("B1"); 
  
  sourceRange.autoFillToNeighbor(SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
}
```

このメソッドを使えば、隣接データの増減に自動で追従できるため、非常に柔軟な処理が可能になります。

## エラー処理とパフォーマンス最適化

スクリプトを安定して動作させるためには、エラーハンドリングが重要です。特に範囲指定のエラーは発生しやすいため、`try...catch`ブロックで適切に処理しましょう。

```js
function autoFillWithErrorHandling() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const sourceRange = sheet.getRange("A1:A2");
    const destinationRange = sheet.getRange("A1:A10");
    
    sourceRange.autoFill(destinationRange, SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
  } catch (e) {
    console.error(`オートフィル処理中にエラーが発生しました: ${e.message}`);
    SpreadsheetApp.getUi().alert("エラーが発生しました。ログを確認してください。");
  }
}
```

また、数千行を超えるような大規模なデータを扱う際は、パフォーマンスへの配慮が必要です。複数の処理をまとめて実行するバッチ処理などを検討し、スクリプトの実行時間を短縮する工夫をしましょう。

## 実装におけるベストプラクティス

-   **入力値の事前検証**: `sourceRange`が空でないか事前にチェックすることで、意図しないエラーを防ぎます。
-   **ユーザーへのフィードバック**: 処理が完了した際にUIを通じてメッセージを表示すると、ユーザーにとって親切なスクリプトになります。
-   **非同期処理の検討**: 重い処理を実行する場合は、`setTimeout`などを利用した非同期実行を検討し、UIのフリーズを防ぎます。

## まとめ

`autoFill()`メソッドは、スプレッドシートでの定型的なデータ入力を自動化し、作業を劇的に効率化できる非常に強力なツールです。

本記事で紹介した基本的な使い方から応用テクニックまでをマスターすれば、データ処理の自動化レベルを一段階引き上げることができるでしょう。今後、AIによる高度なパターン認識などが導入される可能性もあり、`autoFill()`の活用範囲はさらに広がっていくことが期待されます。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://note.com/yucco72/n/n65c83020f853" >}} 
  
{{< blog-card "https://hawksey.info/blog/2020/09/adding-some-autofill-magic-to-your-google-sheets-apps-script-projects/" >}} 
  
{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}} 
  
{{< blog-card "https://www.reddit.com/r/googlesheets/comments/198dcyh/script_for_autofill_based_on_another_cells/" >}}
