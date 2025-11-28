---
title: "GASとWixを連携してホームページ更新を自動化！スプレッドシートの情報を自動反映する方法"
description: "GAS (Google Apps Script) とWixを連携させ、スプレッドシートのデータをWixサイトに自動で反映させる方法を解説します。手動での更新作業をなくし、効率的なサイト運用を実現しましょう。"
tags: ["Google Apps Script","スプレッドシート", "Wix", "自動化", "API連携"]
date: "2019-12-06T17:00:00.000Z"
url: "/gas/wixlinkage-gas"
share: true
toc: true
categories: ["GAS"]
archives: ["2019年12月"]
lastmod: "2025-11-27T11:12:01+09:00"
---

Webサイト、特にイベント情報などを掲載しているホームページの更新作業、手間がかかっていませんか？
本記事では、**Google Apps Script (GAS) と Wix を連携させ、スプレッドシートの情報をWixサイトへ自動で反映させる方法**を紹介します。

この仕組みを導入することで、面倒な手動更新から解放され、サイトの情報を常に最新の状態に保つことができます。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## システムの全体像

今回構築するシステムの処理の流れは以下の通りです。

{{< custom-figure src="img_5dfa222d3b788.png" title="処理フロー" Fit="1280x1280 webp q90" >}}

1.  **スプレッドシート**: ホームページに掲載したい情報を管理します。（例：イベントスケジュール）
2.  **Google Apps Script (GAS)**: スプレッドシートの情報を読み取り、WixのAPIへ送信します。
3.  **Wix (HTTP Functions)**: GASから送られてきたデータを受け取るためのAPIを用意します。
4.  **Wix (データベース)**: APIが受け取ったデータを格納します。
5.  **Wix (動的ページ)**: データベースの内容を元に、ホームページの表示を自動で更新します。

## ステップ1: スプレッドシートで表示データを管理する

まず、ホームページに表示させたい情報を管理するスプレッドシートを用意します。
例えば、外部のスケジュール調整サービス（[伝助][2]など）を利用している場合、`IMPORTHTML`関数を使うことで、その内容を自動でスプレッドシートに取り込めます。

```excel
=IMPORTHTML("スケジュール調整サービスのURL", "table")
```

これにより、手入力することなく、常に最新の情報をスプレッドシートに反映できます。

{{< custom-figure src="img_5dfa222d7a2f7.png" title="スプレッドシートへのインポート例" Fit="1280x1280 webp q90" >}}

## ステップ2: Wix側でデータを受け取る準備をする

次に、GASからデータを受け取るためにWix側を設定します。

### 1. データベース（コレクション）の作成

Wixサイトのエディタから「データベース」メニューを開き、新しいコレクションを作成します。ここに、ホームページに表示したい項目（例：イベント名、日時、説明など）に対応するフィールドを追加してください。

{{< custom-figure src="img_5dfa223315543.png" title="Wixコレクションのフィールド設定" Fit="1280x1280 webp q90" >}}

### 2. HTTP FunctionsでAPIを作成する

外部からのデータを受け付けるためのAPIエンドポイントを作成します。

1.  Wixエディタの左側にある「{ } (Velo開発者モード)」を有効にします。
2.  エクスプローラーが表示されたら、「Backend」セクションにある `http-functions.js` を作成または開きます。
3.  以下のコードを記述して、外部からのPOSTリクエストを処理できるようにします。

```javascript:http-function.js
import {
	created,
	serverError
} from 'wix-http-functions';
import wixData from 'wix-data';

// API名は自由に変更可能です (例: post_introduction)
export function post_introduction(request) {
	let options = {
		"headers": {
			"Content-Type": "application/json"
		}
	};

	// リクエストボディをJSONとして解析
	return request.body.json()
		.then((body) => {
			// データベースに挿入するレコードを作成
			let recordInsert = {
				// "introduction"はWixデータベースのフィールド名に合わせてください
				"introduction": body.introduction
			};
			// "Introduction"はWixデータベースのコレクションIDに合わせてください
			return wixData.insert("Introduction", recordInsert);
		})
		.then((results) => {
			options.body = {
				"inserted": results
			};
			return created(options); // 成功レスポンス
		})
		.catch((error) => {
			options.body = {
				"error": error
			};
			return serverError(options); // エラーレスポンス
		});
}
```
このファイルを保存・公開すると、WixサイトにAPIエンドポイントが作成されます。

### 3. 動的ページとデータベースを接続する

最後に、作成したデータベースとホームページの表示要素（テキスト、リピーターなど）を接続します。
データセットを追加し、各テキスト要素がデータベースのどのフィールドを参照するかを設定することで、データベースの内容が自動的にページに表示されるようになります。

{{< custom-figure src="img_5dfa2238b1c74.png" title="テキストとデータベースの接続" Fit="1280x1280 webp q90" >}}

## ステップ3: GASでWixにデータを送信する

スプレッドシートの情報をWixに送信するためのGASスクリプトを作成します。

```javascript
function updateWixDatabase() {
  try {
    // 操作対象のスプレッドシートとシートを指定
    const spreadsheet = SpreadsheetApp.openById("スプレッドシートID");
    const sheet = spreadsheet.getSheetByName("シート名");
    
    // 例としてA1セルの値を取得
    const introductionData = sheet.getRange("A1").getValue();

    // Wixに送信するデータ（ペイロード）を作成
    const payload = {
      "introduction": introductionData
    };

    // WixのHTTP Functionで生成されたAPIのURL
    const wixApiUrl = "https://あなたのサイト名.wixsite.com/ホームページ名/_functions/introduction";

    const options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(payload)
    };

    // Wix APIにデータを送信
    const response = UrlFetchApp.fetch(wixApiUrl, options);
    Logger.log(response.getContentText());

  } catch (e) {
    Logger.log("エラーが発生しました: " + e.message);
  }
}
```
この`updateWixDatabase`関数を実行すると、スプレッドシートの情報がWixのデータベースに送信・保存されます。

## 運用方法とメリット

この仕組みをさらに発展させると、例えば**LINE Bot**と連携させることができます。
特定のキーワード（例：「ホームページ更新」）をLINEグループに送信すると、GASのWebhookが起動し、Wixサイトの更新処理が実行される、といった完全自動化も可能です。

### この仕組みを導入するメリット

-   **更新作業の自動化**: 手動でのコピー＆ペースト作業がなくなり、大幅な時間短縮になります。
-   **属人化の解消**: 誰でも（この例ではLINEでコマンドを送るだけで）更新できるようになり、特定の担当者に依存しなくなります。
-   **情報の鮮度維持**: 常に最新の情報がサイトに掲載されるため、訪問者への情報提供の質が向上し、サイトへの信頼性も高まります。

ぜひ、この仕組みを活用して、あなたのホームページ運用を効率化してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
