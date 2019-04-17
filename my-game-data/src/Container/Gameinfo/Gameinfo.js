import React from 'react'
import {Load_info} from '../../Store/Actions/SettingAction'
import {Constant} from '../../Global/Constant'
import {connect} from 'react-redux'
import MessageBlock from '../../Component/Basic/MessageBlock/MessageBlock'
import GameinfoTable from '../GameinfoTable/GameinfoTable'
import FeaturedinfoTable from '../FeaturedinfoTable/FeaturedinfoTable'
import {Route} from 'react-router-dom'


class Gameinfo extends React.Component{
 
    componentDidMount(){
        this.props.loadSettings();
    }
    
    render(){
        return(
            <>
                <MessageBlock {...this.props}></MessageBlock>
                <Route path="/" exact render={()=><GameinfoTable></GameinfoTable>} ></Route>
                <Route path="/featured" exact render={()=><FeaturedinfoTable></FeaturedinfoTable>} ></Route>
            </>
        )
    }
}

const mapStateToProps = state=>{
    const SettingsKey = Constant().SettingsKey()
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
