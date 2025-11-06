---
title: GASでスプレッドシートに開発者メタデータを柔軟に追加する方法
author: arukayies
date: 2020-03-08T03:42:53+00:00
excerpt: GASでスプレッドシートの行または列全体に開発者メタデータを追加する方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1245938279981043714";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1245938279981043714";s:5:"pDate";s:19:"2020-04-03 04:56:49";}}";
tags:
  - "GAS"
tags:
  - addDeveloperMetadata(key)
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）を使ってスプレッドシートの管理をちょっと高度にしたいって思ったこと、あるよね？特に、スプレッドシートに「意味」を持たせるためのメタデータを追加したい時に便利なのが、`addDeveloperMetadata(key)`メソッドばい。このメソッドを使えば、データをただ単に管理するだけでなく、よりスマートに、そして効率的にデータを取り扱えるようになるんだ。今日は、その使い方をガッツリ解説していくけん、最後まで読んでみてち！


## 1. 開発者メタデータってなに？

まず、開発者メタデータってなんぞや？って思うよね。簡単に言うと、スプレッドシート内の特定のデータに「意味」を持たせるための追加情報のこと。例えば、シートやセルの内容に関して、データがどこから来たのか、更新頻度はどうか、という情報をメタデータとして付与することができるんだ。これにより、スプレッドシートを自動化したり、より高効率にデータを活用できるようになるばい。

### 1-1. どんなところにメタデータを付けるのか？

メタデータは、次の3つのオブジェクトに付けることができるんだけ。

<ul class="wp-block-list">
  <li>
    <strong>Spreadsheet（スプレッドシート全体）</strong><br />例えば、プロジェクトのバージョン管理や作成者情報など。
  </li>
  <li>
    <strong>Sheet（シート単位）</strong><br />個別のシートに関連する情報、例えば「データソース」や「更新頻度」など。
  </li>
  <li>
    <strong>Range（範囲指定）</strong><br />特定のセル範囲にメタデータを付けることで、その範囲の使い方に意味を持たせるんだ。
  </li>
</ul>

これで、どこにメタデータを付けるかがわかったかな？

## 2. addDeveloperMetadata(key)メソッドの使い方

さて、実際に`addDeveloperMetadata(key)`メソッドを使ってみよう！メソッドの基本構文はこんな感じだよ。

<pre class="wp-block-code"><code>const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
spreadsheet.addDeveloperMetadata('workbook_version');  // スプレッドシートにメタデータを追加
</code></pre>

シンプルだろ？実際にシートや範囲にメタデータを追加したい場合も、次のように簡単に指定できるんだ。

<pre class="wp-block-code"><code>const sheet = spreadsheet.getSheetByName('SalesData');
sheet.addDeveloperMetadata('data_source');  // シートにメタデータを追加

const dataRange = sheet.getRange('A2:D100');
dataRange.addDeveloperMetadata('dynamic_range');  // 範囲にメタデータを追加
</code></pre>

これで、スプレッドシート内のデータにしっかりと意味を付けられるけん、後で自動化処理や分析の際に大活躍するばい！

## 3. メソッドのパラメータ詳細

`addDeveloperMetadata`メソッドには1つ必須のパラメータ、**key**（キー）があるんだけ。これがメタデータを一意に識別するための文字列になるよ[7]。例えば、「workbook\_version」や「data\_source」など、わかりやすい名前にするのがポイントだね。

<ul class="wp-block-list">
  <li>
    <strong>key</strong>: メタデータを識別するためのユニークな文字列
  </li>
  <li>
    <strong>注意点</strong>: アルファベット、数字、アンダースコアを使って、スペースは使わないようにしよう！
  </li>
</ul>

<pre class="wp-block-code"><code>spreadsheet.addDeveloperMetadata('project_version_2');
</code></pre>

これで、新しいバージョンのメタデータがスプレッドシートに追加されるんだよ！

## 4. 権限管理とセキュリティ

このメソッドを使うときは、権限やセキュリティにも注意が必要ばい。`addDeveloperMetadata`を実行するためには、特定のOAuthスコープが必要になるんだけ：

