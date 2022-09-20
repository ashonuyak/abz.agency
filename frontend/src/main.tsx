import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routing } from './navigation/routing'
import { Provider } from 'react-redux'
import './styles.scss'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routing />
    </Provider>
  </React.StrictMode>
)
