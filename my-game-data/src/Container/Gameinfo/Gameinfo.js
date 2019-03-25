import React from 'react'
import {Load_info} from '../../Store/Actions/SettingAction'
import {SettingsKey} from '../../Global/Constant'
import {connect} from 'react-redux'

class Gameinfo extends React.Component{
 
    componentDidMount(){
        this.props.loadSettings();
    }
    
    render(){
        return(
            <div>
                <p>this is Gameinfo:</p> 
                <p>isVerified: {this.props.isVerified}</p>
                <p>username: {this.props.username}</p>
                <p>useremail: {this.props.useremail}</p>
                <p>games: {this.props.games}</p>
                <p>gametypes: {this.props.gametypes}</p>
                <button onClick={this.props.loadSettings}>load Settings</button>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
      isVerified:state.setting[SettingsKey.isVerified],
      username:   state.setting[SettingsKey.username] ,
      useremail:  state.setting[SettingsKey.useremail],
      usertoken:state.setting[SettingsKey.usertoken],
      games:state.setting[SettingsKey.games],
      gametypes:state.setting[SettingsKey.gametypes]
    }
}

const mapDispatchToProps = dispatch=>{
    return{
      loadSettings:()=>dispatch(Load_info())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Gameinfo)
