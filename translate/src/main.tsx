import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import {store} from './redux/store.ts'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './index.css'

const stripePromise = loadStripe('pk_test_51PbRzn2NvV01L85tyV1c9LXiFivix9VnXxsC4apuDTkD72nzqE8V75ok9FdZJoJ1JiJCmx5GzPhicB7AQCE9tdhT00rbN5xOpS');


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <Elements stripe={stripePromise}>
    <App />
    </Elements>
    </Provider>
  
  </React.StrictMode>,
)
