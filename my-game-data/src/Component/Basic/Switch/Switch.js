import React from 'react'
import StaticText from '../StaticText/StaticText'
import Input from '../Input/Input'
import {Button} from 'react-bootstrap'
import SwitchStyle from './Switch.module.css'
import { Constant } from '../../../Global/Constant';

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

    canEdit = ()=>{     
      if(this.props.text === "Token"){
        this.setState({isEdit:true})
      }
      else{
        const Promises = Constant().Verify(this.props.token)
        Promises.then(res=>{
          if(res.data === "success")
            this.setState({isEdit:true})
          else
          {
            Constant().Popup();
          }
        }).catch(err=>{
          Constant().Popup();
        })
      } 
    }

    render(){
        const saveButton = (this.props.text === "Token")?<Button variant="link" onClick={()=>{this.props.onSave(this.props.valueType,this.state.curVal,true);this.setState({isEdit:false})}}>Verify</Button>:
        <Button variant="link" onClick={()=>{this.props.onSave(this.props.valueType,this.state.curVal,false);this.setState({isEdit:false})}}>Save</Button>
        
        if(this.state.isEdit)
          return(
              <div className={SwitchStyle.oneline}>
                <Input change={this.onChange} value={this.state.curVal} text={this.props.text} type={this.props.type}></Input>
                <span>
                  {saveButton}
                  <Button variant="link" onClick={()=>this.setState({isEdit:false})}>Cancel</Button>
                </span>
              </div>
          )
        else{
            return(
              <div className={SwitchStyle.oneline}>
                <StaticText text={this.props.text} value={this.props.value} type={this.props.type}></StaticText>
                <Button variant="link" onClick={this.canEdit}>Edit</Button>
              </div>
            )
        }
    }
}
    

export default Switch