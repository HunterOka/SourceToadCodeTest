import React from 'react';
import PropTypes from 'prop-types';

function Button(props){
    let className = `button ${props.className ?? ''}`
    return <div className={className} onClick={()=>props.onClick()}>
        <span class='buttonContent'>{props.display}</span>
    </div>
}

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    display: PropTypes.string,
}

export default Button;