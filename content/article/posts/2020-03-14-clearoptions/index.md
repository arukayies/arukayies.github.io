---
title: "GASのclear(options)でスプレッドシートの値や書式を選択的に削除する方法"
description: "Google Apps Script (GAS) の clear(options) メソッドを使い、スプレッドシートのセルの値、書式、コメントなどを選択的に削除する方法を解説します。基本的な使い方から、フォームのリセットやテンプレート初期化などの実用例、パフォーマンス最適化のヒントまで詳しく紹介。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "clear(options)", "業務効率化"]
date: "2020-03-14T05:09:10.000Z"
url: "/gas/clearoptions"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年3月"]
lastmod: "2025-11-26T17:45:46+09:00"
---

Google Apps Script (GAS) はスプレッドシートの操作を自動化する強力なツールです。中でも `clear(options)` メソッドは、指定した範囲のデータや書式を柔軟に削除できるため、非常に便利です。しかし、オプションが多岐にわたるため、使いこなすのが難しいと感じる方もいるかもしれません。

この記事では、`clear(options)` メソッドの基本的な使い方から、具体的な活用例、パフォーマンスを意識した高度なテクニックまで、分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `clear(options)` メソッドの基本的な使い方

`clear(options)` メソッドは、`Range` オブジェクトに対して使用し、オプションを指定することで削除する対象を細かく制御できます。

基本的な構文は以下の通りです。

```javascript
// 例: 指定した範囲の値と書式のみを削除
range.clear({
  contentsOnly: true,   // 値と数式を削除
  formatOnly: true      // 書式を削除
});
```

このように、引数にオブジェクトを渡すことで、複数のオプションを組み合わせて使用できます。

### オプションの詳細

`clear(options)` で指定できる主なオプションは以下の通りです。

| オプション          | 影響範囲                         | 補足                                       |
| ------------------- | -------------------------------- | ------------------------------------------ |
| `contentsOnly`      | セルの値や数式                   | これを指定すると、数式の結果がクリアされます。 |
| `formatOnly`        | フォント、背景色、罫線などの書式 | 条件付き書式は削除されません。             |
| `commentsOnly`      | セルに紐づくコメント             | コメントが完全に削除されます。             |
| `validationsOnly`   | データ検証規則                   | ドロップダウンリストなどが解除されます。   |
| `skipFilteredRows`  | フィルタで非表示になっている行   | `true` にすると非表示行を処理から除外します。 |

例えば、値とコメントのみを削除したい場合は、次のように記述します。

```javascript
range.clear({
  contentsOnly: true, 
  commentsOnly: true
});
```

この柔軟性が `clear(options)` メソッドの大きな特徴です。

## 実践的な活用例

次に、具体的なシナリオに基づいた `clear(options)` の使用例を紹介します。

### 1. 入力フォームのリセット

ユーザーが入力したデータをクリアし、フォームを初期状態に戻す際に便利です。データ検証（ドロップダウンリストなど）は維持したまま、入力値のみを削除します。

```javascript
function resetForm() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('入力フォーム');
  const inputRange = sheet.getRange('B2:F10');
  
  // 値のみをクリアし、データ検証は残す
  inputRange.clear({ contentsOnly: true });
}
```
`validationsOnly`オプションを省略（または`false`に設定）することで、データ検証は維持されます。

### 2. レポートテンプレートの初期化

月次レポートなど、定型的なフォーマットの書式のみを初期化し、データは保持したい場合に活用できます。

```javascript
function initializeTemplate() {
  const templateSheet = SpreadsheetApp.getActive().getSheetByName('月次レポート');
  const formatArea = templateSheet.getRange('A1:M50');
  
  // 書式のみをクリア
  formatArea.clear({
    formatOnly: true,
    skipFilteredRows: true // フィルタで非表示の集計行などはスキップ
  });
}
```

## パフォーマンスを最適化するヒント

`clear` メソッドは便利ですが、大規模なデータを扱う際はパフォーマンスに注意が必要です。以下のポイントを意識することで、処理速度を向上させることができます。

- **バッチ処理**: `clear()` を何度も呼び出すのではなく、`getRangeList()` などで複数の範囲をまとめて取得し、一度に処理する方が効率的です。
- **不要なオプションの除外**: 必要なオプションのみを指定し、不要な評価を避けることで処理を軽量化します。
- **スクリプトプロパティの活用**: `PropertiesService` を使って設定を外部管理することで、コードを変更せずに動的にオプションを切り替えることができ、保守性が向上します。

## セキュリティとログ記録

データの削除は重要な操作であるため、誰がいつどのような操作を行ったかを記録しておくことが推奨されます。以下は、操作ログを残す関数の例です。

```javascript
function loggedClear(range, options) {
  const auditSheet = SpreadsheetApp.getActive().getSheetByName('監査ログ');
  
  // ログに行を追加
  auditSheet.appendRow([
    new Date(),
    Session.getActiveUser().getEmail(),
    range.getA1Notation(),
    JSON.stringify(options)
  ]);
  
  // クリア処理を実行
  range.clear(options);
}
```

このようにログを残すことで、意図しないデータ削除が発生した際の原因追跡が容易になります。

## まとめ

`clear(options)` メソッドは、スプレッドシートのデータや書式をきめ細かく制御できる、GASの非常に強力な機能です。

本記事で紹介した基本的な使い方から応用例までを参考に、ぜひあなたの業務自動化に役立ててください。まずは簡単なスクリプトから試してみて、その便利さを実感することをおすすめします。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://kujiride.com/2024/04/11/google-apps-script-gas-how-to-delete-values-in-a-sheet/" >}} 
  
{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range" >}} 
  
{{< blog-card "https://gsuiteguide.jp/sheets/clearoptions/" >}}
