---
title: GASでスプレッドシートの指定範囲からフィルター設定を取得・操作する方法
author: arukayies
date: 2020-06-20T05:36:12+00:00
excerpt: GASでスプレッドシートの指定範囲のフィルタークラスを取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1592631373
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
  - getFilter()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）の`getFilter()`メソッド、使いこなせてるかい？ スプレッドシートのフィルタ機能を自動化できる便利なメソッドばってん、意外と知らん人も多かばい。 今回は、その基本から応用テクニックまでしっかり解説するばい！


## getFilter()とは？

まず、`getFilter()`メソッドは何をするものか？ 簡単に言うと「指定した範囲のフィルタオブジェクトを取得する」ためのメソッドばい。

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
const range = sheet.getRange("A1:D100");
const filter = range.getFilter();

if (filter) {
  console.log("フィルタが適用されてるばい！");
} else {
  console.log("フィルタはまだ無かばい！");
}
</code></pre>

これを使えば、スプレッドシートのフィルタ状態を確認できるとさ。

## フィルタの基本ルール

フィルタ機能にはいくつかルールがあるばい。

<ul class="wp-block-list">
  <li>
    <strong>シートごとに1つのフィルタしか設定できん</strong>
  </li>
  <li>
    <strong>フィルタ範囲は連続したセル範囲であること</strong>
  </li>
  <li>
    <strong>フィルタを使えば、特定の条件に合うデータだけを表示できる</strong>
  </li>
</ul>

この基本を押さえておくと、スクリプトを組むときに迷わんじゃろ。

## getFilter()の実践的な活用

### 1. 既存のフィルタをチェックする

<pre class="wp-block-code"><code>function checkExistingFilter() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:D100");
  const existingFilter = range.getFilter();

  if (existingFilter) {
    console.log(`既存フィルタ範囲: ${existingFilter.getRange().getA1Notation()}`);
  } else {
    console.log('フィルタは存在しません');
  }
}
</code></pre>

### 2. フィルタを削除して再設定する

<pre class="wp-block-code"><code>function refreshFilter() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  
  // 既存フィルタを削除
  const oldFilter = dataRange.getFilter();
  if (oldFilter) oldFilter.remove();

  // 新規フィルタ作成
  const newFilter = dataRange.createFilter();
}
</code></pre>

### 3. フィルタ条件を動的に適用する

<pre class="wp-block-code"><code>function applyDynamicFilters() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const filter = sheet.getFilter() || sheet.getRange("A1:D").createFilter();

  const criteria = SpreadsheetApp.newFilterCriteria()
    .whenTextContains("重要")
    .build();

  filter.setColumnFilterCriteria(1, criteria);
}
</code></pre>

## まとめ

Google Apps Scriptの`getFilter()`を活用すれば、スプレッドシートのデータ管理がぐっと楽になるばい！

<ul class="wp-block-list">
  <li>
    <strong>既存のフィルタを確認できる</strong>
  </li>
  <li>
    <strong>不要なフィルタを削除して、新しく作成できる</strong>
  </li>
  <li>
    <strong>条件付きフィルタを適用して、データを自動整理できる</strong>
  </li>
</ul>

こん方法ばマスターすれば、スプレッドシートの業務効率も爆上がり間違いなしじゃ！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/v542d3325b8c925a6e7dd14f19a8348c865acec191636e2a431745f59e1ae1e12/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/v542d3325b8c925a6e7dd14f19a8348c865acec191636e2a431745f59e1ae1e12/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Class Range  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a>
</div>
