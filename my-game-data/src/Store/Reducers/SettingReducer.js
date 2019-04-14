import * as Actions from '../Actions/ActionTypes'
import {SettingsKey, Network} from '../../Global/Constant'

const initial = {}
initial[SettingsKey.username] = ""
initial[SettingsKey.useremail] = ""
initial[SettingsKey.usertoken] = "123"
initial[SettingsKey.games] = []
initial[SettingsKey.gametypes] = []
initial[SettingsKey.isVerified]=false
initial[SettingsKey.host] = Network.local



const settingReducer = (state = initial, action)=>{
    switch(action.type){
        case (Actions.SAVE_INFO):{
            let info = {
                ...state
            }
            info[action.input_type] = action.input_value
            return info
        }
        case (Actions.LOAD_INFO):{
            if(action.load_success){
                let info = {
                    ...state
                }
                info[SettingsKey.username] = action.value[SettingsKey.username]
                info[SettingsKey.useremail] = action.value[SettingsKey.useremail]
                info[SettingsKey.games] = action.value[SettingsKey.games].split(',')
                info[SettingsKey.gametypes] = action.value[SettingsKey.gametypes].split(',')
                info[SettingsKey.isVerified] = true
                return info
            }
            else{
                let info = {
                    ...state
                } 
                info[SettingsKey.isVerified] = false
                info[SettingsKey.username] = "unknown"
                info[SettingsKey.useremail] = "unknown"
                info[SettingsKey.games] = ["dota 2, Artifact "]
                info[SettingsKey.gametypes] = ["speed"]
                return info
            }
           
        }
        default:{
            return state
        }
    }
}

export default settingReducer