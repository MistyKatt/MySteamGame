import React from 'react'
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import {SettingsKey} from '../../Global/Constant'
import axios from '../../Axios'



class GameinfoTable extends React.Component{
 
    state={
        games:[],
        isLoading:false,
        firstEnter:true,
    }
    
    componentDidUpdate(){
       if(this.props.gameNames.length>0&&this.state.firstEnter === true){
            const appIds = this.props.gameNames
            if(appIds.length>0){
                this.setState({
                    isLoading:true,
                    firstEnter:false
                })
                this.fetchingDataFromSteam(appIds);
            }
       }
    }

    fetchingDataFromSteam = (appIds)=>{       
        appIds.forEach(id=>{
            axios.get('http://localhost:8080/'+id).then(res=>{              
                const singleData = this.aggregate(res.data[id].data)
                const state = {...this.state}
                axios({method:'get',url:'http://localhost:8080/players/'+id}).then((response)=>{
                    singleData.online = response.data.response.player_count
                    state.games.push(singleData)
                    this.setState(state)
                }).catch(response=>{
                    singleData.online="unknown"
                    state.games.push(singleData)
                    this.setState(state)
                }) 
            }).catch(res=>{
                const state = {...this.state}
                state.games.push('failed')
                this.setState(state)
            })
        })
    }

    aggregate = data =>{
        return{
            name:data.name,
            id:data.steam_appid,
            publisher:data.publishers[0],
            price:data.is_free?"free":data.price_overview.final_formatted,
            score:data.metacritic.score,
            online:'unknown'
        }
    }
    
    render(){
        const style = {
            width:'80%',
            margin:'auto'
        }

        const tableBody =this.state.games.length>0?this.state.games.map((game)=>game === 'failed'?null:
        <tr key={game.id}>
            <td>{game.name}</td>
            <td>{game.id}</td>
            <td>{game.online}</td>
            <td>{game.score}</td>
            <td>{game.price}</td>
            <td>{game.publisher}</td>
        </tr>):null

        return(
        <>
        <Table responsive style={style}>
            <thead>
                <tr>
                    <th>Games</th>
                    <th>AppId</th>
                    <th>Online</th>
                    <th>rates</th>
                    <th>Price (CAD)</th>
                    <th>Publisher</th>
                </tr>
            </thead>
            <tbody>
                {tableBody}
            </tbody>
        </Table>
        </>
        )
    }
}

const mapStateToProps = state=>{
    return{
      gameNames:state.setting[SettingsKey.games],
    }
}

export default connect(mapStateToProps,null)(GameinfoTable)
