# element-remover

Google Chromeの拡張機能を作成して、指定されたセレクターを削除する方法を説明します。以下の手順に従ってください。

### 手順 1: 拡張機能の基本ファイルを作成

1. **プロジェクトフォルダを作成**
   任意の名前のフォルダを作成します。例えば「remove-element-extension」。

2. **manifest.jsonファイルを作成**
   プロジェクトフォルダ内に `manifest.json` ファイルを作成し、以下の内容を記述します。

   ```json
   {
     "manifest_version": 3,
     "name": "Remove Element Extension",
     "version": "1.0",
     "description": "指定されたセレクターを削除する拡張機能",
     "permissions": [
       "activeTab",
       "scripting"
     ],
     "action": {
       "default_popup": "popup.html",
       "default_icon": {
         "16": "icon.png",
         "48": "icon.png",
         "128": "icon.png"
       }
     }
   }
   ```

3. **popup.htmlファイルを作成**
   プロジェクトフォルダ内に `popup.html` ファイルを作成し、以下の内容を記述します。

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <title>Remove Element Extension</title>
       <style>
         body {
           width: 200px;
           height: 100px;
           display: flex;
           justify-content: center;
           align-items: center;
           flex-direction: column;
         }
         button {
           padding: 10px;
           font-size: 16px;
           cursor: pointer;
         }
       </style>
     </head>
     <body>
       <button id="removeElementButton">Remove Element</button>
       <script src="popup.js"></script>
     </body>
   </html>
   ```

4. **popup.jsファイルを作成**
   プロジェクトフォルダ内に `popup.js` ファイルを作成し、以下の内容を記述します。

   ```javascript
   document.getElementById('removeElementButton').addEventListener('click', () => {
     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
       chrome.scripting.executeScript({
         target: { tabId: tabs[0].id },
         function: removeElements
       });
     });
   });

   function removeElements() {
     const selectors = [
       'body > div.logged-in.env-production.page-responsive.height-full.d-flex.flex-column > div.position-relative.js-header-wrapper > header'
     ];
     selectors.forEach(selector => {
       const element = document.querySelector(selector);
       if (element) {
         element.remove();
       }
     });
   }
   ```

5. **アイコン画像を追加**
   プロジェクトフォルダ内に「icon.png」という名前のアイコン画像ファイルを追加します。適切なサイズ（例：128x128ピクセル）の画像を使用してください。

### 手順 2: Chromeに拡張機能をインストール

1. **Chromeブラウザを開く**。
2. アドレスバーに `chrome://extensions/` を入力して、エンターボタンを押します。
3. 右上の「デベロッパーモード」を有効にします。
4. 左上の「パッケージ化されていない拡張機能を読み込む」をクリックし、プロジェクトフォルダを選択します。

これで、拡張機能がChromeにインストールされます。拡張機能のアイコンをクリックして、表示されるポップアップの「Remove Element」ボタンを押すと、指定されたセレクターが削除されるはずです。
