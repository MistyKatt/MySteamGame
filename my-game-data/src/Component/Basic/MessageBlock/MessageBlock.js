import React from 'react'
import StaticText from '../StaticText/StaticText'
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
                {this.props.isVerified?<p>Hi, you've been verified</p>:<p>whoops, you are not verified, most likely, there is a network issue</p>}
                <p>Hello, {this.props.username}</p>
                <Button variant='link' onClick={this.props.loadSettings}>load Settings</Button>
            </Alert>
        )
    }
}
    

export default MessageBlock