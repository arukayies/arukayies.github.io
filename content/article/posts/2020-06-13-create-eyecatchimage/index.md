---
title: "GASとスプレッドシートでWordPressのアイキャッチ画像を自動生成！作業効率化ツール作成ガイド"
description: "Google Apps Script (GAS) とスプレッドシートを連携させ、WordPressのアイキャッチ画像を自動で生成・アップロードするツールの作り方を解説します。ブログ運営における面倒な画像作成タスクを自動化し、作業効率を大幅に向上させる方法を、具体的なコード付きで詳しく紹介します。"
tags: ["GAS", "Google Apps Script", "WordPress", "アイキャッチ画像", "自動化", "スプレッドシート", "作業効率化", "WordpressAPI"]
date: "2020-06-12T17:03:37.000Z"
url: "/gas/wordpress-rest-api/create-eyecatchimage"
share: true
toc: true
categories: ["WordpressAPI"]
archives: ["2020年6月"]
lastmod: "2025-11-21T00:00:00+00:00"
---

ブログ運営において、読者の目を引く「アイキャッチ画像」は非常に重要です。しかし、記事ごとにユニークな画像を作成するのは、意外と時間と手間がかかる作業ではないでしょうか。

デザインツール「Canva」などは非常に便利ですが、それでも「毎回作るのは大変…」と感じている方も多いはずです。

そこで本記事では、**Google Apps Script (GAS) とスプレッドシートを活用し、アイキャッチ画像の生成からWordPressへのアップロードまでを自動化するツール**の作り方を、ステップバイステップで詳しく解説します。

このツールを導入すれば、面倒なアイキャッチ作成作業から解放され、より記事執筆に集中できるようになります。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## このツールで実現できること

*   **画像の自動合成:** 背景画像に、指定したメインタイトルとサブタイトルのテキスト画像を重ねて合成します。
*   **自由なレイアウト:** テキスト画像の位置は、X/Y座標で自由に調整可能です。
*   **WordPressへの自動アップロード:** 生成した画像を、ボタン一つでWordPressのメディアライブラリに直接アップロードします。
*   **画像情報の自動設定:** `alt`テキストやタイトル、キャプションなどのSEOに重要な情報も同時に設定できます。

## 開発の全体像

ツールの作成は、大きく分けて以下の2つのステップで進めます。

1.  **画像合成用のWebアプリを作成 (GAS):** 複数の画像を合成するためのロジックをGASで記述し、Webアプリとして公開します。
2.  **操作用のスプレッドシートを作成:** スプレッドシートからWebアプリを呼び出し、画像生成とアップロードを実行するスクリプトを作成します。

## ステップ1: 画像合成用Webアプリの作成 (GAS)

まずは、画像の合成処理を行うバックエンド部分をGASで作成します。

### 1-1. 新規Google Apps Scriptプロジェクトを作成

Googleドライブから新規にGoogle Apps Scriptプロジェクトを作成します。詳しい手順は以下の記事を参考にしてください。

{{< self-blog-card "https://arukayies.com/gas/line_bot/line-bot-with-gas#toc2" >}}

### 1-2. サーバーサイドコード (doGet.js) の実装

プロジェクトが作成できたら、デフォルトの`コード.gs`ファイルに、以下のサーバーサイド用のコードを貼り付けます。ファイル名は`doGet.js`などに変更しておくと分かりやすいでしょう。

このスクリプトは、HTTP GETリクエストを受け取り、HTMLを生成する役割を担います。

```javascript:doGet.js
function doGet(e) {
    const parameter = JSON.stringify(e.parameter);
    /* JSONのパラメータ文字列をJSONに変換する */
    const requestJson = JSON.parse(parameter.replace('{"', '').replace('":""}', '').replace(/\\/g, ''));

    let html = HtmlService.createTemplateFromFile("index");
    html.addImageURLsBase64 = blobToBase64(requestJson["addImageURLs"]);
    html.addImagePoints = requestJson["addImagePoints"];

    return html.evaluate().setTitle("サムネイル画像自動生成");
}

/* 画像URLの配列をBase６４形式のデータに変換する */
/* Canvasでは外部URLの画像が使えないためBase６４形式で受け渡す必要がある */
function blobToBase64(imageURLs) {
    let addImageURLsBase64 = [];

    const options = {
        "muteHttpExceptions": true,/* 404エラーでも処理を継続する */
    }

    for (let i in imageURLs) {
        let response = UrlFetchApp.fetch(imageURLs[i], options);
        let blob = response.getBlob();
        let content_type = blob.getContentType();
        let base64 = Utilities.base64Encode(blob.getBytes());
        Utilities.sleep(1 * 500);
        addImageURLsBase64.push(base64);
    }

    return addImageURLsBase64;
}
```

