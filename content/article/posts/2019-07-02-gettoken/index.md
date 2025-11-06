---
title: LINE Messaging APIアクセストークンの取得方法
author: arukayies
date: 2019-07-02T13:52:19+00:00
excerpt: LINEBOTに必要なトークンの取得方法を画像付きで解説します。
toc: true
the_review_rate:
  - 5
snap_isRpstd579:
  - 1577362791
snap_isAutoPosted:
  - 1
snap_isRpstd2493:
  - 1586644574
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1249103994514857984";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1249103994514857984";s:5:"pDate";s:19:"2020-04-11 22:36:14";}}";
tags:
  - "LINE BOT"
tags:
  - GAS
  - Google Apps Script
  - LINE BOT

archives: ["2019年7月"]
---
こんにちは「くら」です！


ツーリングクラブのLINEグループに<a href="https://it-trend.jp/words/chatbot">チャットボット</a>を導入しています。


こちらがその動作している様子です。

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div><figure class="wp-block-image aligncenter is-resized">

![![](img_5dfa3293bb113.gif)](img_5dfa3293bb113.gif) <figcaption class="wp-element-caption">LINEBOTが動いている様子</figcaption></figure> 

運営の手助けやコミュニケーションのきっかけになればと思い、

以下のような機能を実装しています。

<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box information-box">
      「<strong>使い方</strong>」と発言すると、自分ができることを教えてくれます。<br />「<strong>wiki〇〇〇</strong>」と発言すると、wikiの検索結果を教えてくれます。<br />「<strong>画像〇〇〇</strong>」と発言すると、画像検索結果を教えてくれます。<br />「<strong>企画一覧</strong>」と発言すると、今後のツーリング先を教えてくれます。
  
</div>

普段使っている**LINEをさらに便利したい**・[チャットボット][1]に興味がある  
そんな人の手助けになれば嬉しいです。

この記事ではLINE BOTに必要な「**LINE Messaging APIアクセストークンの取得方法**」を説明しています。


## 必要なもの

<ul class="wp-block-list">
  <li>
    LINEアカウント
  </li>
</ul>

## LINE Deverlopersにログインする

1　最初に『 **LINE Developers** 』にアクセスします。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-check">
  <a rel="noopener" href="https://developers.line.biz/ja/" title="LINE Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://developers.line.biz/images/ogtags/twitter-ogtag.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://developers.line.biz/images/ogtags/twitter-ogtag.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        LINE Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.line.biz/ja/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.line.biz/ja/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.line.biz
        </div>
      </div>
    </div>
  </div></a>
</div>

2　右上の『 **ログイン** 』を押下します。<figure class="wp-block-image aligncenter size-full">

![![](【LINE-Developer】ログイン押下.jpg)](【LINE-Developer】ログイン押下.jpg) <figcaption class="wp-element-caption">【LINE Developers】ログイン押下</figcaption></figure> 

3　『 **LINEアカウントでログイン** 』を押下します。<figure class="wp-block-image aligncenter size-full">

![![](【LINE-Developers】LINEアカウントでログイン.png)](【LINE-Developers】LINEアカウントでログイン.png) <figcaption class="wp-element-caption">【LINE Developers】LINEアカウントでログイン</figcaption></figure> 

4　メールアドレスとパスワードを入力して、『 **ログイン** 』を押下します。

※　QRコードをアプリで読み取って **ログイン** することもできます。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image size-large">![![](【LINE-Developers】メールアドレスとパスワードでログイン.png)](【LINE-Developers】メールアドレスとパスワードでログイン.png)<figcaption class="wp-element-caption">【LINE Developers】メールアドレスとパスワードでログイン</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">![![](【LINE-Developers】QRコードでログイン.png)](【LINE-Developers】QRコードでログイン.png)<figcaption class="wp-element-caption">【LINE Developers】QRコードでログイン</figcaption></figure>
  
## プロバイダーを作成する

