---
title: "【コピペOK】GASを使ってWordPressに記事を自動投稿する方法"
description: "Google Apps Script (GAS) と WordPress REST API を利用して、WordPressブログへの記事投稿を自動化する具体的な手順を解説します。プラグインの導入からコピペで使えるGASコードまで、初心者でも簡単に実践できます。"
tags: ["GAS", "Google Apps Script", "WordPress", "API", "自動投稿"]
date: "2020-02-08T12:21:11.000Z"
url: "/gas/wordpress-rest-api/postreport"
share: true
toc: true
categories: ["WordpressAPI"]
archives: ["2020年2月"]
lastmod: "2025-11-27T00:00:00+00:00"
---

WordPressブログの運営で、記事作成の時間を確保するのは大変ですよね。

この記事では、**Google Apps Script (GAS) を使ってWordPressに記事を自動投稿し、ブログ運営を効率化する方法**を、プログラミング初心者の方でもコピペで実践できるように分かりやすく解説します。

WordPressサイトをお持ちであれば、すぐにでも始められます。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## GASでWordPressに自動投稿する手順

自動投稿を実現するまでの流れは非常にシンプルです。

1.  **WordPressの準備**: プラグイン「Application Passwords」をインストールして設定
2.  **GASの準備**: 自動投稿用のスクリプトをコピーして実行

これだけで、面倒な投稿作業を自動化できます。

## ステップ1: WordPressでApplication Passwordsを設定する

GASからWordPressに安全に接続するために、「Application Passwords」というプラグインを利用します。

### 「Application Passwords」をインストール＆有効化

まず、WordPressの管理画面にログインします。

1.  サイドメニューの `プラグイン` > `新規追加` をクリックします。
2.  検索ボックスに「**Application Passwords**」と入力します。
3.  表示されたプラグインを `インストール` し、そのまま `有効化` します。

{{< custom-figure src="スクリーンショット_2020-02-08_20_06_51-1024x375.png" title="" Fit="1280x1280 webp q90" >}}

### パスワードの発行

次に、GASがAPI経由で接続するための専用パスワードを発行します。

1.  サイドメニューの `ユーザー` > `あなたのプロフィール` をクリックします。
2.  画面下部の `New Application Password Name` に、わかりやすい名前（例: `gas-auto-post`）を入力し、`Add New` ボタンをクリックします。

{{< custom-figure src="スクリーンショット_2020-02-08_20_16_10-1024x389.png" title="" Fit="1280x1280 webp q90" >}}

3.  生成されたユーザー名とパスワードが表示されます。**このパスワードは一度しか表示されない**ため、必ずコピーして安全な場所に保管してください。

{{< custom-figure src="スクリーンショット_2020-02-08_20_18_22.png" title="" Fit="1280x1280 webp q90" >}}

これでWordPress側の準備は完了です。

## ステップ2: GASで自動投稿スクリプトを作成する

次に、Google Apps Script側で自動投稿を実行するコードを作成します。

以下のコードをGASのスクリプトエディタにコピー＆ペーストしてください。

```javascript
/*
 * 関数概要: WordPressに記事を投稿する
 * 戻り値: APIからの実行結果
 */
function postReport() {
  // --- 設定項目 ---
  var siteUrl = 'https://あなたのWordpressサイトのURL'; // 先頭にhttps://を忘れずに
  var user = 'あなたのユーザー名'; // 先ほど控えたユーザー名
  var pass = 'xxxx xxxx xxxx xxxx xxxx xxxx';   // 先ほど控えたアプリケーションパスワード
  var title = 'GASからの自動投稿テスト';
  var content = 'この記事はGoogle Apps Scriptによって自動的に投稿されました。';
  // --- 設定項目ここまで ---

  var apiUrl = siteUrl + '/wp-json/wp/v2/posts';

  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Utilities.base64Encode(user + ":" + pass)
  };

  var postData = {
    'title': title,
    'content': content,
    'status': 'publish', // 'draft'にすると下書き保存になります
    'comment_status': 'closed'
  };

  var options = {
    'method': 'POST',
    'muteHttpExceptions': true,
    'headers': headers,
    'payload': JSON.stringify(postData)
  };

  var response = UrlFetchApp.fetch(apiUrl, options);
  var responseJson = JSON.parse(response.getContentText());

  // 実行結果をログに出力
  console.log(responseJson);

  return responseJson;
}
```

### コードの書き換え箇所

上記のコードの**設定項目**部分を、ご自身の環境に合わせて書き換えてください。

-   `siteUrl`: あなたのWordPressサイトのURL
-   `user`: 先ほど発行した**アプリケーションパスワードのユーザー名**
-   `pass`: 先ほど発行した**アプリケーションパスワード**（スペースを含めてそのまま入力）
-   `title`: 投稿したい記事のタイトル
-   `content`: 投稿したい記事の本文

設定が完了したら、GASの `実行` ボタンを押してスクリプトを動かします。

## 実行結果：自動投稿の確認

スクリプトが正常に実行されると、WordPressサイトに新しい記事が公開されます。

{{< custom-figure src="スクリーンショット-2020-02-08-20.46.16.png" title="" Fit="1280x1280 webp q90" >}}

このように、GASを使えば簡単に記事の投稿を自動化できます。

## まとめ

この記事では、GASとWordPress REST APIを利用して、記事の自動投稿を行う基本的な方法を紹介しました。

今回紹介したのはタイトルと本文のみのシンプルな投稿ですが、カテゴリーやタグの設定、アイキャッチ画像の登録なども自動化することが可能です。

ぜひこの仕組みを応用して、あなたのブログ運営をさらに効率化してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
