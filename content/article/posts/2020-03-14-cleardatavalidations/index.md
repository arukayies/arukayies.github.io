---
title: GASでスプレッドシートの指定範囲から入力規則のみを削除する方法
author: arukayies
type: post
date: 2020-03-14T07:38:29+00:00
excerpt: GASでスプレッドシートの指定範囲のデータの入力規則のみを 削除する方法を紹介します！
url: /gas/cleardatavalidations
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
  - 1
last_modified:
  - 2025-03-07 23:17:11
categories:
  - GAS
tags:
  - clearDataValidations()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）の`clearDataValidations()`メソッドは、スプレッドシートのデータ入力規則を削除するために使う便利な機能ばい。このメソッドをうまく使いこなすことで、スプレッドシートの管理がとても楽になるけん、今回はその基本的な使い方や応用例を紹介するけ。

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

## データ入力規則って何？

データ入力規則っていうのは、スプレッドシート内で「このセルには数字だけ」「このセルには日付だけ」っていう風に、入力を制限するためのルールだよ。例えば、在庫管理や注文リストの管理なんかでは、データの誤入力を防ぐために非常に役立つ機能なんじゃ。

`clearDataValidations()`メソッドは、こうした入力規則を削除するもので、指定したセル範囲に設定されているルールを消すことができるんだ。これを使うと、例えば商品のカテゴリが変わったときに、古いドロップダウンリストを削除して新しいリストを追加するのに便利さ。

## メソッドの基本的な使い方

このメソッドはとてもシンプルで、コードも簡単ばい。まず、以下のように使うことができるよ。

<pre class="wp-block-code"><code>function clearValidationsSample() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('注文管理');
  const targetRange = sheet.getRange('B2:F100');
  targetRange.clearDataValidations();
}
</code></pre>

このコードでは、注文管理シートのB2からF100までの範囲に設定されているデータ入力規則をすべて削除しているけ。もし、特定の条件を満たすデータ入力規則だけを削除したい場合には、もう少し工夫が要るけどね。

## 他のメソッドとの違い

スプレッドシートには他にも「clear()」や「clearContent()」といったデータクリア系のメソッドがあるんじゃけど、それぞれに違いがあるんだ。<figure class="wp-block-table">

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド名
    </th>
    
    <th>
      値
    </th>
    
    <th>
      書式
    </th>
    
    <th>
      コメント
    </th>
    
    <th>
      入力規則
    </th>
    
    <th>
      条件付き書式
    </th>
  </tr>
  
  <tr>
    <td>
      <code>clear()</code>
    </td>
    
    <td>
      ✔️
    </td>
    
    <td>
      ✔️
    </td>
    
    <td>
      ✔️
    </td>
    
    <td>
      ✔️
    </td>
    
    <td>
      ❌
    </td>
  </tr>
  
  <tr>
    <td>
      <code>clearContent()</code>
    </td>
    
    <td>
      ✔️
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      ❌
    </td>
  </tr>
  
  <tr>
    <td>
      <code>clearDataValidations()</code>
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      ✔️
    </td>
    
    <td>
      ❌
    </td>
  </tr>
  
  <tr>
    <td>
      <code>clearFormat()</code>
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      ✔️
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      ❌
    </td>
  </tr>
</table></figure> 

この表からもわかるように、`clearDataValidations()`は入力規則にだけ焦点を当ててるんじゃ。だから、例えば商品のカテゴリを変更するときに古いリストを削除して新しいリストを設定したい時にピッタリなんじゃ。

## 応用例：動的な範囲での使用

データの範囲が変動する場合にも、このメソッドは活躍するけ。例えば、データの行数が増えたり減ったりする場合でも、動的に範囲を設定して処理できるんじゃ。

<pre class="wp-block-code"><code>function dynamicRangeClear() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const validationColumns = &#91;2, 4, 5]; // B, D, E列
  
  validationColumns.forEach(col => {
    sheet.getRange(2, col, lastRow-1).clearDataValidations();
  });
}
</code></pre>

このコードでは、B列、D列、E列に設定された入力規則を動的に削除することができるんじゃ。これにより、新しいデータが追加された場合でも、入力規則を柔軟に管理できるようになるんじゃ。

## 高度なテクニック：条件付きでバリデーションを削除

