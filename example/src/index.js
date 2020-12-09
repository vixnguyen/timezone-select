import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { TimezoneSelect, clientTz } from '../../lib'
import './styles.css'

const App = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(clientTz());
  const [labelStyle, setLabelStyle] = useState('original')

  const handleLabelChange = event => {
    setLabelStyle(event.target.value)
  }

  return (
    <div className='App'>
      <div className='header'>
        <h2
          style={{
            marginTop: '50px',
          }}
        >
          Timezone Data Source from Wikipedia
        </h2>
        <p>
          <a
            href='https://vixnguyen.medium.com/'
            alt='Vix Nguyen on Medium'
            target='_blank'
            rel='noopener noreferrer'
            className='author'
          >
            Author: Vix Nguyen
          </a>
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          width: 'min(100%, 400px)',
          justifyContent: 'space-around',
          marginTop: '50px',
        }}
        onChange={handleLabelChange}
        checked={labelStyle}
      >
      </div>
      <div className='select-wrapper'>
        <TimezoneSelect
          value={selectedTimezone}
          onChange={setSelectedTimezone}
          labelStyle={labelStyle}
          onBlur={() => console.log('Blur!')}
        />
      </div>
      {
        selectedTimezone?.value && <>
          <h3>Return Value:</h3>
          <div className='code'>
            <span style={{ marginLeft: '20px', fontWeight: '500' }}>
              Value: '{selectedTimezone.value}'
            </span>
            <br />
            <span style={{ marginLeft: '20px', fontWeight: '500' }}>
              Label: '{selectedTimezone.label}'
            </span>
            <br />
            <span style={{ marginLeft: '20px', fontWeight: '500' }}>
              Country: '{selectedTimezone.country}'
            </span>
            <br />
            <span style={{ marginLeft: '20px', fontWeight: '500' }}>
              Offset: '{selectedTimezone.offset}'
            </span>
            <br />
            <span style={{ marginLeft: '20px', fontWeight: '500' }}>
              Included: '{selectedTimezone.included ? selectedTimezone.included.join(', ') : ''}'
            </span>
          </div>
        </>
      }
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
