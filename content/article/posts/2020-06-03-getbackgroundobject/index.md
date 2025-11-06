---
title: GASでスプレッドシートのセル背景色情報を詳細に取得する方法
author: arukayies
date: 2020-06-02T16:30:31+00:00
excerpt: GASでスプレッドシートの指定セルの背景色情報を取得する方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1591115431
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
  - getBackgroundObject()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
みんな、Google Apps Script（GAS）って聞いたことあるけど、どんなことができるか気になるよね？特にスプレッドシートを使ってる人には必見の機能、`getBackgroundObject()`メソッドについて、わかりやすく解説していくけん！これを使うと、スプレッドシートのセルの背景色をもっと自由に制御できるようになるんだよ。


## セル背景色って何に使えるの？

Google スプレッドシートのセルに色をつけるだけでなく、色に関する情報をプログラムで操作したいときに、`getBackgroundObject()`メソッドが大活躍するんだ。色を計算したり、特定の条件に応じて色を変えたりできるから、作業の効率がぐんと上がるよ！

例えば、色の情報を「RGB」で取得できるんだ。普通に背景色を取得する`getBackground()`メソッドだと、#ff0000みたいな文字列しか返ってこないけど、`getBackgroundObject()`を使えば、赤（R）、緑（G）、青（B）の成分を個別に取得できるんだよね。

<pre class="wp-block-code"><code>const cell = sheet.getRange("B5");
const colorObj = cell.getBackgroundObject();
console.log(`Red: ${colorObj.asRgbColor().getRed()}`);
console.log(`Green: ${colorObj.asRgbColor().getGreen()}`);
console.log(`Blue: ${colorObj.asRgbColor().getBlue()}`);
</code></pre>

こんなふうに、色ごとに数値を取り出せるから、動的な色変更が簡単にできるようになるんだ。

## スプレッドシートの色をまとめて取得する方法

たとえば、大量のデータがあるスプレッドシートで、背景色をまとめて操作したいときは、`getBackgroundObject()`を範囲指定して使うのがポイントだよ。1つ1つのセルを処理するより、範囲指定して一括でやるほうがパフォーマンスが良くなるんだよね。特に、1000セルとかになると、範囲指定のほうが断然速いばい。

例えば、こんな感じで範囲を指定して、一度にデータを取得できるんだ。

<pre class="wp-block-code"><code>const colorObjs = sheet.getRange("A1:Z1000").getBackgroundObjects();
</code></pre>

これで、シート内のすべてのセルの背景色をまとめて取得できるから、大規模データにも対応できるよね。

## 条件付き書式と組み合わせる

そして、`getBackgroundObject()`を使って、条件付き書式を自動で変更することもできるんだよ。たとえば、セルの色が特定の色になったら、新しい書式を適用するとか、条件に応じて背景色を変えるとか。

<pre class="wp-block-code"><code>function updateDynamicRules() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const backgrounds = dataRange.getBackgroundObjects();
  
  const newRules = backgrounds.flatMap((row, rIdx) =&gt; 
    row.map((color, cIdx) =&gt; {
      if(color.asRgbColor().getRed() &gt; 200) {
        return SpreadsheetApp.newConditionalFormatRule()
          .whenCellNotEmpty()
          .setBackground(color)
          .setRanges(&#91;sheet.getRange(rIdx+1, cIdx+1)])
          .build();
      }
      return null;
    }).filter(rule =&gt; rule !== null)
  );
  
  sheet.setConditionalFormatRules(newRules);
}
</code></pre>

これで、特定の色のセルに新たな条件付き書式を適用できるから、データの視覚的な管理がとっても楽になるよ！

## パフォーマンスを考慮した工夫

スプレッドシートが大きくなると、処理速度が気になるよね。そんな時には、メモリを効率的に使うための工夫が必要だよ。たとえば、色情報をキャッシュして、何度も同じセルを処理するのを避けることができるんだ。

<pre class="wp-block-code"><code>const colorCache = new Map();

function getCachedBackground(rng) {
  const key = `${rng.getSheet().getName()}_${rng.getA1Notation()}`;
  if(!colorCache.has(key)) {
    colorCache.set(key, rng.getBackgroundObject().asHexString());
  }
  return colorCache.get(key);
}
</code></pre>

これで、何度も色を取得する際に、キャッシュを使って効率よく処理できるよ！同じセルにアクセスするたびに計算し直すのを防げるから、パフォーマンスがかなり改善されるんだ。

## 最後に

`getBackgroundObject()`メソッドを使うと、スプレッドシートの色を自在に操れるようになるばい！これから、動的な色変更や、条件付き書式の管理、大規模データ処理など、色に関するさまざまな処理が楽になるよね。

もし、さらに高度な応用をしたい場合は、Google Cloudとの連携や、他のアプリとの統合など、色んな方法で利用できるから、ぜひチャレンジしてみてね！君のスプレッドシートライフが、もっと便利に、もっと楽しくなること間違いなしだよ！


<hr class="wp-block-separator has-alpha-channel-opacity" />

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/boolean-condition?hl=ja" title="Class BooleanCondition  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/va726f77ce19c264bc8ae4520f2ee26cc9641a80eead40c2c8c599dc34ccb25d1/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/va726f77ce19c264bc8ae4520f2ee26cc9641a80eead40c2c8c599dc34ccb25d1/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Class BooleanCondition  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/boolean-condition?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/boolean-condition?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://hajiritsu.com/spreadsheet-gas-getbackground/" title="&#12475;&#12523;&#12398;&#32972;&#26223;&#33394;&#12434;&#21462;&#24471;&#12377;&#12427; | getBackground()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getbackground%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getbackground%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12475;&#12523;&#12398;&#32972;&#26223;&#33394;&#12434;&#21462;&#24471;&#12377;&#12427; | getBackground()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getbackground/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getbackground/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          hajiritsu.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-background/" title="【GAS】スプレッドシートの背景色機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/background.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/background.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートの背景色機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートの背景色機能をすべてまとめました。重要なセルの背景色を変えればデータが際立ちますね。データを目立たせたい場合はフォント色の変更よりも効果的だと思います。RGB設定(赤・緑・青)や現在の色の取得などです。交互
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-background/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-background/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://yagisanatode.com/clear-and-set-conditional-formatting-rules-to-a-specific-range-in-google-sheets-with-apps-script/" title="Clear and Set Conditional Formatting Rules to a Specific Range in Google Sheets with Apps Script - Yagisanatode" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://yagisanatode.com/wp-content/uploads/2024/11/Set-and-Clear-Conditional-Formatting-Rules-in-Google-Sheets-With-Apps-Script.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://yagisanatode.com/wp-content/uploads/2024/11/Set-and-Clear-Conditional-Formatting-Rules-in-Google-Sheets-With-Apps-Script.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Clear and Set Conditional Formatting Rules to a Specific Range in Google Sheets with Apps Script - Yagisanatode
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        I’ve created a small (pseudo) class that more easily clears and creates conditional formatting rules in a Google Sheet t...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://yagisanatode.com/clear-and-set-conditional-formatting-rules-to-a-specific-range-in-google-sheets-with-apps-script/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://yagisanatode.com/clear-and-set-conditional-formatting-rules-to-a-specific-range-in-google-sheets-with-apps-script/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          yagisanatode.com
        </div>
      </div>
    </div>
  </div></a>
</div>
