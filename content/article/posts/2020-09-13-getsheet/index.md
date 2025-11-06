---
title: GASでスプレッドシートの特定シートを取得・操作する方法徹底解説
author: arukayies
date: 2020-09-13T12:32:04+00:00
excerpt: GASでスプレッドシートのシートオブジェクトを取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1600000325
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
  - getSheet()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年9月"]
---
Google Apps Script（GAS）でスプレッドシートを操作するとき、シートを取得するメソッドは必須じゃ！これが分かれば、データ処理もスムーズになるばい。

今回は、スプレッドシートとシートの関係を整理しながら、主要な取得方法を分かりやすく解説していくばい！


<hr class="wp-block-separator has-alpha-channel-opacity" />

## スプレッドシートとシートの関係

まず、GASのスプレッドシートは階層構造になっちょる。

<ul class="wp-block-list">
  <li>
    <code>SpreadsheetApp</code>：スプレッドシート全体を管理する最上位オブジェクト。
  </li>
  <li>
    <code>Spreadsheet</code>オブジェクト：スプレッドシートファイルのこと。
  </li>
  <li>
    <code>Sheet</code>オブジェクト：ワークシートのこと。
  </li>
</ul>

例えば、Excelで言うと「ブック」がスプレッドシートで、「シート」がGASの`Sheet`オブジェクトに相当するっちゃね。

## スプレッドシートの取得方法

### 1. アクティブなスプレッドシートの取得

スクリプトが紐づいているスプレッドシートを取得する方法じゃ。

<pre class="wp-block-code"><code>const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
</code></pre>

トリガー実行時やカスタムメニューからの起動時に使いやすいけ！

### 2. ID指定でスプレッドシートを開く

スプレッドシートのURLからIDを抜き出して、特定のスプレッドシートを開く方法。

<pre class="wp-block-code"><code>const spreadsheetId = 'スプレッドシートのURLの「/d/」と「/edit」の間にある文字列';
const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
</code></pre>

スプレッドシートのURLの「/d/」と「/edit」の間にある文字列がIDじゃ。

### 3. URLを使って開く

<pre class="wp-block-code"><code>const url = 'スプレッドシートのURL';
const spreadsheet = SpreadsheetApp.openByUrl(url);
</code></pre>

URLの変更に弱いから、IDを使う方法のほうがオススメばい！

## シートの取得方法

### 1. アクティブなシートを取得

現在開いているシートを取得する方法。

<pre class="wp-block-code"><code>const activeSheet = spreadsheet.getActiveSheet();
</code></pre>

### 2. 名前で指定する

<pre class="wp-block-code"><code>const sheetName = '月次レポート';
const sheet = spreadsheet.getSheetByName(sheetName);
</code></pre>

シート名が完全一致じゃないと取得できんけ、スペースや大文字小文字に気をつけんといかんばい！

### 3. インデックスで取得

<pre class="wp-block-code"><code>const sheetIndex = 0; // 左端のシート
const firstSheet = spreadsheet.getSheets()&#91;sheetIndex];
</code></pre>

シートの並び順が変わると影響を受けるけ、固定する場合は名前指定のほうが安全じゃ。

### 4. すべてのシートを取得

<pre class="wp-block-code"><code>const allSheets = spreadsheet.getSheets();
</code></pre>

シートを一括で処理するときに便利じゃね！

## 応用テクニック

### シートが存在しなければ作成

<pre class="wp-block-code"><code>function getOrCreateSheet(sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    console.log(`新しいシート「${sheetName}」を作成したばい！`);
  }
  return sheet;
}
</code></pre>

### 部分一致でシートを検索

<pre class="wp-block-code"><code>function findSheetsByPartialName(partialName) {
  return spreadsheet.getSheets().filter(sheet =&gt; sheet.getName().includes(partialName));
}
</code></pre>

特定のワードを含むシートを探すのに便利じゃ！

## 落とし穴と対策

### シート名変更への対応

<ul class="wp-block-list">
  <li>
    <code>getSheetByName()</code> は名前が変わると使えなくなる。
  </li>
  <li>
    <code>gid</code>（シートID）を使うと確実。
  </li>
  <li>
    メタデータ用のシートを作り、IDを管理する方法もあり。
  </li>
</ul>

### インデックスの不安定性

<ul class="wp-block-list">
  <li>
    <code>getSheets()</code> の順番は変わる可能性があるけ、固定的な処理には向かん。
  </li>
  <li>
    重要なシートは <code>getSheetByName()</code> で管理すべし。
  </li>
</ul>

## まとめ

GASでスプレッドシートを操作するなら、適切なシート取得メソッドを使い分けるのがポイントじゃ。

<ul class="wp-block-list">
  <li>
    どのスプレッドシートを操作するか：<code>getActiveSpreadsheet()</code>, <code>openById()</code>, <code>openByUrl()</code>
  </li>
  <li>
    どのシートを操作するか：<code>getActiveSheet()</code>, <code>getSheetByName()</code>, <code>getSheets()[index]</code>
  </li>
  <li>
    シートがなければ作成：<code>insertSheet()</code>
  </li>
</ul>

