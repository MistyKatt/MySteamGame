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
                host:"host"
                }
        },
        Network:(isLocal)=>{
            return{
                host:isLocal?"http://localhost:8080":"https://us-central1-mysteam-info.cloudfunctions.net/webApi"
            }
        },
        
        
    }
}