### 1-3. フロントエンドコード (index.html) の実装

次に、画像の描画処理を行うフロントエンド部分を作成します。メニューから「ファイル」→「新規作成」→「HTMLファイル」を選択し、ファイル名を `index` として作成してください。

作成した`index.html`に、以下のコードを貼り付けます。

```html:index.html
<!DOCTYPE html>
<html>
  <body>
    <canvas id="myCanvas" width="1200" height="630"></canvas>
    <script>
      /* 描画する画像データを配列に格納する */
      let addImageURLs = [];
      const imgString = <?= addImageURLsBase64 ?>;
      const imgArray = imgString.split(',');
      for (let i = 0; i < imgArray.length; i++) {
          addImageURLs.push('data:image/png;base64, ' + imgArray[i]);
      }

      /* 描画する画像データの合成位置を配列に格納する */
      let addImagePoints = [];
      const imgPointString = <?= addImagePoints ?>;
      const imgPointArray = imgPointString.split(',');
      for (let i = 0; i < imgPointArray.length; i++) {
          addImagePoints.push([imgPointArray[i], imgPointArray[i + 1]]);
          i++;
      }

      (function () {
          const canvas = document.getElementById("myCanvas");
          const context = canvas.getContext("2d");
          const downloadLink = document.getElementById("download_link");

          let images = [];
          for (let i = 0; i < addImageURLs.length; i++) {
              images[i] = new Image();
              images[i].src = addImageURLs[i];
          }

          let loadedCount = 1;
          for (let i in images) {
              images[i].addEventListener(
                  "load",
                  function () {
                      if (loadedCount == images.length) {
                          for (let j = 0; j < images.length; j++) {
                              if (j == 0) {/* ベース画像を描画 */
                                  context.drawImage(images[j], 0, 0);
                              } else {/* それ以外の画像は指定位置に描画 */
                                  context.drawImage(images[j], addImagePoints[j - 1][0], addImagePoints[j - 1][1]);
                              }
                          }
                      }
                      loadedCount++;
                  },
                  false
              );
          }
      })();
    </script>
  </body>
</html>
```
**注意:** `<canvas>` タグの `width` と `height` は、ご自身のブログのアイキャッチ画像のサイズに合わせて適宜調整してください。

### 1-4. Webアプリとしてデプロイ

スクリプトが完成したら、Webアプリとしてデプロイ（公開）します。デプロイ方法の詳細は以下の記事を参考にしてください。

{{< self-blog-card "https://arukayies.com/gas/line_bot/line-bot-with-gas#toc7" >}}

デプロイ後に取得できる**WebアプリのURL**は、次のステップで使用するため、必ず控えておいてください。

## ステップ2: 操作用のスプレッドシート作成

次に、このWebアプリをコントロールするためのスプレッドシートを作成します。

### 2-1. スプレッドシートをコピー

以下のスプレッドシートをテンプレートとして用意しました。ご自身のGoogleドライブにコピーして使用してください。

{{< blog-card "https://docs.google.com/spreadsheets/d/1PukL2_BbWfTHvxlKHnap0LpAgv4jveFS_H7aJtv0Xpk/edit?usp=sharing" >}}

### 2-2. メイン処理スクリプト (createEyecatchImage.js) の実装

コピーしたスプレッドシートを開き、「拡張機能」→「Apps Script」からスクリプトエディタを開きます。

開いたスクリプトエディタに、以下のコードを貼り付けてください。

