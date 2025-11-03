---
title: GASでスプレッドシートの複数セルからデータを高速で一括取得する方法完全ガイド
author: arukayies
type: post
date: 2020-09-22T03:49:18+00:00
excerpt: GASでスプレッドシートの指定範囲すべての値を取得する方法を紹介します！
url: /gas/getvalues
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1600746560
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
  - 2025-03-07 21:23:57
categories:
  - GAS
tags:
  - GAS
  - getValues()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年9月"]
---
こんにちは！今回はGoogle Apps Script（GAS）でスプレッドシートのデータを扱ううえで超重要な`getValues()`メソッドについて、詳しく解説していくばい！

このメソッドを使いこなせば、大量のデータを効率よく処理できるようになるけん、しっかり学んでいこうじゃ！

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

## 1. getValues()とは？

`getValues()`は、スプレッドシートから複数のセルの値を一括取得するメソッドたい。

例えば、A1からC3の範囲を取得するコードはこうなるとよ。

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
const values = sheet.getRange("A1:C3").getValues();
console.log(values);
</code></pre>

取得したデータは二次元配列として返されるっちゃね。

<pre class="wp-block-code"><code>&#91;
  &#91;"データ1", "データ2", "データ3"],
  &#91;"データ4", "データ5", "データ6"],
  &#91;"データ7", "データ8", "データ9"]
]
</code></pre>

## 2. getValue()との違い

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド名
    </th>
    
    <th>
      取得できる範囲
    </th>
    
    <th>
      戻り値の型
    </th>
  </tr>
  
  <tr>
    <td>
      <code>getValue()</code>
    </td>
    
    <td>
      単一セル
    </td>
    
    <td>
      プリミティブ型
    </td>
  </tr>
  
  <tr>
    <td>
      <code>getValues()</code>
    </td>
    
    <td>
      複数セル
    </td>
    
    <td>
      二次元配列
    </td>
  </tr>
</table></figure> 

例えば100セル分のデータを取得するとき、`getValue()`を100回繰り返すとめちゃくちゃ遅くなるとばい！ `getValues()`を使えば一括で取得できるけん、処理速度が圧倒的に速くなるとよ。

## 3. getValues()の活用例

### 3-1. シンプルなデータ取得

<pre class="wp-block-code"><code>const data = sheet.getRange("A1:B10").getValues();
data.forEach(row =&gt; console.log(row));
</code></pre>

この方法で、A1からB10までのデータをまとめて取得できるとばい。

### 3-2. 数値データを変換して処理

