---
title: GASでスプレッドシートのセルを削除し範囲を自動調整する方法
author: arukayies
date: 2020-05-28T14:23:24+00:00
excerpt: GASでスプレッドシートのセルを削除する方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1590675805
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
  - deleteCells(shiftDimension)
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年5月"]
---
Googleスプレッドシートを使いこなすなら、セルの削除は避けて通れない操作ばい！ 特に「deleteCells(shiftDimension)」メソッドを使うと、行や列を自由にシフトしながらスマートにデータ整理ができるっちゃ。 今回は、このメソッドの基本から実践的な使い方まで、わかりやすく解説するばい。


## deleteCellsメソッドとは？

このメソッドは、特定のセル範囲を削除した後、 ・行方向（ROWS） ・列方向（COLUMNS） にデータをシフトさせることができる便利な機能ばい。

### 基本構文

<pre class="wp-block-code"><code>range.deleteCells(shiftDimension);
</code></pre>

`range`：対象となるセル範囲 `shiftDimension`：削除後のシフト方向（行または列）

例えば、B4:C5の範囲を削除するときに`SpreadsheetApp.Dimension.COLUMNS`を指定すると、 右側のセルが左に詰められるばい。 逆に`SpreadsheetApp.Dimension.ROWS`なら下の行が上に詰められるっちゃ。

## シフト方向の選び方

どっちの方向にシフトすればいいか迷うこともあるけど、

✅ **列方向（COLUMNS）** が向いてるケース

<ul class="wp-block-list">
  <li>
    縦方向のデータが重要（時系列データなど）
  </li>
  <li>
    数式の参照関係が列単位で決まってる
  </li>
</ul>

✅ **行方向（ROWS）** が向いてるケース

<ul class="wp-block-list">
  <li>
    横のデータがまとまりになっている（顧客情報など）
  </li>
  <li>
    行単位での削除が求められる
  </li>
</ul>

特に大量のデータを扱うときは、シフト方向を慎重に決めることが大事ばい！

## 実践！deleteCellsの活用方法

### ① 選択範囲を削除してデータを詰める

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
sheet.getRange("B2:D4").deleteCells(SpreadsheetApp.Dimension.ROWS);
</code></pre>

→ B2:D4を削除して、下のデータが上に詰められるっちゃ。

### ② 複数範囲を一括削除

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
const ranges = &#91;"A1:B2", "D5:E6", "G8:H9"];
sheet.getRangeList(ranges).getRanges().forEach(range =&gt; {
  range.deleteCells(SpreadsheetApp.Dimension.COLUMNS);
});
</code></pre>

→ 離れたセル範囲も一括で削除できるばい！

### ③ 境界エラーを防ぐ

<pre class="wp-block-code"><code>const lastCol = sheet.getLastColumn();
const edgeRange = sheet.getRange(1, lastCol);
try {
  edgeRange.deleteCells(SpreadsheetApp.Dimension.COLUMNS);
} catch (e) {
  console.error('最終列削除エラー:', e.message);
}
</code></pre>

→ 端のセルを削除するとエラーが出ることがあるけん、対策が必要さ。

## deleteCellsと他の削除メソッドの違い

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド
    </th>
    
    <th>
      操作対象
    </th>
    
    <th>
      シフト制御
    </th>
    
    <th>
      速度
    </th>
  </tr>
  
  <tr>
    <td>
      deleteCells
    </td>
    
    <td>
      指定範囲のみ
    </td>
    
    <td>
      可能
    </td>
    
    <td>
      中
    </td>
  </tr>
  
  <tr>
    <td>
      deleteColumn(s)
    </td>
    
    <td>
      列全体
    </td>
    
    <td>
      不可
    </td>
    
    <td>
      高
    </td>
  </tr>
  
  <tr>
    <td>
      deleteRow(s)
    </td>
    
    <td>
      行全体
    </td>
    
    <td>
      不可
    </td>
    
    <td>
      高
    </td>
  </tr>
</table></figure> 

→ 列や行まるごと削除するなら`deleteColumns`や`deleteRows`のほうが速いばい！

## deleteCellsを使うときの注意点

<ol class="wp-block-list">
  <li>
    <strong>データの整合性を保つために、シフト方向を考慮すること！</strong>
  </li>
  <li>
    <strong>スプレッドシートの端の削除時にはエラーハンドリングを忘れずに！</strong>
  </li>
  <li>
    <strong>大量データを扱う場合は、ループを逆順にすることで削除ミスを防ぐ！</strong>
  </li>
</ol>

## まとめ

Google Apps Scriptの`deleteCells(shiftDimension)`メソッドは、 スプレッドシートをスマートに整理するのに欠かせない機能ばい。 適切なシフト方向を選びつつ、エラー対策やパフォーマンスの最適化を意識すれば、 効率的なデータ管理ができるっちゃ！


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
  
  <br /> <a rel="noopener" href="https://techuplife.tech/gas-ss-rinsertdelete/" title="[GAS]このセル範囲を基準としてセルを挿入・削除する方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-2.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-2.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]このセル範囲を基準としてセルを挿入・削除する方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲を基準としてセルを挿入・削除する方法を説明します。 Ra
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rinsertdelete/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rinsertdelete/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a>
</div>
