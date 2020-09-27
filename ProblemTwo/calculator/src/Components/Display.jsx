import React from 'react'

function Display(props){
return <div className='display'>
    <span className='displayContent'>{props.value}</span>
</div>
}

export default Display