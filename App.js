import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { composeWithDevTools } from 'redux-devtools-extension'
import Thunk from 'redux-thunk'

import productsReducer from './store/reducers/productsReducer'
import cartReducer from './store/reducers/cartReducer'
import ordersReducer from './store/reducers/ordersReducer'
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
})

const store = createStore(rootReducer, applyMiddleware(Thunk))

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if(!fontLoaded) {
    return(
      <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} onError={(error) => console.log(error)}
      />
    )
  } 

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}