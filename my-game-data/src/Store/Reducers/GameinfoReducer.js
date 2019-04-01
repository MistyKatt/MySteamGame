import * as Actions from '../Actions/ActionTypes'

const initial = {
    gameinfo:[],
    gamefeature:[],
    gameinfoCount:0,
    gamefeatureCount:0,
}



const gameinfoReducer = (state = initial, action)=>{
    switch(action.type){
        case (Actions.GAME_INFO):{
            if(action.success){
                let info = {
                    ...state,
                }
                info.gameinfo.push(action.gamedata)
                info.gameinfoCount = info.gameinfoCount+1;
                return info
            }
            return state            
        }
        case (Actions.GAME_FEATURES):{
            if(action.success){
                let info={
                    ...state,
                }
                info.gamefeature = action.gamefeature
                info.gamefeatureCount = info.gamefeatureCount+1
                return info
            } 
            return state    
        }
       /*
        case (Actions.START_LOADING):{
            if(action.loadingType === "game_info"){
                return {
                    ...state,
                    gameinfoLoading:true
                }
            } 
            else if(action.loadingType === "game_feature"){
                return {
                    ...state,
                    gamefeatureLoading:true
                }
            }
            return state    
        }
        */
        default:{
            return state
        }
    }
}

export default gameinfoReducer