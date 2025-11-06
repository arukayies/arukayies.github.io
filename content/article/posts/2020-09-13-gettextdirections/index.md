---
title: GASでスプレッドシートの指定範囲からテキスト方向を一括取得する方法
author: arukayies
type: post
date: 2020-09-13T13:23:26+00:00
excerpt: GASでスプレッドシートの指定範囲すべてのテキストの方向を取得する方法を紹介します！
url: /gas/gettextdirections
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1600003408
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
  - 2025-03-07 23:06:55
categories:
  - GAS
tags:
  - GAS
  - getTextDirections()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年9月"]
---
Google Apps Script（GAS）を使ったスプレッドシートの開発において、セル内のテキスト方向を操作する`getTextDirections()`メソッドは、特に多言語対応や特殊なレイアウトが求められる場面で活躍する機能ばい。このメソッドをうまく使えば、スプレッドシート内でテキストの向きを簡単に取得・設定できるけん、今回はその基本から応用までを、わかりやすく解説するけね。

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

## テキスト方向って何？

まず、テキスト方向の基本を押さえておこうばい。テキスト方向（Text Direction）とは、スプレッドシートに表示される文字の書かれ方、つまり「左から右」なのか、「右から左」なのかを決める設定じゃ。たとえば、アラビア語やヘブライ語など右から左に書く言語では、テキスト方向を`RIGHT_TO_LEFT`に設定せんといかんけ。

## getTextDirections()メソッドの基本的な使い方

`getTextDirections()`メソッドを使うと、指定した範囲内のすべてのセルのテキスト方向を取得できるんじゃ。これにより、どのセルがどの方向でテキストが表示されているのかが簡単にわかるけ。たとえば、以下のように使うばい。

<pre class="wp-block-code"><code>function logTextDirections() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('サンプル');
  const range = sheet.getRange('B2:E3');
  const directions = range.getTextDirections();
  
  directions.forEach((row, rowIndex) =&gt; {
    row.forEach((direction, colIndex) =&gt; {
      console.log(`セル ${String.fromCharCode(66 + colIndex)}${rowIndex + 2}: ${direction}`);
    });
  });
}
</code></pre>

このコードは、`B2:E3`の範囲内のセルのテキスト方向をコンソールに出力するもんじゃ。`LEFT_TO_RIGHT`や`RIGHT_TO_LEFT`が出力されるけん、設定が確認できるよ。

## 実践的な活用法

### 1. 動的にテキスト方向を変更する

たとえば、スプレッドシートに入力されているテキストの言語に応じて、テキスト方向を動的に変更することもできるばい。次のコードは、セルの内容に合わせてテキスト方向を変更する例じゃ。

<pre class="wp-block-code"><code>function applyDynamicDirections() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const dataRange = sheet.getDataRange();
  const directions = dataRange.getTextDirections();
  
  const newDirections = directions.map(row =&gt; 
    row.map(dir =&gt; {
      if (dir === TextDirection.RIGHT_TO_LEFT) {
        return TextDirection.LEFT_TO_RIGHT;
      }
      return TextDirection.RIGHT_TO_LEFT;
    })
  );
  
  dataRange.setTextDirections(newDirections);
}
</code></pre>

ここでは、既存の方向設定を反転させる処理を行っとるけん、動的に変更したい時に便利じゃ。

### 2. メモリ効率の良いバッチ処理

大きな範囲のデータを処理する場合、メモリ効率を考えたバッチ処理が必要になることもあるけ。次のコードは、バッチ処理を使った効率的なテキスト方向の取得方法を示しとるけ。

<pre class="wp-block-code"><code>function processLargeRange() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('データシート');
  const range = sheet.getDataRange();
  const batchSize = 1000;
  
  for (let i = 0; i &lt; range.getNumRows(); i += batchSize) {
    const batchRange = range.offset(i, 0, Math.min(batchSize, range.getNumRows() - i), range.getNumColumns());
    const directions = batchRange.getTextDirections();
    // 各行の方向データを処理
  }
}
</code></pre>

これで、大量のデータでもメモリを節約しながら処理できるばい。

## 方向設定の最適化とパフォーマンス

### キャッシュを活用したパフォーマンス向上

たくさんのデータを処理する場合は、キャッシュを活用することでパフォーマンスを改善できるけん、次のコードでは`CacheService`を使って、方向設定をキャッシュに保存し、再利用する方法を紹介するよ。

<pre class="wp-block-code"><code>function cachedDirectionAnalysis() {
  const cache = CacheService.getScriptCache();
  const sheet = SpreadsheetApp.getActive().getSheetByName('分析シート');
  const range = sheet.getRange('A1:Z1000');
  const cacheKey = `directions_${sheet.getSheetId()}_${range.getA1Notation()}`;
  
  let directions = JSON.parse(cache.get(cacheKey));
  if (!directions) {
    directions = range.getTextDirections();
    cache.put(cacheKey, JSON.stringify(directions), 600); // 10分間キャッシュ
  }
  
  // キャッシュデータを使用した処理
}
</code></pre>

こうすることで、同じデータに対して何度も`getTextDirections()`を呼ばずに済むから、処理が速くなるけ。

## トラブルシューティングとデバッグ

### エラーハンドリング

実際に開発を進める中で、予期しないエラーが発生することもあるけ。例えば、範囲が存在しない場合にエラーをキャッチして処理を止めることができるんじゃ。

<pre class="wp-block-code"><code>function safeGetDirections() {
  try {
    const range = SpreadsheetApp.getActive().getRange('存在しないシート!A1:B2');
    const directions = range.getTextDirections();
    // 正常処理
  } catch (e) {
    console.error(`エラー発生: ${e.message}`);
    SpreadsheetApp.getUi().alert('シートまたは範囲が存在しません');
  }
}
</code></pre>

これで、エラーが発生したときに適切に処理ができるけ。

## 結論

`getTextDirections()`メソッドを使うことで、スプレッドシートのテキスト方向を簡単に操作できるようになるばい。多言語対応のスプレッドシートや、大規模データの処理において、非常に有用なメソッドじゃけん、これをうまく活用して、より効率的な開発ができるようになるといいね。

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
