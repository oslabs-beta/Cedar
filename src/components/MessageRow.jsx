import React from 'react';
import MessageRowItem from '../components/LogsHeaderItem';

/**
 * MessageRow component.
 * Renders a message row to display various details of a single log message.
 */
const MessageRow = (props) => {
  return (
    <div className='messageRow'>
      <MessageRowItem text={props.time} />
      <MessageRowItem text={props.type} />
      <MessageRowItem text={props.message} />
    </div>
  )
}

export default MessageRow;