import React from 'react';

function ActionButtons(props){
    return <div className='actionButtons buttonRow'>
        {props.children}
    </div>
}

export default ActionButtons;