# element-remover


Chrome拡張機能を作成して指定された要素を削除するには、次の手順に従います。

### 1. マニフェストファイルの作成

まず、拡張機能の設定情報を含む `manifest.json` ファイルを作成します。これは拡張機能の基本情報を定義するために必要です。

`manifest.json`:
```json
{
  "manifest_version": 3,
  "name": "Element Remover",
  "version": "1.0",
  "description": "Remove specified elements from web pages",
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

### 2. コンテンツスクリプトの作成

次に、特定の要素を削除する `content.js` ファイルを作成します。このスクリプトはWebページ上で実行されます。

`content.js`:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // 「div role="navigation"」を削除
    var navigationDiv = document.querySelector('div[role="navigation"]');
    if (navigationDiv) {
        navigationDiv.remove();
    }

    // 「div class="AppHeader-globalBar js-global-bar"」を削除
    var globalBarDiv = document.querySelector('div.AppHeader-globalBar.js-global-bar');
    if (globalBarDiv) {
        globalBarDiv.remove();
    }
});
```

### 3. 背景スクリプトの作成

`background.js` ファイルはオプションですが、拡張機能の背景で実行されるスクリプトです。

`background.js`:
```javascript
chrome.runtime.onInstalled.addListener(() => {
  console.log('Element Remover extension installed.');
});
```

### 4. ポップアップHTMLの作成（オプション）

拡張機能のアイコンをクリックしたときに表示されるポップアップを作成することもできます。

`popup.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Element Remover</title>
</head>
<body>
  <h1>Element Remover</h1>
  <p>Specified elements will be removed from web pages.</p>
</body>
</html>
```

### 5. 拡張機能のインストール

1. 上記のファイルをフォルダーに保存します（例: `element-remover`）。
2. Chromeブラウザを開き、「拡張機能」を管理するページに移動します（`chrome://extensions/`）。
3. 右上の「デベロッパーモード」を有効にします。
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、作成したフォルダーを選択します。

これで、指定された要素を削除するChrome拡張機能がインストールされ、動作するはずです。