さらに進んだ使い方として、特定の条件に合った入力規則だけを削除する方法があるんじゃ。例えば、日付が指定日以降のセルだけを削除することもできるけ。

<pre class="wp-block-code"><code>function conditionalValidationClear() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const validations = dataRange.getDataValidations();
  
  validations.forEach((row, i) => {
    row.forEach((rule, j) => {
      if (rule && rule.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.DATE_AFTER) {
        sheet.getRange(i+1, j+1).clearDataValidations();
      }
    });
  });
}
</code></pre>

このコードでは、日付が「指定日以降」の入力規則が設定されているセルだけを削除するんじゃ。これによって、特定の条件に合わせた柔軟な処理ができるんだよ。

## パフォーマンス最適化のポイント

大量のデータを扱う場合には、パフォーマンスに気をつけないといけんけど、このように最適化することで効率よく処理できるようになるけ。

<pre class="wp-block-code"><code>function optimizePerformance() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const startRow = 2;
  const numRows = sheet.getLastRow() - 1;
  const numCols = sheet.getLastColumn();
  
  // バッチ処理の有効化
  SpreadsheetApp.flush();
  
  // 範囲指定の最適化
  const bulkRange = sheet.getRange(startRow, 1, numRows, numCols);
  const validations = bulkRange.getDataValidations();
  
  // データ処理
  const newValidations = validations.map(row => 
    row.map(rule => {
      return rule && rule.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.CHECKBOX ? 
             null : rule;
    })
  );
  
  // 一括更新
  bulkRange.setDataValidations(newValidations);
}
</code></pre>

このように一括でデータを処理することで、API呼び出しの回数を減らしてパフォーマンスを大幅に改善できるんじゃ。

## まとめ

`clearDataValidations()`メソッドは、Googleスプレッドシートでのデータ入力規則を管理するための強力なツールじゃ。これをうまく活用することで、データの整合性を保ちながら、柔軟で効率的なシステムを作ることができるけ。

今後、スプレッドシートでより複雑な管理が必要になった時には、このメソッドをぜひ活用してみてな。さらに進んだ機能もあるけん、ぜひ色々試してみるといいばい。

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
  <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" title="Spreadsheet Service  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        Spreadsheet Service  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://excel-ubara.com/apps_script1/GAS031.html" title="入力規則｜Google Apps Script入門" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://excel-ubara.com/ogp.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://excel-ubara.com/ogp.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        入力規則｜Google Apps Script入門
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GoogleAppsScriptで、スプレッドシートに入力規則を設定します、入力規則は機能がとても多く、それにメ対応したソッドも多数あります。ここでは、メソッドの一覧と、代表的な使い方を参考スクリプトを掲載します。入力規則の作成方法の概要 ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://excel-ubara.com/apps_script1/GAS031.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://excel-ubara.com/apps_script1/GAS031.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          excel-ubara.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://tonari-it.com/gas-spreadsheet-range-clear-clearcontent/" title="【初心者向けGAS】スプレッドシートのセル範囲をクリアするいくつかの方法" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://tonari-it.com/wp-content/uploads/clear.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://tonari-it.com/wp-content/uploads/clear.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【初心者向けGAS】スプレッドシートのセル範囲をクリアするいくつかの方法
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps ScriptでBotを作りながらその基本を学んでいくシリーズです。今回はスプレッドシートのセル範囲をクリアする方法としてclearメソッド、clearContentメソッドを紹介します。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://tonari-it.com/gas-spreadsheet-range-clear-clearcontent/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://tonari-it.com/gas-spreadsheet-range-clear-clearcontent/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          tonari-it.com
        </div>
      </div>
    </div>
  </div></a>
</div>
<task_progress>
- [x] Analyze requirements
- [ ] Examine search implementation
- [x] Check for search index file
- [x] Trigger Hugo build
- [x] Read problematic content file
- [x] Correct YAML front matter
- [x] Re-run Hugo build
- [x] Investigate new file path error
- [x] Read the actual problematic file
- [x] Read the next problematic file
- [ ] Verify search index generation
- [ ] Fix search functionality
- [ ] Incorporate latest changes
- [ ] Merge changes
- [ ] Commit changes
</task_progress>
</write_to_file>
