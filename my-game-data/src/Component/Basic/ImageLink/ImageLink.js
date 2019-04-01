import React from 'react'
import ReactDOM from 'react-dom'
import Popup from '../Popup/Popup'

class ImageLink extends React.Component {
    
    state={
        Popup:false,
    }
    
    imgStyle = {
        width:'80%',
        height:'80%',
        maxWidth:'130px',
        maxHeight:'65px',
        minWidth:'100px',
        minHeight:'50px',
    }

    blockStyle = {
        width:'100%',
        height:'100%'
    }



    render(){
        return(
            <div style = {this.blockStyle} onClick={()=>{this.setState({Popup:true})}}>
                <img src = {this.props.url} style={this.imgStyle}></img>
                {this.state.Popup?ReactDOM.createPortal(<Popup id={this.props.id}></Popup>,document.getElementById('popup')):null}
            </div>
        )
    }
    
}


    
    
export default ImageLink;