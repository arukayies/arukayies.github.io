---
title: GASだけで作れる買い物リストを管理するLINE BOTの作り方Ver2.0
author: arukayies
date: 2020-06-06T14:19:51+00:00
excerpt: 以前作った買い物リストを管理してくれるLINE BOT を少し改良しました！削除の面倒な手間を減らし、V8ランタイムを意識してリファクタリング行いました！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1591453192
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
tags:
  - "LINE BOT"
tags:
  - GAS
  - Google Apps Script
  - LINE BOT

archives: ["2020年6月"]
---
前回作った買い物リストを管理するLINE BOTについてちょっとコードを変更したので、今回はそれを紹介します！

<div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-caret-right block-box has-background has-border-color has-icon-color has-watery-blue-background-color has-key-color-border-color has-key-color-icon-color">
  <div class="iconlist-title">
    変更点
  </div>
  
  <ul class="wp-block-list">
    <li>
      処理が1ファイルに長かったので、細分化しました。
    </li>
    <li>
      買い物リストの削除方法を変更しました。
    </li>
  </ul>
</div>

コード部分のみ変えているのでそれ以外は前回の記事を参考にしてください！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/shopping-list-post" title="GASだけで作れる買い物リストを管理するLINE BOTの作り方" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](shopping-list-post-160x90.png)](shopping-list-post-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASだけで作れる買い物リストを管理するLINE BOTの作り方
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        GASだけで作れる買い物リストを管理できるLINE BOTの作り方を紹介します！コピペで作れるのでぜひ使ってみてください！
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
          2024.11.15
        </div>
      </div>
    </div>
  </div></a>
</div>

削除部分はこんな動きになります。<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter">

<div class="wp-block-embed__wrapper">
  <blockquote class="twitter-tweet" data-width="550" data-dnt="true">
    <p lang="ja" dir="ltr">
      以前作った買い物リストを管理してくれるLINE BOT を少し改良しました！<br /><br />・削除時にカルーセルテンプレートを使うようにして、入力する手間を減らしてます！<br />・GASのV8意識して、リファクタしました！<br />・clasp&GitHub環境を整えた！<a href="https://t.co/lSRrD8BVak">https://t.co/lSRrD8BVak</a><a href="https://twitter.com/hashtag/GAS?src=hash&ref_src=twsrc%5Etfw">#GAS</a> <a href="https://twitter.com/hashtag/LINEBOT?src=hash&ref_src=twsrc%5Etfw">#LINEBOT</a> <a href="https://t.co/F2pv7DmZkz">pic.twitter.com/F2pv7DmZkz</a>
    </p>&mdash; arukayies (@arukayies) 
    
    <a href="https://twitter.com/arukayies/status/1265646924654194690?ref_src=twsrc%5Etfw">May 27, 2020</a>
  </blockquote>
</div></figure> 

コードだけ見れればいい！って方は<a href="https://github.com/arukayies/linebot-shopping-list-post-v2" title="https://github.com/arukayies/linebot-shopping-list-post-v2">こちら</a>をどうぞ！



## コードの説明

### メイン処理

LINEから受け取った情報が **メッセージイベント** か **ポストバックイベント** かを判別する処理になります。

2行目のトークンはLINEのチャンネルアクセストークンを入力してください。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-related">
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

#### メッセージイベント処理

LINEから受け取った **テキスト内容** によって判別する処理になります。

##### 買い物リストを表示する処理

スクリプトエディタの **文字列を配列** に変換し、買い物リストの文字列を生成します。

##### 買い物リストに追加状態にする処理

スクリプトエディタの **CONFを1** に変え、次のメッセージを買い物リストに追加する状態にする処理です。

##### 買い物リストから削除する一覧を送る処理

買い物リストの内容を **カルーセルテンプレート** でLINEに送ります。

カルーセルテンプレートの仕様で一度に送れるのは10個までのため、

リストを10で割って、余りまで表示したりと、、、ちょっと処理が複雑です。

<div class="wp-block-cocoon-blocks-tab-caption-box-1 tab-caption-box block-box has-border-color has-red-border-color cocoon-block-tab-caption-box">
  <div class="tab-caption-box-label block-box-label box-label fab-check">
    <span class="tab-caption-box-label-text block-box-label-text box-label-text">ポイント</span>
  </div>
  
  <div class="tab-caption-box-content block-box-content box-content">
    <ul class="wp-block-list">
      <li>
        買い物リストが10件以上ある場合は複数回のカルーセルテンプレートメッセージが送られます。
      </li>
    </ul>
  
###### カルーセルテンプレートを組み立てる処理

買い物リストを元にカルーセルテンプレートの **配列を組み立てる** 処理です。

##### 使い方を送る処理

LINEにBOTの **使い方** を送ります。

### ポストバックイベント処理

指定されたアイテムを買い物リストから **削除** します。

### LINEに送信する処理

受け取ったLINEの **メッセージオブジェクト** を指定宛先に送ります。

### 失敗時のログを記録する処理

メイン処理の **console.log** 部分を **addLog** か **postLog** に書き換えることで、ログをスプレッドシートかSlackへ記録することができます！

スプレッドシートに記録する場合はこちらです。

Slackにログを送信する場合はこちらです！

## まとめ

砂糖がなくなったら、LINEに追加しておく。


テレビ見ていてこれ作りたい！ってなったら材料をLINEに追加しておく。


など、<strong><span class="fz-20px"><span class="fz-32px"><span class="fz-28px"><span class="fz-24px">すぐにメモが出来るので便利です！！！</span></span></span></span></strong>


