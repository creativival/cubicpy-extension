# CubicPyのScratch3拡張機能

*日本語 | [English](https://creativival.github.io/cubicpy-extension/)*

![CubicPy Logo](https://creativival.github.io/CubicPy/assets/cubicpy_logo.png)

## CubicPyとは、

コードで物理オブジェクトを配置・構築する3Dプログラミング学習アプリ

「キュービックパイ」 - 略して「キューパイ」と呼んでください！

## アプリの説明

CubicPyは、Pythonコードを使って3D空間にオブジェクトを配置し、リアルな物理演算で動作する世界を構築できるアプリケーションです。ボックスや球体などの物体を自由に配置して建築物を作り、重力や衝突などの物理法則を体験しながらプログラミングを学べます。

![CubicPy Sample Animation Gif](https://creativival.github.io/CubicPy/assets/cubicpy_sample.gif)

作成したオブジェクト建築物は、地面を傾けたり、オブジェクトを消すことで物理演算を使ったリアルな崩壊過程を観察できます。また、重力係数を変更することで、異なる重力環境下での物理挙動を確認できます。さらに、オブジェクトに初速度ベクトルを設定して発射することも可能です。

## CubicPy拡張機能とは

CubicPyはPythonでのプログラミングを基本としていますが、Scratch3からCubicPyにデータを送信して、オブジェクト建築を行うことができるようになります。

### CubicPy拡張機能の使い方

Xcratchのセットアップは以下の手順で行います：

1. [Xcratch](https://xcratch.github.io/editor/#https://creativival.github.io/cubicpy-extension/projects/example.sb3)にアクセスします
2. 「CubicPy拡張機能」が使えるサンプルプロジェクトが開きます。
3. 「CubicPy拡張機能」のブロックが使えるようになります
4. サンプルプロジェクトを改造して、自分だけの建築を行います。


###  CubicPyライブラリの準備

Pythonがインストールされたパソコンに、CubicPyライブラリをインストールします。

```bash
python -m venv .venv
source .venv/bin/activate
pip install setuptools
pip install cubicpy
```

### CubicPyの起動

```bash
cubicpy -x -g 0
```

### CubicPy拡張機能とCubicPyライブラリを連携する

1. CubicPyが外部通信モードで機能すると、画面に４桁の数字が表示されます。
2. その数字（ルームネーム）を、スクラッチの「ルームネームを () にする」ブロックに入力する
3. スクラッチのブロックをダブルクリックして、データを送信する
4, Websocket鉄鏃が確立されたら、CubicPyにキューブ建築が行われます。


## ライセンス

MIT License

Copyright (c) 2024 creativival

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 貢献

プロジェクトへの貢献をご検討いただきありがとうございます。以下の方法で貢献していただけます：

1. バグの報告
   - GitHubのIssueで問題を報告してください
   - 再現手順を詳しく記載してください
   - エラーメッセージやスクリーンショットがあれば添付してください

2. 機能の提案
   - GitHubのIssueで新機能を提案してください
   - 具体的なユースケースを記載してください
   - 実装方法の案があれば記載してください

3. プルリクエスト
   - バグ修正や機能追加のプルリクエストを歓迎します
   - コードの変更は小さく保ってください
   - テストを追加してください
   - コーディング規約に従ってください

4. ドキュメントの改善
   - ドキュメントの誤字脱字の修正
   - 説明の追加や改善
   - サンプルコードの追加

すべての貢献者の方々に感謝いたします。