<span class="number">1　</span>『 **作成** 』を押下します。<figure class="wp-block-image aligncenter size-full">

![![](【LINE-Developers】プロバイダーを作成.png)](【LINE-Developers】プロバイダーを作成.png) <figcaption class="wp-element-caption">【LINE Developers】プロバイダーを作成.png</figcaption></figure> 

<span class="number">2　</span>プロバイダー名を入力し、『 **作成** 』を押下します。<figure class="wp-block-image aligncenter size-full">

![![](【LINE-Developers】プロバイダー名を入力し作成を押下する.png)](【LINE-Developers】プロバイダー名を入力し作成を押下する.png) <figcaption class="wp-element-caption">【LINE Developers】プロバイダー名を入力し作成を押下する</figcaption></figure> 

## LINE Messaging APIのチャンネルを作成する

<span class="number">1　</span>プロバイダーが作成されたら、『 **Messaging API** 』を押下します。<figure class="wp-block-image aligncenter size-full">

![![](【LINE-Developers】Messaging-APIを押下する.png)](【LINE-Developers】Messaging-APIを押下する.png) <figcaption class="wp-element-caption">【LINE Developers】Messaging APIを押下する</figcaption></figure> 

<span class="number">2　</span>チャンネルの情報を作成します。

<ul class="wp-block-list">
  <li>
    <strong>チャンネルアイコン</strong> を登録する。
  </li>
</ul><figure class="wp-block-image aligncenter size-full is-resized">

![![](【LINE-Developers】チャンネルアイコンを登録する.png)](【LINE-Developers】チャンネルアイコンを登録する.png) <figcaption class="wp-element-caption">【LINE Developers】チャンネルアイコンを登録する</figcaption></figure> 

使用したフリーアイコンはこちらです。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-pickup">
  <a rel="noopener" href="http://flat-icon-design.com/" title="FLAT ICON DESIGN -フラットアイコンデザイン-" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="http://flat-icon-design.com/th01.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="http://flat-icon-design.com/th01.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        FLAT ICON DESIGN -フラットアイコンデザイン-
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        フラットデザインに最適！WEBサイトやDTPですぐ使える商用利用可能なフラットアイコン素材がフリー（無料）ダウンロードできるサイト『FLAT ICON DESIGN』
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=http://flat-icon-design.com" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=http://flat-icon-design.com" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          flat-icon-design.com
        </div>
      </div>
    </div>
  </div></a>
</div>

<ul class="wp-block-list">
  <li>
    <strong>チャンネル名</strong> を入力する。
  </li>
</ul><figure class="wp-block-image aligncenter size-large">

![![](【LINE-Developers】チャンネル名を入力する.png)](【LINE-Developers】チャンネル名を入力する.png) <figcaption class="wp-element-caption">【LINE Developers】チャンネル名を入力する</figcaption></figure> 

<ul class="wp-block-list">
  <li>
    <strong>チャンネル説明</strong> を入力する。
  </li>
</ul><figure class="wp-block-image aligncenter size-large">

![![](【LINE-Developers】チャンネル説明を入力する.png)](【LINE-Developers】チャンネル説明を入力する.png) <figcaption class="wp-element-caption">【LINE Developers】チャンネル説明を入力する</figcaption></figure> 

<ul class="wp-block-list">
  <li>
    <strong>大業種</strong> を選択する。
  </li>
</ul><figure class="wp-block-image aligncenter size-large">

![![](【LINE-Developers】大業種を選択する.png)](【LINE-Developers】大業種を選択する.png) <figcaption class="wp-element-caption">【LINE Developers】大業種を選択する</figcaption></figure> 

<ul class="wp-block-list">
  <li>
    <strong>小業種</strong> を選択する。
  </li>
</ul><figure class="wp-block-image aligncenter size-large">

![![](【LINE-Developers】小業種を選択する.png)](【LINE-Developers】小業種を選択する.png) <figcaption class="wp-element-caption">【LINE Developers】小業種を選択する</figcaption></figure> 

