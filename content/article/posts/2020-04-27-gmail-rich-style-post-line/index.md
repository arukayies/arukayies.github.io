---
title: GASを使って特定メールがきたらLINEにリッチに通知させる方法
author: arukayies
date: 2020-04-26T16:58:58+00:00
excerpt: |
  GASを使って特定メールがきたらLINEにリッチに通知させる方法を紹介します！
  テキストベースで通知する方法はよく見かけるけど、メール本文のhtmlをそんまま表示することで、LINEをメールアプリと同じように表示させています！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1587920339
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1254455087805501440";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1254455087805501440";s:5:"pDate";s:19:"2020-04-26 16:59:34";}}";
tags:
  - "LINE BOT"
tags:
  - GAS
  - Google Apps Script
  - LINE BOT

archives: ["2020年4月"]
---
<figure class="wp-block-embed aligncenter is-type-rich is-provider-twitter wp-block-embed-twitter">

<div class="wp-block-embed__wrapper">
  <blockquote class="twitter-tweet" data-width="550" data-dnt="true">
    <p lang="ja" dir="ltr">
      仕事でGASを使ってよく使っている処理4つ！<br />・入力したら勝手に日付入る＆名前入る<br />・スプレッドシートの指定された情報をSlackへ通知<br />・特定メールが来たら、Slackへ通知<br />・定期的に送るメール内容の自動生成<br />結構ネタがあるから、GASで作れるツールについても記事書いていく
    </p>&mdash; arukayies (@arukayies) 
    
    <a href="https://twitter.com/arukayies/status/1248928918297407491?ref_src=twsrc%5Etfw">April 11, 2020</a>
  </blockquote>
</div></figure> 

以前こんなツイートしたので、今回は3個目を紹介します！


Slackの通知方法はちょっと調べたらいっぱい見つかるので、


今回は<span class="fz-24px"><span class="bold-red">LINEへリッチに通知させる方法</span></span>を紹介します！

LINEに通知させる方法もちょっと調べたら方法は見つかりますが、


<strong><span class="red">リッチに通知させる</span></strong>ことにこだわりました！

こんな感じで動作します。

このようなメール内容をLINEに通知させてみます。<figure class="wp-block-image aligncenter size-large">

![![](メール内容-1024x534.png)](メール内容-1024x534.png) <figcaption class="wp-element-caption">証券会社のメール</figcaption></figure> 

こんな感じにLINEに通知されます！<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter">

<div class="wp-block-embed__wrapper">
  <blockquote class="twitter-tweet" data-width="550" data-dnt="true">
    <p lang="ja" dir="ltr">
      GASを使って、指定条件のGmailの内容をLINEにリッチに通知させてみました！<br /><br />テキストベースで通知する方法はよく見かけるけど、<br />メール本文のデータをhtmlで取得して、表示させてます。<br /><br />各メールのhtmlデータはGASのキャッシュで6時間は保持してるはず。<a href="https://twitter.com/hashtag/GAS?src=hash&ref_src=twsrc%5Etfw">#GAS</a> <a href="https://twitter.com/hashtag/LINE?src=hash&ref_src=twsrc%5Etfw">#LINE</a> <a href="https://t.co/zpZZ4Rn7rw">pic.twitter.com/zpZZ4Rn7rw</a>
    </p>&mdash; arukayies (@arukayies) 
    
    <a href="https://twitter.com/arukayies/status/1254279483911139329?ref_src=twsrc%5Etfw">April 26, 2020</a>
  </blockquote>
</div></figure> 

それでは詳細を解説していきます！

ちなみにツイート内の1個目のネタははこちらです。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-related">
  <a href="https://arukayies.com/gas/auto-date-name" title="GASを使って表の記入者＆日付を自動入力させる方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](auto-date-name-160x90.png)](auto-date-name-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASを使って表の記入者＆日付を自動入力させる方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        IT系の仕事でよく目にする課題管理票・確認事項一覧の日付と記入者をGASを使って自動入力させる方法を紹介します！
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2020.04.13
        </div>
      </div>
    </div>
  </div></a>
