import React from 'react'
import PopupStyle from './Popup.module.css'

class Popup extends React.Component{

    state={
        hide:false,
    }
    
    close = ()=>{
        this.setState({
            hide:true
        })
    }
    
    render(){
        return(
            <div className={this.state.hide?PopupStyle.hide:PopupStyle.block}>
                <button onClick={this.close}>close it!</button>
                <h1>the game id is {this.props.game}</h1>
            </div>
        )
    }
}
    
    

export default Popup;