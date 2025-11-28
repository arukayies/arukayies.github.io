---
title: "【GASスプレッドシート】セルの表示形式を取得するgetNumberFormat()徹底解説・SEO最適化"
description: "Google Apps Script (GAS) の`getNumberFormat()`メソッドを徹底解説。スプレッドシートの単一セル表示形式（数値、日付、通貨、パーセンテージなど）を効率的に取得する方法、`getNumberFormats()`との違い、書式自動チェック・修正の応用例を具体的なコードで紹介します。GASによるデータ品質向上とスプレッドシート自動化に役立つ情報満載です。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getNumberFormat", "getNumberFormats", "表示形式", "数値書式", "日付書式", "通貨書式", "自動化", "データ検証", "データ品質", "効率化", "プログラム", "開発"]
date: "2020-08-06T12:21:47.000Z"
lastmod: "2025-11-20T00:00:00.000Z"
url: "/gas/getnumberformat"
share: true
toc: true
categories: "gas"
archives: ["2020年8月"]
---

Google Apps Script (GAS) を利用してスプレッドシートを操作する際、データの正確性を保つ上で**セルの表示形式（数値、日付、通貨など）の管理**は非常に重要です。例えば、「この日付セルは正しいフォーマットか？」「数値は通貨形式になっているか？」といった検証作業は、データの整合性を維持するために欠かせません。

本記事では、GASで単一セルの表示形式を効率的に取得できる`getNumberFormat()`メソッドの基本的な使い方から、複数セルの形式を一括で扱う`getNumberFormats()`、さらには取得した情報に基づいて**表示形式を自動でチェックし、修正する実践的な応用例**までを徹底解説します。

GASを活用してスプレッドシートのデータ品質を向上させたい方、より堅牢な自動化スクリプトを構築したい方に役立つ情報を提供します。

{{< affsearch keyword="GAS スプレッドシート 表示形式 自動化 入門" img="/gas.jpg">}}

## getNumberFormat() とは？GASでセルの表示形式を取得する基本

`getNumberFormat()` メソッドは、Google Apps Scriptの `Range` オブジェクトに用意されており、**指定した単一セルに設定されている表示形式を文字列として取得**します。これにより、例えば日付形式の`"yyyy/MM/dd"`や、数値形式の`"#,##0"`といった書式ルールをプログラムで識別し、後続の処理に活用できるようになります。

### 基本的な使用例：A1セルの表示形式を取得する

`getNumberFormat()` の使い方は非常にシンプルです。`getRange()` で対象のセル（単一セル）を取得し、そのRangeオブジェクトに対してメソッドを呼び出すだけです。

```javascript
/**
 * アクティブなシートのA1セルの表示形式を取得し、ログに出力する関数。
 * 例: "yyyy/MM/dd", "#,##0.00", "0.00%" など
 */
function checkCellFormat() {
  const sheet = SpreadsheetApp.getActiveSheet(); // アクティブなシートを取得
  const cell = sheet.getRange("A1");           // A1セルをRangeオブジェクトとして取得
  
  // A1セルの表示形式を文字列として取得
  const format = cell.getNumberFormat();
  
  // 取得した表示形式をログに出力
  Logger.log(`A1セルの表示形式: ${format}`);
}
```
このスクリプトを実行すると、`A1`セルに設定されている現在の表示形式の文字列がログに表示されます。

## 複数セルの表示形式を一括取得：getNumberFormats() の活用

`getNumberFormat()` が単一セル専用であるのに対し、**複数セルの表示形式を一度に取得したい場合**は、複数形の`getNumberFormats()` メソッドを使用します。これにより、パフォーマンスを最適化しつつ、広範囲のセルの表示形式情報を効率的に取得できます。

`getNumberFormats()` は、指定した範囲の各セルの表示形式を**二次元配列**として返します。

```javascript
/**
 * 複数範囲のセルの表示形式を一括で取得し、ログに出力する関数。
 * getNumberFormat() との違いと効率性を確認します。
 */
function checkRangeFormats() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:B2"); // A1からB2までの範囲を指定

  // A1:B2範囲の各セルの表示形式を二次元配列で取得
  const formats = range.getNumberFormats();
  
  // 返される形式の例: [['#,##0', 'yyyy/MM/dd'], ['0.00%', '"¥"#,##0']]
  Logger.log(`A1:B2範囲の表示形式:\n${JSON.stringify(formats, null, 2)}`);
}
```
複数のセルをループして`getNumberFormat()`を繰り返し呼び出すよりも、`getNumberFormats()`で一括取得する方がGASの実行時間を短縮できるため、大規模なシートを扱う際には特に推奨されます。

## 実践例：GASで日付フォーマットを自動チェック・修正する

