---
title: GASでスプレッドシートの指定セルからメモを取得する方法と活用例
author: arukayies
date: 2020-07-17T16:20:36+00:00
excerpt: GASでスプレッドシートの指定セルのメモを取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1595002838
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
  - getNote()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）を使ってスプレッドシートのセルに付けたメモを操作する方法、気になるところばい？今回は、`getNote()`メソッドを使ったメモの取得から、ちょっとした応用技まで、実際に役立つ情報をまとめたけん、しっかり見ていってね。


## getNote()メソッドの基本的な使い方

まずは基本からじゃけど、`getNote()`メソッドは、スプレッドシートのセルに設定されたメモを取得するためのメソッドだよ。コードを書いて実際にセルのメモを取得してみるばい。例えば、以下のコードを実行すれば、`B2`セルのメモ内容を取得できるんよ。

<pre class="wp-block-code"><code>function fetchSingleNote() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('注文管理表');
  const targetCell = sheet.getRange('B2');
  const noteContent = targetCell.getNote();
  Logger.log(`注文備考: ${noteContent}`);
}
</code></pre>

このコードでは、`B2`セルに付けられたメモがログに出力されるけん、メモが空なら、何も表示されんけど、メモがあればその内容が表示されるんよ。

### ここで気をつけるポイント

<ul class="wp-block-list">
  <li>
    メモが存在しない場合、<code>getNote()</code>は空文字列を返すばい。
  </li>
  <li>
    メモの内容をリアルタイムで取得するには、スプレッドシートのUI更新に少し時間がかかることもあるけ、タイミングに注意したほうがいいけん。
  </li>
</ul>

## 複数セルのメモを一括取得

次は、範囲指定して複数セルのメモを一度に取得する方法じゃけど、`getNotes()`メソッドを使うと、指定した範囲の全セルのメモを一括で取得できるんよ。このメソッドは、二次元配列（行×列）でメモを取得するから、たくさんのセルのメモをまとめて処理したいときに便利ばい。

<pre class="wp-block-code"><code>function batchNoteProcessing() {
  const dataRange = SpreadsheetApp.getActive().getRange('B2:D10');
  const notesMatrix = dataRange.getNotes();
  
  notesMatrix.forEach((row, rowIndex) =&gt; {
    row.forEach((note, colIndex) =&gt; {
      if (note) {
        const cell = dataRange.offset(rowIndex, colIndex, 1, 1);
        console.log(`セル ${cell.getA1Notation()}: ${note}`);
      }
    });
  });
}
</code></pre>

上のコードでは、`B2:D10`範囲のセルに付けられたメモを全部チェックして、メモがあればその内容をログに出力してるけど、この方法を使うと、たくさんのデータを効率的に処理できるんよ。

## メモを使ったカスタム関数作成

次は、スプレッドシートの数式として使えるカスタム関数を作ってみる方法じゃけど、`getNote()`を使って、特定のセルにメモがあるかどうかをチェックする関数を作ることもできるんよ。例えば、以下のような関数を作って、`=HAS_NOTE(A1)`みたいに使えるようにできるんよ。

<pre class="wp-block-code"><code>function HAS_NOTE(cellRef) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const range = sheet.getRange(cellRef);
  return range.getNote() !== '';
}
</code></pre>

これで、特定のセルにメモがあるかどうかを確認できるようになるけん、便利ばい。

## メモ内容を他のシートに転記

もし、大量のデータを扱っていて、その中でメモを他のシートに転記したい場合、`getNotes()`で一括で取得したメモを新しいシートにコピーすることができるんよ。こんな感じで書けるけど、効率的にデータを書き込めるから、よく使う技じゃけ、覚えておいて損はないばい。

