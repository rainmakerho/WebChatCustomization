declare var BotChat: any;


interface IBotChatUIConfig {
    botId: string,
    botName: string,
    userId: string,
    userName: string,
    botChatIconUrl: string, //下方機器人的圖示
    chatTitle: string, // WebChat Header 的文字
    directLineOptions: any, //DirectLine 的設定
    locale: string,  //語系
    showWebChatButton: boolean // 是否顯示下方的機器人圖示 
}

//放webchat's divid
const BotChatGoesHereDivId = 'BotChatGoesHere';

//放webchat 下方的divId
const WebChatButtonDivId = 'WebChatButton';

//放WebChat 開啟的DivId
const WebChatDialogDivId = 'WebChatDialog';

const conversationIdKey = 'conversationId';

class BotChatUI {

    // Instance
    private static _instance: BotChatUI;
    public static getInstance(): BotChatUI {
        return this._instance;
    }

    public bot;
    public user;
    public botConnection;
    public botChatUIConfig: IBotChatUIConfig;

    constructor(config: IBotChatUIConfig) {
        config.botChatIconUrl = config.botChatIconUrl || 'https://bot-framework.azureedge.net/bot-icons-v1/bot-framework-default-7.png';
        this.botChatUIConfig = config;
        const content = `<div ID="${WebChatButtonDivId}" onclick="BotChatUI.onClickWebChatButton()"></div><div id="${WebChatDialogDivId}"></div>`;
        var fragment = this.create(content);
        // 把 div 加到目前的 Page 之中
        document.body.insertBefore(fragment, document.body.childNodes[0]);

        //使用者，可以未指定或是從AP讀進來
        this.user = {
            id: config.userId,
            name: config.userName
        };

        this.bot = {
            id: config.botId,
            name: config.botName
        };

        BotChatUI._instance = this;

        //設定縮小時，機器人的圖
        let chatButton = document.getElementById(WebChatButtonDivId);
        if (chatButton) {
            chatButton.setAttribute('style', `background:url(${config.botChatIconUrl});background-size: cover`);
        }

        BotChatUI.isShowWebChatButton(config.showWebChatButton);

        //設定 webchat 中的機器人圖示
        const css = '.wc-message-from-bot .wc-message-content:before {background-image:' + `url(${config.botChatIconUrl});` + '}',
            style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.body.appendChild(style);

    }


    private create(htmlStr) {
        var frag = document.createDocumentFragment(),
            temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        return frag;
    }

    public startConversation() {
        console.log('startConversation');
        let botChatGoesHereDiv = document.getElementById(BotChatGoesHereDivId);
        if (!botChatGoesHereDiv) {
            botChatGoesHereDiv = document.createElement('div');
            botChatGoesHereDiv.id = BotChatGoesHereDivId;
            document.getElementById(WebChatDialogDivId).appendChild(botChatGoesHereDiv);
        }

        //這裡請用您 bot 的相關資訊
        this.botConnection = new BotChat.DirectLine(this.botChatUIConfig.directLineOptions);
        //讀取 conversationId
        const conversationId = sessionStorage.getItem(conversationIdKey);
        if (conversationId) {
            //在目前 session 中有使用 bot 了
            this.botConnection.conversationId = conversationId;
        }
        this.botConnection.watermark = '';

        BotChat.App({
            locale: this.botChatUIConfig.locale,
            resize: 'window',
            chatTitle: this.botChatUIConfig.chatTitle,
            user: this.user,
            bot: this.bot,
            botConnection: this.botConnection
        }, document.getElementById(BotChatGoesHereDivId));
        const isLocal = this.botChatUIConfig.directLineOptions.domain.indexOf('webchat.botframework.com') === -1;
        if (!conversationId && isLocal) {
            setTimeout(() => {
                this.botConnection.postActivity({
                    from: this.user,
                    membersAdded: [this.bot],
                    membersRemoved: [],
                    type: "conversationUpdate"
                }).subscribe((id) => {

                });
                this.botConnection.postActivity({
                    from: this.user,
                    membersAdded: [this.user],
                    membersRemoved: [],
                    type: "conversationUpdate"
                }).subscribe((id) => {

                });
            }, 100);
        }
    }

    public endConversation() {
        console.log('endConversation');
        sessionStorage.setItem(conversationIdKey, this.botConnection.conversationId);
        this.botConnection.end();
        try {
            const botChatGoesHereDiv = document.getElementById(BotChatGoesHereDivId);
            document.getElementById(WebChatDialogDivId).removeChild(botChatGoesHereDiv);
        } catch (err) {
            console.log(err);
        }
    }

    //open webchat
    public static onClickWebChatButton(e) {
        BotChatUI.isShowWebChat(true);
        BotChatUI.isShowWebChatButton(false);
        BotChatUI.getInstance().startConversation();
        const webchatHeaders = document.getElementsByClassName('wc-header');
        if (webchatHeaders.length > 0) {
            webchatHeaders[0].addEventListener('click', this.onClickWebChatHeader);
        }
        return false;
    }


    //close webchat
    public static onClickWebChatHeader(e) {
        BotChatUI.isShowWebChat(false);
        BotChatUI.isShowWebChatButton(true);
        BotChatUI.getInstance().endConversation();
        return false;
    }

    //是否顯示 WebChat
    public static isShowWebChat(isShow: boolean) {
        const webChatDialog = document.getElementById(WebChatDialogDivId);
        if (isShow) {
            webChatDialog.style.visibility = 'visible';
        } else {
            webChatDialog.style.visibility = 'hidden';
        }
    }

    //是否顯示下方的機器人圖示
    public static isShowWebChatButton(isShow: boolean) {
        const webChatButton = document.getElementById(WebChatButtonDivId);
        if (isShow && BotChatUI.getInstance().botChatUIConfig.showWebChatButton) {
            webChatButton.style.display = '';
        } else {
            webChatButton.style.display = 'none';
        }
    }
}

