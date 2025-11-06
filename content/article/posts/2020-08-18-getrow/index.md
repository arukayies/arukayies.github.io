---
title: GASでスプレッドシートの指定セルから行番号を取得する方法徹底解説
author: arukayies
type: post
date: 2020-08-18T14:04:09+00:00
excerpt: GASでスプレッドシートの指定セルの行の位置を取得する方法を紹介します！
url: /gas/getrow
share: true
toc: true
comment: true
page_type:
  - default
update_level:
  - high
the_review_type:
  - Product
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1597759450
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
last_modified:
  - 2025-03-07 23:07:34
categories:
  - GAS
tags:
  - GAS
  - getRow()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年8月"]
---
Google Apps Script（GAS）を使ってスプレッドシートを操作するなら、**getRow()メソッド**は避けて通れんばい！ 「セルが何行目か取得したい！」って時にめちゃくちゃ便利なメソッドじゃけ。 この記事では、**getRow()の基本から実践的な使い方、応用テクニック**までわかりやすく解説するばい。

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

## 1. getRow()って何するメソッド？

`getRow()`は、**指定したセル範囲の最初の行番号を返す**メソッドじゃ。

たとえば、以下のコードを実行すると

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
const range = sheet.getRange("B2");
console.log(range.getRow());
</code></pre>

出力結果は `2` になる。 これは「B2セルが2行目にあるから」じゃね。

## 2. どんな時に使うと便利？

<ul class="wp-block-list">
  <li>
    <strong>データの処理を行う時の基準点として使う</strong>
  </li>
  <li>
    <strong>動的にセル範囲を指定する時に活用</strong>
  </li>
  <li>
    <strong>条件付き書式や自動処理のトリガーとして利用</strong>
  </li>
</ul>

## 3. よくある使い方

### 単純な行番号取得

<pre class="wp-block-code"><code>function logRowNumber() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("D5");
  console.log(`D5セルの行番号: ${range.getRow()}`);
}
</code></pre>

これは「D5セルが何行目にあるかをログに出力する」ってだけのシンプルなコードばい。

### getLastRow()との組み合わせ

データの最終行を取得しながら、動的に処理したい時は`getLastRow()`と組み合わせるのがポイント。

<pre class="wp-block-code"><code>function processDynamicRange() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  for (let i = 1; i &lt;= lastRow; i++) {
    console.log(`現在の行: ${i}`);
  }
}
</code></pre>

スプレッドシートの**最終行まで繰り返し処理**をしたい時に使えるばい！

### 2次元配列と組み合わせたデータ処理

<pre class="wp-block-code"><code>function processArrayData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const startRow = dataRange.getRow();
  
  values.forEach((row, index) =&gt; {
    console.log(`行番号: ${startRow + index}, データ: ${row}`);
  });
}
</code></pre>

これは、スプレッドシートのデータを配列として取得し、**行番号とデータを紐づけて処理**するサンプルばい。

## 4. 応用編：GASアドオン開発やAPI連携

### Google Workspaceアドオンでの活用

<pre class="wp-block-code"><code>function onOpen() {
  SpreadsheetApp.getUi().createMenu('カスタムメニュー')
    .addItem('行番号を表示', 'showRowNumbers')
    .addToUi();
}

function showRowNumbers() {
  const selection = SpreadsheetApp.getActiveRange();
  const row = selection.getRow();
  SpreadsheetApp.getUi().alert(`選択範囲の開始行は ${row} 行目ばい！`);
}
</code></pre>

カスタムメニューを追加して、選択したセルの行番号をダイアログに表示する機能じゃ。

### 外部APIとの連携

行番号を使ってデータを外部APIに送信することも可能ばい。

<pre class="wp-block-code"><code>function exportRowData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const row = sheet.getActiveRange().getRow();
  const rowData = sheet.getRange(row, 1, 1, 5).getValues()&#91;0];
  
  const payload = {
    rowNumber: row,
    data: rowData,
    timestamp: new Date().toISOString()
  };
  
  UrlFetchApp.fetch('https://api.example.com/import', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  });
}
</code></pre>

行番号を**ユニークな識別子**として使って、データの整合性を保つこともできるんじゃ。

## 5. getRow()を使う時の注意点

<ol class="wp-block-list">
  <li>
    <strong>範囲が複数行にまたがると、先頭行しか取得できん</strong>
  </li>
  <li>
    <strong>0ベースのJavaScript配列と違い、1ベースで考える必要がある</strong>
  </li>
  <li>
    <strong>保護された範囲の行を取得する際は、適切な権限を設定すること</strong>
  </li>
</ol>

## 6. まとめ

`getRow()`は、スプレッドシートのデータ処理をする上で**めちゃくちゃ重要なメソッド**ばい。 基本的な使い方から応用までマスターすれば、GASのスクリプトがぐっと便利になるけ。

**ポイントのおさらい**

✔️ `getRow()`は「セルの行番号」を取得するメソッド。 

✔️ `getLastRow()`と組み合わせると動的な処理ができる。

✔️ 2次元配列との連携で、より効率的なデータ処理が可能。 

✔️ API連携やアドオン開発にも活用できる。

GASを使ってスプレッドシートをもっと便利にしたいなら、ぜひ`getRow()`を活用してみてばい！

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
  
  <br /> <a rel="noopener" href="https://rinyan-7.com/gas/range_getrow/" title="&#12304;getRow&#12513;&#12477;&#12483;&#12489;&#12434;&#20351;&#12356;&#12371;&#12394;&#12381;&#12358;&#65281;&#12305;&#21177;&#29575;&#30340;&#12394;&#34892;&#30058;&#21495;&#21462;&#24471;&#27861;&#12392;&#23455;&#29992;&#30340;&#12394;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#24505;&#24213;&#35299;&#35500;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_getrow%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_getrow%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12304;getRow&#12513;&#12477;&#12483;&#12489;&#12434;&#20351;&#12356;&#12371;&#12394;&#12381;&#12358;&#65281;&#12305;&#21177;&#29575;&#30340;&#12394;&#34892;&#30058;&#21495;&#21462;&#24471;&#27861;&#12392;&#23455;&#29992;&#30340;&#12394;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#24505;&#24213;&#35299;&#35500;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_getrow/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_getrow/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          rinyan-7.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://jp.tdsynnex.com/blog/google/gas-select-range-of-spreadsheet/" title="GASでのスプレッドシートの範囲選択について – TD SYNNEX BLOG" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://jp.tdsynnex.com/blog/wp-content/uploads/2021/12/spreadsheet-gb43636953_1920.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://jp.tdsynnex.com/blog/wp-content/uploads/2021/12/spreadsheet-gb43636953_1920.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASでのスプレッドシートの範囲選択について – TD SYNNEX BLOG
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        この記事では、GoogleAppsScript（GAS）で扱うスプレッドシートの範囲選択について解説しています。GASでGoogleスプレッドシートを利用する場合、シートのセルを選択してデータを取得したり書き込んだりする場面が多々あるかと思...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://jp.tdsynnex.com/blog/google/gas-select-range-of-spreadsheet/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://jp.tdsynnex.com/blog/google/gas-select-range-of-spreadsheet/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          jp.tdsynnex.com
        </div>
      </div>
    </div>
  </div></a>
</div>
