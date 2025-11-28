---
title: "【GASスプレッドシート】getVerticalAlignments()で複数セルの垂直配置を一括取得・SEO最適化"
description: "Google Apps Script (GAS)の`getVerticalAlignments()`メソッドを徹底解説。スプレッドシートの複数セルの垂直配置（上寄せ、中央揃え、下寄せ）を効率的に二次元配列で一括取得する方法を、具体的なコード例で紹介します。`getVerticalAlignment()`との違い、`setVerticalAlignments()`での一括設定、内容に応じた条件付き整形、変更履歴ログ化、パフォーマンス最適化まで、GASによるスプレッドシート自動化とレイアウト調整に役立つ情報満載です。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getVerticalAlignments", "getVerticalAlignment", "setVerticalAlignments", "setVerticalAlignment", "垂直配置", "セル書式", "一括取得", "自動化", "効率化", "パフォーマンス", "プログラム", "開発", "UI/UX"]
date: "2020-09-22T09:02:02.000Z"
lastmod: "2025-11-18T00:00:00.000Z"
url: "/gas/getverticalalignments"
share: true
toc: true
categories: "gas"
archives: ["2020年9月"]
---

Google Apps Script (GAS) を用いてスプレッドシートのレイアウトを調整する際、特に**大規模なデータや複数シートを扱う場合**には、複数セルの「垂直配置」（上寄せ、中央揃え、下寄せ）を効率的に管理することが、データの視認性やデザインの整合性を保つ上で非常に重要になります。`getVerticalAlignments()`メソッドは、このニーズに応える強力な一括取得機能を提供します。

本記事では、GASの`Range.getVerticalAlignments()`メソッドを徹底解説します。複数セルの垂直配置を二次元配列として一括取得する基本から、`getVerticalAlignment()`との違い、`setVerticalAlignments()` / `setVerticalAlignment()`による垂直配置の効率的な設定方法、さらには**コンテンツ長や条件に応じた自動配置調整**、変更履歴の記録、パフォーマンス最適化といった実践的な応用例まで、具体的なコードを交えて分かりやすく紹介します。

GAS初心者から、スプレッドシートの視覚的表現と自動化の効率をさらに高めたい上級者まで、すべての方に役立つ情報が満載です。

{{< affsearch keyword="GAS スプレッドシート 垂直配置 一括取得 自動化" img="/gas.jpg">}}

## `getVerticalAlignments()`メソッドとは？GASで複数セルの垂直配置を一括取得する基本

`Range.getVerticalAlignments()`メソッドは、Google Apps Scriptにおいて、**指定したセル範囲（Rangeオブジェクト）内のすべてのセルに設定されている垂直配置**を、一度のAPI呼び出しでまとめて**二次元文字列配列**として取得するための機能です。

このメソッドを使用することで、広範囲のセルに設定されている垂直配置（`"top"`, `"middle"`, `"bottom"`）を一括でプログラム的に確認できます。これにより、個々のセルに対して`getVerticalAlignment()`を繰り返し呼び出す非効率性を解消し、スクリプトの実行速度を劇的に向上させることができます。

### `getVerticalAlignment()`と`getVerticalAlignments()`の違いと効率性

| 特徴 | `getVerticalAlignment()` | `getVerticalAlignments()` |
| :--- | :--- | :--- |
| **対象セル数** | 指定範囲の**左上の単一セル**のみ | **複数セル範囲**内のすべてのセル |
| **返り値** | `String` (`"top"`, `"middle"`, `"bottom"`) | `String[][]` (二次元文字列配列) |
| **効率性** | 単一セル向け。複数セルへのループ処理ではAPI呼び出しが増え非効率 | 一度のAPI呼び出しで複数セルの情報を取得できるため**効率的** |

### 基本的な使用例：A1からC3範囲の垂直配置を一括取得する

以下のスクリプトは、アクティブなシートの`A1:C3`範囲の垂直配置を一括で取得し、その二次元配列の内容をログに出力する最も基本的な例です。

