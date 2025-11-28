---
title: "【GAS】スプレッドシートの特定セル編集をトリガーにSlackへ自動通知する方法"
description: "Google Apps Script(GAS)を使い、スプレッドシートのセルが特定の値（例：「新規」）に編集されたことをトリガーにして、その行の内容を自動でSlackに通知する方法を解説します。手動での通知作業を自動化し、業務効率を向上させましょう。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "Slack", "自動化"]
date: "2020-04-18T08:10:29.000Z"
url: "/gas/sheet-postcontent-slack"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年4月"]
lastmod: "2025-11-26T09:52:08.000Z"
---

スプレッドシートでのタスク管理や情報共有は非常に便利ですが、「ステータスが更新されたらSlackで通知する」といった定型作業を手動で行っていませんか？

この記事では、**Google Apps Script (GAS) を使って、スプレッドシートのステータスが「新規」に変更されたら、その内容を自動でSlackに通知する方法**を解説します。

{{< custom-figure src="実行前-1024x197.png" title="ステータスを「新規」に変更" Fit="1280x1280 webp q90" >}}

このスクリプトを使えば、上記のようにステータスを変更するだけで、以下のようにSlackの指定チャンネルへ自動で通知が届きます。

{{< custom-figure src="実行後.png" title="Slackに自動通知が届く" Fit="1280x1280 webp q90" >}}

手動でのコピー＆ペースト作業から解放され、チームの情報共有をスムーズにしましょう。

ちなみに、ステータス変更と同時に担当者名や日付を自動入力する方法はこちらで解説しています。

