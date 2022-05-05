import React from 'react';
import LogsHeaderItem from '../components/LogsHeaderItem';

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