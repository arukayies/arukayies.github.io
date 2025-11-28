---
title: "【GAS】getDataSourceTables()でBigQueryデータソース表を取得・更新する方法"
description: "GASの`getDataSourceTables()`を使い、スプレッドシートに接続されたBigQueryなどの「データソース表」を操作する方法を解説。`refreshData()`によるデータ更新の自動化、`waitForCompletion()`での同期処理、そして複数のデータソースを一括で扱う実践的なテクニックをコード付きで紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "BigQuery", "getDataSourceTables", "データ連携", "自動化"]
date: "2020-06-09T14:29:59.000Z"
url: "/gas/getdatasourcetables"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-25T00:00:00+00:00"
---

Googleスプレッドシートの「接続されたシート」機能は、BigQueryなどの外部データを直接扱える強力な機能ですが、そのデータ更新を自動化したいと考えたことはありませんか？ `getDataSourceTables()`は、このデータソースとの連携をGoogle Apps Script (GAS)から制御するための専門的なメソッドです。

この記事では、`getDataSourceTables()`を使ってデータソース表を取得し、そのデータをプログラムで更新・管理する方法を解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## getDataSourceTables()とは？

`getDataSourceTables()`は、特定のシートに存在する**データソース表**（`DataSourceTable`オブジェクト）を配列として取得するメソッドです。

データソース表は、見た目は通常のセル範囲ですが、内部にはBigQueryへの接続情報やクエリ、更新状態などを持つ特殊なオブジェクトです。このメソッドを使うことで、GASからこれらのデータソース表にアクセスし、操作することが可能になります。

```javascript
function findDataSourceTables() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // シート内の全てのデータソース表を取得
  const dataSourceTables = sheet.getDataSourceTables();

  if (dataSourceTables.length > 0) {
    console.log(`このシートには ${dataSourceTables.length} 個のデータソース表があります。`);
  } else {
    console.log("このシートにデータソース表はありません。");
  }
}
```

## データの更新を自動化する

データソース表の最も一般的な操作は、データの更新です。これには`refreshData()`と`waitForCompletion()`の2つのメソッドが鍵となります。

### `refreshData()` と `forceRefreshData()`

- **`refreshData()`**: データソースの更新を開始します。更新処理はバックグラウンドで非同期に行われます。
- **`forceRefreshData()`**: エラーが発生している状態でも強制的に更新を開始します。

### `waitForCompletion(timeoutInSeconds)`

`refreshData()`は処理の完了を待たないため、更新が終わるまで待機したい場合は`waitForCompletion()`を使います。

- **`timeoutInSeconds`**: タイムアウトまでの秒数を指定します（最大300秒）。指定した時間内に更新が完了しない場合、スクリプトはエラーをスローします。

### 実践例：データソースを定期的に更新する

以下のスクリプトは、特定のスプレッドシートに含まれる全てのデータソース表を強制的に更新します。この関数をトリガーで定期実行すれば、データの鮮度を自動で保つことができます。

```javascript
function refreshAllDataSources() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const allSheets = ss.getSheets();

  // スプレッドシート全体のデータソース実行を有効にする
  SpreadsheetApp.enableAllDataSourcesExecution();

  allSheets.forEach(sheet => {
    const tables = sheet.getDataSourceTables();
    
    tables.forEach(table => {
      console.log(`[${sheet.getName()}]シートのデータソースを更新中...`);
      try {
        // 更新を開始し、完了を最大5分間待つ
        table.refreshData();
        table.waitForCompletion(300); 
        
        const status = table.getStatus();
        if (status.getExecutionState() === SpreadsheetApp.DataExecutionState.SUCCEEDED) {
          console.log("更新が正常に完了しました。");
        } else {
          console.error(`更新に失敗しました: ${status.getErrorCode()}`);
        }
      } catch (e) {
        console.error(`更新中にエラーが発生しました: ${e.message}`);
      }
    });
  });
}
```

## データソースの仕様を動的に変更する

`updateSpec()`メソッドを使えば、GASからBigQueryのクエリを動的に変更することも可能です。

例えば、特定の日付範囲のデータだけを取得するように、クエリ内の日付文字列を書き換えることができます。

```javascript
function updateQueryByDate() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const table = sheet.getDataSourceTables()[0]; // 最初のデータソース表を対象とする
  
  // 今日の日付を 'YYYY-MM-DD' 形式で取得
  const today = Utilities.formatDate(new Date(), "JST", "yyyy-MM-dd");
  
  const spec = table.getDataSource().getSpec();
  const originalQuery = spec.asBigQuery().getRawQuery();

  // クエリ内のプレースホルダを今日の日付で置換
  const newQuery = originalQuery.replace("{{TARGET_DATE}}", today);

  // 新しいクエリで仕様を更新
  const newSpec = spec.asBigQuery().setRawQuery(newQuery).build();
  table.getDataSource().updateSpec(newSpec);
  
  console.log("クエリを更新しました。");
}
```

## まとめ

`getDataSourceTables()`と関連メソッドを使いこなすことで、スプレッドシートとBigQueryのデータ連携を高度に自動化できます。

-   **`getDataSourceTables()`** でシート内のデータソース表にアクセス。
-   **`refreshData()`** と **`waitForCompletion()`** でデータ更新を自動化・同期。
-   **`updateSpec()`** でクエリを動的に変更し、より柔軟なデータ取得を実現。

これらのテクニックを活用して、データ分析やレポーティング業務の効率を飛躍的に向上させましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/data-source-table" >}} 
  
{{< blog-card "https://stackoverflow.com/questions/62921520/connected-sheets-cannot-be-targeted-with-macros-or-scripts" >}}
