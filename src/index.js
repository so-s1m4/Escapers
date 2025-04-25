import { Buffer } from 'buffer'

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.module.css'
import Router from './Router'

window.Buffer = Buffer


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Router />)
