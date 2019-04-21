import React from 'react'
import {Form, FormControl, Button} from 'react-bootstrap'
import SearchStyle from './Search.module.css'
import axios from 'axios'
import {Constant} from '../../../Global/Constant'

class Search extends React.Component{

    state={
        name:"search",
        id:"unknown",
        displayName:"null"
      }
    
    changeName = (e)=>{
        this.setState({
            name:e.target.value
        })
    }

    searchId = (e)=>{
        const Network = Constant().Network(false)
        if(this.state.displayName !== this.state.name){
            axios.get(Network.host+"/searchid/"+this.state.name).then(res=>{
                if(res.data === "error")
                {
                    this.setState({
                        displayName:"search error"
                    })
                }
                else if(res.data === "!match")
                {
                    this.setState({
                        displayName:"no match"
                    })
                }
                else
                {
                    this.setState({
                        displayName:this.state.name,
                        id:res.data
                    })
                }
            })
        }
        e.preventDefault();
    }

    render(){
        return(
            <div className={SearchStyle.Block}>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.state.name} onChange={(e)=>this.changeName(e)}/>
                    <Button onClick={(e)=>this.searchId(e)} variant="outline-success">Search</Button>
                </Form>
                <p>Game name: <span>{this.state.displayName}</span>id: <span>{this.state.id}</span></p>   
            </div>
        )
    }
}
    
    

export default Search;