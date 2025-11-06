---
title: GASでスプレッドシートのセルに表示されている値を取得する方法徹底解説
author: arukayies
date: 2020-06-18T17:28:39+00:00
excerpt: GASでスプレッドシートのセルの表示されている値を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1592501319
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
  - getDisplayValue()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）を使ったスプレッドシート操作では、`getDisplayValue()`メソッドがとても役立つばい。これ、セルに表示されている値をそのまま取得できる機能なんよね。例えば、日付や通貨形式のデータをそのまんま扱いたい時に超便利なメソッドなんだけ。


## メソッドの基本的な使い方

まずは基本から押さえよう！`getDisplayValue()`って、簡単に言うと、セルに表示されてる値を文字列として取得するメソッドじゃ。これ、計算結果や書式設定済みのデータをそのまま取り出せるんよ。

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
const displayValue = sheet.getRange('A1').getDisplayValue();
console.log(displayValue); // これで表示されてる内容をそのまま取得
</code></pre>

## getValue()との違いは？

ここで気をつけたいのは、`getDisplayValue()`と似たようなメソッドである`getValue()`との違いばい。`getValue()`はセルに保存されてるデータ（例えば数値とか日付）をそのまま取り出すんやけど、`getDisplayValue()`は実際に画面に表示されてる内容、つまり書式設定された後のデータを取り出すんだよ。

例えば、日付の書式を変えて表示した場合、

<pre class="wp-block-code"><code>const dateCell = sheet.getRange('B2');
console.log(dateCell.getValue()); // Dateオブジェクトで返される
console.log(dateCell.getDisplayValue()); // "2025/03/07"って表示される
</code></pre>

この違いが、特に帳票やレポートを作る時に大事になってくるけん、覚えておくといいばい。

## 複数セルをまとめて取得する

範囲を一気に取得したいときも`getDisplayValues()`が使えるんやけど、これは表示されてる値を二次元配列で返してくれるんだよね。これで、表全体のデータを取り出す時も便利なんよ。

<pre class="wp-block-code"><code>const range = sheet.getRange('A1:C3');
console.log(range.getDisplayValues());
// &#91;&#91;"1,000", "2025/03/07", "15,000"], ...]
</code></pre>

## 実践での活用シーン

さて、実際にどんな場面で`getDisplayValue()`を活かせるか、いくつかのケースを紹介するけん。

### 1. 日付データの処理

例えば、日付の形式が揃ってないと処理が面倒やけど、`getDisplayValue()`を使うと表示形式そのまま取り出せるから、帳票の出力にそのまま使えるんだよ。

<pre class="wp-block-code"><code>function formatDates() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dateRange = sheet.getRange('D2:D10');
  const formattedDates = dateRange.getDisplayValues()
    .flat()
    .map(date =&gt; `日付: ${date}`);
  
  console.log(formattedDates);
  // &#91;"日付: 2025/03/07", "日付: 2025/03/08", ...]
}
</code></pre>

### 2. 数値の書式保持

通貨表示やパーセンテージをそのまま取得したい場合にも便利なんだよね。

<pre class="wp-block-code"><code>const currencyCell = sheet.getRange('E5');
const rawValue = currencyCell.getValue(); // 数値 1500
const displayValue = currencyCell.getDisplayValue(); // "¥1,500"
</code></pre>

### 3. 複合データの処理

商品リストとかで、書式が決まってるデータを一気に抽出したい時にも役立つよ。

<pre class="wp-block-code"><code>function getProductList() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getRange('A2:D100').getDisplayValues();
  
  return dataRange.filter(row =&gt; row&#91;3] !== '在庫切れ');
}
</code></pre>

## 高度な使い方

`getDisplayValue()`をもっと応用して使いたい場合には、以下の方法も試してみてけ。

### 1. 正規表現を使ったデータの解析

表示されている値が特定のパターンに合っているかどうかチェックする時に正規表現を使うと便利じゃ。

<pre class="wp-block-code"><code>function extractOrderNumbers() {
  const orderCells = sheet.getRange('B2:B100').getDisplayValues();
  const orderPattern = /ORDER-\d{4}-\d{6}/;
  
  return orderCells.flat()
    .filter(code =&gt; orderPattern.test(code));
}
</code></pre>

### 2. 外部APIと連携

