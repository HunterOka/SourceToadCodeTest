import React from 'react';
import PropTypes from 'prop-types';

function MessagePopup(props){
    return <div className='messagePopup'>
       {props.message}
    </div>
}

MessagePopup.propTypes = {
    message: PropTypes.string,
}

export default MessagePopup;