</div>

2個目の『スプレッドシートの内容をSlackに通知』はこちらです。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-related">
  <a href="https://arukayies.com/gas/sheet-postcontent-slack" title="GASを使ってスプレッドシートの内容をSlackに通知させる方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](sheet-postcontent-slack-160x90.png)](sheet-postcontent-slack-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASを使ってスプレッドシートの内容をSlackに通知させる方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        スプレッドシートのURLをSlackに貼り付けて中身の共有を行っていませんか？そんな作業はGASとSlackを連携させれば解決です！方法を紹介します！！！
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2020.04.18
        </div>
      </div>
    </div>
  </div></a>
</div>



## 【GAS】コードを追加する

追加するコードは2つあります。

<ul class="wp-block-list">
  <li>
    Gmailを検索して、LINEに通知する処理
  </li>
  <li>
    メールを表示させるhtml
  </li>
</ul>

コードの追加方法は過去の記事を参考にしてください。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/sheet-postcontent-slack" title="GASを使ってスプレッドシートの内容をSlackに通知させる方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](sheet-postcontent-slack-160x90.png)](sheet-postcontent-slack-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASを使ってスプレッドシートの内容をSlackに通知させる方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        スプレッドシートのURLをSlackに貼り付けて中身の共有を行っていませんか？そんな作業はGASとSlackを連携させれば解決です！方法を紹介します！！！
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2020.04.18
        </div>
      </div>
    </div>
  </div></a>
</div>

### 【コードの説明①】Gmailを検索する処理

#### 指定の**検索条件**でメールを検索

<pre class="wp-block-code"><code>// Gmailの検索条件を指定
  const searchGmail = "検索条件";</code></pre>

検索条件はGmailで検索する文字と同じ動作をします。<figure class="wp-block-image size-large is-resized">

![![](メール検索.png)](メール検索.png) <figcaption class="wp-element-caption">Gmai検索バー</figcaption></figure> 

通知したメールにはスターを付けるために、検索条件には**&#8221; -is:starred&#8221;**を追加しており、

**スターが付いていないメールを検索する**処理となっています。

<pre class="wp-block-code"><code>  // 検索条件に「-is:starred」を追加して、1スレッドのみ検索
  const threads = GmailApp.search(searchGmail + " -is:starred", 0, 1);</code></pre>

<div class="wp-block-cocoon-blocks-tab-box-1 blank-box bb-tab bb-point block-box has-border-color has-red-border-color">
  <div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-check block-box">
    <div class="iconlist-title">
      ここがポイント！
    </div>
    
    <ul class="wp-block-list">
      <li>
        通知メールにスターを付けることで、同じメールは処理しないようにしています。
      </li>
    </ul>
  
#### 検索したメールを1件ずつ処理

<pre class="wp-block-code"><code>  // 検索されたメッセージを1件ずつ処理
  for (let thd in messages) {
    for (let mail in messages&#91;thd]) {
      let maiID = messages&#91;thd]&#91;mail].getId(); // メールIDを取得
      let mailFrom = /"(.*?)"/.exec(messages&#91;thd]&#91;mail].getFrom())&#91;1]; // メールの宛名を取得
      let mailSubject = messages&#91;thd]&#91;mail].getSubject(); // メールの件名を取得
      // メールデータをキャッシュに書き込む
      let cache = CacheService.getScriptCache();
      cache.put("mailBody" + maiID, messages&#91;thd]&#91;mail].getBody(), 21600);
      // LINEに通知する
      pushMessage(maiID, mailFrom, mailSubject);
      // メールにスターを付ける
      messages&#91;thd]&#91;mail].star();
    }
  }</code></pre>

スレッドに存在するメール1件ごとに以下の処理を行います。

<ol class="wp-block-list">
  <li>
    メールIDを取得する
  </li>
  <li>
    メールの宛名を取得する
  </li>
  <li>
    メールの件名を取得する
  </li>
  <li>
    メールデータをキャシュに書き込む <ul class="wp-block-list">
      <li>
        キー名を『<strong>mailBody + メールID</strong>』で保存することで各メールを保存しています。
      </li>
    </ul>
  </li>
  
  <li>
    メールデータを<strong>LINEに送る処理</strong>に渡す
  </li>
  <li>
    メールにスターを付ける
  </li>
</ol>

<div class="wp-block-cocoon-blocks-tab-box-1 blank-box bb-tab bb-point block-box has-border-color has-red-border-color">
  <div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-check block-box">
    <div class="iconlist-title">
      ここがポイント！
    </div>
    
    <ul class="wp-block-list">
      <li>
        キャッシュを保存するキー名を『<strong>mailBody + メールID</strong>』で保存することで各メールを保存しています。
      </li>
    </ul>
  
### 【コードの説明②】LINEに送る処理

過去の記事でも紹介した『LINEでURIアクション』を送信する処理を使っています。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-related">
  <a href="https://arukayies.com/gas/line_bot/uri-action" title="【LINE BOT】GASで『URIアクション』を試してみた" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](uri_action-160x90.png)](uri_action-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        【LINE BOT】GASで『URIアクション』を試してみた
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        LINE BOTを作成する機会が増えきた「くら」です！LINE公式ドキュメントを参考にGASを使って各APIを試してみました。今回はユーザーが受け取ったメッセージに対して、Botが実行できるアクションオブジェクトをそれぞれ試してみたのでその...
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2024.11.19
        </div>
      </div>
    </div>
  </div></a>
</div>

<pre class="wp-block-code"><code>const payload = {
    to: To,
    messages: &#91;
      {
        type: "template",
        altText: from.substr(0, 29) + "からメールがありました", // 40文字制限があるため、文字制限している
        template: {
          type: "buttons",
          title: from.substr(0, 29) + "からメールがありました", // 40文字制限があるため、文字制限している
          text: subject.substr(0, 60), // 60文字制限があるため、文字制限している
          actions: &#91;
            {
              type: "uri",
              label: "メールの詳細はこちら",
              uri: appURL + "?mailID=" + id,
              altUri: {
                desktop: appURL + "?mailID=" + id,
              },
            },
          ],
        },
      },
    ],</code></pre><figure class="wp-block-image aligncenter size-large is-resized">

![![](LINE通知の仕組み-576x1024.jpg)](LINE通知の仕組み-576x1024.jpg) <figcaption class="wp-element-caption">LINE通知の内容</figcaption></figure> 

<div class="wp-block-cocoon-blocks-tab-box-1 blank-box bb-tab bb-point block-box has-border-color has-red-border-color">
  <div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-check block-box">
    <div class="iconlist-title">
      ここがポイント！
    </div>
    
    <ul class="wp-block-list">
      <li>
        リンクにメールIDのパラメータを含めることで、各メールを判別しています。
      </li>
    </ul>
  
### 【コードの説明③】メールを表示させる処理

ここがちょっと苦戦しました。。。

コードはこちらです。

<pre class="wp-block-code"><code>/*
関数概要
 LINEの「メールの詳細はこちら」をタップしたら呼び出される関数
 メールIDから各メールのhtmlデータをキャッシュから呼び出して
 表示用のキャッシュに一時的に書き込みます
 
引数
 e イベントオブジェクト(起動時の情報が含まれています)
 
戻り値
 メールが書かれているhtmlを返す
*/
function doGet(e) {
  // パラメータからメールIDを取り出す
  const ID = e.parameter.mailID;
  // "mailBody"+IDのhtmlデータをキャシュから取り出す
  const cache = CacheService.getScriptCache();
  const mailBody = cache.get("mailBody" + ID);
  // 取り出したキャッシュを一時的に"mailBody"に書き込む
  cache.put("mailBody", mailBody, 21600);

  // サイズを調整して、htmlを返す
  return HtmlService.createHtmlOutputFromFile("index").addMetaTag(
    "viewport",
    "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=10.0"
  );
}
/*
関数概要
 表示用のキャッシュを取得します
 
引数
 なし
 
戻り値
 "mailBody"のhtmlデータを返す
*/
function getMailBody() {
  const cache = CacheService.getScriptCache();
  return cache.get("mailBody");
}</code></pre>

メールごとに保存してあるキャッシュを切り替えることで、各メールのhtmlを表示させています。

イメージはこんな感じです！<figure class="wp-block-image aligncenter size-large">

![![](スクリーンショット-2020-04-27-1.32.52.png)](スクリーンショット-2020-04-27-1.32.52.png) <figcaption class="wp-element-caption">動作イメージ</figcaption></figure> 

<div class="wp-block-cocoon-blocks-tab-box-1 blank-box bb-tab bb-point block-box has-border-color has-red-border-color">
  <div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-check block-box">
    <div class="iconlist-title">
      ここがポイント！
    </div>
    
    <ul class="wp-block-list">
      <li>
        キャッシュをメール毎に呼び出し、表示用のキャッシュに入れることで各メールを表示させています。
      </li>
    </ul>
  
GASのhtml操作はこちらを参考にしました！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://www.pre-practice.net/2018/08/line-botliff.html" title="LINE BOTで「LIFF」を使う(LIFF V1)" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjr5X9v6bHkY0xecyTCNBzxLshZj3CF51wu8N0ejyTC4PBJYozczROI5j1YRyOmqPmzNihP4X2SP_p_kn5n5gH1bjXFWMXOx5pO6lAYRVyr55AelSxhIIkCfsBL0jobQqDn-0fY6kIOYQE/s1600/%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25AA%25E3%2583%25BC%25E3%2583%25B3%25E3%2582%25B7%25E3%2583%25A7%25E3%2583%2583%25E3%2583%2588+2018-08-31+8.59.16.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjr5X9v6bHkY0xecyTCNBzxLshZj3CF51wu8N0ejyTC4PBJYozczROI5j1YRyOmqPmzNihP4X2SP_p_kn5n5gH1bjXFWMXOx5pO6lAYRVyr55AelSxhIIkCfsBL0jobQqDn-0fY6kIOYQE/s1600/%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25AA%25E3%2583%25BC%25E3%2583%25B3%25E3%2582%25B7%25E3%2583%25A7%25E3%2583%2583%25E3%2583%2588+2018-08-31+8.59.16.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        LINE BOTで「LIFF」を使う(LIFF V1)
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        日々Google Apps Scriptを書く中で、気づいたことや作ったものなどを更新しています。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://www.pre-practice.net/2018/08/line-botliff.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://www.pre-practice.net/2018/08/line-botliff.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          www.pre-practice.net
        </div>
      </div>
    </div>
  </div></a>
</div>

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://www.pre-practice.net/2019/12/gshtmlindexhtml.html" title="gsファイルからHTMLタグを読み込んでindex.htmlに表示してみる" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.pre-practice.net%2F2019%2F12%2Fgshtmlindexhtml.html?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.pre-practice.net%2F2019%2F12%2Fgshtmlindexhtml.html?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        gsファイルからHTMLタグを読み込んでindex.htmlに表示してみる
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        日々Google Apps Scriptを書く中で、気づいたことや作ったものなどを更新しています。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://www.pre-practice.net/2019/12/gshtmlindexhtml.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://www.pre-practice.net/2019/12/gshtmlindexhtml.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          www.pre-practice.net
        </div>
      </div>
    </div>
  </div></a>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

## 【LINE】トークンを取得する

取得方法は過去記事を参考にしてください！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/gettoken" title="LINE Messaging APIアクセストークンの取得方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](gettoken-1-160x90.png)](gettoken-1-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        LINE Messaging APIアクセストークンの取得方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        LINEBOTに必要なトークンの取得方法を画像付きで解説します。
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2024.11.19
        </div>
      </div>
    </div>
  </div></a>
</div>

取得したトークンはコードの**LINEのトークン**と差し替えてください。

<pre class="wp-block-code"><code>  // LINEで取得したトークン
  const token = "LINEのトークン";</code></pre>

## 【LINE】userIDを取得する

取得方法は過去記事を参考にしてください！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/get-userid" title="【LINE BOT】GASでLINEの『ユーザID』の取得方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](get_userid-160x90.png)](get_userid-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        【LINE BOT】GASでLINEの『ユーザID』の取得方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        くらこんにちは「くら」です！LINE公式ドキュメント を参考に GAS を使って各APIを試しています。くら今回はLINEの「ユーザID」の取得方法を紹介します。ログを見るときによく使っています。ＬＩＮＥ　ＢＯＴを作ろう！ Ｍｅｓｓａｇｉｎ...
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2024.11.19
        </div>
      </div>
    </div>
  </div></a>
</div>

取得したユーザーIDはコードの**LINEの送信するユーザーID**と差し替えてください。

<pre class="wp-block-code"><code>  // LINEで送信する宛先
  const To = "LINEの送信するユーザーID";</code></pre>

## 【GAS】公開URLを取得する

取得方法は過去記事を参考にしてください！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/line-bot-with-gas#toc3" title="GASで作る簡単なLINE BOTの作り方" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](line-bot-with-gas-160x90.png)](line-bot-with-gas-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASで作る簡単なLINE BOTの作り方
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        GASで作るLINE BOTの簡単な作り方を紹介します！
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2024.11.19
        </div>
      </div>
    </div>
  </div></a>
</div>

取得したURLはコードの**GASの公開URL**と差し替えてください。

<pre class="wp-block-code"><code>  // GASの公開URL
  const appURL = "GASの公開URL";</code></pre>

## 【GAS】トリガーを設定する

設定方法は過去記事を参考にしてください！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/sheet-postcontent-slack#toc7" title="GASを使ってスプレッドシートの内容をSlackに通知させる方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](sheet-postcontent-slack-160x90.png)](sheet-postcontent-slack-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASを使ってスプレッドシートの内容をSlackに通知させる方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        スプレッドシートのURLをSlackに貼り付けて中身の共有を行っていませんか？そんな作業はGASとSlackを連携させれば解決です！方法を紹介します！！！
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2020.04.18
        </div>
      </div>
    </div>
  </div></a>
</div>

設定のサンプルはこんな感じです。<figure class="wp-block-image size-large">

![![](スクリーンショット-2020-04-27-1.50.29-1-1000x1024.png)](スクリーンショット-2020-04-27-1.50.29-1-1000x1024.png) <figcaption class="wp-element-caption">トリガー設定</figcaption></figure> 

## 【実行結果】LINEでメールを表示させてみた

特定メールは以下のメール内容としてみます。<figure class="wp-block-image aligncenter size-large">

![![](メール内容-1024x534.png)](メール内容-1024x534.png) <figcaption class="wp-element-caption">証券会社のメール</figcaption></figure> 

LINEに通知されたらこんな感じになります！<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter">

<div class="wp-block-embed__wrapper">
  <blockquote class="twitter-tweet" data-width="550" data-dnt="true">
    <p lang="ja" dir="ltr">
      GASを使って、指定条件のGmailの内容をLINEにリッチに通知させてみました！<br /><br />テキストベースで通知する方法はよく見かけるけど、<br />メール本文のデータをhtmlで取得して、表示させてます。<br /><br />各メールのhtmlデータはGASのキャッシュで6時間は保持してるはず。<a href="https://twitter.com/hashtag/GAS?src=hash&ref_src=twsrc%5Etfw">#GAS</a> <a href="https://twitter.com/hashtag/LINE?src=hash&ref_src=twsrc%5Etfw">#LINE</a> <a href="https://t.co/zpZZ4Rn7rw">pic.twitter.com/zpZZ4Rn7rw</a>
    </p>&mdash; arukayies (@arukayies) 
    
    <a href="https://twitter.com/arukayies/status/1254279483911139329?ref_src=twsrc%5Etfw">April 26, 2020</a>
  </blockquote>
</div></figure> 

## まとめ

パラメータによってhtmlを切り替える処理は他にも使えそう。


また、今回初めてGASのキャッシュを使ってみました。


これも使えそうだ。


