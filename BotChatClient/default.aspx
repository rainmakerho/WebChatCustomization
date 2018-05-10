<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="BotChatClient._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>直接加入 botchat.js 測試</title>
    <!--  -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</head>
<body>
    <form id="form1" runat="server">
        <div>
            這裡是一般的功能畫面
            <asp:Button ID="Button1" runat="server" Text="Bind DataGrid" OnClick="Button1_Click" />
            <asp:GridView ID="GridView1" runat="server"></asp:GridView>
            <hr />
            <asp:Button ID="btnShowWebChat" runat="server" Text="ShowWebChat" OnClientClick="return BotChatUI.onClickWebChatButton();" />
            <hr />
            <asp:Button ID="btnCloseWebChat" runat="server" Text="HideWebChat" OnClientClick="return BotChatUI.onClickWebChatHeader();" />
        </div>
    </form>
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
                domain: '',
                pollingInterval: 1000,
                webSocket: false
            },
            botChatIconUrl: 'https://avatars2.githubusercontent.com/u/11240907?s=400&u=597a9c2ae536885dae848ed245dc2dfb591a8c28&v=4',
            showWebChatButton: true
        });
    </script>
    
    <!-- chatbot -->
</body>
</html>
