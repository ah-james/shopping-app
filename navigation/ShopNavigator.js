import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native'

import ProductsOverviewContainer from '../containers/shop/ProductsOverviewContainer'
import Colors from '../constants/Colors'

const ShopNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewContainer,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
})

export default createAppContainer(ShopNavigator)