---
title: "【GASスプレッドシート】getValues()で複数セルデータを高速一括取得・SEO最適化"
description: "Google Apps Script (GAS)の`getValues()`メソッドを徹底解説。スプレッドシートの複数セルデータを二次元配列として高速に一括取得する方法を、具体的なコード例で紹介します。`getValue()`や`getDisplayValues()`との違い、データ型（数値、文字列、日付、真偽値）の挙動、そして大規模データ処理のためのパフォーマンスとメモリ最適化（チャンク処理）まで、GAS初心者から上級者まで役立つ情報満載です。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getValues", "getValue", "getDisplayValues", "セル値", "データ型", "二次元配列", "自動化", "一括取得", "高速化", "パフォーマンス", "メモリ最適化", "チャンク処理", "プログラム", "開発"]
date: "2020-09-22T03:49:18.000Z"
lastmod: "2025-11-20T00:00:00.000Z"
url: "/gas/getvalues"
share: true
toc: true
categories: "gas"
archives: ["2020年9月"]
---

Google Apps Script (GAS) を用いてスプレッドシートのデータを操作する際、**複数セルの値（データ）を効率的かつ高速に取得する**ことは、自動化スクリプトのパフォーマンスと信頼性を決定づける最も重要な要素の一つです。`getValues()`メソッドは、このニーズに応えるための基本的ながら極めて強力な機能です。

本記事では、GASの`Range.getValues()`メソッドを徹底解説します。複数セルのデータを二次元配列として一括取得する基本から、`getValue()`や`getDisplayValues()`との明確な違い、**各データ型（数値、文字列、日付、真偽値）の挙動**、さらには**大規模データ処理のためのパフォーマンス最適化（チャンク処理）**、そしてよくある「ハマりどころ」と対策まで、具体的なコード例を交えて分かりやすく紹介します。

GAS初心者の方から、スプレッドシート自動化の効率と信頼性をさらに高めたい上級者まで、すべての方に役立つ情報が満載です。

{{< affsearch keyword="GAS スプレッドシート データ取得 高速化 getValues" img="/gas.jpg">}}

## `getValues()`メソッドとは？GASで複数セルのデータを高速一括取得する基本

`Range.getValues()`メソッドは、Google Apps Scriptにおいて、**指定したセル範囲（Rangeオブジェクト）内のすべてのセルの値（データ）を、一度のAPI呼び出しでまとめて二次元配列として取得する**ための機能です。

これは、スプレッドシートのデータ全体や大規模なデータブロックを処理する際に、個々のセルに対して`getValue()`を繰り返し呼び出すことによるパフォーマンスのボトルネックを解消し、スクリプトの実行速度を劇的に向上させるための最も重要なベストプラクティスです。

### 基本的な使用例：A1からC3範囲のデータを一括取得する

以下のスクリプトは、アクティブなシートの`A1:C3`範囲の値を一括で取得し、その二次元配列の内容をログに出力する最も基本的な例です。

```javascript
/**
 * アクティブなシートのA1:C3範囲の全セルの値を二次元配列として一括取得し、ログに出力する関数。
 */
function getAllValuesBasic() {
  const sheet = SpreadsheetApp.getActiveSheet(); // アクティブなシートを取得
  const range = sheet.getRange("A1:C3");      // 対象範囲をA1:C3に設定
  const values = range.getValues();           // 範囲内の全セルの値を二次元配列として一括取得
  
  // 取得した二次元配列の内容をJSON形式でログに出力 (視認性のため整形)
  Logger.log(`A1:C3範囲の取得値:\n${JSON.stringify(values, null, 2)}`);
  /* 例: values の出力形式
   * [
   *   ["データ1", "データ2", "データ3"],
   *   [123, true, new Date("2024-01-01T00:00:00.000Z")],
   *   ["", "空", null] // 空白セルは空文字列""として取得されます
   * ]
   */
}
```
このコードを実行すると、`A1:C3`範囲内のすべてのセルに入力されている内容が、二次元配列としてログに表示されます。

## `getValue()` vs `getValues()` vs `getDisplayValues()`：明確な違いと使い分け

GASでセルの値を取得するメソッドには、`getValue()`、`getValues()`、`getDisplayValues()`の3種類があります。それぞれの特性を理解し、目的と状況に応じて適切に使い分けることが重要です。

