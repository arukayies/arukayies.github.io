---
title: GASでスプレッドシートの開発者メタデータを取得して活用する方法徹底解説
author: arukayies
date: 2020-06-17T16:49:27+00:00
excerpt: GASでスプレッドシートの開発者メタデータを取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1592412569
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
  - getDeveloperMetadata()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）での開発において、`getDeveloperMetadata()`メソッドはスプレッドシートに紐づくメタデータを効果的に管理できる強力なツールじゃけ、この機能を使うことで、スプレッドシートの情報をもっと柔軟に、そして安全に扱えるようになるんよ。今回は、このメソッドを使いこなすためのポイントをしっかり解説していくけ、初心者でも分かりやすく使えるようにするけん、最後までチェックしてくれな！


## 開発者メタデータって何じゃ？

まず、開発者メタデータって言葉に馴染みがない人も多いと思うけど、これはスプレッドシートの中に「注釈」みたいな情報をつけておけるものなんじゃ。これを活用することで、例えば「このセルにはどんなデータが入っているか」「このシートはどういう用途か」みたいな情報を、後からでも簡単に管理できるようになるんよ。

## getDeveloperMetadata()メソッドの基本的な使い方

このメソッドは、スプレッドシートの中の全メタデータを取得できる便利なメソッドじゃけ、最初に覚えておくといいよ。実際にどんな感じで使うか、ちょっとコード例を見てみようか。

<pre class="wp-block-code"><code>const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
const metadataArray = spreadsheet.getDeveloperMetadata();
metadataArray.forEach(meta =&gt; {
  console.log(`Key: ${meta.getKey()}, Value: ${meta.getValue()}`);
});
</code></pre>

これで、スプレッドシートに設定されている全てのメタデータを取得して、それぞれのキーと値を表示できるんよ。便利じゃろ？

## メタデータの使い道いろいろ

メタデータはただ情報を持たせるだけじゃなくて、色々な場面で活躍できるんよ。たとえば、シートごとにメタデータを分けて保存することもできるし、範囲ごとに特定の設定をつけることもできるけん、活用方法は無限大さ！

### シートごとのメタデータ取得

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActive().getSheetByName('注文明細');
const sheetMetadata = sheet.getDeveloperMetadata();
sheetMetadata.forEach(meta =&gt; {
  if(meta.getVisibility() === SpreadsheetApp.DeveloperMetadataVisibility.PROJECT) {
    Logger.log(`非公開メタデータ: ${meta.getKey()}`);
  }
});
</code></pre>

こんな感じで、シートに紐づくメタデータを取得して、さらにその可視性によってフィルタリングもできるんよ。

### 範囲ごとのメタデータ取得

<pre class="wp-block-code"><code>const range = sheet.getRange('B2:D10');
const rangeMetadata = range.getDeveloperMetadata();
rangeMetadata.forEach((meta, index) =&gt; {
  console.log(`メタデータ${index+1}:`);
  console.log(`位置: ${meta.getLocation().getColumn()}`);
});
</code></pre>

範囲を指定して、その位置に紐づくメタデータを取得することも可能じゃけ、これも意外に便利なんよ。

### メタデータの検索機能

`getDeveloperMetadata()`メソッドで得られる情報は多いけど、特定の条件で検索することもできるんよ。たとえば、メタデータのキーが「critical_data」で、可視性が「DOCUMENT」のものだけを取り出したい場合はこんなコードになるんじゃ。

<pre class="wp-block-code"><code>const finder = spreadsheet.createDeveloperMetadataFinder()
  .withKey('critical_data')
  .withVisibility(SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT)
  .find();
</code></pre>

これで、条件に合うメタデータを効率よく取得できるんよ。

### セキュリティと権限管理

メタデータは非常に強力だけど、使うときにはセキュリティにも気をつけないかん。可視性設定をうまく使うことで、アクセス権をしっかり管理することができるんじゃけど、これを怠ると情報漏洩のリスクが高くなるけん注意が必要じゃよ。

<pre class="wp-block-code"><code>// 機密設定の保存例
range.addDeveloperMetadata(
  'api_key', 
  'sk_live_123456', 
  SpreadsheetApp.DeveloperMetadataVisibility.PROJECT
);
</code></pre>

