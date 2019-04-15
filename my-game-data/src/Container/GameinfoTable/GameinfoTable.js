import React from 'react'
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import {SettingsKey} from '../../Global/Constant'
import ImageLink from '../../Component/Basic/ImageLink/ImageLink'
import {Game_info, game_del} from '../../Store/Actions/GameinfoAction'
import {ProgressBar} from 'react-bootstrap'
import Style from '../Gameinfo/Gameinfo.module.css'



class GameinfoTable extends React.Component{
 
    state={
        isLoading:false,
    }
    
    componentDidMount(){
        if(this.props.isVerified === true&& this.state.isLoading === false&& this.props.count === 0){
             const appIds = this.props.gameNames
             if(appIds.length>0){
                 this.setState({
                     isLoading:true,
                 })
                 this.props.gameinfo(appIds);                
             }
        }
     }

    componentDidUpdate(){
        if(this.props.isVerified === true && this.state.isLoading === false && this.props.count === 0){
            const appIds = this.props.gameNames
            if(appIds.length>0){
                this.setState({
                    isLoading:true,
                })
                this.props.gameinfo(appIds);
            }
       }
    }  

    showExtraGameInfo = (id)=>{
        const popup = document.getElementById("popup")
        popup.classList.remove("hiddenPopup")
        popup.classList.add("showPopup")

        popup.innerHTML = "<div class='Wrapper'><iframe class='Frame' src='https://steamdb.info/embed/?appid="+id+ "'scrolling='no' frameborder='0'></iframe></div>"
        const frame = popup.getElementsByTagName("iframe")[0]
        frame.onmouseout = ()=>this.hideExtraGameInfo(popup)
    }

    hideExtraGameInfo = (popup)=>{
        popup.classList.add("hiddenPopup")
        popup.classList.remove("showPopup")
        popup.innerHTML = ""
    }

    Unsubscribe = (id)=>{
        this.props.gamedel(id);
        this.setState({
            isLoading:false
        })
    }

    render(){
        const style = {
            width:'80%',
            margin:'auto',
        }

        const tableBody = this.props.games.map((game)=>
        {
        return <tr className={Style.onhover}  key={game.id} onDoubleClick={()=>{this.showExtraGameInfo(game.id)}}>
            <td><i onClick={()=>this.Unsubscribe(game.id)} className="fas fa-ban"></i>{game.name}</td>
            <td>{game.id}</td>
            <td>{game.online}</td>
            <td>{game.score}</td>
            <td>{game.price}</td>
            <td><ImageLink url={game.header_image} id={game.id} website={game.website}></ImageLink></td>
        </tr>})

        return(
        (this.props.count === this.props.gameNames.length)?
        <Table responsive style={style}>
            <thead >
                <tr>
                    <th>Games</th>
                    <th>AppId</th>
                    <th>Online</th>
                    <th>hot index</th>
                    <th>Price (CAD)</th>
                    <th>Learn more</th>
                </tr>
            </thead>
            <tbody>
                {tableBody}
            </tbody>
        </Table>
        :<ProgressBar className={Style.center} now={100*this.props.count/this.props.gameNames.length} label={"the game is loading now... "+100*this.props.count/this.props.gameNames.length+"%"} />)
    }
}

const mapStateToProps = state=>{
    return{
      gameNames:state.setting[SettingsKey.games],
      isVerified:state.setting[SettingsKey.isVerified],
      games:state.gameinfo.gameinfo,
      count:state.gameinfo.gameinfoCount,
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        gameinfo:(id)=>dispatch(Game_info(id)),
        gamedel:(id)=>dispatch(game_del(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GameinfoTable)
