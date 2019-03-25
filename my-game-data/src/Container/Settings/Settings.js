import React from 'react'
import StaticText from '../../Component/Basic/StaticText/StaticText'
import Switch from '../../Component/Basic/Switch/Switch'
import SettingStyle from './Settings.module.css'
import {UI,SettingsKey} from '../../Global/Constant'
import {connect} from 'react-redux'
import {Save_info} from '../../Store/Actions/SettingAction'

class Settings extends React.Component{

    render(){
        return(
            <div className={SettingStyle.body}>
                <div className={SettingStyle.section}>
                    <StaticText value="Personal Information" type={UI.HEADER}></StaticText>
                    <Switch onSave={this.props.saveInfo} valueType={SettingsKey.username} value={this.props.username} type={UI.SINGLELINE} text="Name"></Switch>
                    <Switch onSave={this.props.saveInfo} valueType={SettingsKey.useremail}value={this.props.useremail} type={UI.SINGLELINE} text="Email"></Switch>
                    <Switch onSave={this.props.saveInfo} valueType={SettingsKey.usertoken} value={this.props.usertoken} type={UI.SINGLELINE} text="Token"></Switch>
                </div>
                <div className={SettingStyle.section}>
                    <StaticText value="Selected Game" type={UI.HEADER}></StaticText>
                    <Switch onSave={this.props.saveInfo} valueType={SettingsKey.games} value={this.props.games} type={UI.TEXTBOX} text="Games"></Switch>
                </div>
                <div className={SettingStyle.section}>
                    <StaticText value="Selected Area" type={UI.HEADER}></StaticText>
                    <Switch onSave={this.props.saveInfo} valueType={SettingsKey.gametypes} value={this.props.gametypes} type={UI.TEXTBOX} text="Game Areas"></Switch>
                </div>
            </div>
        )
    }
}

const mapStoreToProps = state=>{
    return{
    username: state.setting[SettingsKey.username],
    useremail: state.setting[SettingsKey.useremail],
    usertoken: state.setting[SettingsKey.usertoken],
    games: state.setting[SettingsKey.games],
    gametypes: state.setting[SettingsKey.gametypes]
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        saveInfo:(type,value)=>dispatch(Save_info(type,value)),
    }
}

export default connect(mapStoreToProps,mapDispatchToProps)(Settings);