{{< self-blog-card "article/posts/2020-04-13-auto-date-name" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## 完成したGASコード

まずは今回作成するコードの全体像です。コピーしてすぐにお使いいただけます。

```javascript
/*
 * 関数概要
 * スプレッドシートのステータスが「新規」に編集されたら、Slackに内容を通知する
 *
 * 引数
 * e イベントオブジェクト(起動時の情報が含まれています)
 * 
 * 戻り値
 * なし
*/
function sheet_postContent(e) {
	// ヘッダーの行番号
	const hedaerRow = 2;
	// 通知させる内容が書かれている列番号
	const contentCol = 5;

	// 編集されたシート
	const sheet = e.source.getActiveSheet();
	// 編集されたセル
	const currentCell = e.source.getActiveCell();
	// 編集された値
	const currentValue = currentCell.getValue();
	// 編集されたセルの行番号
	const currentRow = currentCell.getRow();
	// ログ
	Logger.log("行番号:" + currentRow);
	Logger.log("編集された値:" + currentValue);

	// ヘッダー以降で、編集された値は「新規」の場合にSlack通知させる
	if (hedaerRow < currentRow && currentValue == "新規") {
		var content = sheet.getRange(currentRow, contentCol).getValue();
		Logger.log("送信する内容:" + content);
		slack_postMessage(content);
	}
}
/*
 * 関数概要
 * Slackに指定テキストを#sampleに送信する
 *
 * 引数
 * message Slackに送信したいテキスト
 * 
 * 戻り値
 * なし
*/
function slack_postMessage(message) {
	const token = "Slackで取得したトークン";
	const apiUrl = "https://slack.com/api/chat.postMessage?token=" + token;
	const payload = {
		"channel": "sample",
		"text": message
	};
	const options = {
		"method": "post",
		"payload": payload
	};
	UrlFetchApp.fetch(apiUrl, options);
}
```

以降のセクションで、このスクリプトを動かすための事前準備と設定方法を詳しく解説します。

## 事前準備：Slackのアクセストークンを取得する

GASからSlackへ通知するために、専用のアクセストークンを取得します。

### 1. Slackアプリを作成する

まず、以下のURLからSlack APIの管理画面にアクセスし、新しいアプリを作成します。

{{< blog-card "https://api.slack.com/apps" >}}

「Create New App」をクリックし、「From scratch」を選択。アプリ名（例: GAS-Notification-Bot）と、導入したいワークスペースを指定して作成します。

{{< custom-figure src="Slackにアプリ情報を入力する-1024x852.png" title="Slackアプリ情報の入力" Fit="1280x1280 webp q90" >}}

### 2. トークンの権限を設定する

次に、作成したアプリに必要な権限（スコープ）を付与します。
左側メニューから「OAuth & Permissions」を選択してください。

{{< custom-figure src="OAuth-Permissions-1024x733.jpg" title="「OAuth & Permissions」を選択" Fit="1280x1280 webp q90" >}}

「Scopes」セクションまでスクロールし、「Bot Token Scopes」にある「Add an OAuth Scope」ボタンをクリック。「**chat:write**」を選択して追加します。これは、アプリがチャンネルにメッセージを書き込むための権限です。

{{< custom-figure src="chat-writeを選択-1024x942.png" title="Scopesに「chat:write」を追加" Fit="1280x1280 webp q90" >}}

### 3. アプリをワークスペースにインストールする

ページ上部に戻り、「Install to Workspace」ボタンをクリックして、作成したアプリをワークスペースにインストールします。

{{< custom-figure src="ワークスペースにアプリをインストールする-1024x946.png" title="アプリをワークスペースにインストール" Fit="1280x1280 webp q90" >}}

権限リクエストの確認画面が表示されるので、「許可する」をクリックします。

{{< custom-figure src="許可する-1024x855.png" title="アクセス許可" Fit="1280x1280 webp q90" >}}

### 4. トークンをコピーする

インストールが完了すると、「Bot User OAuth Token」が生成されます。このトークン（`xoxb-`で始まる文字列）をコピーしてください。後のGASコードで使用します。

{{< custom-figure src="トークン生成-1024x624.png" title="生成されたトークンをコピー" Fit="1280x1280 webp q90" >}}

## GASの実装とトリガー設定

次に、スプレッドシート側でGASの設定を行います。

### 1. スクリプトエディタにコードを追加する

対象のスプレッドシートを開き、「拡張機能」>「Apps Script」を選択してスクリプトエディタを起動します。
エディタ内に、この記事の冒頭で紹介したGASコードを貼り付け、`slack_postMessage`関数内の`token`の値を先ほどコピーしたご自身のトークンに書き換えてください。

スクリプトの追加方法がわからない場合は、こちらの記事も参考にしてください。

{{< self-blog-card "article/posts/2020-04-13-auto-date-name" >}}

### 2. トリガーを設定する

最後に、スクリプトが自動で実行されるように「トリガー」を設定します。
スクリプトエディタの左側メニューから「トリガー」（時計アイコン）を選択し、「トリガーを追加」ボタンをクリックします。

{{< custom-figure src="トリガー1-1024x904.png" title="トリガー設定画面" Fit="1280x1280 webp q90" >}}

以下の通りに設定し、保存してください。

- **実行する関数を選択**: `sheet_postContent`
- **イベントのソースを選択**: `スプレッドシートから`
- **イベントの種類を選択**: `編集時`

{{< custom-figure src="トリガーの内容-1024x984.png" title="トリガー情報の設定" Fit="1280x1280 webp q90" >}}

これで、スプレッドシートのいずれかのセルが編集されるたびに`sheet_postContent`関数が実行されるようになりました。

## 実行結果

設定が完了したら、実際にスプレッドシートのステータス列を「新規」に変更してみましょう。
すぐに指定したSlackチャンネルに通知が届けば成功です！

## まとめ

今回は、GASを使ってスプレッドシートの更新をSlackに自動通知する方法を紹介しました。
これまで手動でSlackに連絡事項を投稿していた手間が省け、ヒューマンエラーの防止にも繋がります。

このスクリプトを応用すれば、
- タスクの担当者が割り当てられたら、その担当者にメンション付きで通知する
- 特定の数値を超えたらアラートを飛ばす
など、さまざまな業務自動化が実現できます。ぜひ活用してみてください！

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
