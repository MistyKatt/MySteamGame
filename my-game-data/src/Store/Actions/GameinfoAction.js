import * as actions from './ActionTypes'
import axios from '../../Axios'


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

export const game_loading = (loadingType)=>{
    return{
        type:actions.START_LOADING,
        loadingType:loadingType
    }
}

export const Game_info = (ids)=>{
    return dispatch =>{
        ids.forEach(id=>{
            axios.get('http://localhost:8080/'+id).then(res=>{              
                    const singleData = aggregateGame(res.data[id].data)
                    axios({method:'get',url:'http://localhost:8080/players/'+id}).then((response)=>{
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

export const Game_feature = ()=>{
    return dispatch =>{
        dispatch(game_loading("game_feature"))
        axios.get('http://localhost:8080/featured').then(res=>{              
            const games = aggregateFeature(res.data.featured_win)
            games.forEach((game,index)=>{
                axios({method:'get',url:'http://localhost:8080/players/'+game.id}).then((response)=>{
                    const tmp = [...games]
                    tmp[index].online = response.data.response.player_count
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

const aggregateGame = data =>{
    return{
        name:data.name,
        id:data.steam_appid,
        header_image:data.header_image,
        price:data.is_free?"free":data.price_overview.final_formatted,
        score:data.metacritic.score,
        online:'unknown'
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
            online:'unknown'
        })
    })
    return result;
}