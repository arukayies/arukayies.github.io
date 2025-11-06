---
title: GASでスプレッドシートの折り返し設定を一括取得！制御する方法
author: arukayies
date: 2020-09-22T09:29:47+00:00
excerpt: GASでスプレッドシートの指定範囲すべてがテキストの折り返しか取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1600766989
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
  - getWraps()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年9月"]
---
Google Apps Script（GAS）を使ってスプレッドシートを操作する際、`getWraps()`メソッドはテキストの折り返し設定を取得するために非常に便利なツールばい。このメソッドは、特に大量のデータを扱うときに、折り返し設定の状態を一括で取得できるので、効率的な作業ができるんだよね。今回は、この`getWraps()`メソッドの使い方を、初心者向けに解説するけん、最後まで読んでみてね。


## getWraps()とは？基本の使い方

まずは、`getWraps()`メソッドがどういうものかを簡単に説明するよ。スプレッドシートでセル内のテキストが自動的に折り返されるかどうかは、データの可読性に大きく影響するんだ。`getWraps()`は、その折り返しの状態を確認するために使うメソッドばい。

例えば、`getWraps()`を使うと、指定したセル範囲内のテキスト折り返し状態を「true」または「false」で取得できるんだ。もし、セルが折り返し設定されていれば`true`、設定されていなければ`false`が返されるってわけ。

<pre class="wp-block-code"><code>const wrapStatus = range.getWraps();
console.log(wrapStatus);  // &#91;&#91;true, false], &#91;false, true]]
</code></pre>

これで、セルごとの折り返し状態を簡単に確認できるんだね。

## 使い方のコツと実践的な例

それじゃ、実際にどんな場面で`getWraps()`を活用するか見ていくけ。例えば、スプレッドシートにデータがたくさんあって、各セルのテキスト折り返しの状態をチェックしたいときに使うと便利さ。

<pre class="wp-block-code"><code>function checkWraps() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SalesData');
  const dataRange = sheet.getRange('B2:E20');
  const wrapStatus = dataRange.getWraps();

  wrapStatus.forEach((row, rowIndex) =&gt; {
    row.forEach((isWrapped, colIndex) =&gt; {
      const cellAddress = `${String.fromCharCode(66 + colIndex)}${rowIndex + 2}`;
      console.log(`${cellAddress}: ${isWrapped ? 'WRAPPED' : 'NOT WRAPPED'}`);
    });
  });
}
</code></pre>

このコードでは、B2:E20の範囲内の各セルの折り返し設定をログに出力しているんだ。これを使えば、テキスト折り返しが有効になっているセルとそうでないセルが一目でわかるけ。

## 応用例：自動でカラム幅を調整する方法

折り返し設定がわかったら、それを元にカラム幅を自動で調整することもできるんだ。例えば、テキストが折り返されていない場合には、幅を広げるとかね。

<pre class="wp-block-code"><code>function autoAdjustColumnWidth() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName('CustomerList');
  const addressRange = sheet.getRange('D2:D100');
  const wraps = addressRange.getWraps();

  wraps.flat().forEach((isWrapped, index) =&gt; {
    if (!isWrapped) {
      const currentWidth = sheet.getColumnWidth(4);
      const contentLength = addressRange.getCell(index + 1, 1).getValue().length;

      if (contentLength &gt; 30 && currentWidth &lt; 150) {
        sheet.setColumnWidth(4, currentWidth + 50);
      }
    }
  });
}
</code></pre>

こんなふうに、テキストの折り返し状態をもとにカラム幅を調整できるわけさ。これでスプレッドシートの見た目もスッキリするけね。

## 効率化のためのキャッシュ活用法

大規模なデータを処理していると、`getWraps()`を何度も呼び出すと時間がかかることがあるけ。そんなときはキャッシュを使うと効率的に処理できるんだ。

<pre class="wp-block-code"><code>const cache = CacheService.getScriptCache();
const cachedWraps = cache.get('wrapSettings');

if (!cachedWraps) {
  const freshData = range.getWraps();
  cache.put('wrapSettings', JSON.stringify(freshData), 600); // 10分間キャッシュ
}
</code></pre>

これを使えば、同じデータに対して何度もAPIを叩かなくて済むから、処理速度がぐっと上がるんだよ。

## エラー処理とデバッグのヒント

スクリプトを書くときにはエラー処理も大事ばい。例えば、無効な範囲指定をしてしまったときの対処法を考えてみると…

<pre class="wp-block-code"><code>try {
  const invalidRange = sheet.getRange('NonExistingSheet!A1:B2');
  const wraps = invalidRange.getWraps();  // エラー発生
} catch (e) {
  console.error(`範囲指定エラー: ${e.message}`);
  // アクティブ範囲を使ってエラー回避
  const safeRange = sheet.getActiveRange();
}
</code></pre>

こんな感じでエラーをキャッチして、適切に処理できるようにしとけば、スクリプトが途中で止まらずに安心して動かせるんだよ。

## 最後に

`getWraps()`メソッドは、Googleスプレッドシートでテキスト折り返しの設定を管理する際に役立つ強力なツールだよね。特に、大量のデータを扱うときや、動的にレイアウトを調整する場面ではその真価を発揮するばい。この記事で紹介した方法を使って、効率的なスクリプトを書いてみてね。


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
  
  <br /> <a rel="noopener" href="https://gsuiteguide.jp/sheets/getwraps/" title="セル範囲の折り返しをセルごとに取得する：getWraps()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        セル範囲の折り返しをセルごとに取得する：getWraps()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        セル範囲の折り返しをセルごとに取得する。 サンプルコード // 現在アクティブなスプレッドシートを取得 var ss = SpreadsheetApp.getActiveSpreadsheet(); // そのスプレッドシートにある最初のシ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getwraps/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getwraps/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://techuplife.tech/gas-ss-rtextwrap/" title="[GAS]セルのテキストの折り返し設定を取得・設定する方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/06/b3f88bbabf6a5371d5cba7108fdade92.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/06/b3f88bbabf6a5371d5cba7108fdade92.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]セルのテキストの折り返し設定を取得・設定する方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲のセルのテキストの折り返し設定を取得・設定する方法を説明
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rtextwrap/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rtextwrap/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a>
</div>
