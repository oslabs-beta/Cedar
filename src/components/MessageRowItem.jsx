import React from 'react';

/**
 * MessageRowItem component.
 * Renders a single aspect of a message log. 
 */
const MessageRowItem = (props) => {
  return (
    <div className='messageRowItem'>
      <span>{props.text}</span>
    </div>
  )
}

export default MessageRowItem;