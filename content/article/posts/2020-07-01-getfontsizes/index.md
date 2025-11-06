---
title: GASでスプレッドシートのセル範囲からフォントサイズを一括取得する方法
author: arukayies
date: 2020-06-30T15:14:42+00:00
excerpt: GASでスプレッドシートの指定範囲すべての文字サイズを取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1593530083
the_review_rate:
  - 5
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
  - GAS
  - getFontSizes()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）でスプレッドシートを操作する時、フォントサイズを取得したい場面ってあるばい？ `getFontSizes()`メソッドを使えば、セルのフォントサイズを一括で取得できるんじゃ！

今回は、この`getFontSizes()`メソッドの基本から応用テクニックまで、ばっちり解説するけん、ぜひ最後まで読んでみてな！


## getFontSizes()メソッドとは？

このメソッドは、指定したセル範囲内のフォントサイズを**二次元配列**で取得できる便利なやつ。 例えば、スプレッドシートの特定の範囲のフォントサイズを知りたい時に使うばい。

### 基本構文

<pre class="wp-block-code"><code>const fontSizes = range.getFontSizes();
</code></pre>

特定のセル範囲に適用すると、その範囲のフォントサイズ情報が**行列の形**で返ってくるっちゃ！

例えば、こんな感じでデータが返ってくるばい。

<pre class="wp-block-code"><code>&#91;
  &#91;12, 14],
  &#91;16, 18],
  &#91;20, 22]
]
</code></pre>

この二次元配列の各要素が、それぞれのセルのフォントサイズを表してるんじゃ。

## getFontSizes()を使う基本手順

### 1. スプレッドシートとシートの取得

<pre class="wp-block-code"><code>const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheet = ss.getSheetByName('シート名');
</code></pre>

### 2. 範囲オブジェクトを指定

<pre class="wp-block-code"><code>const range = sheet.getRange('B2:D4');
</code></pre>

### 3. フォントサイズを取得

<pre class="wp-block-code"><code>const fontSizes = range.getFontSizes();
</code></pre>

### 4. データをループ処理

<pre class="wp-block-code"><code>fontSizes.forEach((row, rowIndex) =&gt; {
  row.forEach((size, colIndex) =&gt; {
    console.log(`行${rowIndex+1} 列${colIndex+1}のフォントサイズ: ${size}pt`);
  });
});
</code></pre>

## getFontSizes()の応用テクニック

### 大きなフォントサイズを持つセルを検出

<pre class="wp-block-code"><code>function detectLargeFonts() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const fontSizes = dataRange.getFontSizes();
  const LARGE_SIZE = 16;
  let largeCells = &#91;];
  
  fontSizes.forEach((row, i) =&gt; {
    row.forEach((size, j) =&gt; {
      if(size &gt;= LARGE_SIZE) {
        const cellNotation = `${String.fromCharCode(65+j)}${i+1}`;
        largeCells.push(cellNotation);
      }
    });
  });
  
  console.log(`16pt以上のセル: ${largeCells.join(', ')}`);
}
</code></pre>

### フォントサイズのバックアップ

<pre class="wp-block-code"><code>function backupFontSizes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName('メイン');
  const backupSheet = ss.getSheetByName('バックアップ') || ss.insertSheet('バックアップ');
  
  const sourceRange = sourceSheet.getDataRange();
  const fontSizes = sourceRange.getFontSizes();
  
  backupSheet.clearContents();
  sourceRange.copyTo(backupSheet.getRange(1, 1));
  
  fontSizes.forEach((row, i) =&gt; {
    row.forEach((size, j) =&gt; {
      backupSheet.getRange(i+1, j+1).setNote(`元のフォントサイズ: ${size}pt`);
    });
  });
}
</code></pre>

## まとめ

`getFontSizes()`メソッドを使うと、スプレッドシートのフォントサイズを**一括で取得**できるっちゃ。

<ul class="wp-block-list">
  <li>
    <code>getFontSizes()</code>は二次元配列でデータを取得
  </li>
  <li>
    範囲指定 → <code>getFontSizes()</code>適用 → ループ処理 で活用できる
  </li>
  <li>
    <strong>条件付き検出</strong>や<strong>バックアップ</strong>など応用も可能
  </li>
</ul>

フォントサイズをチェックしたり、デザインの統一を図ったりする時に、ばっちり使えるけん、ぜひ試してみてな！


<hr class="wp-block-separator has-alpha-channel-opacity" />

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://gsuiteguide.jp/sheets/getfontsizes/" title="セル範囲のフォントサイズ(文字の大きさ)をセルごとに取得する：getFontSizes()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        セル範囲のフォントサイズ(文字の大きさ)をセルごとに取得する：getFontSizes()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        getFontSizes() セル範囲のフォントサイズ(文字の大きさ)をセルごとに取得する。 サンプルコード // 現在アクティブなスプレッドシートを取得 var ss = SpreadsheetApp.getActiveSpreadshe...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getfontsizes/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getfontsizes/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
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
  
  <br /> <a rel="noopener" href="https://qiita.com/matsuhandy/items/7d5215efc2bdad7f4055" title="Google Apps Script(GAS)でスプレッドシートを扱うクラス(J3-02) - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnNlY3VyZS5ncmF2YXRhci5jb20lMkZhdmF0YXIlMkY0ZjZjOGQ4M2ExODFjMDYyYzNjMmNjODY2MjBkNDNiND9peGxpYj1yYi00LjAuMCZhcj0xJTNBMSZmaXQ9Y3JvcCZtYXNrPWVsbGlwc2UmYmc9RkZGRkZGJmZtPXBuZzMyJnM9YTQxNDM5MGM1ODhkMTY1ODE3ZjExMWYxMWJlZWI5MDg%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3Dd748da7436e7e31d99f2e52ca3ef0713?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9R29vZ2xlJTIwQXBwcyUyMFNjcmlwdCUyOEdBUyUyOSVFMyU4MSVBNyVFMyU4MiVCOSVFMyU4MyU5NyVFMyU4MyVBQyVFMyU4MyU4MyVFMyU4MyU4OSVFMyU4MiVCNyVFMyU4MyVCQyVFMyU4MyU4OCVFMyU4MiU5MiVFNiU4OSVCMSVFMyU4MSU4NiVFMyU4MiVBRiVFMyU4MyVBOSVFMyU4MiVCOSUyOEozLTAyJTI5JnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LXBhZD0wJnM9MTY2ODVhODkwODMyYTQxMzBkNGJjZDNiZDBkOTZmY2E&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBtYXRzdWhhbmR5JnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9MzYmdHh0LXBhZD0wJnM9ZmY0YzBhOWIwMGExYThlYThmMzkzZDc2OTJlNjUwMzc&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=200d3325d51a29dd9c6ea31da2e06abd" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Apps Script(GAS)でスプレッドシートを扱うクラス(J3-02) - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        0. 前回の復習課題 ＜課題3＞ GoogleDrive上に今日の日付のフォルダを作り，logというファイル名のドキュメントを作成，ファイルIDを取得せよ。次のGASプログラムを動作させ，結果が図のようになることを確認せよ。mainを読んで...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/matsuhandy/items/7d5215efc2bdad7f4055" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/matsuhandy/items/7d5215efc2bdad7f4055" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a>
</div>

それじゃ、GASライフを楽しんでな～！