表示されたまんまのデータを外部のシステムに送信する時にも、`getDisplayValue()`を使って、書式を崩さずにデータを送ることができるんだよ。

<pre class="wp-block-code"><code>function exportFormattedData() {
  const formattedData = sheet.getRange('A1:G50').getDisplayValues();
  const payload = {
    timestamp: new Date().toISOString(),
    data: formattedData
  };
  
  UrlFetchApp.fetch('https://api.example.com/import', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  });
}
</code></pre>

## パフォーマンスの最適化

大きなデータを扱う時には、`getDisplayValues()`を使って一気にデータを取って処理する方が効率的じゃけ、バッチ処理を使うとパフォーマンスがグッと良くなるばい。

<pre class="wp-block-code"><code>function processLargeData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const totalRows = sheet.getLastRow();
  const chunkSize = 1000;
  
  for (let i = 1; i &lt;= totalRows; i += chunkSize) {
    const chunkRange = sheet.getRange(i, 1, chunkSize, sheet.getLastColumn());
    const chunkData = chunkRange.getDisplayValues();
    // データを処理するコード
  }
}
</code></pre>

## まとめ

`getDisplayValue()`メソッドは、スプレッドシートで表示されてるデータをそのまま取得する便利な機能ばい。日付や通貨、数値の書式を保持しつつデータを取り出せるから、帳票や外部システムとの連携に役立つよ。ただし、型に注意して処理を進めることが大事じゃけ、必要に応じて型変換を忘れんようにね。


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://hajiritsu.com/spreadsheet-gas-getdisplayvalues/" title="&#12475;&#12523;&#12398;&#34920;&#31034;&#20516;&#12434;&#21462;&#24471;&#12377;&#12427; | getDisplayValue()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getdisplayvalues%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getdisplayvalues%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12475;&#12523;&#12398;&#34920;&#31034;&#20516;&#12434;&#21462;&#24471;&#12377;&#12427; | getDisplayValue()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getdisplayvalues/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getdisplayvalues/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          hajiritsu.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://moripro.net/gas-getdisplayvalue/" title="【GAS】スプレッドシートの入力日付をそのまま文字列で取得するgetDisplayValueメソッド｜もりさんのプログラミング手帳" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://moripro.net/wp-content/uploads/2021/04/4702199_s.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://moripro.net/wp-content/uploads/2021/04/4702199_s.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートの入力日付をそのまま文字列で取得するgetDisplayValueメソッド｜もりさんのプログラミング手帳
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        スプレッドシートに入力されている値の「表示値」を文字列で取得するgetDisplayValueメソッドを紹介しています。日付や通貨を扱うときに役立ちます。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://moripro.net/gas-getdisplayvalue/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://moripro.net/gas-getdisplayvalue/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          moripro.net
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://blog.take-it-easy.site/gas/gas-getdisplayvalue/" title="Google Apps Scriptでスプレッドシートのセルの値を表示形式の文字列で取得する方法" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://blog.take-it-easy.site/images/eyecatch-3487.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://blog.take-it-easy.site/images/eyecatch-3487.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Apps Scriptでスプレッドシートのセルの値を表示形式の文字列で取得する方法
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Scriptでスプレッドシートの表示形式そのままの値を取得したい方必見！getDisplayValueの使い方や注意点をサンプル付きで解説。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://blog.take-it-easy.site/gas/gas-getdisplayvalue/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://blog.take-it-easy.site/gas/gas-getdisplayvalue/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          blog.take-it-easy.site
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://gsuiteguide.jp/sheets/getdisplayvalues/" title="セル範囲に表示されている値をセルごとに取得する：getDisplayValues()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        セル範囲に表示されている値をセルごとに取得する：getDisplayValues()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        getDisplayValues() セル範囲に表示されている値をセルごとに取得する。 サンプルコード // 現在アクティブなシートにある指定のセル範囲に表示されている値を取得 var values = SpreadsheetApp.get...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getdisplayvalues/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getdisplayvalues/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://techuplife.tech/gas-ss-rgetsetvalues/" title="[GAS]このセル範囲の値を取得・設定する方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]このセル範囲の値を取得・設定する方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲の値を取得・設定する方法を説明します。 Rangeクラス
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rgetsetvalues/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rgetsetvalues/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a>
</div>
