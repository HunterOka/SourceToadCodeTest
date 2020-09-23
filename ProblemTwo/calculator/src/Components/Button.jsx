import React from 'react';
import PropTypes from 'prop-types';

function Button(props){
    let className = `button ${props.className}`
    return <div className={className} onClick={()=>props.onClick()}>
        {props.display}
    </div>
}

Button.propTypes = {
    className: PropTypes.string,
    onclick: PropTypes.func,
    display: PropTypes.string,
}

export default Button;