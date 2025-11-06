---
title: GASでスプレッドシートの範囲内の列番号を効率的に取得する方法
author: arukayies
date: 2020-06-07T04:45:44+00:00
excerpt: GASでスプレッドシートの範囲内の開始列番号を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1591611634
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
  - getColumn()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）の`getColumn()`メソッドって、スプレッドシートで列の位置を特定するためには欠かせない機能ばい。この記事では、初心者にもわかりやすく、`getColumn()`メソッドの基本的な使い方から応用例まで紹介するけん、最後まで読んでいってけ！


## getColumn()メソッドの基本的な使い方

まず、`getColumn()`メソッドがどういうものかを簡単に説明するけ。これは、スプレッドシートの範囲を指定したとき、その範囲の「左端」の列番号を返してくれるんだよ。例えば、A列が1、B列が2といったように、列は番号がついてるけど、`getColumn()`メソッドを使うと、その範囲の最初の列番号がわかるんだ。

### 使い方の例

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
const range = sheet.getRange("C5");
const columnNumber = range.getColumn(); // 3が返される
</code></pre>

上記のコードでは、セル`C5`を指定して、その列番号（3）が返ってくるんだよ。シンプルやけど、範囲を指定する場所や方法によって挙動が変わることに注意せんといけんね。

## 単一セルと範囲指定での違い

### 単一セルの挙動

もし単一のセル（例えば`C5`）を指定すると、そのまま直感的にその列番号（3）が返ってくるけ。簡単やろ？

### 範囲指定の場合

ところが、複数のセル範囲を指定すると、左端の列番号が返されるんやけど、これが少しややこしいけん。例えば、`B2:D5`と指定すると、左端の列はB列（つまり2番目）が返されるんよ。

<pre class="wp-block-code"><code>const range = sheet.getRange("B2:D5");
console.log(range.getColumn()); // 2（B列）が返される
</code></pre>

このように、複数列の範囲指定時は左端の列番号が返されることを覚えておいてな。

## メソッドの注意点

### 非連続範囲選択時

もし、非連続の範囲（例えば、`A1:B2`と`D1:E2`のような範囲）を選択した場合、最初の範囲の左端列が返されるんやけん、その辺も気をつけんといけんね。

### 非表示列

非表示にされている列でも、その列番号は変わらず物理的な位置で返されるから、表示状態に関係なく列番号を取得できるんだ。

## 実際の活用例

### データ処理の例

`getColumn()`メソッドを使うことで、スプレッドシートの列に対して処理を行うことができるんだ。例えば、各列にスタイルを適用したり、列の幅を変更したりすることができるけ。

<pre class="wp-block-code"><code>function styleColumns() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const style = {
    background: '#f0f0f0',
    width: 120
  };

  for (let col = 1; col &lt;= sheet.getLastColumn(); col++) {
    const range = sheet.getRange(1, col, sheet.getLastRow());
    range.setBackground(style.background);
    sheet.setColumnWidth(col, style.width);
  }
}
</code></pre>

上記のコードでは、各列の背景色を変更し、列幅を設定する処理を行っているけど、`getColumn()`メソッドを使うことで列番号を取得し、そこに対して処理を適用しているんだ。

## エラー処理のポイント

### よくあるエラー

<ol class="wp-block-list">
  <li>
    <strong>範囲未定義エラー</strong><br />範囲指定が間違っていると、エラーが発生することがあるけ。事前に範囲が有効かどうかを確認するのが大事。
  </li>
</ol>

<pre class="wp-block-code"><code>// 範囲が間違っている場合
const range = sheet.getRange("invalid_range");
console.log(range.getColumn()); // エラーが発生する
</code></pre>

<ol start="2" class="wp-block-list">
  <li>
    <strong>非アクティブシート操作</strong> 他のシートにアクセスしようとすると、思った通りに動かないこともあるけん、アクティブなシートを確実に操作するようにしよう。
  </li>
</ol>

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.openById("...").getSheetByName("非表示シート");
console.log(sheet.getRange("A1").getColumn()); // 予期せぬ結果が返される
</code></pre>

## パフォーマンスの最適化

### バッチ処理を活用する

大量のデータを処理する場合は、バッチ処理を使うことでパフォーマンスを向上させることができるんだ。

<pre class="wp-block-code"><code>function optimizeColumnOperations() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  const processedData = values.map((row, rowIndex) =&gt; {
    const columnNumber = dataRange.getColumn() + rowIndex;
    return row.map(cell =&gt; `Col${columnNumber}_${cell}`);
  });

  dataRange.setValues(processedData);
}
</code></pre>

## 結論