<ul class="wp-block-list">
  <li>
    <strong>メールアドレス</strong> を入力する。
  </li>
</ul><figure class="wp-block-image aligncenter size-large">

![![](【LINE-Developers】メールアドレスを入力する.png)](【LINE-Developers】メールアドレスを入力する.png) <figcaption class="wp-element-caption">【LINE Developers】メールアドレスを入力する</figcaption></figure> 

<ul class="wp-block-list">
  <li>
    (任意)<strong>プライバシーポリシーURL</strong> を入力する。
  </li>
</ul><figure class="wp-block-image aligncenter size-large">

![![](【LINE-Developers】任意プライバシーポリシーURLを入力する.png)](【LINE-Developers】任意プライバシーポリシーURLを入力する.png) <figcaption class="wp-element-caption">【LINE Developers】(任意)プライバシーポリシーURLを入力する</figcaption></figure> 

<ul class="wp-block-list">
  <li>
    (任意)<strong>サービス利用規約URL</strong> を入力する。
  </li>
</ul><figure class="wp-block-image aligncenter size-large">

![![](【LINE-Developers】任意サービス利用規約URLを入力する.png)](【LINE-Developers】任意サービス利用規約URLを入力する.png) <figcaption class="wp-element-caption">【LINE Developers】(任意)サービス利用規約URLを入力する</figcaption></figure> 

3　規約に同意し、『 **作成** 』を押下します。<figure class="wp-block-image aligncenter size-large is-resized">

![![](【LINE-Developers】規約に同意し、作成を押下する.png)](【LINE-Developers】規約に同意し、作成を押下する.png) <figcaption class="wp-element-caption">【LINE Developers】規約に同意し、作成を押下する</figcaption></figure> 

## チャンネルアクセストークンを発行する

<span class="number">1　</span>『 **Messaging API設定** 』を押下します。<figure class="wp-block-image size-large">

![![](【LINE-Developers】Messaging-API設定を押下する.png)](【LINE-Developers】Messaging-API設定を押下する.png) <figcaption class="wp-element-caption">【LINE Developers】Messaging API設定を押下する</figcaption></figure> 

<span class="number">2　</span>一番下にある『 **チャンネルアクセストークン** 』の『 **発行** 』を押下する。<figure class="wp-block-image aligncenter size-large">

![![](【LINE-Developers】チャンネルアクセストークンの発行-1024x174.png)](【LINE-Developers】チャンネルアクセストークンの発行-1024x174.png) <figcaption class="wp-element-caption">【LINE Developers】チャンネルアクセストークンの発行</figcaption></figure> 

## まとめ

![![](【LINE-Developers】チャンネルアクセストークンの発行完了-1024x142.png)](【LINE-Developers】チャンネルアクセストークンの発行完了-1024x142.png) <figcaption class="wp-element-caption">【LINE Developers】チャンネルアクセストークンの発行完了</figcaption></figure> 

取得したトークンはメモ等に控えておいてくださいね！


これでLINEBOTの事前準備は完了です！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-together">
  <a href="https://arukayies.com/gas/line_bot/line-bot-with-gas" title="GASで作る簡単なLINE BOTの作り方" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
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
  
  <br /> <a href="https://arukayies.com/gas/line_bot/action-objects" title="【LINE BOT】GASでBOTが実行できる『アクションタイプ』のまとめ" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](action_objects-160x90.png)](action_objects-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        【LINE BOT】GASでBOTが実行できる『アクションタイプ』のまとめ
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        LINE BOTを作成する機会が増えきた「くら」です！LINE公式ドキュメントを参考にGASを使って各APIを試してみました。今回はユーザーが受け取ったメッセージに対して、Botが実行できるアクションオブジェクトのまとめになります。ＬＩＮＥ...
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


 [1]: https://it-trend.jp/words/chatbot
