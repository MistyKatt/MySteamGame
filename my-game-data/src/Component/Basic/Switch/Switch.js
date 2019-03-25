import React from 'react'
import StaticText from '../StaticText/StaticText'
import Input from '../Input/Input'
import {Button} from 'react-bootstrap'
import SwitchStyle from './Switch.module.css'

class Switch extends React.Component{
    state={
        isEdit:false,
        curVal:""
    }

    componentDidMount(){
      this.setState({
        ...this.state,
        curVal:this.props.value
      })
    }
    
    onChange = (e)=>{
      this.setState({
        ...this.state,
        curVal:e.target.value
      })
    }

    render(){
        if(this.state.isEdit)
          return(
              <div className={SwitchStyle.oneline}>
                <Input change={this.onChange} value={this.state.curVal} text={this.props.text} type={this.props.type}></Input>
                <Button variant="link" onClick={()=>{this.props.onSave(this.props.valueType,this.state.curVal);this.setState({isEdit:false})}}>Save</Button>
                <Button variant="link" onClick={()=>this.setState({isEdit:false})}>Cancel</Button>
              </div>
          )
        else{
            return(
              <div className={SwitchStyle.oneline}>
                <StaticText text={this.props.text} value={this.props.value} type={this.props.type}></StaticText>
                <Button variant="link" onClick={()=>this.setState({isEdit:true})}>Edit</Button>
              </div>
            )
        }
    }
}
    

export default Switch