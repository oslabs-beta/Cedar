import React from 'react';
import LogsHeaderItem from '../components/LogsHeaderItem';

/**
 * LogsHeader component.
 * Renders a header row to display titles of log info columns. 
 */
const LogsHeader = () => {
  return (
    <div className='logsHeaderRow'>
      <LogsHeaderItem text='Time' />
      <LogsHeaderItem text='Type' />
      <LogsHeaderItem text='Message' />
    </div>
  )
}

export default LogsHeader;