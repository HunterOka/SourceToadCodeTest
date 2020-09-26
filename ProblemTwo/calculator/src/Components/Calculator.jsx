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
    const [activeValue, setActiveValue] = React.useState("0");
    //Store the sign of the active number separately, so it does not count against digit length
    const [isNegative, setIsNegative] = React.useState(false);    
    //Keep the stored number as a number
    const [storedNumber, setStoredNumber] =  React.useState(null);
    
    const [operator, setOperator] =  React.useState(null);
    const [newInput, setNewInput] =  React.useState(false);
    const [shouldClear, setShouldClear] =  React.useState(false);
    
    const addDigit = (digit) => {
        if (activeValue.includes('e') || activeValue.length >= MAXDIGITS){
            //TODO: show some kind of error?
            return
        }
        
        if (digit === '.' && activeValue.includes('.')){
            return
        }
        
        if(shouldClear) {
            clear();
            setShouldClear(false);
        }
        
        if (activeValue === '0' || newInput){
            setActiveValue(digit.toString());
        } else {
            setActiveValue(activeValue+digit);     
        }
        
    }
    
    const calculate = () => {
        let result;
        let numberValue = getActiveNumber()
        
        //Execute the function associated with the operation 
        result = getOperation(operator)(numberValue, storedNumber);
        
        result = roundToMax(result)
        setIsNegative(result < 0)
        setActiveValue(Math.abs(result).toString())
        return result
        
    }
    
    const resolveOperator = (operator) => {
        let calculation;
        setShouldClear(false);
        if(operator == operators.EQUAL) {
            if(storedNumber !== null){
                calculate();
                setStoredNumber(getActiveNumber());
                setShouldClear(true);
            }
        } else {
            if(!newInput && storedNumber !== null){
                calculation = calculate();
                setStoredNumber(calculation);
            } else {
                setStoredNumber(getActiveNumber())
            }
         setOperator(operator)
         
        }
        setNewInput(true)
    }
    
    const clear = () => {
        setActiveValue('0');
        setIsNegative(false);
        setOperator(null);
        setStoredNumber(null);
        setNewInput(false)
    }
    
    const invert = () => {
        setIsNegative(!isNegative)
    }
    
    const percent = () => {
        let activeNumberAbs = parseFloat(activeValue)
        let newValue = roundToMax(activeNumberAbs / 100)
        setActiveValue(newValue.toString());
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