これをマスターすれば、スプレッドシートの自動化が一気に楽になるばい！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://qiita.com/mitama/items/e5fbf8306384c26cf42f" title="GASによるSpreadsheetの基本操作まとめ - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnFpaXRhLWltYWdlLXN0b3JlLnMzLmFtYXpvbmF3cy5jb20lMkYwJTJGMjAxMzQ4JTJGcHJvZmlsZS1pbWFnZXMlMkYxNTA0OTI0MTMwP2l4bGliPXJiLTQuMC4wJmFyPTElM0ExJmZpdD1jcm9wJm1hc2s9ZWxsaXBzZSZiZz1GRkZGRkYmZm09cG5nMzImcz04ZjkxY2I1ZjExODM0NzdmODY5OGY1MmQ4ZmQ0Y2Y2Mg%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3D4b30249121c1bfe4d267ce4092b9e1c5?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9R0FTJUUzJTgxJUFCJUUzJTgyJTg4JUUzJTgyJThCU3ByZWFkc2hlZXQlRTMlODElQUUlRTUlOUYlQkElRTYlOUMlQUMlRTYlOTMlOEQlRTQlQkQlOUMlRTMlODElQkUlRTMlODElQTglRTMlODIlODEmdHh0LWFsaWduPWxlZnQlMkN0b3AmdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT01NiZ0eHQtcGFkPTAmcz0zZTRhZjFiNDExYzE0Mjc5YjkwOWQ4NzE4MDRiNTg3Zg&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBtaXRhbWEmdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtcGFkPTAmcz01NjNmNTYwYTE3YmQ1NjE3NzM0ZTViNDUyYWQyMDljMw&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=fbd2dca8327b1b128a4a39d2ff847ae8" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASによるSpreadsheetの基本操作まとめ - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script（GAS）でスプレッドシートの値を読み書きする場合，最も基本的な操作として次のようなステップを経ます。 Spreadsheetファイルを開く（SpreadSheetオブジェクトの取得） Sheetを開く（...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/mitama/items/e5fbf8306384c26cf42f" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/mitama/items/e5fbf8306384c26cf42f" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://agohack.com/gas-how-to-get-sheet" title="[GAS] シートを取得する方法" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://agohack.com/wp/wp-content/uploads/2019/08/gas-logo.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://agohack.com/wp/wp-content/uploads/2019/08/gas-logo.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS] シートを取得する方法
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script で シートを取得する方法のまとめ。 シートの位置（インデックス）で、シート名で、アクティブシート、シート全部を取得する方法をメモ。 シート位...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://agohack.com/gas-how-to-get-sheet/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://agohack.com/gas-how-to-get-sheet/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          agohack.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://zenn.dev/linkedge/articles/c363feb0cc7856" title="【GAS】スプシを操作するメソッドあれこれ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://res.cloudinary.com/zenn/image/upload/s--ppPzhTGs--/c_fit%2Cg_north_west%2Cl_text:notosansjp-medium.otf_55:%25E3%2580%2590GAS%25E3%2580%2591%25E3%2582%25B9%25E3%2583%2597%25E3%2582%25B7%25E3%2582%2592%25E6%2593%258D%25E4%25BD%259C%25E3%2581%2599%25E3%2582%258B%25E3%2583%25A1%25E3%2582%25BD%25E3%2583%2583%25E3%2583%2589%25E3%2581%2582%25E3%2582%258C%25E3%2581%2593%25E3%2582%258C%2Cw_1010%2Cx_90%2Cy_100/g_south_west%2Cl_text:notosansjp-medium.otf_34:RyoyaOkuma%2Cx_220%2Cy_108/bo_3px_solid_rgb:d6e3ed%2Cg_south_west%2Ch_90%2Cl_fetch:aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3plbm4tdXNlci11cGxvYWQvYXZhdGFyLzNmZmE4YTI1NWMuanBlZw==%2Cr_20%2Cw_90%2Cx_92%2Cy_102/co_rgb:6e7b85%2Cg_south_west%2Cl_text:notosansjp-medium.otf_30:%25E6%25A0%25AA%25E5%25BC%258F%25E4%25BC%259A%25E7%25A4%25BEL%2526E%2520Group%2Cx_220%2Cy_160/bo_4px_solid_white%2Cg_south_west%2Ch_50%2Cl_fetch:aHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSzhIN0k1TWtwTzN0SFJZOWQzRzVSdTVyVlpRVmI1MG5IWG1HWTdwdk5ublk4PXM5Ni1j%2Cr_max%2Cw_50%2Cx_139%2Cy_84/v1627283836/default/og-base-w1200-v2.png?_a=BACAGSGT" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプシを操作するメソッドあれこれ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://zenn.dev/linkedge/articles/c363feb0cc7856" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://zenn.dev/linkedge/articles/c363feb0cc7856" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          zenn.dev
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://auto-worker.com/blog/?p=4914" title="GASでスプレッドシートのシート名を取得する方法(getSheetName) | AutoWorker〜Google Apps Script(GAS)とSikuliで始める業務改善入門" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://auto-worker.com/blog/wp-content/uploads/2021/12/20211228_auto_002.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://auto-worker.com/blog/wp-content/uploads/2021/12/20211228_auto_002.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASでスプレッドシートのシート名を取得する方法(getSheetName) | AutoWorker〜Google Apps Script(GAS)とSikuliで始める業務改善入門
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script(GAS)ではスプレッドシートの各種操作が可能です。 その中で、スプレッドシートから取得したシートのシート名を取得する方法を解説します。 GA...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://auto-worker.com/blog/?p=4914" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://auto-worker.com/blog/?p=4914" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          auto-worker.com
        </div>
      </div>
    </div>
  </div></a>
</div>
