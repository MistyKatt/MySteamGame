import * as actions from './ActionTypes'
import firebase from 'firebase'
import axios from '../../Axios'


const save_info = (type,value)=>{
    return{
        type:actions.SAVE_INFO,
        input_type:type,
        input_value:value,
    }
}

const load_info = (value,success)=>{
    return{
        type:actions.LOAD_INFO,
        value:value,
        load_success:success
    }
}

export const Save_info = (type,value)=>{
    return dispatch =>{
        const updateVal={}
        updateVal[type] = value
        return firebase.database().ref('/tokens/t_123/settings').update(updateVal).then(res=>{
            console.log("save success")
            dispatch(save_info(type,value))
        }).catch(res=>{
            console.log("save failed, saved locally")
            dispatch(save_info(type,value))
        })
    }
}

export const Load_info = ()=>{
    return dispatch =>{
        axios.get("/tokens/t_123/settings.json").then(res=>{
            console.log("load success")
            dispatch(load_info(res.data,true))
        }).catch(res=>{
            console.log("load failed, loaded locally")
            dispatch(load_info(res.data,false))
        })
    }
}