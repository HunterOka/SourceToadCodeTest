import React from 'react'
import PropTypes from 'prop-types';

function Display(props){
    let bigValue=false;
    if (props.value && props.value.length > 9) {
        bigValue = true;
    }
    const className = `display${bigValue ? ' bigValue' :''}`;
    return <div className={className}>
        <span className='displayContent'>{props.value}</span>
    </div>
}

Display.propTypes = {
    value: PropTypes.string,
}

export default Display