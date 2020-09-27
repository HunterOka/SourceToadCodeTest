import React from 'react';

import {operators, getOperation} from './../Constants/operations.js'
import {messages} from './../Constants/messages.js'
import NumberPad from './NumberPad.jsx'
import Button from './Button.jsx'
import OperatorButtons from './OperatorButtons.jsx'
import ActionButtons from './ActionButtons.jsx'
import Display from './Display.jsx'
import MessagePopup from './MessagePopup.jsx'


function Calculator(props) {
    const MAXDIGITS=8;
    
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
    
    const [message, setMessage] = React.useState(null);
    
    const addDigit = (digit) => {
        setCalcComplete(false);
        setNewInput(false);
        
        //Don't allow to long inputs
        if (!newInput && (activeValue.includes('e') || activeValue.length >= MAXDIGITS)){
            setMessage(messages.TOOMANYDIGITS);
            return
        }
        
        //Don't allow multiple '.'
        if (digit === '.' && activeValue.includes('.')){
            return
        }
        
        //If the last thing hit was '=', clear all the stored values.
        if(calcComplete) {
            clear();
        }
        
        if (activeValue === '0' || newInput){
            setIsNegative(false);
            setActiveValue(digit.toString());
        } else {
            setActiveValue(activeValue+digit);     
        }
        
        
    }
    
    const calculate = (a, b, operator) => {
        //Execute the function associated with the operation 
        let result = getOperation(operator)(a, b);
        if(typeof result !== 'number'){
            setMessage(result);
            return 0;
        }
        result = roundToMax(result);
        return result;
    }
    
    const resolveOperator = (newOperator) => {
        let result;
        setCalcComplete(false);//If we pressed an operation after '=', we want to keep calculating
        if(newOperator === operators.EQUAL) { //Handle '='
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
        } else {//Handle other operators
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
        if(result === 0) {
            setIsNegative(false);
        }
        var abs = Math.abs(result)
        var displayNum = abs > Math.pow(10,MAXDIGITS) ? abs.toExponential(MAXDIGITS-4) : abs.toString();
        setActiveValue(displayNum);
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
        if(getActiveNumber() !== 0) {
            setIsNegative(!isNegative)
        }
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
    
    const pressButton = (action) => {
        setMessage(null);
        action()
    }
    
    return <div>
        {message &&
        <MessagePopup message={message} />
        }
    <Display value={getDisplayValue()} />
        <div className='buttonContainer'>
            <div className='leftButtons'>
                <ActionButtons>
                    <Button display='AC'
                    onClick={()=>{pressButton(clear)}}
                    />
                    <Button display='&#x207a;&#x2044;&#x208b;'
                    onClick={()=>pressButton(invert)}
                    />
                    <Button display='%'
                    onClick={()=>pressButton(percent)}
                    />
                </ActionButtons>
                <NumberPad buttonClick={(x)=>{pressButton(()=>{addDigit(x)})}}/>
            </div>
            <OperatorButtons buttonClick={(op)=>pressButton(()=>{resolveOperator(op)})}/>
        </div>
    </div>
}

export default Calculator