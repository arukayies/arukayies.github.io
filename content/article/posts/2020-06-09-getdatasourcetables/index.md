---
title: GASでスプレッドシートのBigQueryデータソースを効率的に取得する方法
author: arukayies
date: 2020-06-09T14:29:59+00:00
excerpt: GASでスプレッドシートのBigQueryで使うデータを取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1591713000
the_review_rate:
  - 5
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
tags:
  - "GAS"
tags:
  - GAS
  - getDataSourceTables()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
こんにちは！今回はGoogle Apps Script（GAS）の`getDataSourceTables()`メソッドを使いこなすための実践ガイドをお届けするけ。これを覚えておけば、スプレッドシート内のデータソースを自在に操作できるようになるけん、ぜひチェックしてみてな！


## 基本的な仕組み

### データソーステーブルとは？

まず最初に、`getDataSourceTables()`が返す「データソーステーブル」って何かを理解しないといけんばい。これは、BigQueryなどの外部データとスプレッドシートをつなげる役割をしてるんじゃけど、普通のスプレッドシートとはちょっと違う構造になっとるんよね。主に以下の要素で構成されとるよ。

<ul class="wp-block-list">
  <li>
    <strong>データソース仕様（Spec）</strong>：接続するプロジェクトやクエリの情報
  </li>
  <li>
    <strong>実行状態（Status）</strong>：更新の進行具合やエラー情報
  </li>
  <li>
    <strong>メタデータ</strong>：最終更新日時や行数などの情報
  </li>
</ul>

<pre class="wp-block-code"><code>// 基本的なテーブル取得方法
const dataSourceTables = SpreadsheetApp.getActiveSheet().getDataSourceTables();
dataSourceTables.forEach(table =&gt; {
  console.log(table.getStatus().getExecutionState()); // 実行状態の確認
});
</code></pre>

## 主要メソッドとその使い方

### データ更新の方法

データの更新を制御するには、以下のメソッドを使うけど、覚えておくと便利だよ！<figure class="wp-block-table">

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド名
    </th>
    
    <th>
      役割
    </th>
    
    <th>
      タイムアウト設定
    </th>
    
    <th>
      強制更新フラグ
    </th>
  </tr>
  
  <tr>
    <td>
      <code>refreshData()</code>
    </td>
    
    <td>
      通常のデータ更新
    </td>
    
    <td>
      不要
    </td>
    
    <td>
      ×
    </td>
  </tr>
  
  <tr>
    <td>
      <code>forceRefreshData()</code>
    </td>
    
    <td>
      エラーがあっても強制的に更新
    </td>
    
    <td>
      不要
    </td>
    
    <td>
      ◯
    </td>
  </tr>
  
  <tr>
    <td>
      <code>waitForCompletion()</code>
    </td>
    
    <td>
      更新完了を待機する
    </td>
    
    <td>
      必須（60-300秒）
    </td>
    
    <td>
      &#8211;
    </td>
  </tr>
</table></figure> 

<pre class="wp-block-code"><code>// 更新処理の例
try {
  dataSourceTable.refreshData();
} catch (e) {
  dataSourceTable.forceRefreshData(); // エラーから復帰
}
dataSourceTable.waitForCompletion(300); // 5分待つ
</code></pre>

### 実行状態の監視とエラーハンドリング

実行状態は`getStatus()`で確認できるけど、状態によってどんな処理をするかを分けることができるんじゃけど、これを覚えておくと便利だよ！

<pre class="wp-block-code"><code>// 実行状態に応じた処理
const status = dataSourceTable.getStatus();
switch(status.getExecutionState()) {
  case SpreadsheetApp.DataExecutionState.FAILED:
    handleError(status.getErrorCode());
    break;
  case SpreadsheetApp.DataExecutionState.SUCCEEDED:
    processData(table.getRange());
    break;
}
</code></pre>

## よくある活用方法

### 複数のテーブルを一括更新

複数のデータソーステーブルをまとめて更新する時に役立つ処理だよ！これを使えば、スプレッドシート内の全てのデータを効率よく更新できるけ。

<pre class="wp-block-code"><code>function refreshAllDataSourceTables() {
  const sheets = SpreadsheetApp.getActive().getSheets();
  sheets.forEach(sheet =&gt; {
    const tables = sheet.getDataSourceTables();
    if (tables.length === 0) return;
    
    SpreadsheetApp.enableAllDataSourcesExecution();
    tables.forEach(table =&gt; {
      table.forceRefreshData();
      table.waitForCompletion(300);
    });
  });
}
</code></pre>

