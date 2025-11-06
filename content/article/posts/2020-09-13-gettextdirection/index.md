---
title: GASでスプレッドシートの指定セルからテキスト方向を取得する方法
author: arukayies
type: post
date: 2020-09-13T13:15:52+00:00
excerpt: GASでスプレッドシートの指定セルのテキストの方向を取得する方法を紹介します！
url: /gas/gettextdirection
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1600002954
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
  - 2025-03-07 23:07:11
categories:
  - GAS
tags:
  - GAS
  - getTextDirection()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年9月"]
---
Google Apps Script（GAS）を使ってスプレッドシートを操作しとると、セルのテキスト方向を制御したいことってあるばい？特に多言語対応やレイアウトの調整をするときには、getTextDirection()メソッドが役に立つけど、意外と知られとらん機能じゃ。

今回は、このgetTextDirection()メソッドの基本から応用までを、分かりやすく解説するばい！

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

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getTextDirection()って何するメソッド？

このメソッドは、スプレッドシートのセル内テキストの向きを取得するためのものじゃ。

GASではテキストの方向を以下の2種類で管理しとるとさ。

<ul class="wp-block-list">
  <li>
    <strong>LEFT_TO_RIGHT</strong>（左から右）
  </li>
  <li>
    <strong>RIGHT_TO_LEFT</strong>（右から左）
  </li>
</ul>

例えばアラビア語やヘブライ語のテキストを扱うときは、RIGHT\_TO\_LEFTに設定せんと見た目が崩れるばい。

<pre class="wp-block-code"><code>const direction = SpreadsheetApp.TextDirection.RIGHT_TO_LEFT;
</code></pre>

getTextDirection()を使うと、指定したセルのテキスト方向を取得できる。

<pre class="wp-block-code"><code>function checkTextDirection() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange("A1");
  const direction = range.getTextDirection();
  console.log(direction ? direction.toString() : "自動判定");
}
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getTextDirection()の使い方と挙動

### メソッドの仕様

<pre class="wp-block-code"><code>Range.getTextDirection() → TextDirection|null
</code></pre>

getTextDirection()は、指定した範囲の**左上のセル**のテキスト方向を取得するばい。

#### **ポイント**

<ul class="wp-block-list">
  <li>
    <strong>明示的に方向が設定されていれば、LEFT_TO_RIGHT か RIGHT_TO_LEFT を返す</strong>
  </li>
  <li>
    <strong>方向が自動判定の場合は、null が返る</strong>
  </li>
</ul>

<pre class="wp-block-code"><code>function logDirection() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange("B2");
  console.log(range.getTextDirection());
}
</code></pre>

### 自動判定の仕組み

方向が手動設定されておらん場合、GASはテキスト内容から方向を判定するばい。

<ul class="wp-block-list">
  <li>
    <strong>アラビア文字・ヘブライ文字が含まれる → RIGHT_TO_LEFT</strong>
  </li>
  <li>
    <strong>それ以外 → LEFT_TO_RIGHT</strong>
  </li>
</ul>

ただし、混在しとる場合は判定がうまくいかんこともあるけん、明示的に設定するのがオススメばい。

<pre class="wp-block-code"><code>range.setTextDirection(SpreadsheetApp.TextDirection.RIGHT_TO_LEFT);
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getTextDirection() vs getTextDirections()の違い

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド
    </th>
    
    <th>
      戻り値
    </th>
    
    <th>
      範囲
    </th>
    
    <th>
      自動判定時
    </th>
  </tr>
  
  <tr>
    <td>
      getTextDirection()
    </td>
    
    <td>
      TextDirection or null
    </td>
    
    <td>
      左上端のセルのみ
    </td>
    
    <td>
      null
    </td>
  </tr>
  
  <tr>
    <td>
      getTextDirections()
    </td>
    
    <td>
      TextDirection[][]
    </td>
    
    <td>
      範囲内の全セル
    </td>
    
    <td>
      null含む2D配列
    </td>
  </tr>
</table></figure> 

一括取得したいなら、getTextDirections()を使うと効率が良いばい。

<pre class="wp-block-code"><code>function logAllDirections() {
  const range = SpreadsheetApp.getActiveSheet().getRange("A1:B2");
  const directions = range.getTextDirections();
  console.log(directions);
}
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## テキスト方向を動的に制御する応用テクニック

### 言語判定を使って自動設定

GoogleのLanguageApp APIと組み合わせると、言語に応じてテキスト方向を自動でセットできるばい。

<pre class="wp-block-code"><code>function autoSetDirection() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  const directions = values.map(row =&gt; row.map(value =&gt; {
    const lang = LanguageApp.detect(value);
    return lang.includes('ar') ? SpreadsheetApp.TextDirection.RIGHT_TO_LEFT : SpreadsheetApp.TextDirection.LEFT_TO_RIGHT;
  }));
  
  range.setTextDirections(directions);
}
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getTextDirection()のパフォーマンス最適化

テキスト方向を大量のセルに設定するときは、1セルずつ処理せんように注意せんといかん。

### 非推奨：ループで個別設定（遅い）

<pre class="wp-block-code"><code>const range = sheet.getRange("A1:Z1000");
for (let i = 1; i &lt;= 1000; i++) {
  range.getCell(i, 1).setTextDirection(SpreadsheetApp.TextDirection.RIGHT_TO_LEFT);
}
</code></pre>

### 推奨：バッチ処理で一括設定（速い）

<pre class="wp-block-code"><code>const directions = new Array(1000).fill(&#91;SpreadsheetApp.TextDirection.RIGHT_TO_LEFT]);
range.setTextDirections(directions);
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## よくあるトラブルと解決策

### ① 方向が設定されても反映されない？

👉 `SpreadsheetApp.flush();` を呼び出して即時適用させるばい！

<pre class="wp-block-code"><code>range.setTextDirection(SpreadsheetApp.TextDirection.LEFT_TO_RIGHT);
SpreadsheetApp.flush();
</code></pre>

### ② 条件付き書式と競合する？

👉 条件付き書式ルールを確認し、`setConditionalFormatRules()` を調整するばい！

<pre class="wp-block-code"><code>const rule = SpreadsheetApp.newConditionalFormatRule()
  .whenFormulaSatisfied('=ISTEXT(A1)')
  .setTextDirection(SpreadsheetApp.TextDirection.RIGHT_TO_LEFT)
  .build();
sheet.setConditionalFormatRules(&#91;rule]);
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## まとめ

<ul class="wp-block-list">
  <li>
    <strong>getTextDirection() はスプレッドシートのセルのテキスト方向を取得するメソッド</strong>
  </li>
  <li>
    <strong>方向が自動判定の場合、null が返るので注意</strong>
  </li>
  <li>
    <strong>大量のセルを処理するときはバッチ処理を使うと高速化できる</strong>
  </li>
  <li>
    <strong>言語検出APIと組み合わせると、より柔軟な制御が可能</strong>
  </li>
</ul>

GASを使ってスプレッドシートの自動化を進めるなら、テキスト方向の制御もしっかり押さえとくと便利ばい！

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
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-text-direction/" title="【GAS】スプレッドシートのテキスト方向機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/direction.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/direction.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートのテキスト方向機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートのテキスト方向機能をすべてまとめました。おそらく水平設定(setHorizontalAlignment)と動きは同じです。正直何が違うのかわかってません。中央表示も可能な水平設定を使うならば、あまり使う機会
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-text-direction/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-text-direction/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a>
</div>
