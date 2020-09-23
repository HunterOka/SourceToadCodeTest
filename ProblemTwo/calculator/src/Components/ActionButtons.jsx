import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button.jsx'

function ActionButtons(props){

    return <div className='actionButtons'>
        {props.children}
    </div>
}

ActionButtons.propTypes = {
}

export default ActionButtons;