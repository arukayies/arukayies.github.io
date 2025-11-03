---
title: GASでスプレッドシートの指定範囲から行数を取得する方法と活用例
author: arukayies
type: post
date: 2020-07-17T12:11:38+00:00
excerpt: GASでスプレッドシートの指定範囲の高さを取得する方法を紹介します！
url: /gas/getheight
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1594987898
page_type:
  - default
update_level:
  - high
the_review_type:
  - Product
the_review_rate:
  - 5
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
last_modified:
  - 2025-03-07 21:48:38
categories:
  - GAS
tags:
  - GAS
  - getHeight()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）を使ってスプレッドシートを操作するとき、**選択した範囲の行数**を取得する方法として `getHeight()` メソッドがあるとばい。この記事では `getHeight()` の基本的な使い方から応用テクニックまで、分かりやすく解説していくけんね！

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >{{< custom-figure src="20010009784798064741_1.jpg" title="" Fit="1280x1280 webp q90" >}}</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >詳解！Ｇｏｏｇｌｅ　Ａｐｐｓ　Ｓｃｒｉｐｔ完全入門 ＧｏｏｇｌｅアプリケーションとＧｏｏｇｌｅ　Ｗｏｒ 第３版/秀和システム/高橋宣成</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3Dgoogle%2520apps%2520script%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3Dgoogle%2520apps%2520script" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>

## getHeight() ってなんね？

`getHeight()` メソッドは、指定したセル範囲の「縦の長さ」、つまり **行数** を取得するためのものばい。例えば、 `B2:D4` という範囲を指定した場合、 **2行目から4行目までの3行分** を含むけん、戻り値は `3` になるとさ。

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
const range = sheet.getRange("B2:D4");
Logger.log(range.getHeight()); // 3 を出力
</code></pre>

## getHeight() の類似メソッドとの違い

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド名
    </th>
    
    <th>
      取得できる内容
    </th>
    
    <th>
      主な用途
    </th>
  </tr>
  
  <tr>
    <td>
      <code>getHeight()</code>
    </td>
    
    <td>
      指定範囲の行数
    </td>
    
    <td>
      範囲のサイズ確認
    </td>
  </tr>
  
  <tr>
    <td>
      <code>getWidth()</code>
    </td>
    
    <td>
      指定範囲の列数
    </td>
    
    <td>
      横幅の確認
    </td>
  </tr>
  
  <tr>
    <td>
      <code>getNumRows()</code>
    </td>
    
    <td>
      シート全体の行数
    </td>
    
    <td>
      データがある範囲の取得
    </td>
  </tr>
  
  <tr>
    <td>
      <code>getRowHeight()</code>
    </td>
    
    <td>
      指定行の高さ（ピクセル）
    </td>
    
    <td>
      行の見た目の調整
    </td>
  </tr>
</table></figure> 

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getHeight() の基本的な使い方

スプレッドシートの行数を取得する基本的な流れは以下の通りばい！

### ① シンプルな範囲指定

<pre class="wp-block-code"><code>function sampleGetHeight() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const dataRange = sheet.getRange("A2:C10");
  Logger.log(`選択範囲の行数: ${dataRange.getHeight()}`);
}
</code></pre>

このスクリプトを実行すると、 `A2:C10` の行数（9行）がログに表示されるとばい！

### ② データがある範囲の行数を取得する

`getLastRow()` を使えば、データがある最終行までの行数を取得できるばい。

<pre class="wp-block-code"><code>function dynamicRangeHeight() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const range = sheet.getRange(2, 1, lastRow - 1, 3);
  Logger.log(`データ範囲の行数: ${range.getHeight()}`);
}
</code></pre>

この方法なら、 **データの増減に対応** できるばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getHeight() を応用する！

### ① 複数データセットの行数を比較

<pre class="wp-block-code"><code>function compareDatasets() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range2023 = sheet.getRange("A2:A100");
  const range2024 = sheet.getRange("B2:B150");

  const height2023 = range2023.getHeight();
  const height2024 = range2024.getHeight();

  Logger.log(`2023年データ行数: ${height2023}`);
  Logger.log(`2024年データ行数: ${height2024}`);
}
</code></pre>

### ② データの行数に応じてセルの色を変える

<pre class="wp-block-code"><code>function applyConditionalFormatting() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const rowCount = dataRange.getHeight();
  
  if (rowCount &gt; 100) {
    dataRange.setBackground("#FFEBEE"); // 赤っぽい色
  } else {
    dataRange.setBackground("#E8F5E9"); // 緑っぽい色
  }
}
</code></pre>

これで、データが100行を超えたら警告色にできるばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getHeight() の注意点

### ① 結合セルがあるときの挙動

セルが結合されとる場合、 **結合された全体の行数** が返ってくるばい。例えば、 `B2:B4` を1つのセルに結合しとると、 `getHeight()` は `3` を返すとさ。

### ② 空白範囲の扱い

空白の範囲を指定した場合でも、 **1行としてカウントされる** ことがあるばい。

<pre class="wp-block-code"><code>const emptyRange = sheet.getRange("A1000:B1000");
Logger.log(emptyRange.getHeight()); // 1 が出力される
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## まとめ

`getHeight()` は **スプレッドシートの範囲内の行数を取得する便利なメソッド** ばい！

<ul class="wp-block-list">
  <li>
    <code>getHeight()</code> を使うと、指定範囲の行数が簡単に分かる
  </li>
  <li>
    <code>getLastRow()</code> と組み合わせると <strong>データの増減に対応できる</strong>
  </li>
  <li>
    行数に応じて <strong>色を変えたり、データ分析に活用したり</strong> できる
  </li>
  <li>
    <strong>結合セルや空白範囲に注意が必要</strong>
  </li>
</ul>

GAS を使ってスプレッドシートを操作するなら、 `getHeight()` を活用して **効率的なスクリプト** を作っていこうばい！

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >{{< custom-figure src="20010009784798064741_1.jpg" title="" Fit="1280x1280 webp q90" >}}</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >詳解！Ｇｏｏｇｌｅ　Ａｐｐｓ　Ｓｃｒｉｐｔ完全入門 ＧｏｏｇｌｅアプリケーションとＧｏｏｇｌｅ　Ｗｏｒ 第３版/秀和システム/高橋宣成</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3Dgoogle%2520apps%2520script%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3Dgoogle%2520apps%2520script" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}}
{{< blog-card "https://qiita.com/tags/GoogleAppsScript" >}}
{{< blog-card "https://gsuiteguide.jp/sheets/getheight/" >}}