<pre class="wp-block-code"><code>function exportNotesToLogSheet() {
  const sourceSheet = SpreadsheetApp.getActive().getSheetByName('データ入力');
  const logSheet = SpreadsheetApp.getActive().getSheetByName('監査ログ') 
               || SpreadsheetApp.getActive().insertSheet('監査ログ');

  const sourceRange = sourceSheet.getDataRange();
  const notesData = sourceRange.getNotes();
  
  // メタデータ付加
  const timestamp = new Date().toISOString();
  const enrichedData = notesData.map((row, i) =&gt; 
    row.map((note, j) =&gt; note ? `${timestamp} | ${note}` : ''));
  
  logSheet.getRange(1, 1, enrichedData.length, enrichedData&#91;0].length)
          .setValues(enrichedData);
}
</code></pre>

これを使えば、元のシートのメモをそのままログシートに転記できるけん、データ管理がしやすくなるばい。

## トリガーを使ってメモ変更を監視

そして、最後に紹介したいのが、メモ内容が変更されたら自動で通知を送ったり、処理を実行したりする方法じゃけど、Google Apps Scriptのトリガー機能を活用することができるんよ。標準の`onEdit`トリガーではメモの変更を監視できんけど、時間主導型トリガーを使うと、定期的にシートをチェックしてメモの変更を検出することができるばい。

<pre class="wp-block-code"><code>function createTimeDrivenTrigger() {
  ScriptApp.newTrigger('checkNoteUpdates')
    .timeBased()
    .everyMinutes(10)
    .create();
}

function checkNoteUpdates() {
  const cache = CacheService.getScriptCache();
  const lastCheck = cache.get('lastNoteCheck') || 0;
  
  const sheet = SpreadsheetApp.getActive().getSheetByName('重要メモ');
  const notes = sheet.getRange('A1:Z1000').getNotes();
  
  const currentHash = Utilities.base64Encode(JSON.stringify(notes));
  const previousHash = cache.get('notesHash');
  
  if (currentHash !== previousHash) {
    sendNotificationEmail();
    cache.put('notesHash', currentHash, 21600); // 6時間保持
  }
  cache.put('lastNoteCheck', Date.now(), 21600);
}

function sendNotificationEmail() {
  MailApp.sendEmail({
    to: 'admin@example.com',
    subject: 'メモ変更通知',
    body: '重要メモシートの内容が更新されました'
  });
}
</code></pre>

こうすることで、メモが更新されたら自動的にメール通知が届くから、管理が楽になるばい。

## まとめ

Google Apps Scriptを使ってスプレッドシートのメモを扱う方法は、思ったよりも多くの応用が効くけん、これを活用すれば、スプレッドシートの効率がグンとアップするはずよ。今回は、基本的なメモの取得から、メモを使ったカスタム関数作成、メモ内容の転記まで、いろんな使い方を紹介したけど、これらをうまく組み合わせれば、もっと便利な使い方もできるようになるばい。


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
  
  <br /> <a rel="noopener" href="https://mebee.info/2023/03/21/post-69157/" title="GAS スプレッドシートのセルにあるメモを取得する" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://mebee.info/wp-content/uploads/2022/04/gas-890x500.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://mebee.info/wp-content/uploads/2022/04/gas-890x500.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GAS スプレッドシートのセルにあるメモを取得する
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS(Google Apps Script)で、スプレッドシートのセルにあるメモを取得する手順を記述してます。対象のセルに「getNote()」を使うことで可能です。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://mebee.info/2023/03/21/post-69157/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://mebee.info/2023/03/21/post-69157/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          mebee.info
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://teratail.com/questions/227703" title="メモが入力されているかどうかを判断する自作関数を作りたい" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://teratail.com/img/ogpImages/imgFacebookShare.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://teratail.com/img/ogpImages/imgFacebookShare.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        メモが入力されているかどうかを判断する自作関数を作りたい
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        【概要】Googleスプレッドシートにて、メモが入力されているかどうかを判断する自作関数を作成したい getNotes()を使うとメモを取得することが出来る。【実際に試した
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://teratail.com" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://teratail.com" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          teratail.com
        </div>
      </div>
    </div>
  </div></a>
</div>

Google Apps Scriptの力を借りて、あなたのスプレッドシートをもっと便利に活用していこう！
