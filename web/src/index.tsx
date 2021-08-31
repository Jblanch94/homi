import { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'

import './index.css'

ReactDOM.render(
  <Suspense fallback={<LoadingSpinner />}>
    <App />
  </Suspense>,
  document.getElementById('root')
)
