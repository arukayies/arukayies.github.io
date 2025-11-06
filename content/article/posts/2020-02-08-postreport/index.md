---
title: GASを使ってWordPressに自動投稿する方法
author: arukayies
date: 2020-02-08T12:21:11+00:00
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1245207803716755459";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1245207803716755459";s:5:"pDate";s:19:"2020-04-01 04:34:10";}}";
tags:
  - "WordpressAPI"
tags:
  - GAS
  - Google Apps Script
  - WordpressAPI

archives: ["2020年2月"]
---
WordPress を使って広告収入を得たい！でもサラリーマンで毎日記事を書いてる時間はない！

だったら、自動化だ！と思い立って、年末からいろいろ試していました「くら」です。

まずはメインである。記事の自動投稿をGASを使って自動化します。

プログラム未経験者でもコピペで実現できるように手順を紹介します。

WordPressのサイトを持っている前提で話をすすめます！


## 自動投稿できるまでの流れ

<ol class="wp-block-list">
  <li>
    WordPressにプラグイン「Application Password」をインストール＆設定！
  </li>
  <li>
    GASのコードをコピーし、実行！
  </li>
  <li>
    これだけで自動投稿できます！
  </li>
</ol>

## WordPressにプラグイン「Application Password」をインストール

### 「Application Password」をインストール＆有効化

サイドメニューからプラグインを押下。

プラグイン　＞　新規追加を押下し、キーワードに【Application Passwords】と入力。

下の画像が出てきたら、【Application Passwords】をインストールし、有効化する。![![](スクリーンショット_2020-02-08_20_06_51-1024x375.png)](スクリーンショット_2020-02-08_20_06_51-1024x375.png) 

### パスワードの発行

サイドメニューからユーザーを選択。

ユーザー　＞　あなたのプロフィールを押下し、【New Application Password Name】にユーザー名を入力。![![](スクリーンショット_2020-02-08_20_16_10-1024x389.png)](スクリーンショット_2020-02-08_20_16_10-1024x389.png) 

ユーザ名とパスワードが表示されるので、これを控えておいてください。![![](スクリーンショット_2020-02-08_20_18_22.png)](スクリーンショット_2020-02-08_20_18_22.png) 

## GASを使ってWordPressに自動投稿するコード

以下の部分を書き換えることで、自分のサイトに自動投稿することができます！

<pre class="wp-block-preformatted">var siteUrl = 'WordpressサイトのURL';
var user = 'ユーザ名';
var pass = 'パスワード';
var title = '自動投稿テスト';
var content = 'これは自動投稿です。';</pre>

## 実際に自動投稿してみた結果

このような感じに記事を自動投稿できます！![![](スクリーンショット-2020-02-08-20.46.16.png)](スクリーンショット-2020-02-08-20.46.16.png) 

## まとめ

この記事ではシンプルにタイトルと内容のみを自動投稿できる方法を紹介しました。

この他にもWordPressAPIを使ったネタが溜まっているので随時紹介していきます！

