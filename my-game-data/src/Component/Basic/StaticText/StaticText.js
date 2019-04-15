import React from 'react'
import {UI} from '../../../Global/Constant'
import StaticTextStyle from './StaticText.module.css'

const StaticText = props =>{
    switch(props.type){
        case UI.SINGLELINE:{
            return <p className={StaticTextStyle.singleline}>{props.text+": "+props.value}</p>
        }
        case UI.HEADER:{
            return <p className={StaticTextStyle.header}>{props.value}</p>
        }
        case UI.SMALLER:{
            return <p>{props.value}</p>
        }
        case UI.TEXTBOX:{
            if(typeof(props.value) !== "object")
                return null
            return (
                <ul className={StaticTextStyle.textbox}>
                    {props.value.map((e,index)=><li>{e}</li>)}
                </ul>
            )
        }
        default:{
            return <h1>hello world</h1>
        }
    }
}

export default StaticText;