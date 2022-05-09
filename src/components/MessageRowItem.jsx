import React from 'react';

const MessageRowItem = (props) => {
  return (
    <div className='messageRowItem'>
      <span>{props.text}</span>
    </div>
  )
}

export default MessageRowItem;