```javascript:createEyecatchImage.js
function main() {
    /* 使いやすい用にスプレッドシートの値を取得するようにしている */
    const SS = SpreadsheetApp.openById("シートID");
    const SH = SS.getSheetByName("シート名");
    const DETA = SH.getDataRange().getDisplayValues();

    const background = DETA[1][1];/* 背景画像のURL */
    const imageTitle = DETA[2][1];/* タイトル画像 */
    const imageSubTitle = DETA[3][1];/* サブタイトル画像 */
    const fileName = DETA[4][1];/* Wordpressに保存するファイル名 */
    const x1 = DETA[5][1];/*タイトル画像のX座標 */
    const y1 = DETA[6][1];/* タイトル画像のY座標 */
    const x2 = DETA[7][1];/* サブタイトル画像のX座標 */
    const y2 = DETA[8][1];/* サブタイトル画像のY座標 */
    const altText = DETA[9][1];/* Wordpressに設定する画像のaltText */
    const title = DETA[10][1];/* Wordpressに設定する画像のタイトル */
    const caption = DETA[11][1];/* Wordpressに設定する画像のcaption */
    const description = DETA[12][1];/* Wordpressに設定する画像の説明 */

    /* http://placehold.jp/　という画像生成サイトを利用して、文字入り画像を生成している。(CSSでちょっとリッチに生成している) */
    const titleIamge = "http://placehold.jp/70/00336d/ffffff/1200x250.png?text=" + encodeURIComponent(imageTitle) + "&css=%7B%22background-color%22%3A%22%20rgba(0%2C51%2C109%2C0.9)%22%7D";
    const subTitleImage = "http://placehold.jp/30/eaeae0/00336d/500x130.png?text=" + encodeURIComponent(imageSubTitle);

    const parameters = {
        addImageURLs: [background, titleIamge, subTitleImage],
        addImagePoints: [[x1, y1], [x2, y2]]
    };

    /* 別スクリプトで公開したURLを指定する */
    const url = "GASの公開URL" + encodeURIComponent(JSON.stringify(parameters));

    /* phantomjscloudでキャプチャする位置を指定する */
    const GSoption = {
        url: url,
        renderType: "png",
        renderSettings: {
            viewport: {
                width: 1200,
                height: 630
            },
            clipRectangle: {
                top: 59,
                width: 1200,
                height: 630
            }
        }
    };
    const payload = encodeURIComponent(JSON.stringify(GSoption));
    /* キャプチャ画像を取得する */
    const image = UrlFetchApp.fetch("https://phantomjscloud.com/api/browser/v2/" + "phantomjscloudのキー" + "/?request=" + payload).getBlob();

    /* WordPressにアップロードするためのヘッダー */
    const headers = {
        "Content-Type": "image/png",
        "Content-Disposition": "attachment;filename=" + fileName + ".png",
        "accept": "application/json",
        "Authorization": "Basic " + Utilities.base64Encode("Wordpressのユーザー名" + ":" + "Wordpressのパスワード")
    };

    const wpOptions = {
        "method": "POST",
        "headers": headers,
        "payload": image,
    };

    /* WordPressにアップロードする */
    UrlFetchApp.fetch(`WordpressのURL/wp-json/wp/v2/media?alt_text=${altText}&title=${title}&caption=${caption}&description=${description}`, wpOptions);
}
```

### 2-3. 各種設定値の書き換え

上記スクリプトには、ご自身の環境に合わせて書き換える必要がある箇所がいくつかあります。

*   **3, 4行目:** `シートID`と`シート名`を、コピーしたスプレッドシートのものに書き換えます。
*   **30行目:** `GASの公開URL`を、ステップ1-4で取得したWebアプリのURLに書き換えます。
*   **50行目:** `phantomjscloudのキー`を、[PhantomJsCloud](https://phantomjscloud.com/)で取得したご自身のAPIキーに書き換えます。
*   **57行目:** `Wordpressのユーザー名`と`Wordpressのパスワード`を、WordPress REST API用のものに書き換えます。
*   **67行目:** `WordpressのURL`を、ご自身のサイトURL（例: `https://example.com`）に書き換えます。

## ツールの使い方

すべての設定が完了したら、いよいよツールを使ってみましょう。

1.  **スクリプトの割り当て:** スプレッドシート上の「画像生成」ボタンを右クリックし、「スクリプトを割り当て」を選択します。入力欄に `main` と入力してOKを押します。
2.  **設定値の入力:** スプレッドシートのB列に、生成したい画像の情報を入力します。
    *   **背景画像のURL:** ベースとなる背景画像のURL。
    *   **メイン・サブタイトル:** 画像に合成するテキスト。
    *   **合成位置:** テキスト画像のX/Y座標。
    *   **画像詳細設定:** WordPressに登録する`alt`テキストやタイトルなど。
3.  **実行:** 「画像生成」ボタンをクリックします。スクリプトが実行され、数秒後にWordPressのメディアライブラリに画像がアップロードされます。

## まとめ

本記事では、GASとスプレッドシートを使ってアイキャッチ画像を自動生成するツールの作り方を紹介しました。一度この仕組みを構築してしまえば、今後のアイキャッチ作成が格段に楽になります。

最初は設定が少し複雑に感じるかもしれませんが、この記事の手順通りに進めれば誰でも作成できます。ぜひ挑戦して、ブログ運営の効率化を実現してください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
