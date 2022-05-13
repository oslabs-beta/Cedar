import React from 'react';

/**
 * LogsHeaderItem component.
 * Renders a an individual log column header title within the LogsHeader component. 
 */
const LogsHeaderItem = (props) => {
  return (
    <div className='headerItem'>
      <span>{props.text}</span>
    </div>
  )
}

export default LogsHeaderItem;