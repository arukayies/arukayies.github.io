---
title: "【GAS】スプレッドシートの特定セル編集時に日付と担当者を自動入力する方法【業務効率化】"
description: "Google Apps Script（GAS）を使用して、スプレッドシートの特定の列が編集された際に、自動で日付と編集者の名前を入力する方法を解説します。onEditトリガーを活用し、課題管理票などの更新作業を効率化しましょう。"
tags: ["GAS","Google Apps Script","スプレッドシート", "自動化", "業務効率化"]
date: "2020-04-13T13:24:40.000Z"
url: "/gas/auto-date-name"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年4月"]
lastmod: "2025-11-26T10:51:00+09:00"
---

## はじめに

課題管理票やWBSなど、スプレッドシートで複数人が情報を更新する際、「いつ」「誰が」更新したのかを手入力するのは面倒ではありませんか？入力漏れが発生することもあります。

{{< custom-figure src="スクリーンショット-2020-04-13-19.36.42-1024x200.png" title="課題管理票の例" Fit="1280x1280 webp q90" >}}

この記事では、**Google Apps Script (GAS) を使って、特定セルの編集をトリガーに日付と担当者名を自動で入力する方法**を紹介します。このスクリプトを導入すれば、更新作業の手間が省け、入力ミスも防げます。

**▼ この記事で実現できること**
特定の列（例：ステータス列）が編集されたら、対応する行の日付列と担当者列に自動で情報が入力されます。

{{< custom-figure src="image.png" title="「内容」列を入力すると日付と担当者が自動入力される" Fit="1280x1280 webp q90" >}}

様々なシートに応用できるので、ぜひ参考にしてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## GASで日付と担当者を自動入力する手順

設定は簡単で、スプレッドシートのスクリプトエディタにコードを貼り付けて保存するだけです。

### 1. スクリプトエディタを開く
対象のスプレッドシートを開き、メニューから「拡張機能」>「Apps Script」を選択してスクリプトエディタを起動します。

{{< custom-figure src="kidou.png" title="スクリプトエディタの起動" Fit="1280x1280 webp q90" >}}

### 2. コードを貼り付ける
エディタに表示されているデフォルトのコードを削除し、以下のコードを貼り付けます。

```javascript
/*
関数概要
 スプレッドシートの特定列が編集されたら、対象行に日付と記載者を自動入力させる

引数
 e イベントオブジェクト(起動時の情報が含まれています)
 
戻り値
 なし
*/
function onEdit(e) {
	// ↓許可した後はコメントアウトする 
	Session.getActiveUser().getEmail();
	// ヘッダーの行番号
	const hedaerRow = 2;
	// トリガーとなる列番号
	const triggerCol = 5;
	// 日付の列番号
	const dateCol = 2;
	// 記入者の列番号
	const nameCol = 3;

	// 編集されたシート
	const sheet = e.source.getActiveSheet();
	// 編集されたセル
	const currentCell = e.source.getActiveCell();
	// 編集されたセルの行番号
	const currentRow = currentCell.getRow();
	// 編集されたセルの列番号
	const currentCol = currentCell.getColumn();

	// ログ
	Logger.log("行番号:" + currentRow);
	Logger.log("列番号:" + currentCol);

	if (hedaerRow < currentRow && triggerCol == currentCol) {
		const date = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd")
		// メールアドレスは法人向けGoogle Appsの同一ドメインでないと取得できない
		// https://productforums.google.com/forum/#!topic/docs/5D23Os_NIAc
		//const name = "テスト名前"; //デバッグ用
		const name = e.user.getEmail().replace("@gmail.com", "");
		// ログ
		Logger.log("日付と記載者を自動入力します");
		Logger.log("日付:" + date);
		Logger.log("名前:" + name);
		// 日付をシートに書き込む
		sheet.getRange(currentRow, dateCol).setValue(date);
		// 名前をシートに書き込む
		sheet.getRange(currentRow, nameCol).setValue(name);
	}
}
```

### 3. コードの設定をシートに合わせる
貼り付けたコード内の以下の定数を、お使いのスプレッドシートの構成に合わせて変更してください。

- `hedaerRow`: ヘッダーの行番号（例：2行目なら`2`）
- `triggerCol`: スクリプトを動作させるトリガーとなる列番号（例：E列なら`5`）
- `dateCol`: 日付を自動入力したい列番号（例：B列なら`2`）
- `nameCol`: 担当者名を自動入力したい列番号（例：C列なら`3`）

### 4. スクリプトを保存・実行（初回のみ承認が必要）
コードを貼り付け、設定を変更したら、フロッピーディスクのアイコンをクリックしてプロジェクトを保存します。

次に、初回のみスクリプトの実行許可を与える必要があります。
再生ボタン（▶）を押して`onEdit`関数を実行してください。承認を求めるポップアップが表示されるので、以下の手順で許可します。

1.  「承認が必要です」画面で「許可を確認」をクリック
2.  自分のGoogleアカウントを選択
3.  「このアプリは確認されていません」と表示されたら、「詳細」をクリック
4.  「（プロジェクト名）（安全ではないページ）に移動」をクリック
5.  次の画面で「許可」をクリック

これで準備は完了です。一度承認すれば、次回以降は不要です。

## 動作確認
設定が完了したら、実際にスプレッドシートのトリガー列（この例ではE列）に何か入力してみましょう。
入力と同時に、指定した日付列と担当者列に情報が自動で入力されれば成功です。

{{< custom-figure src="image.png" title="自動入力の実行結果" Fit="1280x1280 webp q90" >}}

実行ログはGASのダッシュボードから確認できます。

{{< blog-card "https://script.google.com/home/executions" >}}

## まとめ
`onEdit(e)`トリガーは、スプレッドシートが編集されたときに自動で起動するシンプルなトリガーです。
今回のように、特定の列が編集されたことをきっかけに決まった処理を行いたい場合に非常に便利です。

GASを活用して定型作業を自動化し、業務効率を上げていきましょう！

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
