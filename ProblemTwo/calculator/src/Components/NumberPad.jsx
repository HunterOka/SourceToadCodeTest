import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button.jsx'

function NumberPad(props){
    return <React.Fragment>
        <div className='buttonRow'>
            <Button display='7'
                className={props.buttonClass}
                onClick={()=>props.buttonClick(7)}
                />
            <Button display='8'
                className={props.buttonClass}
                onClick={()=>props.buttonClick(8)}
                />
            <Button display='9'
                className={props.buttonClass}
                onClick={()=>props.buttonClick(9)}
                />
        </div>
        <div className='buttonRow'>
            <Button display='4'
                className={props.buttonClass}
                onClick={()=>props.buttonClick(4)}
                />
            <Button display='5'
                className={props.buttonClass}
                onClick={()=>props.buttonClick(5)}
                />
            <Button display='6'
                className={props.buttonClass}
                onClick={()=>props.buttonClick(6)}
                />
        </div>
        
        <div className='buttonRow'>
            <Button display='1'
                className={props.buttonClass}
                onClick={()=>props.buttonClick(1)}
                />
            <Button display='2'
                className={props.buttonClass}
                onClick={()=>props.buttonClick(2)}
                />
            <Button display='3'
                className={props.buttonClass}
                onClick={()=>props.buttonClick(3)}
                />
        </div>
        <div className='buttonRow'>
            <Button display='0'
                className={'wideButton'}
                onClick={()=>props.buttonClick(0)}
                />
            <Button display='.'
                className={props.buttonClass}
                onClick={()=>props.buttonClick('.')}
                />
            
        </div>
    </React.Fragment>
}

NumberPad.propTypes = {
    buttonClass: PropTypes.string,
    buttonClick: PropTypes.func,
}

export default NumberPad;