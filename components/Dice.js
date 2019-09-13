import React , { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faceValue: 0,
      face: 9856,
      rollCount: 1,
      isRolling: false,
    };
        this.DiceRoll = this.DiceRoll.bind(this);
        this.HandleDiceThrow = this.HandleDiceThrow.bind(this);
        this.sendFaceValue = this.sendFaceValue.bind(this);
    }
  GenerateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  DiceRoll() {
    let faceValue = this.GenerateRandomInt(0, 5);
    this.setState({
      rollCount: this.state.rollCount - 1,
      isRolling: (this.state.rollCount > 0),
      faceValue: faceValue,
      face: 9856 + faceValue,
    });
    if(this.state.rollCount === 0){
        setTimeout(
            function() {this. sendFaceValue()}.bind(this),500
        )
    }
  }

  HandleDiceThrow(){
    if (this.state.isRolling)return;
    let val = this.GenerateRandomInt(5,15);
    this.setState({rollCount: val});
    for (let i = 0; i <= val; i++){
      setTimeout(this.DiceRoll, 250 * i);
    }
  }

  sendFaceValue(){
      this.props.throwDice.moveAmount([this.state.faceValue + 1, this.state.face]);
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <View><Text style={{color: 'white', fontSize: 52}}>{String.fromCharCode(this.state.face)}</Text></View>
        <View style={styles.buttons}>
        <Button
            title="Throw Dice"
            onPress={this.HandleDiceThrow}
        />
        </View>
        <Text>Dice Value: {this.state.faceValue + 1}</Text>
        <Text>Roll: {this.state.rollCount}</Text>
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
});


export default Dice;
