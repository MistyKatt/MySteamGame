import React from 'react'
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import {SettingsKey} from '../../Global/Constant'
import ImageLink from '../../Component/Basic/ImageLink/ImageLink'
import {Game_info} from '../../Store/Actions/GameinfoAction'
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
    render(){
        const style = {
            width:'80%',
            margin:'auto',
        }

        const tableBody = this.props.games.map((game)=>
        <tr key={game.id}>
            <td>{game.name}</td>
            <td>{game.id}</td>
            <td>{game.online}</td>
            <td>{game.score}</td>
            <td>{game.price}</td>
            <td><ImageLink url={game.header_image} id={game.id}></ImageLink></td>
        </tr>)

        return(
        (this.props.count === this.props.gameNames.length)?
        <Table responsive style={style}>
            <thead >
                <tr>
                    <th>Games</th>
                    <th>AppId</th>
                    <th>Online</th>
                    <th>rates</th>
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
      count:state.gameinfo.gameinfoCount
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        gameinfo:(id)=>dispatch(Game_info(id)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GameinfoTable)
