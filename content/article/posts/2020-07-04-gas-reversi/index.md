---
title: 【コピペで作れる】GASで動くスプレッドシートオセロの作り方
author: arukayies
type: post
date: 2020-07-04T14:58:23+00:00
excerpt: Zoomで友達とオセロができる。GASを使ったスプレッドシートオセロの作り方を紹介します！バグがあるので、負けそうになっても逆転できるかもしれない！？
url: /gas/gas-reversi
share: true
toc: true
comment: true
page_type:
  - default
update_level:
  - high
the_review_type:
  - Product
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1593874704
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
last_modified:
  - 2025-05-02 16:37:10
categories:
  - GAS
tags:
  - GAS
  - Google Apps Script
  - オセロ
  - スプレッドシート

archives: ["2020年7月"]
---
<div class="wp-block-group is-layout-flow wp-block-group-is-layout-flow">
</div>

さっそく作ったGASによる<strong>スプレッドシートオセロ</strong>を見てもらいましょう！
</p><figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter">
<div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true">
<p lang="ja" dir="ltr">
Zoomでスプレッドシートオセロという記事を見て作ってみました。
・対戦開始ボタンで初期化します。
・石はコピペで置いてください。
・置けないところはエラーになり、石はクリアされます。
・自動で石を返します。
・パス機能もあります。<a href="https://twitter.com/hashtag/%E3%82%AA%E3%82%BB%E3%83%AD?src=hash&ref_src=twsrc%5Etfw">#オセロ</a> <a href="https://twitter.com/hashtag/GAS?src=hash&ref_src=twsrc%5Etfw">#GAS</a> <a href="https://twitter.com/hashtag/GoogleAppsScript?src=hash&ref_src=twsrc%5Etfw">#GoogleAppsScript</a> <a href="https://twitter.com/hashtag/%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88?src=hash&ref_src=twsrc%5Etfw">#スプレッドシート</a> <a href="https://t.co/m1FuYSFR15">pic.twitter.com/m1FuYSFR15</a>
</p>&mdash; arukayies (@arukayies)
<a href="https://twitter.com/arukayies/status/1279023971631919106?ref_src=twsrc%5Etfw">July 3, 2020</a>
</blockquote>
</div></figure>
</div>
</div>
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
<p class="has-text-align-center">
<span class="fz-32px">さっそく作り方を紹介します！</span>
</p>
<p class="has-text-align-center">
シートとコードだけほしい人はこちらからどうぞ！
</p>
<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-dl">
<a rel="noopener" href="https://docs.google.com/spreadsheets/d/1LJkfLs2C8yl325tf39PdPFykvceWJAdoOGzuYQDv12w/edit#gid=0" title="オセロ(外部公開用)" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
<div class="blogcard external-blogcard eb-left cf">
<div class="blogcard-label external-blogcard-label">
<span class="fa"></span>
</div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
<img data-src="https://lh7-us.googleusercontent.com/docs/AHkbwyLmjzMy6EAqdS37shuZsz9K2uILj_wCI90BbkgCZkgc9PKX-5kM8dZl9o9wuEsd0dIKxV88tvjE2waWi2UPTv42BY6KGMi_GDXX3YfpCjvc5PU9nE8=w1200-h630-p" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
<noscript>
<img loading="lazy" decoding="async" src="https://lh7-us.googleusercontent.com/docs/AHkbwyLmjzMy6EAqdS37shuZsz9K2uILj_wCI90BbkgCZkgc9PKX-5kM8dZl9o9wuEsd0dIKxV88tvjE2waWi2UPTv42BY6KGMi_GDXX3YfpCjvc5PU9nE8=w1200-h630-p" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
</noscript></figure>
<div class="blogcard-content external-blogcard-content">
<div class="blogcard-title external-blogcard-title">
オセロ(外部公開用)
</div>
<div class="blogcard-snippet external-blogcard-snippet">
</div>
</div>
<div class="blogcard-footer external-blogcard-footer cf">
<div class="blogcard-site external-blogcard-site">
<div class="blogcard-favicon external-blogcard-favicon">
<img data-src="https://www.google.com/s2/favicons?domain=https://docs.google.com/spreadsheets/d/1LJkfLs2C8yl325tf39PdPFykvceWJAdoOGzuYQDv12w/edit?usp=embed_facebook" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
<noscript>
<img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://docs.google.com/spreadsheets/d/1LJkfLs2C8yl325tf39PdPFykvceWJAdoOGzuYQDv12w/edit?usp=embed_facebook" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
</noscript>
</div>
<div class="blogcard-domain external-blogcard-domain">
docs.google.com
</div>
</div>
</div>
</div></a>
</div>
<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-dl">
<a rel="noopener" href="https://github.com/arukayies/gas-reversi" title="GitHub - arukayies/gas-reversi: GASで作ったオセロです。" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
<div class="blogcard external-blogcard eb-left cf">
<div class="blogcard-label external-blogcard-label">
<span class="fa"></span>
</div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
<img data-src="https://opengraph.githubassets.com/3888c7b8c21112212e8ccd42d5d288c713d40b7a3fc24991da050e6c45079338/arukayies/gas-reversi" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
<noscript>
<img loading="lazy" decoding="async" src="https://opengraph.githubassets.com/3888c7b8c21112212e8ccd42d5d288c713d40b7a3fc24991da050e6c45079338/arukayies/gas-reversi" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
</noscript></figure>
<div class="blogcard-content external-blogcard-content">
<div class="blogcard-title external-blogcard-title">
GitHub - arukayies/gas-reversi: GASで作ったオセロです。
</div>
<div class="blogcard-snippet external-blogcard-snippet">
GASで作ったオセロです。. Contribute to arukayies/gas-reversi development by creating an account on GitHub.
</div>
</div>
<div class="blogcard-footer external-blogcard-footer cf">
<div class="blogcard-site external-blogcard-site">
<div class="blogcard-favicon external-blogcard-favicon">
<img data-src="https://www.google.com/s2/favicons?domain=https://github.com/arukayies/gas-reversi" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
<noscript>
<img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://github.com/arukayies/gas-reversi" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
</noscript>
</div>
<div class="blogcard-domain external-blogcard-domain">
github.com
</div>
</div>
</div>
</div></a>
</div>
## シートの用意
<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-dl">
<a rel="noopener" href="https://docs.google.com/spreadsheets/d/1LJkfLs2C8yl325tf39PdPFykvceWJAdoOGzuYQDv12w/edit#gid=0" title="オセロ(外部公開用)" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
<div class="blogcard external-blogcard eb-left cf">
<div class="blogcard-label external-blogcard-label">
<span class="fa"></span>
</div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
<img data-src="https://lh7-us.googleusercontent.com/docs/AHkbwyLmjzMy6EAqdS37shuZsz9K2uILj_wCI90BbkgCZkgc9PKX-5kM8dZl9o9wuEsd0dIKxV88tvjE2waWi2UPTv42BY6KGMi_GDXX3YfpCjvc5PU9nE8=w1200-h630-p" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
<noscript>
<img loading="lazy" decoding="async" src="https://lh7-us.googleusercontent.com/docs/AHkbwyLmjzMy6EAqdS37shuZsz9K2uILj_wCI90BbkgCZkgc9PKX-5kM8dZl9o9wuEsd0dIKxV88tvjE2waWi2UPTv42BY6KGMi_GDXX3YfpCjvc5PU9nE8=w1200-h630-p" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
</noscript></figure>
<div class="blogcard-content external-blogcard-content">
<div class="blogcard-title external-blogcard-title">
オセロ(外部公開用)
</div>
<div class="blogcard-snippet external-blogcard-snippet">
</div>
</div>
<div class="blogcard-footer external-blogcard-footer cf">
<div class="blogcard-site external-blogcard-site">
<div class="blogcard-favicon external-blogcard-favicon">
<img data-src="https://www.google.com/s2/favicons?domain=https://docs.google.com/spreadsheets/d/1LJkfLs2C8yl325tf39PdPFykvceWJAdoOGzuYQDv12w/edit?usp=embed_facebook" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
<noscript>
<img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://docs.google.com/spreadsheets/d/1LJkfLs2C8yl325tf39PdPFykvceWJAdoOGzuYQDv12w/edit?usp=embed_facebook" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
</noscript>
</div>
<div class="blogcard-domain external-blogcard-domain">
docs.google.com
</div>
</div>
</div>
</div></a>
</div>
Googleアカウントにログインしてる状態で上記シートにアクセスします。<figure class="wp-block-image aligncenter size-large">
{{< custom-figure src="スクリーンショット-2020-07-04-21.56.41.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">ファイル → コピーを作成 と順に押します。</figcaption></figure>
ファイル → コピーを作成 と順に押します。<figure class="wp-block-image aligncenter size-large">
{{< custom-figure src="スクリーンショット-2020-07-04-21.57.51.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">好きなところにコピーを保存してください。</figcaption></figure>
好きなところにコピーを保存してください。<figure class="wp-block-image aligncenter size-large">
{{< custom-figure src="スクリーンショット-2020-07-04-21.59.57.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">ファイル名とかシート名変えても問題ありません。</figcaption></figure>
ファイル名とかシート名変えても問題ありません。
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
## スクリプトの実行権限を許可する
{{< custom-figure src="スクリーンショット-2020-07-04-22.03.36.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">**初回のみ**スクリプトの実行を許可する必要があります。**続行** を押します。</figcaption></figure>
**初回のみ**スクリプトの実行を許可する必要があります。
**対戦開始ボタン**を押したあとに、**続行** を押します。<figure class="wp-block-image aligncenter size-large">
{{< custom-figure src="スクリーンショット_2020-07-04_22_04_53.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">**アカウント**を選択します。</figcaption></figure>
**アカウント**を選択します。<figure class="wp-block-image aligncenter size-large">
{{< custom-figure src="スクリーンショット-2020-07-04-22.06.03.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">**詳細**リンクを押します。</figcaption></figure>
**詳細**リンクを押します。<figure class="wp-block-image aligncenter size-large">
{{< custom-figure src="スクリーンショット-2020-07-04-22.07.06.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">**オセロ（安全ではないページ）に移動**リンクを押します。</figcaption></figure>
**オセロ（安全ではないページ）に移動**リンクを押します。<figure class="wp-block-image aligncenter size-large">
{{< custom-figure src="スクリーンショット_2020-07-04_22_08_23.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">**許可**を押します。</figcaption></figure>
**許可**を押します。<figure class="wp-block-image aligncenter size-large is-resized">
{{< custom-figure src="スクリーンショット-2020-07-04-22.17.47.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">このメッセージボックスが表示されたら完了です。</figcaption></figure>
もう一度**対戦開始ボタン**を押し、このメッセージボックスが表示されたら完了です。
これで遊ぶ準備はできました！
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
## オセロで遊ぶ
{{< custom-figure src="スクリーンショット-2020-07-04-22.12.24.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">先攻は黒固定です。</figcaption></figure>
先攻は黒固定です。
### 石の置き方
{{< custom-figure src="スクリーンショット-2020-07-04-22.13.31.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">コピーして貼り付ける</figcaption></figure>
石の置き方はコピペです。コピーして置きたいところに貼り付けます。<figure class="wp-block-image size-large">
{{< custom-figure src="スクリーンショット-2020-07-04-22.19.00.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">メッセージ内にどちらかの順番か示されます。</figcaption></figure>
石は自動でひっくり返され、メッセージ内にどちらかの順番か示されます。
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
### パスする
{{< custom-figure src="スクリーンショット-2020-07-04-22.51.00.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">置けない場合はパスすることで相手の番にターンが移ります。</figcaption></figure>
置けない場合はパスすることで相手の番にターンが移ります。
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
### 勝敗
{{< custom-figure src="スクリーンショット-2020-07-04-22.28.14.png" title="" Fit="1280x1280 webp q90" >}} </figure>
すべての石の合計が**64**になると、石の多いほうが**<span class="bold-blue">勝ち</span>**となります。
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
### エラーになるパターン
{{< custom-figure src="スクリーンショット-2020-07-04-22.21.46.png" title="" Fit="1280x1280 webp q90" >}} </figure>
順番が違ったり、置けない場所に置いたりすると<span class="bold-red">エラー</span>になります。
また、置かれた石は<span class="bold-red">削除</span>されます。
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
## 相手の石をひっくり返すまでの処理の流れ
盤面に石が置かれた時の処理の説明です。
### 誰のターンか取得
GASのスクリプトプロパティ上にターンを管理しており、そのデータを取得しています。
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
### 石が置かれた場所を取得
GASのイベントオブジェクトから、セルの行・列の位置を取得しています。
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
### 石が置かれても良い場所か判別
**playable** という関数で置いても良い場所か判断しています。
関数内の処理の流れを説明します。
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
#### 石が置かれていないか判別
**filed** は盤面のデータを2次元配列で管理しています。
<div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-caret-right block-box has-border-color has-icon-color has-key-color-border-color has-key-color-icon-color">
<div class="iconlist-title">
盤面のデータ管理
</div>
<ul class="wp-block-list">
<li>
<strong>C</strong>　まだ置かれていない
</li>
<li>
<strong>B</strong>　黒
</li>
<li>
<strong>W</strong>　白
</li>
<li>
<strong>Z</strong>　壁
</li>
</ul>
</div>
置かれた場所が **C** (まだ置かれていない) 状態の時のみ、次の処理に移ります。
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
#### 置かれた場所から8方向をチェック
置かれた場所から 8方向の状態をチェックします。
置かれた場所が壁、自分の石、空白の場合は、次の処理には移りません。<figure class="wp-block-image aligncenter size-large">
{{< custom-figure src="スクリーンショット-2020-07-04-23.33.41.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">オセロを作りながらマクロVBAを学ぼう№3
参考：エクセルの神髄 ｜ Copyright© 2010&nbsp;[鵜原パソコンソフト研究所][1]</figcaption></figure>
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
#### 8方向の隣に相手の石がある場合
隣に相手の石がある間は、その延長線上の位置をチェックします。
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
#### 相手の石を挟んで自分の石がある場合
延長線上に自分の石がある場合は、石が置けたと判定します。
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
#### 相手の石をひっくり返す
**changeStone** という関数で石をひっくり返します。
関数内の処理はこんな感じです。
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
##### 石をひっくり返す処理
渡された位置のセルに**IMAGE関数**を使って石の画像を入れています。
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
### 参考情報
<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
<a rel="noopener" href="https://excel-ubara.com/excelvba5/EXCELVBA260.html" title="オセロを作りながらマクロVBAを学ぼう｜VBAサンプル集" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
<div class="blogcard external-blogcard eb-left cf">
<div class="blogcard-label external-blogcard-label">
<span class="fa"></span>
</div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
<img data-src="https://excel-ubara.com/ogp.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
<noscript>
<img loading="lazy" decoding="async" src="https://excel-ubara.com/ogp.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
</noscript></figure>
<div class="blogcard-content external-blogcard-content">
<div class="blogcard-title external-blogcard-title">
オセロを作りながらマクロVBAを学ぼう｜VBAサンプル集
</div>
<div class="blogcard-snippet external-blogcard-snippet">
ExcelマクロVBAでオセロ（リバーシ）を作っていきながら、マクロVBAを学んで行きましょう。目的は、マクロVBAの学習であり、思考を整理しVBAでプログラミングする学習です。従って、強いソフトを作ることが目的ではありませんので、最近流行...
</div>
</div>
<div class="blogcard-footer external-blogcard-footer cf">
<div class="blogcard-site external-blogcard-site">
<div class="blogcard-favicon external-blogcard-favicon">
<img data-src="https://www.google.com/s2/favicons?domain=https://excel-ubara.com/excelvba5/EXCELVBA260.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
<noscript>
<img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://excel-ubara.com/excelvba5/EXCELVBA260.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
</noscript>
</div>
<div class="blogcard-domain external-blogcard-domain">
excel-ubara.com
</div>
</div>
</div>
</div></a>
</div>
<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
<a rel="noopener" href="https://teratail.com/questions/17669" title="オセロプログラムの添削をお願いします" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
<div class="blogcard external-blogcard eb-left cf">
<div class="blogcard-label external-blogcard-label">
<span class="fa"></span>
</div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
<img data-src="https://teratail.com/img/ogpImages/imgFacebookShare.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
<noscript>
<img loading="lazy" decoding="async" src="https://teratail.com/img/ogpImages/imgFacebookShare.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
</noscript></figure>
<div class="blogcard-content external-blogcard-content">
<div class="blogcard-title external-blogcard-title">
オセロプログラムの添削をお願いします
</div>
<div class="blogcard-snippet external-blogcard-snippet">
プログラミングの基礎ばかりを学習し、実践経験が全くない者です。そこでこの度、実際にオセロのプログラムコードをJavaScriptで書いてみました。しかし、このように一つの形にしたプログラミ
</div>
</div>
<div class="blogcard-footer external-blogcard-footer cf">
<div class="blogcard-site external-blogcard-site">
<div class="blogcard-favicon external-blogcard-favicon">
<img data-src="https://www.google.com/s2/favicons?domain=https://teratail.com" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
<noscript>
<img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://teratail.com" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
</noscript>
</div>
<div class="blogcard-domain external-blogcard-domain">
teratail.com
</div>
</div>
</div>
</div></a>
</div>
<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
<a rel="noopener" href="http://yucatio.hatenablog.com/entry/2019/12/10/222311" title="JavaScriptでn個ずつ配列を分割する - yucatio@システムエンジニア" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
<div class="blogcard external-blogcard eb-left cf">
<div class="blogcard-label external-blogcard-label">
<span class="fa"></span>
</div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
<img data-src="https://ogimage.blog.st-hatena.com/6653812171394883045/26006613479527041/1580968732" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
<noscript>
<img loading="lazy" decoding="async" src="https://ogimage.blog.st-hatena.com/6653812171394883045/26006613479527041/1580968732" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
</noscript></figure>
<div class="blogcard-content external-blogcard-content">
<div class="blogcard-title external-blogcard-title">
JavaScriptでn個ずつ配列を分割する - yucatio@システムエンジニア
</div>
<div class="blogcard-snippet external-blogcard-snippet">
JavaScriptで配列を指定された個数ずつに分割します。 例えば、 という配列を3個ずつ分割するのであれば、 , , , ] という配列になります。 実装方針 配列から一部を通り出すのには、 Array.prototype.slice(...
</div>
</div>
<div class="blogcard-footer external-blogcard-footer cf">
<div class="blogcard-site external-blogcard-site">
<div class="blogcard-favicon external-blogcard-favicon">
<img data-src="https://www.google.com/s2/favicons?domain=https://yucatio.hatenablog.com/entry/2019/12/10/222311" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
<noscript>
<img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://yucatio.hatenablog.com/entry/2019/12/10/222311" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
</noscript>
</div>
<div class="blogcard-domain external-blogcard-domain">
yucatio.hatenablog.com
</div>
</div>
</div>
</div></a>
</div>
<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>
## まとめ
<div class="wp-block-cocoon-blocks-balloon-ex-box-1 speech-wrap sb-id-1 sbs-stn sbp-l sbis-cb cf block-box cocoon-block-balloon">
<div class="speech-person">
{{< custom-figure src="icon-1.png" title="" Fit="1280x1280 webp q90" >}}
</div>
<div class="speech-balloon">
<p>
遊んでみてください。

 [1]: https://excel-ubara.com/
