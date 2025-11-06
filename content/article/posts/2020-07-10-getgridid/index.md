---
title: GASでスプレッドシートの指定セルからシートIDを取得する方法徹底解説
author: arukayies
type: post
date: 2020-07-09T16:55:12+00:00
excerpt: GASでスプレッドシートの指定範囲のシートIDを取得する方法を紹介します！
url: /gas/getgridid
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1594313712
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
  - 2025-03-07 21:49:33
categories:
  - GAS
tags:
  - GAS
  - getGridId()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）でスプレッドシートを操作するとき、シートごとの「グリッドID」を使いこなせると便利じゃ！`getGridId()`メソッドを活用すれば、シート名に依存せずにデータ管理ができるけん、覚えとくと役立つばい。

今回は、この`getGridId()`の基本から応用テクニックまでを分かりやすく解説していくばい！

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

## 1. getGridId()って何？

グリッドIDは、各シートに割り当てられた一意の数値で、URLの`gid=******`部分に表示されるけん、そこで確認できるばい。

例えば、このURLを見てみると…

<pre class="wp-block-code"><code>https:&#47;&#47;docs.google.com/spreadsheets/d/スプレッドシートID/edit#gid=123456789
</code></pre>

ここで `gid=123456789` がそのシートのグリッドIDち！

シート名を変更してもこのIDは変わらんけん、シートの管理がしやすくなるとよ。ただし、シートを削除して作り直すと新しいIDになるけん、そこは注意ばい！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 2. getGridId()の使い方

基本的な使い方はめっちゃシンプル！

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
const range = sheet.getRange("A1");
console.log(range.getGridId());
</code></pre>

これで、そのシートのグリッドIDが取得できるばい。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 3. 実践的な使い方

### ✅ シート間でデータコピー

`getGridId()`を使って、指定したシートにデータを正確にコピーすることができるばい。

<pre class="wp-block-code"><code>function copyDataWithGridId() {
  const sourceSheet = SpreadsheetApp.getActive().getSheetByName("データ元");
  const sourceGridId = sourceSheet.getRange("A1").getGridId();

  const destSheet = SpreadsheetApp.openById("ターゲットスプレッドシートID");
  destSheet.getRange(sourceGridId, 1, 1, 10, 2).copyTo(destSheet.getRange("C1"));
}
</code></pre>

これならシート名が変わっても影響を受けんけん、安定した処理ができるとよ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 4. シートを動的に作成＆記録

シートをプログラムで作成して、そのグリッドIDを記録する方法もあるばい。

<pre class="wp-block-code"><code>function createNewSheetWithTracking() {
  const spreadsheet = SpreadsheetApp.getActive();
  const newSheet = spreadsheet.insertSheet("新シート");
  const trackingSheet = spreadsheet.getSheetByName("シート管理") || spreadsheet.insertSheet("シート管理");
  
  const gridId = newSheet.getRange("A1").getGridId();
  trackingSheet.appendRow(&#91;new Date(), newSheet.getName(), gridId]);
}
</code></pre>

これで、新しいシートの情報を自動的に管理できるっちゃ！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 5. 高度な活用テクニック

### 🔹 プロパティストアに保存

グリッドIDをスクリプトプロパティに保存すれば、スクリプトの再実行時に使い回せるばい。

<pre class="wp-block-code"><code>function storeGridId() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const gridId = sheet.getRange("A1").getGridId();
  PropertiesService.getScriptProperties().setProperty("MAIN_SHEET_GRID_ID", gridId.toString());
}
</code></pre>

### 🔹 条件付きシート操作

特定のシートだけに処理を適用するときも便利ばい！

<pre class="wp-block-code"><code>function processSpecificSheet() {
  const targetGridId = 123456789; // 事前に確認した対象シートID
  const currentSheetId = SpreadsheetApp.getActiveRange().getGridId();

  if (currentSheetId === targetGridId) {
    executeSpecialOperations();
  } else {
    executeNormalOperations();
  }
}
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 6. エラー対策と最適化

### ⚠️ よくあるエラーと対策

**エラー1: 存在しないシートを指定**

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getSheetByName("重要データ");
if (!sheet) throw new Error("シートが存在しません");
</code></pre>

**エラー2: 権限不足エラー**

<pre class="wp-block-code"><code>"oauthScopes": &#91;
  "https://www.googleapis.com/auth/spreadsheets"
]
</code></pre>

### ⏩ パフォーマンス最適化

<ul class="wp-block-list">
  <li>
    バッチ処理を活用する
  </li>
  <li>
    まとめてグリッドIDを取得する
  </li>
</ul>

