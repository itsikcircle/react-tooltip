import { StrictMode, version } from 'react'
import { createRoot } from 'react-dom/client'
import './tokens.css'
import App from './App'

// eslint-disable-next-line no-console
console.log('Parent folder loaded react version: ', version)

const container = document.getElementById('app')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
