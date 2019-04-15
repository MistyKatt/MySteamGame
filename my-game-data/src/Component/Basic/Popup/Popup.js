import React from 'react'
import PopupStyle from './Popup.module.css'

class Popup extends React.Component{

    
    render(){
        return(
            <div className={PopupStyle.block}>
                <span class={PopupStyle.corner} onClick={this.props.close}><i class="far fa-window-close"></i></span>
            </div>
        )
    }
}
    
    

export default Popup;