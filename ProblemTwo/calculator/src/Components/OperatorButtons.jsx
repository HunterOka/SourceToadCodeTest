import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button.jsx'
import {operators} from './../operations.js'

function OperatorButtons(props){

    return <div className='operatorButtons'>
        <div className='buttonCol'>
             <Button display='÷'
                className='operatorButton'
                onClick={()=>props.buttonClick(operators.DIVIDE)}
                />
            <Button display='×'
                className='operatorButton'
                onClick={()=>props.buttonClick(operators.MULTIPLY)}
                />
            <Button display='−'
                className='operatorButton'
                onClick={()=>props.buttonClick(operators.SUBTRACT)}
                />
            <Button display='+'
                className='operatorButton'
                onClick={()=>props.buttonClick(operators.ADD)}
                />
            <Button display='='
                className='operatorButton'
                onClick={()=>props.buttonClick(operators.EQUAL)}
                />
        </div>
    </div>
}

OperatorButtons.propTypes = {
    buttonClick: PropTypes.func,
}

export default OperatorButtons;