| メソッド名 | 対象範囲 | 戻り値の型 | 特徴 | 主な用途 |
| :--- | :--- | :--- | :--- | :--- |
| `getValue()` | 単一セル | プリミティブ型 (`Number`, `String`, `Boolean`, `Date`) | セルの内部値を取得。書式設定は考慮されない。**パフォーマンス注意**。 | 特定の単一セルの値のみが必要な場合。 |
| `getValues()` | 複数セル | `Array<Array<any>>` (二次元配列) | 範囲内の全セルの内部値を取得。`getValue()`のバッチ版。**最も推奨される**。 | 大量データの内部値が必要な場合（計算、比較）。 |
| `getDisplayValues()` | 複数セル | `Array<Array<String>>` (二次元文字列配列) | 範囲内の全セルの**表示形式どおりの文字列**を取得。 | 書式設定を含めた表示内容（文字列）が必要な場合（レポート出力、UI表示）。 |

### 取得するデータ型に関する重要な注意点

*   **`getValues()`**: セルの内容に応じて、`Number`、`String`、`Boolean`、`Date`オブジェクトを返します。特に日付は`Date`オブジェクトとして取得されるため、その後の処理で日付操作がしやすいメリットがあります。空白セルは空文字列`""`として返されます。
*   **`getDisplayValues()`**: すべてのセルの値を**文字列として**返します。日付や数値も、スプレッドシート上で表示されている形式（例: `"2024/01/01"`, `"¥1,234"`, `"12.34%"`）の文字列として取得されます。

**使い分けのヒント**:
*   データを使って計算や比較を行う場合は、内部値を取得する**`getValues()`**が適しています。
*   スプレッドシートに表示されている内容をそのまま利用したい場合（例: レポート作成、メール本文への挿入）は、**`getDisplayValues()`**が便利です。
*   単一セルでも、ループ処理を行う場合は**`getValues()`**でまとめて取得する方がパフォーマンスが良いです。

## `getValues()`の効率的な活用術

`getValues()`は、データを高速に読み込むだけでなく、その後のデータ処理を効率的に行うための基盤となります。

### 1. 取得した二次元配列をループ処理で操作する

`getValues()`で取得した二次元配列は、JavaScriptの標準的な`Array.prototype.forEach()`や`Array.prototype.map()`などを使って簡単に操作できます。

```javascript
/**
 * A1からB10のデータを取得し、各行をログに出力する関数。
 */
function processDataWithForEach() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getRange("A1:B10").getValues(); // A1:B10のデータを一括取得

  Logger.log("A1:B10のデータ:");
  data.forEach((row, rowIndex) => { // 各行の配列をループ
    Logger.log(`  行 ${rowIndex + 1} のデータ: [${row.join(', ')}]`);
    // ここで各行データに対する処理を追加
  });
}
```

### 2. 数値データを変換して別の列に書き込む

取得した数値データを加工（例: 2倍にする）し、別のセル範囲に一括で書き戻すことも`getValues()`と`setValues()`を組み合わせることで効率的に行えます。`setValues()`は、`getValues()`で取得したような二次元配列の形式でデータを設定する必要があります。

```javascript
/**
 * A列の数値を2倍にし、結果をB列に書き込む関数。
 */
function doubleColumnAAndSetValues() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const sourceRange = sheet.getRange("A1:A10"); // A1からA10の範囲
  const values = sourceRange.getValues();       // A列の値を一括取得

  // 取得した値を2倍に加工し、新しい二次元配列を作成
  const doubledValues = values.map(row => [Number(row[0]) * 2]); // row[0]はA列の値
  
  const targetRange = sheet.getRange("B1:B10"); // 書き込み先のB1からB10の範囲
  targetRange.setValues(doubledValues);        // 新しい値を一括でB列に設定
  Logger.log("A列の値を2倍にし、B列に書き込みました。");
}
```
**重要な注意点**: `setValues()`を使用する際、設定する二次元配列の「行数と列数」が、`setValues()`を呼び出すRangeオブジェクトの「行数と列数」と**完全に一致している必要があります**。一致しない場合、エラーが発生します。

### 3. 大量データ処理のための最適化：`getLastRow()`とチャンク処理

スプレッドシートのデータ量が非常に多い場合（数万行以上）、`getDataRange().getValues()`でシート全体を一括取得しようとすると、GASのメモリ制限に達したり、実行時間が長くなりすぎたりする可能性があります。このような場合は、`getLastRow()`で最終行を特定し、データを小さな「チャンク（塊）」に分割して順次処理する手法が有効です。

