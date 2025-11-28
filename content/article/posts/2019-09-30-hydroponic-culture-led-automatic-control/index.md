---
title: "Raspberry Piで植物育成LEDライトを自動制御！日没・日の出時刻に合わせてON/OFFする方法"
description: "Raspberry PiとPythonを使い、植物育成LEDライトを日没・日の出時刻と連動させて自動でON/OFFするシステムを構築する方法を解説します。緯度・経度から時刻を算出し、cronで実行を自動化するコード付き。"
tags: ["IoT","Raspberry Pi","水耕栽培", "Python", "自動化"]
date: "2019-09-30T11:09:59.000Z"
url: "/raspberrypi/hydroponic-culture-led-automatic-control"
share: true
toc: true
categories: ["Raspberry Pi"]
archives: ["2019年9月"]
lastmod: "2025-11-27T21:49:00+09:00"
---

自宅で水耕栽培の効率をさらに高めるため、Raspberry Piを使って植物育成LEDライトのON/OFFを自動化するシステムを構築しました。

この記事では、**日没と日の出の時刻に合わせてLEDライトを自動で点灯・消灯させる方法**を、最新のコードと共に分かりやすく解説します。

実際にライトが自動でON/OFFする様子がこちらです。
{{< custom-figure src="img_5dfa27ec5a0c9.gif" title="LEDライト自動制御の様子">}} 

{{< affsearch keyword="Raspberry Pi" img="/pi.jpg">}}

## システムの概要

このシステムの仕組みはとてもシンプルです。

1.  **Pythonスクリプトの作成**: 緯度と経度からその日の日の出・日没時刻を計算するスクリプトを用意します。
2.  **シェルスクリプトの作成**: LEDライトをON/OFFするための具体的なコマンドを記述したスクリプトを作成します。
3.  **cronによる自動実行**: cronを使い、毎日決まった時刻にPythonスクリプトを実行し、計算された時刻にシェルスクリプトが動作するようにスケジュールします。

## 必要なライブラリのインストール

まず、Pythonで天文計算を行うためのライブラリ `skyfield` をインストールします。

```bash
pip install skyfield
```

また、USBポートの電源を制御するために `hub-ctrl` が必要です。

```bash
# hub-ctrlのインストール例
sudo apt-get install hub-ctrl
```

## 自動化のためのコード

以下に、LEDライトを自動制御するためのPythonスクリプトとシェルスクリプトを紹介します。

### Pythonスクリプト (`schedule_light.py`)

このスクリプトは、日の出・日没時刻を計算し、`at` コマンドで指定した時刻にシェルスクリプトを実行予約します。

```python
from skyfield.api import load, Topos
import datetime
import subprocess
import pytz

# --- 設定項目 ---
# タイムゾーンを指定
TIMEZONE = 'Asia/Tokyo'
# 緯度と経度を指定 (例: 東京)
LATITUDE = '35.6895N'
LONGITUDE = '139.6917E'
# 実行するシェルスクリプトのフルパス
SCRIPT_PATH_ON = '/home/pi/hydroponic_culture_light_on.sh'
SCRIPT_PATH_OFF = '/home/pi/hydroponic_culture_light_off.sh'
# --- 設定ここまで ---

def get_sunrise_sunset():
    """
    指定した地点の次の日の出・日没時刻を取得する
    """
    ts = load.timescale()
    eph = load('de421.bsp')  # 天体暦データ
    observer = Topos(latitude_degrees=float(LATITUDE[:-1]), longitude_degrees=float(LONGITUDE[:-1]))
    
    # JSTタイムゾーンオブジェクト
    jst = pytz.timezone(TIMEZONE)
    now = datetime.datetime.now(jst)

    # 次の日の出・日没時刻を検索
    t0 = ts.from_datetime(now)
    t1 = ts.from_datetime(now + datetime.timedelta(days=1))
    times, events = eph['sun'].find_settings(observer, t0, t1)
    
    sunrise_time = None
    sunset_time = None

    for t, event in zip(times, events):
        if event == 0 and sunrise_time is None: # 0: 日の出
            sunrise_time = t.astimezone(jst)
        elif event == 1 and sunset_time is None: # 1: 日没
            sunset_time = t.astimezone(jst)

    return sunrise_time, sunset_time

def schedule_at_job(exec_time, script_path):
    """
    指定した時刻にatコマンドでジョブをスケジュールする
    """
    if exec_time is None:
        print(f"時刻が取得できなかったため、{script_path} のスケジュールは行いません。")
        return
        
    time_str = exec_time.strftime('%H:%M')
    cmd = f'echo "bash {script_path}" | at {time_str}'
    print(f"コマンドを実行: {cmd}")
    subprocess.run(cmd, shell=True, check=True)
    print(f"{time_str} に {script_path} を実行するようにスケジュールしました。")

def main():
    """
    メイン処理
    """
    sunrise, sunset = get_sunrise_sunset()

    if sunrise:
        # 日の出の30分後にライトをOFF
        light_off_time = sunrise + datetime.timedelta(minutes=30)
        schedule_at_job(light_off_time, SCRIPT_PATH_OFF)

    if sunset:
        # 日没の30分前にライトをON
        light_on_time = sunset - datetime.timedelta(minutes=30)
        schedule_at_job(light_on_time, SCRIPT_PATH_ON)

if __name__ == '__main__':
    main()
```

### ON用シェルスクリプト (`hydroponic_culture_light_on.sh`)

```bash
#!/bin/bash
# USBポートの電源をONにする (環境に合わせて数値を変更)
# echo "【sudoのパスワード】" | sudo -S hub-ctrl -h 0 -P 2 -p 1
# パスワードなしでsudoを実行できる場合
sudo hub-ctrl -h 0 -P 2 -p 1
```

### OFF用シェルスクリプト (`hydroponic_culture_light_off.sh`)

```bash
#!/bin/bash
# USBポートの電源をOFFにする (環境に合わせて数値を変更)
# echo "【sudoのパスワード】" | sudo -S hub-ctrl -h 0 -P 2 -p 0
# パスワードなしでsudoを実行できる場合
sudo hub-ctrl -h 0 -P 2 -p 0
```

## cronで実行を自動化する

最後に、作成したPythonスクリプトを毎日決まった時刻（例: 深夜2時）に実行するようにcronに登録します。

`crontab -e` コマンドで編集画面を開き、以下の行を追加します。

```crontab
# 毎日 02:00 にPythonスクリプトを実行して、その日のON/OFF時刻をスケジュールする
0 2 * * * /usr/bin/python3 /home/pi/schedule_light.py >> /home/pi/schedule_light.log 2>&1
```
*`/usr/bin/python3` やスクリプトのパスはご自身の環境に合わせて変更してください。*
*ログを出力しておくと、問題が発生したときに原因を調査しやすくなります。*

これで、毎日自動で日没・日の出時刻が計算され、適切なタイミングでLEDライトがON/OFFされるようになります。

## まとめ

Raspberry PiとPythonを使えば、天体の動きに合わせたスマートな植物育成環境を簡単に構築できます。この記事が、あなたのIoTプロジェクトの参考になれば嬉しいです！

{{< affsearch keyword="Raspberry Pi" img="/pi.jpg">}}
