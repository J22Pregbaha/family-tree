import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.css'
import './style/tailwind.css'
import './style/font.css'
import App from './App'
import { ToastContainer, type TypeOptions } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import './style/toastStyles.css'

const getCustomIcon = (type?: TypeOptions) => {
  switch (type) {
  case 'success':
    return <img src="/images/toast_success.svg" alt="toast-success" />
  case 'warning':
    return <img src="/images/toast_warning.svg" alt="toast-warning" />
  case 'error':
    return <img src="/images/toast_error.svg" alt="toast-error" />
  default:
    return <img src="/images/toast_info.svg" alt="toast-info" />
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      pauseOnFocusLoss={false}
      closeOnClick
      autoClose={3000}
      hideProgressBar={true}
      closeButton={false}
      icon={(context) => getCustomIcon(context?.type)}
      toastClassName={(context) => {
        const toastType = context?.type

        return toastType === 'success' ? 'success-toast' :
          toastType === 'error' ? 'error-toast' :
            toastType === 'warning' ? 'warning-toast' :
              'default-toast'
      }}
    />
  </React.StrictMode>
)