<pre class="wp-block-code"><code>const data = sheet.getRange("A1:A10").getValues();
const doubled = data.map(row =&gt; &#91;row&#91;0] * 2]);
sheet.getRange("B1:B10").setValues(doubled);
</code></pre>

A列の数値を2倍してB列に書き込む、って感じの使い方じゃね。

### 3-3. 大量データを処理する場合の最適化

<pre class="wp-block-code"><code>function processLargeData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const data = sheet.getRange(1, 1, lastRow, 1).getValues();

  const processedData = data.map(row =&gt; &#91;row&#91;0] ? row&#91;0] * 1.1 : row&#91;0]]);

  sheet.getRange(1, 2, lastRow, 1).setValues(processedData);
}
</code></pre>

大量データを扱うときは、`getValues()`で一括取得してループ処理すると高速化できるばい！

## 4. getValues()の注意点

### 4-1. 取得するデータの型

スプレッドシートの表示形式によって、取得するデータ型が変わることがあるけん要注意！

<ul class="wp-block-list">
  <li>
    数値 → <code>Number</code>
  </li>
  <li>
    文字列 → <code>String</code>
  </li>
  <li>
    日付 → <code>Date</code>
  </li>
</ul>

もし表示形式通りのデータを取得したいなら、`getDisplayValues()`を使うとよかよ！

<pre class="wp-block-code"><code>const displayData = sheet.getRange("A1:A10").getDisplayValues();
</code></pre>

### 4-2. メモリ管理に注意

10,000行以上のデータを扱うときは、一度に全て取得するとメモリを圧迫する可能性があるばい。そんなときは、500行ごとに処理するのがおすすめじゃ。

<pre class="wp-block-code"><code>const chunkSize = 500;
for (let i = 0; i &lt; totalRows; i += chunkSize) {
  const chunkData = sheet.getRange(i + 1, 1, chunkSize, 1).getValues();
  // データ処理
}
</code></pre>

## まとめ

<ul class="wp-block-list">
  <li>
    <code>getValues()</code>はスプレッドシートのデータを効率よく取得するために必須！
  </li>
  <li>
    <code>getValue()</code>と比べて大幅にパフォーマンスが良い。
  </li>
  <li>
    <code>getDisplayValues()</code>を使えば、表示通りの値を取得可能。
  </li>
  <li>
    大量データを扱うときは、メモリ負荷を考慮してチャンク処理をする。
  </li>
</ul>

GASでスプレッドシートを扱うなら、`getValues()`をマスターして快適な開発ライフを送ろうばい！

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
  <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range#getValues" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/va726f77ce19c264bc8ae4520f2ee26cc9641a80eead40c2c8c599dc34ccb25d1/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/va726f77ce19c264bc8ae4520f2ee26cc9641a80eead40c2c8c599dc34ccb25d1/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
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
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://qiita.com/kakakaori830/items/288307c7e639ac02ba7f" title="GASからGoogleドキュメントを操作する方法 - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Fadvent-calendar-ogp-background-7940cd1c8db80a7ec40711d90f43539e.jpg%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnFpaXRhLWltYWdlLXN0b3JlLnMzLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkYwJTJGMjAwODEyJTJGcHJvZmlsZS1pbWFnZXMlMkYxNTU5NzAyMzU3P2l4bGliPXJiLTQuMC4wJmFyPTElM0ExJmZpdD1jcm9wJm1hc2s9ZWxsaXBzZSZiZz1GRkZGRkYmZm09cG5nMzImcz0xNDg2NWQwYzFjOWNkZTQzZDQyOWVkY2RhMzE1NDc4ZQ%26blend-x%3D120%26blend-y%3D462%26blend-w%3D90%26blend-h%3D90%26blend-mode%3Dnormal%26mark64%3DaHR0cHM6Ly9xaWl0YS1vcmdhbml6YXRpb24taW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnMzLWFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkZxaWl0YS1vcmdhbml6YXRpb24taW1hZ2UlMkZiNjgxNDgzYzU4ZmYwYTJjZTllNmI1NzgwM2IyMWE2M2Q3Mjk0Mzc4JTJGb3JpZ2luYWwuanBnJTNGMTY1OTMyMjQxOD9peGxpYj1yYi00LjAuMCZ3PTQ0Jmg9NDQmZml0PWNyb3AmbWFzaz1jb3JuZXJzJmNvcm5lci1yYWRpdXM9OCZiZz1GRkZGRkYmYm9yZGVyPTIlMkNGRkZGRkYmZm09cG5nMzImcz1mZDA1MTE4ZTIwNmNiZDA4ZjU2MjI2MjIyZWE0YWM2NA%26mark-x%3D186%26mark-y%3D515%26mark-w%3D40%26mark-h%3D40%26s%3D1da46123be7d8f36c82abfcc7558e76a?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9R0FTJUUzJTgxJThCJUUzJTgyJTg5R29vZ2xlJUUzJTgzJTg5JUUzJTgyJUFEJUUzJTgzJUE1JUUzJTgzJUExJUUzJTgzJUIzJUUzJTgzJTg4JUUzJTgyJTkyJUU2JTkzJThEJUU0JUJEJTlDJUUzJTgxJTk5JUUzJTgyJThCJUU2JTk2JUI5JUU2JUIzJTk1JnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnR4dC1jb2xvcj0lMjMzQTNDM0MmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LXBhZD0wJnM9M2NmYzU1N2EyYWRiODE5YzUyM2EzY2FmZmRhZmQ5Yjk&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBrYWtha2Fvcmk4MzAmdHh0LWNvbG9yPSUyMzNBM0MzQyZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtcGFkPTAmcz1mZjY3MWYwNzBmZmZjZGE4ZWUyOWEwZmRkZjk3N2U3Yg&#038;blend-x=242&#038;blend-y=454&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;txt64=5qCq5byP5Lya56S-44Ko44Kk44OB44O844Og44Op44Kk44OV44OH44K244Kk44Oz&#038;txt-x=242&#038;txt-y=539&#038;txt-width=838&#038;txt-clip=end%2Cellipsis&#038;txt-color=%233A3C3C&#038;txt-font=Hiragino%20Sans%20W6&#038;txt-size=28&#038;s=90441b586e851a717f9d06961360a6aa" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASからGoogleドキュメントを操作する方法 - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        はじめに この記事は「Ateam LifeDesign Advent Calendar 2023」で完走賞を狙って25記事書いているうちの14日目の記事です。今年も完走目指して頑張るぞ！ 今日はGASからGoogleドキュメントを操作する方...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/kakakaori830/items/288307c7e639ac02ba7f" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/kakakaori830/items/288307c7e639ac02ba7f" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a>
</div>
