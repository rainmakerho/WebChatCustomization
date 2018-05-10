# WebChatCustomization
提供透過 BotFramework-WebChat 的 botchat.js 來整合 webchat 的範例

#### 我們可以透過 BotFramework-WebChat 的 botchat.js 來快速產生一個 webchat ，讓我們可以整合到即有的 Web Application 之中，但是它就直接長出一個 webchat 出來。
#### 但一般要的是在網頁的下方長出小圖示，讓使用者來點開它。不要用時，點上面的 Title 將它關起來。
#### 這個的範例就是將這樣子的功能整理出來，讓大家可以順利的整合到現有的 Web Application 之中。

#### 整合方式如下，
1. Copy 專案中的 Botchat 
2. 在 Web Page 中加入以下內容, 透過 BotChatUI 來操作 webchat 
```html
<!-- chatbot -->
<link href="Botchat/CSS/botchat.css" rel="stylesheet" />
<link href="Botchat/CSS/botchat-fullwindow.css" rel="stylesheet" />
<link href="Botchat/CSS/botchatCustom.css" rel="stylesheet" />
<script src="Botchat/Scripts/botchat-es5.js"></script>
<script src="Botchat/Scripts/BotChatUI.js"></script>
<script>
    var botChatUI = new BotChatUI({
        botId: 'RainmakerBot',
        botName: '小亂機器人',
        userId: 'Rainmaker',
        userName: '亂馬客',
        chatTitle: '小亂機器人, 按我可縮小',
        locale: 'zh-tw',
        directLineOptions: {
            secret: '',
            token: '',
            domain: 'http://localhost:3000/directline/gssbot',
            pollingInterval: 1000,
            webSocket: false
        },
        botChatIconUrl: 'https://avatars2.githubusercontent.com/u/11240907?s=400&u=597a9c2ae536885dae848ed245dc2dfb591a8c28&v=4',
        showWebChatButton: true
    });
</script>
<!-- chatbot -->
```
3. 要調整 style 請在 botchatCustom.css 中調整，例如小圖示、配色等等。
4. bot 的相關設定，請透過 BotChatUI 來設定
5. 可透過程式開啟 webchat , 開啟 BotChatUI.onClickWebChatButton(); 關閉 BotChatUI.onClickWebChatHeader(); ，showWebChatButton 決定是否要顯示下面的下圖示，詳細可參考 default.aspx

![一開始在下方只有一個圓圓的小圖示](https://github.com/rainmakerho/WebChatCustomization/blob/master/init.png)

![開始透過 WebChat ，可按下 Header 縮回去](https://github.com/rainmakerho/WebChatCustomization/blob/master/chating.png)

