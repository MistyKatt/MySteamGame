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

    popup = ()=>{
        window.open(this.props.website,"gameWebsite","height=400,width=400,top=150,left=150,resizable=yes")
    }

    close = (e)=>{
        this.setState({Popup:false}) 
        document.getElementById("popup").classList.remove("showPopup")
        document.getElementById("popup").classList.add("hiddenPopup")
        e.stopPropagation();
    }

    render(){
        return(
            <div style = {this.blockStyle} onClick={this.popup}>
                <img src = {this.props.url} style={this.imgStyle}></img>
                {false?ReactDOM.createPortal(<Popup id={this.props.id} close={this.close} source={this.props.website}></Popup>,document.getElementById('popup')):null}
            </div>
        )
    }
    
}


    
    
export default ImageLink;