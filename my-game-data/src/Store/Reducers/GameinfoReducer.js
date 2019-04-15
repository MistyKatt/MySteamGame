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
        case (Actions.ADD_GAME):{
            if(action.success){
                let info={
                    ...state,
                }
                let index = -1;
                info.gameinfo.forEach((e,i)=>{
                    if(e.id === action.singleGame.id){
                        index = i;
                    }
                })
                if(index === -1)
                    info.gameinfo.push(action.singleGame)
                return info
            } 
            return state    
        }
        case (Actions.DEL_GAME):{
                let index = -1;
                state.gameinfo.forEach((e,i)=>{
                    if(e.id === action.id){
                        index = i;
                    }
                })
                const info = {
                    ...state
                }
                if(index !== -1)
                    info.gameinfo.splice(index,1)               
                return info   
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