<pre class="wp-block-code"><code>function batchGetGridIds() {
  const sheets = SpreadsheetApp.getActive().getSheets();
  const gridIds = sheets.map(sheet =&gt; sheet.getRange("A1").getGridId());
  console.log("全シートのグリッドID: ", gridIds);
}
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 7. まとめ

`getGridId()`を使えば、シートの管理がめちゃくちゃ楽になるばい！

<ul class="wp-block-list">
  <li>
    シート名が変わっても影響を受けない
  </li>
  <li>
    動的なシート管理ができる
  </li>
  <li>
    データ処理の安定性が増す
  </li>
</ul>

この知識を活かして、GASでのスプレッドシート操作をもっとスマートにしていこうばい！

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
  
  <br /> <a rel="noopener" href="https://qiita.com/t_ake-it-easy/items/dc221647299b5dc6820b" title="GASのTips集（サンプルコード付） - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Fadvent-calendar-ogp-background-7940cd1c8db80a7ec40711d90f43539e.jpg%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnNlY3VyZS5ncmF2YXRhci5jb20lMkZhdmF0YXIlMkYxZGQ3ODE2NWEwMjBkZjFiNGIwY2M3ZjNlMTJlN2YwOD9peGxpYj1yYi00LjAuMCZhcj0xJTNBMSZmaXQ9Y3JvcCZtYXNrPWVsbGlwc2UmYmc9RkZGRkZGJmZtPXBuZzMyJnM9YTA3OTI1YWQ2ZWYwMTUwYzYzOGJmMmJlMTM2ZmFjOWU%26blend-x%3D120%26blend-y%3D462%26blend-w%3D90%26blend-h%3D90%26blend-mode%3Dnormal%26mark64%3DaHR0cHM6Ly9xaWl0YS1vcmdhbml6YXRpb24taW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnMzLWFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkZxaWl0YS1vcmdhbml6YXRpb24taW1hZ2UlMkZmMGY5ODM4NGQzMDM0Y2QwMTMwZDIyOTAxMzQzNTcxYTZlYTMyYjgxJTJGb3JpZ2luYWwuanBnJTNGMTY0NzI3NjcyOT9peGxpYj1yYi00LjAuMCZ3PTQ0Jmg9NDQmZml0PWNyb3AmbWFzaz1jb3JuZXJzJmNvcm5lci1yYWRpdXM9OCZiZz1GRkZGRkYmYm9yZGVyPTIlMkNGRkZGRkYmZm09cG5nMzImcz01MmJiYTE2MDI3N2Y4YmUyYjQzNjk3MzE4N2VmYmUzMg%26mark-x%3D186%26mark-y%3D515%26mark-w%3D40%26mark-h%3D40%26s%3Df351e53fe4c0939300cd86ca94b557aa?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9R0FTJUUzJTgxJUFFVGlwcyVFOSU5QiU4NiVFRiVCQyU4OCVFMyU4MiVCNSVFMyU4MyVCMyVFMyU4MyU5NyVFMyU4MyVBQiVFMyU4MiVCMyVFMyU4MyVCQyVFMyU4MyU4OSVFNCVCQiU5OCVFRiVCQyU4OSZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZ0eHQtY29sb3I9JTIzM0EzQzNDJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1wYWQ9MCZzPTZkOTZkMmVlMTRmOGFmYzNkZmRhMGJmNDM5NWM5MWQy&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDB0X2FrZS1pdC1lYXN5JnR4dC1jb2xvcj0lMjMzQTNDM0MmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9MzYmdHh0LXBhZD0wJnM9OTRmMGNiYTllNDhjZTc2NDZkZTI5NzRkM2U3NjdmOTk&#038;blend-x=242&#038;blend-y=454&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;txt64=5qCq5byP5Lya56S-V29ya3MgSHVtYW4gSW50ZWxsaWdlbmNl&#038;txt-x=242&#038;txt-y=539&#038;txt-width=838&#038;txt-clip=end%2Cellipsis&#038;txt-color=%233A3C3C&#038;txt-font=Hiragino%20Sans%20W6&#038;txt-size=28&#038;s=6731342278074febe5cb662654635a0f" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASのTips集（サンプルコード付） - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        はじめに GASでちょっとした業務を自動化しています。 この記事では便利だなと感じたTipsをまとめてみたいと思います。 ※コード利用時に変更していただきたい内容を【内容】と表記します。 突発的なエラー発生時に通知する 運用中のGASで突然...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/t_ake-it-easy/items/dc221647299b5dc6820b" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/t_ake-it-easy/items/dc221647299b5dc6820b" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a>
</div>
