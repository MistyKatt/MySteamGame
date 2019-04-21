import React from 'react'
import {Alert, Button} from 'react-bootstrap'
import MessageBlockStyle from './MessageBlock.module.css'


class MessageBlock extends React.Component{
    state={
        warning:false
    }

    componentDidMount(){

    }
    
    render(){
        return(
            <Alert  className={MessageBlockStyle.inlineBlock} variant='light'>
                {this.props.isVerified?null:<p>whoops, you are not verified, most likely, there is a network issue</p>}
            </Alert>
        )
    }
}
    

export default MessageBlock