```javascript
/**
 * アクティブなシートのA1:C3範囲の全セルの垂直配置を二次元配列として一括取得し、ログに出力する関数。
 */
function getAndLogAllVerticalAlignments() {
  const sheet = SpreadsheetApp.getActiveSheet(); // アクティブなシートを取得
  const range = sheet.getRange("A1:C3");      // 対象範囲をA1:C3に設定
  
  // 指定範囲の各セルの垂直配置を二次元配列として一括取得
  const alignments = range.getVerticalAlignments();

  // 取得した二次元配列の内容をJSON形式でログに出力 (視認性のため整形)
  Logger.log(`A1:C3範囲の垂直配置:\n${JSON.stringify(alignments, null, 2)}`);
  /* 例: alignments の出力形式
   * [
   *   ["top", "middle", "bottom"],
   *   ["bottom", "top", "middle"],
   *   ["middle", "bottom", "top"]
   */

  // 各セルのアドレスと共に垂直配置を出力する例
  alignments.forEach((rowAlignments, rowIndex) => {
    rowAlignments.forEach((alignment, colIndex) => {
      // getCell(row, column) は1から始まるインデックス
      const cellAddress = range.getCell(rowIndex + 1, colIndex + 1).getA1Notation();
      Logger.log(`セル ${cellAddress}: 垂直配置 "${alignment}"`);
    });
  });
}
```
このコードを実行すると、`A1:C3`範囲内のすべてのセルに設定されている垂直配置がログに表示されます。

## `getVerticalAlignments()`の実践的な応用テクニック

`getVerticalAlignments()`とその関連メソッドは、スプレッドシートのレイアウトを自動化し、データ表示の視認性を向上させる多岐にわたる場面で真価を発揮します。

### 1. セルの垂直配置を動的に変更する：`setVerticalAlignments()` / `setVerticalAlignment()`

`getVerticalAlignments()`で現在の配置を取得した後、`setVerticalAlignments()`や`setVerticalAlignment()`を使って、目的の垂直配置を設定できます。

#### `setVerticalAlignment(alignment)`で範囲全体に同じ配置を設定

指定したRangeオブジェクト（単一セルまたは複数セル範囲）内のすべてのセルに、同じ垂直配置を一括で設定します。

```javascript
/**
 * A1からC3の範囲のすべてのセルの垂直配置を「中央揃え」に設定する関数。
 */
function setRangeVerticalAlignmentExample() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:C3");
  range.setVerticalAlignment("middle"); // 全セルを中央揃えに設定
  Logger.log(`A1:C3範囲の垂直配置を「中央揃え」に設定しました。`);
}
```

#### `setVerticalAlignments(alignments)`でセルごとに異なる配置を一括設定

セルごとに異なる垂直配置を設定したい場合は、`getVerticalAlignments()`が返すような二次元配列で各セルの配置文字列（`"top"`, `"middle"`, `"bottom"`）を渡し、`setVerticalAlignments()`メソッドで一括設定します。この際、渡す二次元配列のサイズは、対象Rangeオブジェクトのサイズと完全に一致している必要があります。

```javascript
/**
 * A1からC3範囲の各セルに異なる垂直配置を一括で設定する関数。
 */
function setMultipleVerticalAlignmentsExample() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:C3");
  // 設定したい垂直配置を二次元配列で定義
  const alignments = [
    ["top", "middle", "bottom"],   // A1, B1, C1
    ["bottom", "middle", "top"],   // A2, B2, C2
    ["middle", "top", "bottom"]    // A3, B3, C3
  ];
  range.setVerticalAlignments(alignments); // 垂直配置を一括設定
  Logger.log(`A1:C3範囲の各セルに異なる垂直配置を設定しました。`);
}
```

### 2. コンテンツ長や条件に応じた垂直配置の自動調整

セルの内容（例: テキスト長、特定のキーワードの有無）に基づいて、垂直配置を動的に調整する機能は、スプレッドシートの見た目を自動で最適化し、手動での調整の手間を削減する上で非常に役立ちます。

