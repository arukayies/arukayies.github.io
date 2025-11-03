---
title: GASでスプレッドシートの指定範囲から列数を取得・活用する方法完全ガイド
author: arukayies
type: post
date: 2020-09-22T09:09:18+00:00
excerpt: GASでスプレッドシートの指定範囲の列数を取得する方法を紹介します！
url: /gas/getwidth
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1600765760
page_type:
  - default
update_level:
  - high
the_review_type:
  - Product
the_review_rate:
  - 2.5
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
last_modified:
  - 2025-03-07 21:19:17
categories:
  - GAS
tags:
  - GAS
  - getWidth()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年9月"]
---
Google Apps Script（GAS）でスプレッドシートを使う際に、`getWidth()`メソッドがどんな役割を果たすか、って気になるところだよね。今回はその詳細について、基本的な使い方から、実際に使えるテクニックまでを紹介するけん、ぜひチェックしてほしいばい。

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

## 基本的な使い方

### getWidth()メソッドとは？

GASでスプレッドシートの操作をするとき、よく使うのが`Range`オブジェクト。この`Range`オブジェクトに含まれる`getWidth()`メソッドは、指定した範囲の**列数**を取得するためのものじゃ。たとえば、範囲を`B2:D4`にした場合、返ってくるのは「3」列となるんよ。

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
const range = sheet.getRange("B2:D4");
console.log(range.getWidth()); // 3が返ってくるけ
</code></pre>

これで列数が分かるけん、データ処理をもっと効率よくできるんよ。

### getWidth()と他のメソッドの違い

`getWidth()`と似たメソッドに`getColumnWidth()`があるけど、これとはちょっと違う点に注意が必要さ。`getWidth()`は列数を返すのに対し、`getColumnWidth()`は列の物理的な幅（ピクセル単位）を返してくれるけん、この違いをしっかり理解することが大事ばい。<figure class="wp-block-table">

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド
    </th>
    
    <th>
      返り値
    </th>
    
    <th>
      単位
    </th>
    
    <th>
      用途例
    </th>
  </tr>
  
  <tr>
    <td>
      <code>getWidth()</code>
    </td>
    
    <td>
      整数
    </td>
    
    <td>
      列数
    </td>
    
    <td>
      データ範囲の列数把握
    </td>
  </tr>
  
  <tr>
    <td>
      <code>getColumnWidth()</code>
    </td>
    
    <td>
      数値
    </td>
    
    <td>
      ピクセル
    </td>
    
    <td>
      列幅の調整
    </td>
  </tr>
</table></figure> 

## 実際に使うシーン

### ヘッダー行の自動ハイライト

例えば、データ範囲を指定して、ヘッダー行の背景色を変更することができるんよ。このスクリプトは列数を動的に取得して、範囲を調整しとるけん、どんなサイズのデータにも対応できるばい。

<pre class="wp-block-code"><code>function highlightHeader() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const headerRange = sheet.getRange(1, 1, 1, dataRange.getWidth());
  headerRange.setBackground("#CCE5FF");
}
</code></pre>

これを使えば、ヘッダーがすぐに目立つようになるけん、スプレッドシートがすごく見やすくなるばい。

### 動的に列数を調整する

もし、スプレッドシートにたくさんの列がある場合に、それを自動で調整する場合にも`getWidth()`を使えるけん、うまく活用しようね。

<pre class="wp-block-code"><code>function adjustColumns() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const currentWidth = sheet.getRange("A1:Z100").getWidth();
  
  if (currentWidth &gt; 5) {
    sheet.deleteColumns(6, currentWidth - 5);
  } else if (currentWidth &lt; 5) {
    sheet.insertColumnsAfter(currentWidth, 5 - currentWidth);
  }
}
</code></pre>

これを使うことで、無駄な列を削除したり、必要な列を追加したりできるけん、スプレッドシートを常に整理整頓しておけるんよ。

### キャッシュを活用したパフォーマンス向上

大量のデータを扱うとき、毎回`getWidth()`を使うのは少し非効率じゃけん、取得した値をキャッシュしておくと、パフォーマンスがグンと上がるんよ。

<pre class="wp-block-code"><code>function cachedGetWidth() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:Z1000");
  const cachedWidth = range.getWidth();
  
  // キャッシュを再利用
  for (let i = 0; i &lt; cachedWidth; i++) {
    processColumn(i);
  }
}
</code></pre>

これで大規模なデータ処理もスムーズになるけん、作業効率が格段に上がるばい。

## エラー処理とトラブルシューティング

### よくあるエラー

<ul class="wp-block-list">
  <li>
    <strong>範囲指定エラー</strong>：範囲が正しくない場合、エラーが出るけん、<code>getLastColumn()</code>で有効な列範囲を確認することが大事じゃ。
  </li>
  <li>
    <strong>権限エラー</strong>：スクリプトの権限が足りないとき、エラーが出るけん、必要な権限を再承認しておこうね。
  </li>
</ul>

### パフォーマンス低下

大量の範囲を毎回取得するのはパフォーマンスを下げることがあるけん、範囲を最小限に絞ることを意識しようね。

## 結論

`getWidth()`メソッドは、Google Apps Scriptを使ってスプレッドシートを操作する際に、列数を簡単に取得できる重要な機能さ。これを使いこなすことで、データの動的処理やレイアウトの調整がスムーズにできるけん、ぜひ活用してみてほしいばい。

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
  <a rel="noopener" href="https://hajiritsu.com/spreadsheet-gas-getcolumnwidth/" title="Google Spreadsheet&#12398;getColumnWidth&#38306;&#25968;&#12434;&#29702;&#35299;&#12375;&#12424;&#12358; &#8211; &#12399;&#12376;&#12426;&#12388;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getcolumnwidth%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getcolumnwidth%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Spreadsheet&#12398;getColumnWidth&#38306;&#25968;&#12434;&#29702;&#35299;&#12375;&#12424;&#12358; &#8211; &#12399;&#12376;&#12426;&#12388;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getcolumnwidth/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getcolumnwidth/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          hajiritsu.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://gsuiteguide.jp/sheets/getwidth/" title="セル範囲の横幅(列数)を取得する：getWidth()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="http://gsuiteguide.jp/wp-content/uploads/cover_googlespreadsheet-486x290.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="http://gsuiteguide.jp/wp-content/uploads/cover_googlespreadsheet-486x290.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        セル範囲の横幅(列数)を取得する：getWidth()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        セル範囲の横幅(列数)を取得する。 サンプルコード // 現在アクティブなスプレッドシートを取得 var ss = SpreadsheetApp.getActiveSpreadsheet(); // そのスプレッドシートにある最初のシートを...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getwidth/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getwidth/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
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
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
