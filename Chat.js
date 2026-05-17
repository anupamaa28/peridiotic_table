const themes = [
    { 
        bg: "url(media/images/wallpaper1.jpg)",
        hg: "rgb(13, 15, 43)",
        botColor: "rgb(131, 50, 88)",
        userColor:"rgb(32, 56, 104)"
     },

     { 
        bg: "url(media/images/wallpaper2.jpg)",
        hg: "rgb(13, 15, 43)",
        botColor: "rgb(70, 125, 184)",
        userColor: "rgb(32, 56, 104)"
     },

     { 
        bg: "url(media/images/wallpaper3.jpg)",
        hg: "rgb(13, 15, 43)",
        botColor: "rgb(70, 125, 184)",
        userColor: "rgb(32, 56, 104)"
     },

     { 
        bg: "url(media/images/wallpaper4.jpg)",
        hg: "rgb(13, 15, 43)",
        botColor: "rgb(70, 125, 184)",
        userColor: "rgb(32, 56, 104)"
     },

     { 
        bg: "url(media/images/wallpaper5.jpg)",
        hg: "rgb(13, 15, 43)",
        botColor: "rgb(70, 125, 184)",
        userColor: "rgb(32, 56, 104)"
     },

     { 
        bg: "url(media/images/wallpaper6.jpg)",
        hg: "rgb(36, 151, 196)",
        botColor: "rgb(70, 125, 184)",
        userColor: "rgb(0, 70, 161)"
     },
]

window.onload = function() {

    document.getElementById("chat-bg-box").style.backgroundImage = themes[0].bg
    startGame()

    document.getElementById("UserTextInput").addEventListener("keypress", function (event) {
        if (event.keyCode == 13) 
        {
           GetUserMessage()    
           GetBotResponse()
        }
     });
    
}

function startGame()
{
    let response = {
        answer: "Welcome! Test your knowledge of the periodic table!",
        buttons: ["Number to Name", "Name to Number", "Next Element"]
    }
    renderBotResponse(response)
}

function displayUserMessage(text) {
    let UserMessageText = "<div><p class='UserMessage'><span>" + text + "</span></p></div>"
    document.getElementById("ChatContainer").innerHTML += UserMessageText
    scroll()
}


function GetUserMessage()
{
    InputText = (document.getElementById("UserTextInput").value);
    document.getElementById("UserTextInput").value=""

    UserMessageText = "<div><p class='UserMessage " + UserColor+ "'><span>" + InputText + "</span></p></div>";
    
    document.getElementById("ChatContainer").innerHTML+=UserMessageText;

    chatHistory = document.getElementById('ChatContainer');
    chatHistory.scrollTop = chatHistory.scrollHeight  ;
}


function clearchat()
{
    document.getElementById("ChatContainer").innerHTML = ""
}


let currentTheme = 0
BotColor = "BotPurpleMessage"
UserColor = "UserPurpleMessage"



function ChangeTheme()
{
    currentTheme = (currentTheme+1) % themes.length
    document.getElementById("chat-bg-box").style.backgroundImage = themes[currentTheme].bg
    document.documentElement.style.setProperty('--bot-color', themes[currentTheme].botColor)
    document.documentElement.style.setProperty('--user-color', themes[currentTheme].userColor)
    document.documentElement.style.setProperty('--header-color', themes[currentTheme].hg)
}

KEYS=[]
function renderBotResponse(BotReply)
{
    BotResponseText = ""
    KEYS = Object.keys(BotReply)

    if (KEYS.includes("answer")) {
        BotResponseText += '<div><p class="BotMessage ' + BotColor + '">' + BotReply.answer + '</p></div>'
    }

    if (KEYS.includes("buttons")) {
        BotResponseText += "<div class='buttons-container'>"
        BotReply.buttons.forEach(label => {
            BotResponseText += `<button class="chat-button" onclick="displayUserMessage('${label}'); renderBotResponse(processInput('${label}'))">${label}</button>`
        })
        BotResponseText += "</div>"
    }

    document.getElementById("ChatContainer").innerHTML += BotResponseText
    PrevHeight = ChatContainer.scrollHeight
    scroll()
}



function GetBotResponse() {
    PrevHeight = ChatContainer.scrollHeight
    let BotReply = processInput(InputText)
    renderBotResponse(BotReply)
}


function scroll(){
    let ChatContainer = document.getElementById("ChatContainer")
    PrevHeight = ChatContainer.scrollHeight
    ChatContainer.scrollTop = PrevHeight - 100
}
