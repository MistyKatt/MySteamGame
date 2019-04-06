import React from 'react'
import PopupStyle from './Popup.module.css'

class Popup extends React.Component{

    
    render(){
        return(
            <div className={PopupStyle.block}>
                <span class={PopupStyle.corner} onClick={this.props.close}><i class="far fa-window-close"></i></span>
                <iframe src={"http://localhost:8080/iframe?src="+this.props.source}></iframe>
            </div>
        )
    }
}
    
    

export default Popup;