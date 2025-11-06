---
title: GASでスプレッドシートの指定範囲にフィルタを作成する方法
author: arukayies
date: 2020-05-25T09:57:22+00:00
excerpt: GASでスプレッドシートのフィルタを作成する方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1590400642
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
  - createFilter()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年5月"]
---
Google Apps Script（GAS）を使えば、スプレッドシートのフィルタを自動化できるっちゃ！今回は、`createFilter()`メソッドを使って、基本的なフィルタの作成から、動的フィルタ、複合条件フィルタまでバッチリ解説するけん、最後まで読んでみてな。


<hr class="wp-block-separator has-alpha-channel-opacity" />

## 1. フィルタの基本操作

まず、GASでスプレッドシートのフィルタを作成する基本のコードを見てみるばい。

<pre class="wp-block-code"><code>function basicFilterCreation() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SalesData');
  const dataRange = sheet.getRange('A1:D100');
  const newFilter = dataRange.createFilter();
}
</code></pre>

このコードでは、`A1:D100`の範囲にフィルタを設定しとる。シンプルやけど、これだけでもデータ管理が便利になるばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 2. 既存フィルタを削除して安全に作成する

フィルタを作成する前に、すでにフィルタがあるかチェックして、重複を防ぐのが大事じゃ。

<pre class="wp-block-code"><code>function safeFilterCreation() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  
  // 既存フィルタチェック
  const existingFilter = range.getFilter();
  if (existingFilter) {
    existingFilter.remove();
  }
  
  // 新規フィルタ作成
  const newFilter = range.createFilter();
}
</code></pre>

これを使えば、二重フィルタの心配なし！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 3. データ範囲を動的に設定する

データの行数が増えたり減ったりする場合、`getDataRange()`を使えば、最新のデータ範囲にフィルタを適用できるけん便利ばい！

<pre class="wp-block-code"><code>function dynamicRangeFilter() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  dataRange.createFilter();
}
</code></pre>

これで新しいデータが追加されても、ちゃんとフィルタが適用されるとさ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 4. 特定の列にフィルタ条件を設定する

`setColumnFilterCriteria()`メソッドを使えば、特定の列だけフィルタリングできるとよ。

<pre class="wp-block-code"><code>function columnSpecificFilter() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const filter = sheet.getFilter();
  
  const criteria = SpreadsheetApp.newFilterCriteria()
    .setHiddenValues(&#91;'Inactive', 'Pending'])
    .build();
  
  filter.setColumnFilterCriteria(2, criteria); // B列に適用
}
</code></pre>

B列のデータで「Inactive」「Pending」を非表示にするフィルタばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 5. 複数の条件を組み合わせる

複数の列にフィルタをかける場合は、各列ごとに設定すればOK！

<pre class="wp-block-code"><code>function multiColumnFilter() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const filter = sheet.getFilter();
  
  // 売上高が1000未満
  const salesCriteria = SpreadsheetApp.newFilterCriteria()
    .whenNumberLessThan(1000)
    .build();
  
  // 地域が「West」
  const regionCriteria = SpreadsheetApp.newFilterCriteria()
    .setVisibleValues(&#91;'West'])
    .build();
  
  filter.setColumnFilterCriteria(3, salesCriteria); // C列（売上高）
  filter.setColumnFilterCriteria(4, regionCriteria); // D列（地域）
}
</code></pre>

これで「売上1000未満」かつ「地域がWest」のデータだけ表示できるとさ！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 6. フィルタの状態を監査・記録する

フィルタの設定を変更した履歴を記録しておくのもアリじゃ。

<pre class="wp-block-code"><code>function logFilterChanges() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const filter = sheet.getFilter();
  
  const logSheet = ss.getSheetByName('FilterLog') || ss.insertSheet('FilterLog');
  const logData = &#91;
    new Date(),
    sheet.getName(),
    JSON.stringify(filter.getColumnFilterCriteria(2))
  ];
  
  logSheet.appendRow(logData);
}
</code></pre>

これを実行すれば、「いつ・どのシートで・どんなフィルタが適用されたか」を記録できるけん、管理が楽になるばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## まとめ

GASの`createFilter()`メソッドを使えば、スプレッドシートのデータ管理がめちゃくちゃ便利になるっちゃ！