`getColumn()`メソッドは、スプレッドシートで列を操作する際に欠かせない便利なツールやけど、使い方や挙動をしっかり理解しておくことが重要ばい。基本的な使い方から、エラー処理、パフォーマンスの最適化まで、しっかりと活用することで、より効率的にGoogle Apps Scriptを使いこなすことができるけん、ぜひ試してみてけ！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://rinyan-7.com/gas/range_getcolumn/" title="&#12304;`getColumn`&#12513;&#12477;&#12483;&#12489;&#12398;&#27963;&#29992;&#27861;&#12305;&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12391;&#21015;&#30058;&#21495;&#12434;&#21462;&#24471;&#12377;&#12427;&#20351;&#12356;&#26041;&#12539;&#20855;&#20307;&#20363;&#12539;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#24505;&#24213;&#35299;&#35500;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_getcolumn%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_getcolumn%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12304;`getColumn`&#12513;&#12477;&#12483;&#12489;&#12398;&#27963;&#29992;&#27861;&#12305;&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12391;&#21015;&#30058;&#21495;&#12434;&#21462;&#24471;&#12377;&#12427;&#20351;&#12356;&#26041;&#12539;&#20855;&#20307;&#20363;&#12539;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#24505;&#24213;&#35299;&#35500;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_getcolumn/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_getcolumn/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          rinyan-7.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://mebee.info/2023/07/24/post-65507/" title="GAS スプレッドシートの指定している範囲の列番号を取得する" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        GAS スプレッドシートの指定している範囲の列番号を取得する
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS(Google Apps Script)で、スプレッドシートの指定している範囲の列番号を取得する手順を記述してます。「getColumn」で可能です。複数の範囲がある場合は一番初めに見つかった列番号が返ります。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://mebee.info/2023/07/24/post-65507/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://mebee.info/2023/07/24/post-65507/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          mebee.info
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://coporilife.com/460/" title="【GAS】1行取得、getRangeで列全体取得、可変対応コピペ用【Google Apps Script】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://coporilife.com/wp-content/uploads/2022/05/6d074f061cc4abffb0e9c17c60f5cf84.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://coporilife.com/wp-content/uploads/2022/05/6d074f061cc4abffb0e9c17c60f5cf84.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】1行取得、getRangeで列全体取得、可変対応コピペ用【Google Apps Script】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GASで1行取得したり、getRangeで列全体を取得する方法のコピペで使えるサンプルコードをまとめています。この記事で解説しているメソッドgetRange()getMaxRows()getMaxColumns()getLastRow()g
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://coporilife.com/460/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://coporilife.com/460/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          coporilife.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://www.tanukiblog.jp/gas-activecell/" title="【GAS】アクティブなセルを取得する" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.tanukiblog.jp/wp-content/uploads/2024/05/activecell.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.tanukiblog.jp/wp-content/uploads/2024/05/activecell.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】アクティブなセルを取得する
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GASを使って現在アクティブになっている（選択している）セルを参照する方法について解説します。 アクティブなセルを取得する アクティブなセルの取得はgetActiveCellを使います。またgetActiveCellは複数セルを選択していて
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://www.tanukiblog.jp/gas-activecell/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://www.tanukiblog.jp/gas-activecell/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          www.tanukiblog.jp
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://auto-worker.com/blog/?p=1344" title="GASでスプレッドシートの選択しているセル・範囲の位置(行番号・列番号)を取得する方法 | AutoWorker〜Google Apps Script(GAS)とSikuliで始める業務改善入門" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://auto-worker.com/blog/wp-content/uploads/2020/08/20200802_auto_004.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://auto-worker.com/blog/wp-content/uploads/2020/08/20200802_auto_004.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASでスプレッドシートの選択しているセル・範囲の位置(行番号・列番号)を取得する方法 | AutoWorker〜Google Apps Script(GAS)とSikuliで始める業務改善入門
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script(GAS)でスプレッドシートの選択しているセルの位置を取得する方法を紹介します。 選択したセルや選択範囲の位置について行番号と列番号を取得するメ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://auto-worker.com/blog/?p=1344" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://auto-worker.com/blog/?p=1344" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          auto-worker.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://gsuiteguide.jp/sheets/getnumcolumns/" title="セル範囲にある列の列数を取得する：getNumColumns()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        セル範囲にある列の列数を取得する：getNumColumns()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        getNumColumns() セル範囲にある列の列数を取得する。 サンプルコード // 現在アクティブなスプレッドシートを取得 var ss = SpreadsheetApp.getActiveSpreadsheet(); // そのスプ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getnumcolumns/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getnumcolumns/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
        </div>
      </div>
    </div>
  </div></a>
</div>