`getNumberFormat()`メソッドの強力な応用例として、指定したセルの日付フォーマットが期待通りの形式になっているかを自動で確認し、もし異なっていれば正しい形式に修正するスクリプトを構築してみましょう。これは、複数人でデータを入力するスプレッドシートなどで、データの入力規則を自動で維持するのに非常に役立ちます。

```javascript
/**
 * 指定したセルの日付フォーマットが期待通りかチェックし、必要に応じて修正する関数。
 * データ入力の整合性を自動で維持します。
 */
function ensureSpecificDateFormat() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = "売上データ"; // 対象のシート名
  const targetCellA1 = "C5";      // 日付が入力されるべきセルのA1表記

  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    Logger.log(`エラー: シート "${sheetName}" が見つかりません。`);
    return;
  }

  const dateCell = sheet.getRange(targetCellA1); // 対象のセルを取得
  const expectedFormat = "yyyy-MM-dd";            // 期待する日付フォーマット
  const currentFormat = dateCell.getNumberFormat(); // 現在のセルの表示形式を取得
  
  // 現在のフォーマットが期待するものでない場合
  if (currentFormat !== expectedFormat) {
    // 正しいフォーマットに設定し直す
    dateCell.setNumberFormat(expectedFormat);
    Logger.log(`セル ${targetCellA1} のフォーマットを "${expectedFormat}" に修正しました。 (旧形式: ${currentFormat})`);
  } else {
    Logger.log(`セル ${targetCellA1} のフォーマットは既に "${expectedFormat}" で正常です。`);
  }
}
```
このスクリプトを定期的に実行するようトリガー設定することで（例：毎日深夜に実行）、シート内の日付データの表示形式が常に統一され、後のデータ処理でのエラーリスクを低減できます。

## GASでよく使われる代表的な表示形式の文字列一覧

`getNumberFormat()`で取得できる表示形式の文字列は多岐にわたりますが、ここではスプレッドシートでよく使用される代表的なフォーマットとその表示例、データの種類をまとめました。これらの文字列を知っておくことで、スクリプトでの条件分岐や`setNumberFormat()`での設定がよりスムーズに行えます。

| フォーマット文字列 | 表示例 | データの種類 | 解説 |
| :--- | :--- | :--- | :--- |
| `#,##0` | 12,345 | 整数 | 3桁区切りの整数表示 |
| `#,##0.00` | 12,345.67 | 小数点付き数値 | 3桁区切り、小数点以下2桁表示 |
| `0.00%` | 98.76% | パーセンテージ | 小数点以下2桁のパーセンテージ表示 |
| `yyyy-MM-dd` | 2025-03-06 | 日付 | 年-月-日形式の日付表示 |
| `h:mm:ss` | 14:30:05 | 時刻 | 時:分:秒形式の時刻表示 |
| `yyyy/MM/dd h:mm` | 2025/03/06 14:30 | 日付と時刻 | 年/月/日 時:分形式 |
| `[$¥-411]#,##0` | ¥12,345 | 通貨（円） | 日本円の通貨表示（3桁区切り） |
| `[$$-409]#,##0.00` | $12,345.67 | 通貨（ドル） | 米ドルの通貨表示（3桁区切り、小数点以下2桁） |
| `0.0E+00` | 1.2E+03 | 指数表記 | 科学的な指数表記 |
| `@` | (そのまま表示) | 文字列 | 数値として扱わず、入力値をそのまま文字列として表示 |

これらのフォーマット文字列は、スプレッドシートの「表示形式」メニューで「カスタム数値形式」を選択すると確認できます。スクリプトで表示形式を操作する際には、これらの文字列を正確に指定する必要があります。

## まとめ：getNumberFormat() でスプレッドシートのデータ管理を自動化

`getNumberFormat()` および `getNumberFormats()` メソッドは、Google Apps Scriptにおけるスプレッドシートのデータ品質管理と自動化において非常に強力なツールです。

*   **セルの表示形式を正確に取得**: 単一セルであれば`getNumberFormat()`、複数セル範囲であれば`getNumberFormats()`を使って、現在の表示形式を文字列として取得できます。
*   **データ検証と自動修正**: 取得した表示形式情報に基づき、期待するフォーマットと異なる場合に自動で修正するスクリプトを構築することで、データの整合性を維持し、エラーを未然に防ぎます。
*   **効率的なスクリプト開発**: 適切なメソッドを選択することで、スクリプトのパフォーマンスを最適化し、大規模なスプレッドシートでも高速に処理を行えます。

GASによるスプレッドシートの自動化を進める上で、セルの表示形式の管理は避けて通れない課題です。本記事で紹介した知識と実践例を活用し、より堅牢で効率的なGASスクリプトの開発に役立ててください。

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}} 
  
{{< blog-card "https://gsuiteguide.jp/sheets/getnumberformat/" >}}