### ダイナミックなクエリ更新

たとえば、UIからクエリを動的に変更して、データソースの設定を変更する場合にも使えるんじゃけど、こんな感じで組み合わせて使うと便利ばい。

<pre class="wp-block-code"><code>function updateQueryParameters() {
  const paramSheet = SpreadsheetApp.getActive().getSheetByName('Params');
  const projectId = paramSheet.getRange('B1').getValue();
  const queryTemplate = paramSheet.getRange('B2').getValue();

  const dataSource = dataSourceTable.getDataSource();
  const newSpec = dataSource.getSpec()
    .asBigQuery()
    .setProjectId(projectId)
    .setRawQuery(queryTemplate)
    .build();
  
  dataSource.updateSpec(newSpec); // 仕様を更新
}
</code></pre>

## 効率的なデータ処理

### バッチ処理の導入

大量のデータを扱う時は、バッチ処理を使うと効率的に進められるけ。例えば、複数のテーブルをグループに分けて処理する方法を使うと便利ばい。

<pre class="wp-block-code"><code>function batchUpdateTables(tables) {
  const BATCH_SIZE = 5; // BigQuery並列処理の上限
  const batches = chunkArray(tables, BATCH_SIZE);

  batches.forEach(batch =&gt; {
    const promises = batch.map(table =&gt; {
      return new Promise(resolve =&gt; {
        table.refreshData();
        table.waitForCompletion(300);
        resolve();
      });
    });
    Promise.all(promises).then(processNextBatch);
  });
}
</code></pre>

### キャッシュ戦略

キャッシュを使うことで、頻繁にデータを取得する場合でもパフォーマンスを向上させることができるんじゃけど、これも覚えておくと便利だよ。

<pre class="wp-block-code"><code>const CACHE_EXPIRY = 60 * 30; // 30分キャッシュ
const cache = CacheService.getScriptCache();

function getCachedData(table) {
  const key = `table_${table.getDataSource().getProjectId()}`;
  let data = cache.get(key);
  
  if (!data) {
    data = table.getRange().getValues();
    cache.put(key, JSON.stringify(data), CACHE_EXPIRY);
  }
  return JSON.parse(data);
}
</code></pre>

## セキュリティと権限管理

データを操作するには、適切なスコープや権限が必要なんじゃけど、そのあたりも押さえておくべきポイントばい。<figure class="wp-block-table">

<table class="has-fixed-layout">
  <tr>
    <th>
      操作内容
    </th>
    
    <th>
      必須OAuthスコープ
    </th>
  </tr>
  
  <tr>
    <td>
      データソースの参照
    </td>
    
    <td>
      <code>https://www.googleapis.com/auth/spreadsheets.currentonly</code>
    </td>
  </tr>
  
  <tr>
    <td>
      データ更新・仕様変更
    </td>
    
    <td>
      <code>https://www.googleapis.com/auth/spreadsheets</code>
    </td>
  </tr>
</table></figure> 

## まとめ

`getDataSourceTables()`メソッドを活用すれば、Google SheetsとBigQueryを使ったデータ連携がぐっと楽になるけん、ぜひこのガイドを参考にしてみてな！データ更新の制御やエラーハンドリング、バッチ処理といったテクニックを駆使して、さらに効率よくデータ操作を行えるようになるはずじゃ！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-table" title="Class DataSourceTable  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/v90b15eef664021f94a1ab8a4ca14c533325a9006d6183b165fb79714a6fcd6a0/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/v90b15eef664021f94a1ab8a4ca14c533325a9006d6183b165fb79714a6fcd6a0/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Class DataSourceTable  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/data-source-table" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/data-source-table" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://stackoverflow.com/questions/62921520/connected-sheets-cannot-be-targeted-with-macros-or-scripts" title="Attention Required! | Cloudflare" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstackoverflow.com%2Fquestions%2F62921520%2Fconnected-sheets-cannot-be-targeted-with-macros-or-scripts?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstackoverflow.com%2Fquestions%2F62921520%2Fconnected-sheets-cannot-be-targeted-with-macros-or-scripts?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Attention Required! | Cloudflare
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/62921520/connected-sheets-cannot-be-targeted-with-macros-or-scripts" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/62921520/connected-sheets-cannot-be-targeted-with-macros-or-scripts" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          stackoverflow.com
        </div>
      </div>
    </div>
  </div></a>
</div>
