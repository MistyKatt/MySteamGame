import React from 'react'
import {Table} from 'react-bootstrap'
import {SettingsKey} from '../../Global/Constant'
import { connect } from 'react-redux';
import {Game_feature, game_loading} from '../../Store/Actions/GameinfoAction'
import {ProgressBar} from 'react-bootstrap'
import Style from '../Gameinfo/Gameinfo.module.css'
import ImageLink from '../../Component/Basic/ImageLink/ImageLink'



class FeaturedinfoTable extends React.Component{
 
    state={
        isLoading:false,
    }
    
    componentDidMount(){    
        if(this.props.isVerified === true&&this.props.count === 0&&this.state.isLoading === false)
        {
            this.props.gamefeature();
            this.setState({
                isLoading:true
            })
        }
    }

    componentDidUpdate(){    
        if(this.props.isVerified === true&&this.props.count=== 0&&this.state.isLoading === false)
        {
            this.props.gamefeature();
            this.setState({
                isLoading:true
            })
        }
    }
    render(){
        const style = {
            width:'80%',
            margin:'auto'
        }

        const tableBody =this.props.games.map((game)=>
        <tr key={game.id}>
            <td>{game.name}</td>
            <td>{game.id}</td>
            <td>{game.online}</td>
            <td>{game.discount}</td>
            <td>{game.price}</td>
            <td><ImageLink url={game.header_image} website={game.website} id={game.id}></ImageLink></td>
        </tr>)

        return(
        (this.props.count === 10)?
        <Table responsive style={style}>
            <thead>
                <tr>
                    <th>Games</th>
                    <th>AppId</th>
                    <th>Online</th>
                    <th>discount</th>
                    <th>Price (CAD)</th>
                    <th>Learn More</th>
                </tr>
            </thead>
            <tbody>
                {tableBody}
            </tbody>
        </Table>
        
        :<ProgressBar className={Style.center} now={10*this.props.count} label={"the feature is loading now... "+10*this.props.count+"%"} />)
    }
}

const mapStateToProps = state=>{
    return{
      isVerified:state.setting[SettingsKey.isVerified],
      count:state.gameinfo.gamefeatureCount,
      games:state.gameinfo.gamefeature
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        gamefeature:()=>dispatch(Game_feature()),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(FeaturedinfoTable)
