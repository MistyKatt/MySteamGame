import React from 'react'
import {InputGroup, FormControl} from 'react-bootstrap'
import {Constant} from '../../../Global/Constant'
import './Input.css'

const Input = props =>{        
    
    const UI = Constant().UI();
    
    const style = {
        'margin-left':0,
        'padding-left':0

    }
    return (
                <InputGroup className="mb-3 inline" style={style}>
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">{props.text}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    as={props.type === UI.TEXTBOX?'textarea':'input'}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    defaultValue={props.value}
                    onChange={(e)=>props.change(e)}
                    />
                </InputGroup>
            )
    
}

export default Input