<ul class="wp-block-list">
  <li>
    <strong>基本のフィルタ作成</strong> → <code>createFilter()</code>を使えば簡単
  </li>
  <li>
    <strong>安全なフィルタ操作</strong> → 既存フィルタを削除してから作成
  </li>
  <li>
    <strong>動的範囲の設定</strong> → <code>getDataRange()</code>でデータ増減に対応
  </li>
  <li>
    <strong>特定列のフィルタ</strong> → <code>setColumnFilterCriteria()</code>で細かい条件設定
  </li>
  <li>
    <strong>複数条件の適用</strong> → 複数列のフィルタを組み合わせる
  </li>
  <li>
    <strong>フィルタ履歴の記録</strong> → <code>logFilterChanges()</code>で監査可能
  </li>
</ul>

業務効率化の第一歩として、GASを活用してみるばい！


<hr class="wp-block-separator has-alpha-channel-opacity" />

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://qiita.com/dadadaiiiiiii/items/4185d0a6e2c3a55b14af" title="スプレッドシートの個人フィルタをGoogle Apps Scriptで作成する方法 - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnFpaXRhLWltYWdlLXN0b3JlLnMzLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkYwJTJGMjg4ODA5MSUyRnByb2ZpbGUtaW1hZ2VzJTJGMTY2NTAxMzYyOT9peGxpYj1yYi00LjAuMCZhcj0xJTNBMSZmaXQ9Y3JvcCZtYXNrPWVsbGlwc2UmYmc9RkZGRkZGJmZtPXBuZzMyJnM9MTA2M2ZlODVhMWNmNjM2ZjlmZDFlZDM4ODAyY2MwOTg%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3De60ec0776cbfcdb67596dd18d4485fa0?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9JUUzJTgyJUI5JUUzJTgzJTk3JUUzJTgzJUFDJUUzJTgzJTgzJUUzJTgzJTg5JUUzJTgyJUI3JUUzJTgzJUJDJUUzJTgzJTg4JUUzJTgxJUFFJUU1JTgwJThCJUU0JUJBJUJBJUUzJTgzJTk1JUUzJTgyJUEzJUUzJTgzJUFCJUUzJTgyJUJGJUUzJTgyJTkyR29vZ2xlJTIwQXBwcyUyMFNjcmlwdCVFMyU4MSVBNyVFNCVCRCU5QyVFNiU4OCU5MCVFMyU4MSU5OSVFMyU4MiU4QiVFNiU5NiVCOSVFNiVCMyU5NSZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZ0eHQtY29sb3I9JTIzMUUyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1wYWQ9MCZzPTEwNWNjMmM1YzIwOGQwOWEwYmMzNDRkY2YyMDc1ZGEz&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBkYWRhZGFpaWlpaWlpJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9MzYmdHh0LXBhZD0wJnM9YWQ3ODMyOGQwYTMxOGY2OGM5ODIxZmNiM2Y5ZGYzMDk&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=352cf0dadbbe106cd176382dcf3f19ba" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        スプレッドシートの個人フィルタをGoogle Apps Scriptで作成する方法 - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        はじめに Googleのスプレッドシートでフィルタを個人で作成してもらう運用をしていると、 フィルタ１などよくわからないフィルタが増えすぎて困ることってよくありますよね。 なので最初からある程度グループなどでまとめたフィルタを作っておいてそ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/dadadaiiiiiii/items/4185d0a6e2c3a55b14af" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/dadadaiiiiiii/items/4185d0a6e2c3a55b14af" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/filter" title="Class Filter  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        Class Filter  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/filter" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/filter" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://note.com/kawamura_/n/nc252a869c79e" title="[GAS]filterメソッドを用い条件に合ったデータを別シートに転記｜カワムラ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/80704936/rectangle_large_type_2_ff7fc2db388c9f48f550d17f63dadcd6.jpeg?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/80704936/rectangle_large_type_2_ff7fc2db388c9f48f550d17f63dadcd6.jpeg?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]filterメソッドを用い条件に合ったデータを別シートに転記｜カワムラ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        恥ずかしながらGoogle Apps Scriptの反復メソッドがまだ理解できておりません。 アロー関数もなにそれ？というレベルです。 ようやく「あ、このパターンは実務でよく使いそうだな」と思ったケースが見つかったのでメモします。 下記のよ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/kawamura_/n/nc252a869c79e" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/kawamura_/n/nc252a869c79e" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
        </div>
      </div>
    </div>
  </div></a>
</div>
