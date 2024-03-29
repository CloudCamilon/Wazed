import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './Home.js';
import HelpScreen from './Help.js';
import ListScreen from './List.js';
import MapScreen from './Map.js';
import DescriptionScreen from './Description.js'


const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Help: HelpScreen,
    List: ListScreen,
    Map: MapScreen,
    Description: DescriptionScreen
  },
  {    
    headerMode: 'none',
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}