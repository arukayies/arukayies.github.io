---
title: GASでスプレッドシートのセルの垂直配置（上・中央・下）を取得する方法
author: arukayies
date: 2020-09-22T08:45:40+00:00
excerpt: GASでスプレッドシートの指定セルの垂直方向を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1600764342
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
  - getVerticalAlignment()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年9月"]
---
Googleスプレッドシートを使っていると、「テキストを上下どこに配置するか」を調整したくなることがあるばい。そんなときに役立つのが、GAS（Google Apps Script）の `getVerticalAlignment()` メソッドじゃ。本記事では、このメソッドを使いこなす方法を、実践的なスクリプト例とともに解説するばい！


## 1. getVerticalAlignment() メソッドとは？

GASを使うと、スプレッドシートのセル内のテキスト配置を取得・設定できるんじゃ。この `getVerticalAlignment()` は、特定のセルの垂直配置を取得するメソッドで、以下の3種類の値を返すばい。

<ul class="wp-block-list">
  <li>
    <code>top</code>（上寄せ）
  </li>
  <li>
    <code>middle</code>（中央揃え）
  </li>
  <li>
    <code>bottom</code>（下寄せ）
  </li>
</ul>

例えば、セル A1 の垂直配置を取得するスクリプトはこんな感じじゃ。

<pre class="wp-block-code"><code>function checkVerticalAlignment() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange("A1");
  Logger.log(range.getVerticalAlignment());
}
</code></pre>

このコードを実行すると、現在の A1 セルの垂直配置がログに表示されるさ。

## 2. 垂直配置を変更する方法

`getVerticalAlignment()` は取得専用のメソッドばってん、配置を変更したいときは `setVerticalAlignment()` を使うばい。

<pre class="wp-block-code"><code>function setVerticalAlignmentExample() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange("A1:C3");
  range.setVerticalAlignment("middle"); // A1～C3のセルを中央揃えにする
}
</code></pre>

これを実行すると、指定した範囲のセルが中央揃えになるばい。

## 3. 複数セルの配置を一括取得・変更する

スプレッドシートの広範囲に適用するときは、一括取得・設定メソッドを活用すると効率的じゃ。

### 一括取得（getVerticalAlignments()）

<pre class="wp-block-code"><code>function getMultipleVerticalAlignments() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange("A1:C3");
  const alignments = range.getVerticalAlignments();
  Logger.log(alignments);
}
</code></pre>

`getVerticalAlignments()` を使うと、セルごとの配置状態を二次元配列で取得できるばい。

### 一括設定（setVerticalAlignments()）

<pre class="wp-block-code"><code>function setMultipleVerticalAlignments() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange("A1:C3");
  const alignments = &#91;&#91;"top", "middle", "bottom"], &#91;"bottom", "middle", "top"], &#91;"middle", "top", "bottom"]];
  range.setVerticalAlignments(alignments);
}
</code></pre>

このスクリプトでは、A1～C3の各セルに異なる垂直配置を適用するばい。

## 4. 応用テクニック

### セルの内容に応じた自動配置

例えば、セルの内容が長いときは「上揃え」、短いときは「中央揃え」にする自動処理を作ることもできるけ！

<pre class="wp-block-code"><code>function autoAdjustVerticalAlignment() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();
  let alignments = &#91;];

  values.forEach(row =&gt; {
    let alignmentRow = &#91;];
    row.forEach(cell =&gt; {
      if (cell.toString().length &gt; 50) {
        alignmentRow.push("top");
      } else {
        alignmentRow.push("middle");
      }
    });
    alignments.push(alignmentRow);
  });

  range.setVerticalAlignments(alignments);
}
</code></pre>

これで、長いテキストは上寄せ、短いテキストは中央揃えに自動設定されるばい。

## 5. まとめ

GASの `getVerticalAlignment()` メソッドとその関連メソッドを活用すれば、スプレッドシートの視認性を向上させることができるじゃ。

<ul class="wp-block-list">
  <li>
    <code>getVerticalAlignment()</code> で単一セルの配置を取得
  </li>
  <li>
    <code>setVerticalAlignment()</code> で特定範囲の配置を設定
  </li>
  <li>
    <code>getVerticalAlignments()</code> & <code>setVerticalAlignments()</code> で複数セルを一括操作
  </li>
  <li>
    スクリプトを工夫すれば、自動配置調整も可能
  </li>
</ul>

これらを活用して、より見やすく使いやすいスプレッドシートを作ってみるばい！


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
  
  <br /> <a rel="noopener" href="https://techuplife.tech/gas-ss-ralignment/" title="[GAS]水平方向・垂直方向のテキスト位置を取得・設定する方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-4.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-4.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]水平方向・垂直方向のテキスト位置を取得・設定する方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲のセルの水平方向・垂直方向のテキスト位置を取得・設定する
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-ralignment/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-ralignment/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://qiita.com/koichiro-h/items/aa6c1e37fd51f671aa89" title="GAS(GoogleAppsScript)を使ってみる　#004 - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnFpaXRhLWltYWdlLXN0b3JlLnMzLmFtYXpvbmF3cy5jb20lMkYwJTJGMTM2OTc3JTJGcHJvZmlsZS1pbWFnZXMlMkYxNTIzNDQzOTA5P2l4bGliPXJiLTQuMC4wJmFyPTElM0ExJmZpdD1jcm9wJm1hc2s9ZWxsaXBzZSZiZz1GRkZGRkYmZm09cG5nMzImcz0zOTEwMmE5YTYwYTU4MDQ2ZmQyN2E3MzBlYWI5OWFjYg%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3D5a652de3dfa62b21798b86c9c4d43cb8?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9R0FTJTI4R29vZ2xlQXBwc1NjcmlwdCUyOSVFMyU4MiU5MiVFNCVCRCVCRiVFMyU4MSVBMyVFMyU4MSVBNiVFMyU4MSVCRiVFMyU4MiU4QiVFMyU4MCU4MCUyMzAwNCZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZ0eHQtY29sb3I9JTIzMUUyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1wYWQ9MCZzPWNmMjUyMGE4ZjcxMjVmNjcyMWU1YzBkMTdlYTM3ZmY2&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBrb2ljaGlyby1oJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9MzYmdHh0LXBhZD0wJnM9ZThiYjNkMzEzMzc4ZmIxZWFiNzY5OTc0OTc4Y2FmN2Y&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=1f6f369d84266285b421038882c03fd0" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GAS(GoogleAppsScript)を使ってみる　#004 - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        はじめに え、このシリーズ#003で終わったんじゃ無かったのかって？ええ、続きます( ´艸｀) まだネタがあったので少なくとも#005までは続けます(`・ω・) 概要 スプレッドシート出社記録を付けているのだが、この表何と手作り(* ´艸｀...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/koichiro-h/items/aa6c1e37fd51f671aa89" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/koichiro-h/items/aa6c1e37fd51f671aa89" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a>
</div>
