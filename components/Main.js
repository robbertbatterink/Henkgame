import React , { Component } from 'react';
import { StyleSheet, Text, View, Button, Spacer, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as Expo from 'expo';

export default class MainScreen extends Component {
    static navigationOptions = {
        title: "Het Henk Bier Spel",
        header: null,
    }
    render(){
        const { navigate } = this.props.navigation
      return (
          <View style={styles.container}>

            <Text style={styles.titleText}>Het Henk Bier Spel</Text>
            <View style={styles.imageView}>
            <Image
                style={styles.image}
                source={require('./HenkBig.png')}
            />
            </View>
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
      flex: 2,
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold',
      paddingTop: 50,
  },
  imageView: {
      flex: 3,
  },
  image: {
      height: 125,
      resizeMode: "contain",
  }
});