<ul class="wp-block-list">
  <li>
    <strong><code>https://www.googleapis.com/auth/spreadsheets.currentonly</code></strong>: 現在開いているスプレッドシートだけにアクセス
  </li>
  <li>
    <strong><code>https://www.googleapis.com/auth/spreadsheets</code></strong>: 全スプレッドシートへのフルアクセス
  </li>
</ul>

スプレッドシートのメタデータには、**可視性設定**があって、メタデータが誰に見えるかをコントロールできるよ。デフォルトでは「PROJECT」っていう設定になっていて、スクリプトの作成者と編集者だけが見れるんだ。もし全員に見せたいなら、「DOCUMENT」設定にすることもできるけど、機密情報を入れないように気をつけてち！

## 5. 実践的な使用例

### 5-1. メタデータを付ける基本的な方法

<pre class="wp-block-code"><code>function addBasicMetadata() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // スプレッドシートにメタデータを追加
  ss.addDeveloperMetadata('department', 'sales');
  
  // シートにメタデータを追加
  const sheet = ss.getSheetByName('Q4_Report');
  sheet.addDeveloperMetadata('report_status', 'draft');
  
  // 範囲にメタデータを追加
  const summaryRange = sheet.getRange('G2:G10');
  summaryRange.addDeveloperMetadata('auto_calculated');
}
</code></pre>

### 5-2. 動的にメタデータを付与する方法

<pre class="wp-block-code"><code>function applyDynamicMetadata() {
  const sheets = SpreadsheetApp.getActive().getSheets();
  
  sheets.forEach((sheet, index) =&gt; {
    const metadataKey = `sheet_${index + 1}_type`;
    sheet.addDeveloperMetadata(metadataKey);
    
    const lastColumn = sheet.getLastColumn();
    if(lastColumn &gt; 0) {
      const headerRange = sheet.getRange(1, 1, 1, lastColumn);
      headerRange.addDeveloperMetadata('header_row');
    }
  });
}
</code></pre>

これで、動的にメタデータを付けて、スプレッドシートをよりスマートに管理できるようになるばい！

## 6. 最後に

`addDeveloperMetadata(key)`メソッドは、Googleスプレッドシートを使っている人にとって、データ管理をより効率的にするための強力なツールなんだ。これを活用すれば、スプレッドシートを単なるデータの保存場所から、もっと意味のある情報を持つツールに変えることができるけん、ぜひ試してみてち！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=ja" title="Class Sheet  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        Class Sheet  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/developer-metadata" title="Class DeveloperMetadata  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/v0a8f38b07c3863b7ced1d678d2584c8bd483c306fc4b8f547093e71dea088feb/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/v0a8f38b07c3863b7ced1d678d2584c8bd483c306fc4b8f547093e71dea088feb/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Class DeveloperMetadata  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/developer-metadata" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/developer-metadata" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://developers.google.com/sheets/api/guides/metadata" title="Read & write developer metadata  |  Google Sheets  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/v0a8f38b07c3863b7ced1d678d2584c8bd483c306fc4b8f547093e71dea088feb/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/v0a8f38b07c3863b7ced1d678d2584c8bd483c306fc4b8f547093e71dea088feb/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Read & write developer metadata  |  Google Sheets  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/workspace/sheets/api/guides/metadata" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/workspace/sheets/api/guides/metadata" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://hajiritsu.com/spreadsheet-gas-adddevelopermetadata/" title="Google Spreadsheet&#12398;GAS&#12391;addDeveloperMetadata&#38306;&#25968;&#12434;&#20351;&#12387;&#12390;&#12415;&#12424;&#12358; &#8211; &#12399;&#12376;&#12426;&#12388;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-adddevelopermetadata%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-adddevelopermetadata%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Spreadsheet&#12398;GAS&#12391;addDeveloperMetadata&#38306;&#25968;&#12434;&#20351;&#12387;&#12390;&#12415;&#12424;&#12358; &#8211; &#12399;&#12376;&#12426;&#12388;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-adddevelopermetadata/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-adddevelopermetadata/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          hajiritsu.com
        </div>
      </div>
    </div>
  </div></a>
</div>
