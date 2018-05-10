var content = '<div class="WebChatButton" ID="WebChatButton" onclick="onClickWebChatButton()"></div><div id="WebChatDialog"></div>';
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}
var fragment = create(content);
// 把 div 加到目前的 Page 之中
document.body.insertBefore(fragment, document.body.childNodes[0]);

//使用者，可以未指定或是從AP讀進來
var user = {
    id: 'rainmaker',
    name: '亂馬客'
};

var bot = {
    id: '655bot',
    name: '655botname'
};

//這裡請用您 bot 的相關資訊
var botConnection = new BotChat.DirectLine({
    secret: '',
    token: '',
    domain: 'http://localhost:3000/directline/gssbot',
    pollingInterval: 1000,
    webSocket: false
});
//startConversation();

function startConversation() {
    console.log('startConversation');
    var botChatGoesHereDiv = document.createElement('div');
    botChatGoesHereDiv.id = 'BotChatGoesHere';
    document.getElementById('WebChatDialog').appendChild(botChatGoesHereDiv);
    //botConnection.watermark = '';
    botConnection.connectionStatus$.next(0);
    BotChat.App({
        locale: 'zh-hant',
        resize: 'window',
        chatTitle: '小亂機器人',
        user: user,
        bot: bot,
        botConnection: botConnection
    }, document.getElementById('BotChatGoesHere'));
}

function endConversation() {
    console.log('endConversation');
    botConnection.end();
    try{
        var botChatGoesHereDiv = document.getElementById('BotChatGoesHere');
        document.getElementById('WebChatDialog').removeChild(botChatGoesHereDiv);
    }catch (err) {
        console.log(err);
    }
}

//open webchat
function onClickWebChatButton(e) {
    var webChatDialog = document.getElementById("WebChatDialog");
	var webChatButton = document.getElementById("WebChatButton");
	webChatButton.style.display = "none";
	webChatDialog.style.visibility = "visible";
    startConversation();
    var webchatHeaders = document.getElementsByClassName("wc-header");
    if(webchatHeaders.length>0){
        webchatHeaders[0].addEventListener('click', onClickWebChatHeader);
    }
}

//close webchat
function onClickWebChatHeader(e) {
	var webChatDialog = document.getElementById("WebChatDialog");
	var webChatButton = document.getElementById("WebChatButton");
	webChatButton.style.display = '';
	webChatDialog.style.visibility = "hidden";
    endConversation();
}