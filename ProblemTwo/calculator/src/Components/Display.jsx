import React from 'react'

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

export default Display