こんな風に、重要な情報には`PROJECT`の可視性を設定して、プロジェクトのスクリプトからしかアクセスできないようにすることができるんじゃ。

## 最後に：パフォーマンスの最適化

メタデータの管理が大規模になると、処理が重くなることもあるけん、パフォーマンスを意識したキャッシュの活用方法も覚えておくといいばい。

<pre class="wp-block-code"><code>function getCachedMetadata() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('metadata_cache');
  
  if(cached) {
    return JSON.parse(cached);
  }
  
  const freshData = SpreadsheetApp.getActive()
    .getDeveloperMetadata()
    .map(m =&gt; ({key: m.getKey(), value: m.getValue()}));
  
  cache.put('metadata_cache', JSON.stringify(freshData), 600);
  return freshData;
}
</code></pre>

キャッシュを使えば、頻繁に呼び出すメタデータの処理を高速化できるけ、これも大規模なデータ処理で効果的じゃけ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

Google Apps Scriptを使いこなすためには、こうした細かなツールを駆使して、データを管理・操作する力をつけていくことが大切じゃけ、`getDeveloperMetadata()`メソッドもその一つの鍵となる機能ばい。これを使えば、スプレッドシート内のデータをもっと効率よく、安全に管理できるようになるけ、ぜひ試してみてね！


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
  
  <br /> <a rel="noopener" href="https://note.com/crefil/n/n2b68b3c4aa6b" title="【Google Apps Script】プロパティサービスを使ってGASで秘密情報を管理する｜CREFIL" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/146200037/rectangle_large_type_2_adb3cb48c3935797279f6045cf1c225a.jpeg?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/146200037/rectangle_large_type_2_adb3cb48c3935797279f6045cf1c225a.jpeg?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【Google Apps Script】プロパティサービスを使ってGASで秘密情報を管理する｜CREFIL
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        先日Googleカレンダーの予定を Slackに通知するGAS(Google Apps Script)を作ってみた際に、 「プロパティサービス」という機能を知りました。 今回は備忘も兼ねて投稿します。 プロパティサービスとは スクリプトは、...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/crefil/n/n2b68b3c4aa6b" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/crefil/n/n2b68b3c4aa6b" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
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
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
  
  <br /> <a rel="noopener" href="https://qiita.com/ume3003/items/1554a95f524b1595a1c0" title="GAS DeveloperMetadata【３月２０日修正】 - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRmF2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tJTJGdSUyRjc2MTYzMSUzRnYlM0QzP2l4bGliPXJiLTQuMC4wJmFyPTElM0ExJmZpdD1jcm9wJm1hc2s9ZWxsaXBzZSZiZz1GRkZGRkYmZm09cG5nMzImcz1hOWRiOTRiYzk3OWU1YWMzNWYwMWQ3ODg2YmMwMjY5Ng%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3Dfb0b4c1657ab12e36bc5ec7fb460d509?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9R0FTJTIwRGV2ZWxvcGVyTWV0YWRhdGElRTMlODAlOTAlRUYlQkMlOTMlRTYlOUMlODglRUYlQkMlOTIlRUYlQkMlOTAlRTYlOTclQTUlRTQlQkYlQUUlRTYlQUQlQTMlRTMlODAlOTEmdHh0LWFsaWduPWxlZnQlMkN0b3AmdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT01NiZ0eHQtcGFkPTAmcz05MWU5NjdlYzliZDhhYjRjOTZlNzlhOGZiYmEwODgxMg&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDB1bWUzMDAzJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9MzYmdHh0LXBhZD0wJnM9N2UwZDhkOWUzNjFjOGRjYTAwNGUwNGUyYWVkOWM2ZDI&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=e7c5f0481e35ac82e3fc98b26e7ae5a4" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GAS DeveloperMetadata【３月２０日修正】 - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        とある理由で、PropertiesやCache以外でデータを保存する方法を検討しました MetadataFinderを使わないと見つけられないのでソース修正しました 1.PropertiesとCache どちらも、そのスクリプト内でしか利用...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/ume3003/items/1554a95f524b1595a1c0" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/ume3003/items/1554a95f524b1595a1c0" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a>
</div>