```javascript
/**
 * セルの内容のテキスト長に応じて、垂直配置を自動調整する関数。
 * テキスト長が50文字を超えるセルは「上寄せ」、それ以外は「中央揃え」に設定します。
 */
function autoAdjustVerticalAlignmentBasedOnContent() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange(); // シート内のデータが存在する全範囲を取得
  const values = dataRange.getValues();   // 全範囲のセル値を取得（テキスト長取得用）
  const newAlignments = [];               // 新しい垂直配置を格納する二次元配列

  values.forEach(rowValues => {
    const rowAlignments = [];
    rowValues.forEach(cellValue => {
      // セル値のテキスト長に基づいて垂直配置を決定
      if (String(cellValue).length > 50) { // 例: 50文字を超える場合
        rowAlignments.push("top");       // 上寄せ
      } else {
        rowAlignments.push("middle");    // 中央揃え
      }
    });
    newAlignments.push(rowAlignments);
  });
  
  // 生成した新しい垂直配置を一括でシートに適用
  dataRange.setVerticalAlignments(newAlignments);
  Logger.log("セルの内容に応じて垂直配置を自動調整しました。");
}
```

### 3. 垂直配置の変更履歴をシートに記録する

スプレッドシートのレイアウト変更を追跡したり、誤った変更から復元したりするために、垂直配置の変更履歴を別のシートに記録する機能は非常に有用です。`getVerticalAlignments()`で現在の状態を取得し、`JSON.stringify()`で文字列化してログシートに書き込むことができます。

```javascript
/**
 * 指定範囲の垂直配置を現在のタイムスタンプと共に履歴シートに記録する関数。
 * 「履歴ログシート」という名前のシートが存在することを前提とします。
 */
function monitorVerticalAlignmentChanges() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const historySheet = ss.getSheetByName('履歴ログシート'); // 履歴を記録するシート名

  if (!historySheet) {
    Logger.log("エラー: 履歴ログシートが見つかりません。");
    return;
  }

  const rangeToMonitor = sheet.getRange('A1:C10'); // 監視対象範囲
  const currentAlignments = rangeToMonitor.getVerticalAlignments(); // 現在の垂直配置を一括取得
  const timestamp = new Date(); // 現在のタイムスタンプ

  // 履歴シートに、タイムスタンプと垂直配置のJSON文字列を追記
  historySheet.appendRow([
    timestamp.toISOString(), // ISO形式の日時文字列
    JSON.stringify(currentAlignments) // 垂直配置の二次元配列をJSON文字列に変換
  ]);
  Logger.log(`範囲 ${rangeToMonitor.getA1Notation()} の垂直配置変更履歴を記録しました。`);
}
```
記録されたJSON文字列を解析することで、過去のレイアウト状態を再現したり、差分を比較したりすることが可能になります。

## まとめ：`getVerticalAlignments()`でGASスプレッドシートのレイアウト自動化を最大化

Google Apps Scriptの`getVerticalAlignments()`メソッドは、スプレッドシートの複数セルの垂直配置をプログラムで効率的に管理するための、非常に強力なツールです。

*   **高速な垂直配置の一括取得**: 複数セルの垂直配置（上寄せ、中央揃え、下寄せ）を一度のAPI呼び出しで二次元配列として取得できるため、スクリプトの実行速度と効率が大幅に向上します。
*   **柔軟な垂直配置の設定**: `setVerticalAlignments()`でセルごとに異なる配置を一括設定し、複雑なレイアウト要件にも対応可能です。
*   **動的なレイアウト調整と履歴管理**: コンテンツ長や条件に基づいた自動調整、レイアウト変更履歴の記録機能など、手動作業を削減し、シートの視認性とデザインの一貫性を保てます。
*   **効率的なスクリプト開発**: バッチ処理（`getVerticalAlignments()`, `setVerticalAlignments()`）を徹底することで、API呼び出し回数を減らし、スクリプトのパフォーマンスを最大化できます。

本記事で紹介した`getVerticalAlignments()`の知識と実践例を活用し、あなたのGASスクリプトをより高度で柔軟なスプレッドシート自動化ツールへと進化させてください。垂直配置の細かな制御は、ユーザーエクスペリエンスの向上とデータ表示の正確性に大きく貢献します。

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range" >}} 
  
{{< blog-card "https://gsuiteguide.jp/sheets/getverticalalignments/" >}} 
  
{{< blog-card "https://developers.google.com/apps-script/guides/support/best-practices" >}} 
  
{{< blog-card "https://qiita.com/koichiro-h/items/aa6c1e37fd51f671aa89" >}}
