import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native'

import ProductsOverviewContainer from '../containers/shop/ProductsOverviewContainer'
import ProductDetailContainer from '../containers/shop/ProductDetailContainer'
import Colors from '../constants/Colors'

const ShopNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewContainer,
    ProductDetail: ProductDetailContainer,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
})

export default createAppContainer(ShopNavigator)