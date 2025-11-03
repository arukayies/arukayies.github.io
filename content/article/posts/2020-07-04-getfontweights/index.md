---
title: GASでスプレッドシートの指定範囲から太字設定を一括取得する方法
author: arukayies
type: post
date: 2020-07-04T12:38:21+00:00
excerpt: GASでスプレッドシートの指定範囲すべての太字を取得する方法を紹介します！
url: /gas/getfontweights
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1593866302
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
  - 2025-03-07 21:54:19
categories:
  - GAS
tags:
  - GAS
  - getFontWeights()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）って知っとる？ スプレッドシートを自動化できる強力なツールじゃけ、これを使いこなせば作業効率が爆上がりするばい！

今回紹介するのは、`getFontWeights()`メソッド。 これを使うと、セル範囲のフォントの太字設定をまとめて取得できるっちゃ。

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

### getFontWeights()って何すると？

`getFontWeights()`は指定したセル範囲の太字情報を取得するメソッド。 戻り値は二次元配列になっとって、

<ul class="wp-block-list">
  <li>
    <code>"bold"</code>（太字）
  </li>
  <li>
    <code>"normal"</code>（通常）
  </li>
</ul>

のどちらかが返ってくる仕組みたい。

例えば、スプレッドシートの`B2:D4`のセル範囲を対象にすると、

<pre class="wp-block-code"><code>const range = SpreadsheetApp.getActiveSpreadsheet().getRange('B2:D4');
const fontWeights = range.getFontWeights();
</code></pre>

こんな感じで、セルの太字設定を一気に取得できるけ。

### getFontWeight()との違い

`getFontWeight()` っていう似たメソッドもあるんやけど、 こっちは「単一セルのみ」のフォント太字設定を取得するもの。

一方、`getFontWeights()`なら「複数セルをまとめて」取得できるとばい。 大規模なデータを扱うときは断然こっちが便利さ。

### 実践！セル範囲の太字情報を取得してみる

次のサンプルコードでは、指定した範囲の太字設定をコンソールに表示するばい。

<pre class="wp-block-code"><code>function sampleGetFontWeights() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('データシート');
  const range = sheet.getRange('B2:D4');
  const weights = range.getFontWeights();

  weights.forEach((row, rowIndex) =&gt; {
    row.forEach((cellValue, colIndex) =&gt; {
      console.log(`セル ${String.fromCharCode(66 + colIndex)}${rowIndex + 2}: ${cellValue}`);
    });
  });
}
</code></pre>

このコードを実行すると、セルのフォント状態が`bold`か`normal`か分かるばい。

### 太字のセルだけ色を変えてみる

例えば、太字になっとるセルの背景色を黄色にするなら、こんなコードを書けばよかばい。

<pre class="wp-block-code"><code>function highlightBoldCells() {
  const range = SpreadsheetApp.getActiveSheet().getRange('A1:C10');
  const weights = range.getFontWeights();
  const backgrounds = weights.map(row =&gt; 
    row.map(cell =&gt; cell === 'bold' ? '#FFFF00' : null)
  );
  range.setBackgrounds(backgrounds);
}
</code></pre>

このスクリプトを実行すると、太字のセルだけ黄色になるっちゃ。

### 大量のデータを扱うときの注意点

スプレッドシートには「1シートあたり500万セルまで」という制限があるっちゃ。 データが増えてくると処理が遅くなるけ、

<ul class="wp-block-list">
  <li>
    必要な範囲だけ取得する
  </li>
  <li>
    <code>getValues()</code>と組み合わせて効率化する
  </li>
</ul>

みたいな工夫が必要じゃ。

例えば、500行ずつ処理するときはこんな感じで書くとよかばい。

<pre class="wp-block-code"><code>function processLargeData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const totalRows = sheet.getLastRow();
  const batchSize = 500;

  for (let i = 1; i &lt;= totalRows; i += batchSize) {
    const range = sheet.getRange(i, 1, Math.min(batchSize, totalRows - i + 1), 10);
    const weights = range.getFontWeights();
    console.log(weights);
  }
}
</code></pre>

これで、スプレッドシートのデータを少しずつ処理できるけ、 動作がスムーズになるばい。

### まとめ

`getFontWeights()`メソッドを使えば、

<ul class="wp-block-list">
  <li>
    スプレッドシートの太字設定を一括取得できる
  </li>
  <li>
    <code>getFontWeight()</code>よりも効率的
  </li>
  <li>
    背景色変更やデータ分析にも応用できる
  </li>
</ul>

といったメリットがあるっちゃ。

大規模データを扱うときは、処理速度を意識しながら工夫して使ってみてね！

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
</div>
