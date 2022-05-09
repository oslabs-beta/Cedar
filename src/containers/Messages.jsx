import React from 'react';
import LogsHeader from '../components/LogsHeader';
import MessageRow from '../components/MessageRow';

const Messages = (props) => {
  const messageRows = props.logs.map(message => {
    let type = message.message.slice(0, message.message.indexOf(' '));
    let messageText = message.message.slice(message.message.indexOf(' '));
    return <MessageRow 
      time={message.ingestionTime}
      type={type}
      message={messageText}
    />
  })
  console.log(props.logs)
    return(
      <div className='messagesContainer'>
        <LogsHeader />
        {messageRows}
      </div>
    )
  
}

export default Messages;