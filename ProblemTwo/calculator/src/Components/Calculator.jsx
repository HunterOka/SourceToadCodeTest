import React from 'react';
import PropTypes from 'prop-types';

import NumberPad from './NumberPad.jsx'
import Button from './Button.jsx'
import OperatorButtons from './OperatorButtons.jsx'
import ActionButtons from './ActionButtons.jsx'
import Display from './Display.jsx'


function Calculator(props) {
    const MAXDIGITS=10;
    
    
    const [activeValue, setActiveValue] = React.useState(0);
    const [displayValue, setDisplayValue] = React.useState("0");
    const [decimalPosition, setDecimalPosition] =  React.useState(0);
    const [storedValue, setStoredValue] =  React.useState(null);
    const [operator, setOperator] =  React.useState(null);
    
    const addDigit = (digit) => {
        if (activeValue.toString().length >= MAXDIGITS){
            //TODO: show some kind of error?
            console.log(activeValue)
            return
        }
        
        let tempDisplayValue = displayValue;
        
        if (digit === '.'){
            if (decimalPosition == 0) {
                setDisplayValue(tempDisplayValue+'.');
                setDecimalPosition(1);
            }
            return
        }
        
        if(tempDisplayValue === '0'){
            tempDisplayValue = '';
        }
        
        if(digit === 0)
        {
            if (decimalPosition > 0) {
                setDisplayValue(tempDisplayValue+'0');
                setDecimalPosition(decimalPosition + 1);
                return
            } else {
                digit = 10;
            }
        }
        
        if (decimalPosition > 0){
            setActiveValue(activeValue + digit/(decimalPosition*10))
            setDecimalPosition(decimalPosition + 1);
        } else {
            setActiveValue((activeValue*10)+digit)
        }
        
        setDisplayValue(tempDisplayValue+digit);     
    }
    
    const calculate = () => {
    
    }
    
    const resolveOperator = (operator) => {
    
    }
    
    const clear = () => {
        setDisplayValue('0')
        setActiveValue(0);
        setOperator(null);
        setStoredValue(null);
        setDecimalPosition(0);
    }
    
    const invert = () => {
        let newValue = activeValue * -1
        setActiveValue(newValue);
        setDisplayValue(newValue.toString());
    }
    
    const percent = () => {
        let newValue = activeValue / 100
        console.log(newValue);
        newValue = roundToMax(newValue)
        console.log(newValue);
        setActiveValue(newValue);
        setDisplayValue(newValue.toString());
        if(newValue !== 0){
            setDecimalPosition(decimalPosition + 2);
        }
    }
    
    const roundToMax = (value) => {
        return Number(value.toFixed(MAXDIGITS))
    }
    
    return <div>
    <Display value={displayValue} />
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