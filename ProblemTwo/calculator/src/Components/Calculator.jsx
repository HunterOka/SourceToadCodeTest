import React from 'react';
import PropTypes from 'prop-types';

import {operators, getOperation} from './../operations.js'
import NumberPad from './NumberPad.jsx'
import Button from './Button.jsx'
import OperatorButtons from './OperatorButtons.jsx'
import ActionButtons from './ActionButtons.jsx'
import Display from './Display.jsx'


function Calculator(props) {
    const MAXDIGITS=12;
    
    //Store the active number as a string for easy concatenation
    const [activeValue, setActiveValue] = React.useState('0');
    //Store the sign of the active number separately, so it does not count against digit length
    const [isNegative, setIsNegative] = React.useState(false);    
    //Keep the stored number as a number
    const [storedNumber, setStoredNumber] =  React.useState(null);
    //Store the intended operation
    const [operator, setOperator] =  React.useState(null);
    //Tracks if we are at the start of a new input after completeing an operation
    const [newInput, setNewInput] =  React.useState(false);
    //Tracks if the last operation complete was '='
    const [calcComplete, setCalcComplete] =  React.useState(false);
    
    const addDigit = (digit) => {
        if (activeValue.includes('e') || activeValue.length >= MAXDIGITS){
            //TODO: show some kind of error?
            return
        }
        
        if (digit === '.' && activeValue.includes('.')){
            return
        }
        
        if(calcComplete) {//The last thing hit was '=', clear all the stored values.
            clear();
        }
        
        if (activeValue === '0' || newInput){
            setActiveValue(digit.toString());
        } else {
            setActiveValue(activeValue+digit);     
        }
        
        setCalcComplete(false);
        setNewInput(false);
    }
    
    const calculate = (a, b, operator) => {
        //Execute the function associated with the operation 
        let result = getOperation(operator)(a, b);
        result = roundToMax(result)
        return result 
    }
    
    const resolveOperator = (newOperator) => {
        let result;
        setCalcComplete(false);//If we pressed an operation, we want to keep calculating
        if(newOperator == operators.EQUAL) {
            if(storedNumber !== null){
                if (!calcComplete){
                    result = calculate(storedNumber, getActiveNumber(), operator);
                    setStoredNumber(getActiveNumber());//The first time '=' is pressed, store the active number for iterating '='
                } else {
                //If we are iterating over '=', we need to calculate the stored number on the active number
                 result = calculate(getActiveNumber(), storedNumber, operator);
                }
                handleResult(result);
                setCalcComplete(true);
            }
        } else {
            if(!newInput && storedNumber !== null){
                result = calculate(storedNumber, getActiveNumber(), operator);
                handleResult(result);
                setStoredNumber(result);
            } else {
                setStoredNumber(getActiveNumber())
            }
         setOperator(newOperator)
         
        }
        setNewInput(true)
    }
    
    const handleResult = (result) => {
        setIsNegative(result < 0)
        setActiveValue(Math.abs(result).toString())
    }
    
    const clear = () => {
        setActiveValue('0');
        setIsNegative(false);
        setOperator(null);
        setStoredNumber(null);
        setNewInput(false);
        setCalcComplete(false);
    }
    
    const invert = () => {
        setIsNegative(!isNegative)
    }
    
    const percent = () => {
        let newValue = roundToMax(getActiveNumber() / 100)
        handleResult(newValue);
    }
    
    const getActiveNumber = () => {
        return parseFloat(activeValue) * (isNegative ? -1 : 1)
    }
    
    const roundToMax = (value) => {
        return Number(value.toFixed(MAXDIGITS))
    }
    
    const getDisplayValue = ()=>{
        return  (isNegative ? '-':'') + activeValue;  
    }
    
    return <div>
    <Display value={getDisplayValue()} />
        <div>
            <ActionButtons>
                <Button display='AC'
                onClick={()=>clear()}
                />
                <Button display='&#x207a;&#x2044;&#x208b;'
                onClick={()=>invert()}
                />
                <Button display='%'
                onClick={()=>percent()}
                />
            </ActionButtons>
            <OperatorButtons buttonClick={resolveOperator}/>
            <NumberPad buttonClick={(x)=>addDigit(x)}/>
        </div>
    </div>
}

export default Calculator