```javascript
/**
 * シートのデータを1行目から最終行までチャンク（バッチ）に分割して処理する関数。
 * 各チャンクでA列の値を1.1倍にし、B列に書き込みます。
 */
function processLargeDataInChunks() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow(); // データが入力されている最終行番号を取得
  const chunkSize = 1000;             // 一度に処理する行のバッチサイズ
  
  Logger.log(`シートの最終行: ${lastRow}、チャンクサイズ: ${chunkSize}`);

  for (let i = 1; i <= lastRow; i += chunkSize) {
    const currentChunkNumRows = Math.min(chunkSize, lastRow - i + 1); // 現在のチャンクの行数を計算
    // 現在のチャンクのA列範囲を取得 (例: A1:A1000, A1001:A2000 ...)
    const sourceRange = sheet.getRange(i, 1, currentChunkNumRows, 1); 
    const values = sourceRange.getValues(); // チャンクのA列の値を一括取得

    // 取得した値を加工 (例: 1.1倍にする)
    const processedValues = values.map(row => [row[0] ? Number(row[0]) * 1.1 : row[0]]);

    // 加工した値をB列の対応するチャンク範囲に一括で書き込み
    const targetRange = sheet.getRange(i, 2, currentChunkNumRows, 1);
    targetRange.setValues(processedValues);
    
    Logger.log(`  チャンク処理済み: ${i}行目から${i + currentChunkNumRows - 1}行目`);
    // Utilities.sleep(100); // 必要に応じてAPI呼び出し間隔を調整し、API制限回避に役立てる
  }
  Logger.log("大規模データのチャンク処理が完了しました。");
}
```
チャンク処理は、メモリの圧迫を避けつつ、GASの実行制限（最大実行時間、API呼び出し回数など）を回避するために非常に効果的な手法です。

## よくあるハマりどころと解決策

*   **`setValues()`の配列形状不一致エラー**:
    `targetRange.setValues(data)`を実行する際、`data`の二次元配列の`行数`と`列数`が、`targetRange`の`getNumRows()`と`getNumColumns()`で取得される値と完全に一致している必要があります。
    *   **対策**: `getRange(開始行, 開始列, 行数, 列数)`で範囲を指定する際に、`getValues()`で取得した配列の`length`（行数）と`[0].length`（列数）を考慮して正確に範囲を定義しましょう。
*   **`getValue()`と`getDisplayValues()`の混同**:
    「数値12345」が「¥12,345」と表示されている場合、`getValue()`は`12345`（Number型）を返しますが、`getDisplayValues()`は`"¥12,345"`（String型）を返します。用途に応じてどちらのメソッドを使うべきか慎重に選びましょう。
    *   **対策**: 計算が必要なら`getValues()`、表示内容が重要なら`getDisplayValues()`と明確に使い分ける。

## まとめ：`getValues()`でGASスプレッドシートのデータ取得と処理を加速

Google Apps Scriptの`getValues()`メソッドは、スプレッドシートのデータを効率的かつ高速に取得するための中心的な機能です。これをマスターすることで、あなたのGASスクリプトは格段にパワフルなものへと進化します。

*   **高速な一括取得**: 複数セルのデータを一度のAPI呼び出しで二次元配列として取得し、スクリプトの実行パフォーマンスを最大化します。
*   **適切なデータ型管理**: `getValue()`、`getValues()`、`getDisplayValues()`の使い分けを理解し、セルの内容に応じた正確なデータ型で情報を取得・処理します。
*   **大規模データ処理の最適化**: `getLastRow()`との組み合わせやチャンク処理を導入することで、GASの実行制限を回避し、メモリ効率の良い堅牢なスクリプトを構築できます。
*   **堅牢なスクリプト開発**: `setValues()`の配列形状一致の原則を理解し、エラーが発生しないように正確に範囲とデータを定義します。

本記事で紹介した`getValues()`の知識と実践例を活用し、あなたのGASスプレッドシート自動化プロジェクトを次のレベルへと引き上げてください。データ取得の効率化は、あらゆる自動化の成功の鍵となります。

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range" >}} 
  
{{< blog-card "https://gsuiteguide.jp/sheets/getvalues/" >}} 
  
{{< blog-card "https://developers.google.com/apps-script/guides/support/best-practices" >}} 
  
{{< blog-card "https://qiita.com/kakakaori830/items/288307c7e639ac02ba7f" >}}
