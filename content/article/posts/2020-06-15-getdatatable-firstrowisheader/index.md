---
title: GASでスプレッドシートのデータ範囲を見出し付きで簡単取得する方法
author: arukayies
type: post
date: 2020-06-14T16:19:48+00:00
excerpt: GASでスプレッドシートのグラフのデータ範囲を取得(見出し指定)する方法を紹介します！
url: /gas/getdatatable-firstrowisheader
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
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
last_modified:
  - 2025-03-07 23:12:35
categories:
  - GAS
tags:
  - GAS
  - getDataTable(firstRowIsHeader)
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）って、スプレッドシートやその他のGoogleサービスを自動化するのに便利なツールやけど、今回はその中でも`getDataTable(firstRowIsHeader)`メソッドの使い方に焦点を当てて、初心者でもわかりやすく解説していくけんね！このメソッド、ほんとうに便利で、データを整然と扱えるようになるばい。

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

## まずはDataTableの基本からさ

### DataTableってなに？

`getDataTable`メソッドを使うと、スプレッドシートのデータを「DataTable」っていう形で取得できるんだけど、これはスプレッドシートのデータを「表形式」やけど、より扱いやすくするためのものなんじゃ。例えば、文字列や数値、日付が混在したデータも、ちゃんと型を認識して整理してくれるんよ。

データの範囲がちゃんと「列の名前」や「データ」の部分が分かれてて、可視化ツール（グラフ作成など）とも簡単に連携できるようになるばい。

### firstRowIsHeaderの意味

このメソッドには`firstRowIsHeader`ってパラメータがあるけんど、これがポイントじゃけ。もしこれを`true`にしたら、最初の行をヘッダーとして扱って、それ以降の行をデータ行として処理するんよ。もし`false`なら、全ての行をデータとして扱って、列の名前は自動で「Col0」「Col1」みたいに付けられるんよ。

### こんなに便利！従来の方法との違い

通常、スプレッドシートからデータを取得するのには`getValues()`を使うことが多いけど、これだとただの2次元配列が返ってきて、データ型や列名がわからんけど、`getDataTable`ならきちんとデータを整理してくれるけん、扱いやすくなるんよね。

## getDataTable(firstRowIsHeader)の技術的な仕様

このメソッドを実際に使うには、まず以下のように書くことができるよ。

<pre class="wp-block-code"><code>Range.getDataTable(firstRowIsHeader)
</code></pre>

### パラメータ

<table class="has-fixed-layout">
  <tr>
    <th>
      名前
    </th>
    
    <th>
      型
    </th>
    
    <th>
      説明
    </th>
  </tr>
  
  <tr>
    <td>
      <code>firstRowIsHeader</code>
    </td>
    
    <td>
      Boolean
    </td>
    
    <td>
      最初の行をヘッダーとして扱うかどうか
    </td>
  </tr>
</table></figure> 

### 戻り値

<ul class="wp-block-list">
  <li>
    <code>DataTable</code>オブジェクト：構造化されたデータの形式で返されるばい。
  </li>
</ul>

例えば、`firstRowIsHeader`を`true`に設定した場合、最初の行をヘッダーとして扱って、2行目以降をデータとして扱うことができるよ。

## 実際に使ってみよう！基本のコード

<pre class="wp-block-code"><code>function basicExample() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('SalesData');
  const dataRange = sheet.getRange('A1:D10');
  
  // ヘッダー行ありでDataTableを取得
  const dataTable = dataRange.getDataTable(true);
  
  // チャート生成
  const chart = Charts.newLineChart()
    .setDataTable(dataTable)
    .setTitle('Sales Trend')
    .build();
  
  SpreadsheetApp.getUi().showModalDialog(chart, 'Sales Analysis');
}
</code></pre>

この例では、`A1:D10`の範囲を指定して、最初の行をヘッダーとして扱い、そのデータを使って折れ線グラフを作成しているんよ。これができると、スプレッドシートのデータから簡単にグラフが作れるけん、すごく便利じゃない？

## ヘッダーあり・なしの違い

`firstRowIsHeader`を`true`にした場合と`false`にした場合では、得られるデータに違いが出るけん、ちょっと見てみようか。

**ヘッダー行あり：**

<pre class="wp-block-code"><code>const dataWithHeader = range.getDataTable(true);
// 列名: &#91;'Product', 'Q1', 'Q2', 'Q3']
// データ行: &#91;&#91;'A', 100, 150, 200], ...]
</code></pre>

**ヘッダー行なし：**

<pre class="wp-block-code"><code>const dataWithoutHeader = range.getDataTable(false);
// 列名: &#91;'Col0', 'Col1', 'Col2', 'Col3']
// データ行: &#91;&#91;'Product', 'Q1', 'Q2', 'Q3'], &#91;'A', 100, 150, 200], ...]
</code></pre>

これで、どういうふうにデータを解釈するかが大きく変わるけん、使い方には気をつける必要があるよ。

## 実務で使える！レポート自動生成システム

<pre class="wp-block-code"><code>function generateDailyReport() {
  const templateSheet = SpreadsheetApp.getActive().getSheetByName('ReportTemplate');
  const dataSheet = SpreadsheetApp.getActive().getSheetByName('DailyData');
  
  const dataRange = dataSheet.getRange('A1:F' + dataSheet.getLastRow());
  const dataTable = dataRange.getDataTable(true);
  
  // チャート生成
  const chartBlob = Charts.newLineChart()
    .setDataTable(dataTable)
    .setDimensions(800, 600)
    .build()
    .getBlob();
  
  // PDF生成
  const pdfContent = &#91;
    'Daily Sales Report',
    '',
    '',
    'MetricValue'
  ];
  
  for (let i = 0; i &lt; dataTable.getNumberOfColumns(); i++) {
    pdfContent.push(
      `${dataTable.getColumnLabel(i)}: ${calculateColumnSum(dataTable, i)}`
    );
  }
  
  pdfContent.push('');
  
  // メール送信
  MailApp.sendEmail({
    to: 'report@company.com',
    subject: 'Daily Sales Report',
    htmlBody: pdfContent.join(''),
    attachments: &#91;chartBlob],
    inlineImages: {chartImage: chartBlob}
  });
}
</code></pre>

これで、毎日のレポート作成を完全に自動化できるんよ！データの集計、グラフの生成、PDFの作成まで全部自動でできちゃうけん、ほんとうに効率化できるばい。

## 結論：GASでのデータ管理が劇的に楽になる！

`getDataTable(firstRowIsHeader)`メソッドを使えば、スプレッドシートからデータを取得する際に、データ型や列名を気にすることなく、簡単に整然としたデータを扱えるようになるんよ。これを使えば、分析やレポート作成の効率が格段にアップするけん、試してみてほしいんじゃ！

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
  <a rel="noopener" href="https://stackoverflow.com/questions/32206822/manipulating-spreadsheet-data-for-visualization" title="Manipulating Spreadsheet data for visualization" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Manipulating Spreadsheet data for visualization
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        I just started learning Google Apps Script/JavaScript and would like to know how to reshape, manipulate multi-dimensiona...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/32206822/manipulating-spreadsheet-data-for-visualization" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/32206822/manipulating-spreadsheet-data-for-visualization" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          stackoverflow.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/advanced/tables?hl=ja" title="テーブル サービス  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/v90b15eef664021f94a1ab8a4ca14c533325a9006d6183b165fb79714a6fcd6a0/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/v90b15eef664021f94a1ab8a4ca14c533325a9006d6183b165fb79714a6fcd6a0/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        テーブル サービス  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/advanced/tables?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/advanced/tables?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
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
