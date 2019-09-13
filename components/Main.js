import React , { Component } from 'react';
import { StyleSheet, Text, View, Button, Spacer } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as Expo from 'expo';

export default class MainScreen extends Component {
    static navigationOptions = {
        title: "Het Henk Bier Spel",
    }
    render(){
        const { navigate } = this.props.navigation
      return (
          <View style={styles.container}>

            <Text style={styles.titleText}>Het Grote Henk Bier Spel</Text>

            <View style={styles.buttonContainer}>
                <View style={styles.buttons}>
                  <Button
                    onPress={ () => navigate('Teams')}
                    title="Start Game"
                  />
                  </View>
                  <View style={styles.buttons}>
                  <Button
                    title="Settings"
                  />
            </View>
            </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  buttons: {
    paddingTop: 15,
    minWidth: 200,
  },
  buttonContainer: {
    flex: 2,
  },
  titleText: {
      flex: 4,
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 15,
  }
});
