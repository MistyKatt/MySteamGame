import React from 'react'
import {Table} from 'react-bootstrap'
import axios from '../../Axios'



class FeaturedinfoTable extends React.Component{
 
    state={
        games:[],
        isLoading:false,
        firstEnter:true,
    }
    
    componentDidMount(){    
        if(this.state.firstEnter == true)
        {
            this.fetchingDataFromSteam();
            this.setState({
                firstEnter:false
            })
        }
    }

    fetchingDataFromSteam = ()=>{       
            axios.get('http://localhost:8080/featured').then(res=>{              
                const games = this.aggregate(res.data.featured_win)
                games.forEach((game,index)=>{
                    axios({method:'get',url:'http://localhost:8080/players/'+game.id}).then((response)=>{
                        const tmp = [...games]
                        tmp[index].online = response.data.response.player_count
                        this.setState({games: tmp})
                }) 
            })           
            this.setState({games: games})
            }).catch(res=>{
                //popup in the future. todo
            })
    }

    aggregate = data =>{
        
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
            <td>{game.discount}</td>
            <td>{game.price}</td>
        </tr>):null

        return(
        <>
        <Table responsive style={style}>
            <thead>
                <tr>
                    <th>Games</th>
                    <th>AppId</th>
                    <th>Online</th>
                    <th>discount</th>
                    <th>Price (CAD)</th>
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



export default FeaturedinfoTable
