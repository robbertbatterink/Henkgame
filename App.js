import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as Expo from 'expo';
import MainScreen from "./components/Main.js";
import TeamScreen from "./components/Start.js";
import BoardScreen from "./components/Board.js";


const NavigationApp = createStackNavigator({
    Home: { screen: MainScreen },
    Teams: { screen: TeamScreen },
    Board: { screen: BoardScreen },
}, {
    navigationOptions: {
        headerStyle: {
        }
    }
});

const Nav = createAppContainer(NavigationApp);

export default class App extends Component{
    state = {
        teams: [],
    };

    setTeams(data){
        this.setState({teams: data });
    }
    render(){
      return (
          <Nav screenProps={{ teams: this.state.teams, setTeams: (data) => this.setTeams(data)}} />
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
