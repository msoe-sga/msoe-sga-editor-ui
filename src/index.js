import React from 'react'
import ReactDOM from 'react-dom'
import PageLayout from './views/PageLayout'
import './components/core/core.scss';

function App() {
  return (
    <PageLayout />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

