import axios from 'axios'

export const Constant =()=>{
    return{
        UI:()=>{
            return{
                SINGLELINE : 'single-line',
                HEADER : 'header',
                SMALLER:'smaller',
                TEXTBOX: 'text-box',
                SINGLEINPUT : 'single-input',
                TEXTINPUT:'text-input',
            }
        },
        SettingsKey:()=>{
            return{
                username:"username",
                useremail:"useremail",
                usertoken:"usertoken",
                games:"games",
                gametypes:"gametypes",
                isVerified:"isVerified",
                host:"host",
                isMount:"isMount"
                }
        },
        Network:(isLocal)=>{
            return{
                host:isLocal?"http://localhost:8080":"https://us-central1-mysteam-info.cloudfunctions.net/webApi"
            }
        },
        Verify:(token)=>{
            if(token.length === 0)
                token = "3154"; //:)
            return axios.get("http://localhost:8080/verify/"+token)
        } ,
        Popup:()=>{
            let Popup = document.getElementById("popup");
                Popup.innerHTML = "<p class='FixedPopup'>Sorry, you are not verified. This is read only mode</p>"
                Popup.classList.remove("hiddenPopup")
                Popup.classList.add("showPopup")
                window.setTimeout(()=>{
                    Popup.innerHTML = "";
                    Popup.classList.remove("showPopup")
                    Popup.classList.add("hiddenPopup")
                },2500);  
        }
        
    }
}



