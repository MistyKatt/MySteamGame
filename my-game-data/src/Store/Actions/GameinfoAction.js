import * as actions from './ActionTypes'
import axios from '../../Axios'
import {Constant} from '../../Global/Constant'
import {Save_info} from '../Actions/SettingAction'




const game_info = (value,success)=>{
    return{
        type:actions.GAME_INFO,
        gamedata:value,
        success:success
    }
}


const game_feature = (value,success)=>{
    return{
        type:actions.GAME_FEATURES,
        gamefeature:value,
        success:success
    }
}

const game_add = (value,success)=>{
    return{
        type:actions.ADD_GAME,
        singleGame:value,
        success:success
    }
}

export const game_del = (id)=>{
    const SettingsKey = Constant().SettingsKey()
    return (dispatch,getState)=>{
        let games = getState().setting[SettingsKey.games].split(',')
        let index = -1;
        games.forEach((e,i)=>{
            if(id === parseInt(e))
                index = i
        })
        if(index !== -1)
            games.splice(index, 1)
        games = games.join(',')
        dispatch(Save_info(SettingsKey.games,games))
        dispatch({
            type:actions.DEL_GAME,
            id:id
        })
        
    }
}

//load game infos
export const Game_info = (ids)=>{
    const Network = Constant().Network(false)
    return dispatch=>{
        ids.forEach(id=>{
            axios.get(Network.host+"/"+id).then(res=>{              
                    const singleData = aggregateGame(res.data[id].data)
                    axios({method:'get',url:Network.host+"/players/"+id}).then((response)=>{
                        singleData.online = response.data.response.player_count
                        dispatch(game_info(singleData,true))
                    }).catch(response=>{
                        singleData.online="unknown"
                        dispatch(game_info(singleData,true))
                    }) 
                }).catch(res=>{
                    dispatch(game_info("failed",false))
                })
            })
    }
}

//load game features
export const Game_feature = ()=>{
    const Network = Constant().Network(false)
    return dispatch =>{
        axios.get(Network.host+"/featured").then(res=>{              
            const games = aggregateFeature(res.data.featured_win)
            games.forEach((game,index)=>{
                axios({method:'get',url:Network.host+"/"+game.id}).then((response)=>{
                    const tmp = [...games]
                    const resData = response.data[game.id].data
                    tmp[index].website =resData.website
                    tmp[index].score = resData.recommendations?resData.recommendations.total:'not avaliable'
                    dispatch(game_feature(tmp,true))
            }) 
        })           
        game_feature(games,true)
        }).catch(res=>{
            dispatch(game_feature("failed",false))
            //popup in the future. todo
        })
    }
}

//load single game
export const Game_add = (id)=>{
    const SettingsKey= Constant().SettingsKey()
    const Network = Constant().Network(false)
    return (dispatch,getState) =>{
            axios.get(Network.host+"/"+id).then(res=>{              
                    const singleData = aggregateGame(res.data[id].data)
                    axios({method:'get',url:Network.host+"/players/"+id}).then((response)=>{
                        singleData.online = response.data.response.player_count
                        dispatch(game_add(singleData,true))
                        let games = getState().setting[SettingsKey.games]
                        games = games+","+id
                        dispatch(Save_info(SettingsKey.games,games))
                    }).catch(response=>{
                        singleData.online="unknown"
                        dispatch(game_add(singleData,true))
                        let games = getState().setting[SettingsKey.games]
                        games = games+","+id
                        dispatch(Save_info(SettingsKey.games,games))
                    }) 
                }).catch(res=>{
                    dispatch(game_add("failed",false))
                    alert("game add failed...")
                })
}}
//del single game

const aggregateGame = data =>{
    return{
        name:data.name,
        id:data.steam_appid,
        header_image:data.header_image,
        price:data.is_free?"free":data.price_overview.final_formatted,
        score:data.recommendations?data.recommendations.total:"not avaliable",
        online:'unknown',
        website:data.website
    }
}

const aggregateFeature = data =>{
        
    let result = [];
    data.forEach(game=>{
        result.push({
            name:game.name,
            id:game.id,
            discount:game.discount_percent,
            price:game.final_price/100,
            header_image:game.small_capsule_image,
            score:'unknown',
            website:"unknown"
        })
    })
    return result;
}