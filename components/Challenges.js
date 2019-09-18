import React , { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal, Alert, ScrollView, TextInput, Image } from 'react-native';
import update from 'immutability-helper';

class Challenges extends Component {
    constructor(props){
        super(props);
        this.state = {
            challengeNumber: null,
            numberOfChallenges: 6,
            teams: null,
            curTeam: null,
            points: null,
        }
        this.setTeams = this.setTeams.bind(this);
    }

    static navigationOptions = {
        header: null,
        title: "Het Bord",
    }

    componentDidMount(){
        var randomInt =  1;//Math.floor(Math.random() * this.state.numberOfChallenges) + 1;
        this.setState({challengeNumber: randomInt});
        var teams = this.props.teams;
        var team = this.props.curTeam;
        this.setTeams(teams, team);
    }

    setTeams(teams, curTeam) {
        this.setState({teams: teams, curTeam: curTeam})
    }

    updateTeamPoints(id, points){
        var data=this.state.teams

        var teamIndex = data.findIndex(function(c) {
            return c.id === id;
        })

        var curPoints = data[teamIndex].points;

        var updatedPoints = curPoints + points;

        var updated = update(data[teamIndex], {points: {$set: updatedPoints}});

        var newData = update(data, {
            $splice: [[teamIndex, 1, updated]]
        });
        this.setState({teams: newData});
    }


    render(){
        const Challenge = () => {
            switch(this.state.challengeNumber){
                case 1:
                return <C01 />
                break;

                case 2:
                return <C02 />
                break;

                case 3:
                return <C03 />
                break;

                case 4:
                return <C04 />
                break;

                case 5:
                return <C05 />
                break;

                case 6:
                return <C06 />
                break;

                default:
                return <Text>Something went wrong</Text>
            }
        }

        const C01 = () => {
            if(this.state.points === null){
                this.setState({points: -1});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Whats App</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Je veroorzaakt een discussie op whats app</Text>
                    <Text style={styles.pointsText}> je verliest 1 Henk-punt</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C02 = () => {
            return(
                <View>
                <Text style={styles.titleText}>Challenge 1</Text>
                </View>
            )
        }

        const C03 = () => {
            return(
                <View>
                <Text style={styles.titleText}>Challenge 1</Text>
                </View>
            )
        }

        const C04 = () => {
            return(
                <View>
                <Text style={styles.titleText}>Challenge 1</Text>
                </View>
            )
        }

        const C05 = () => {
            return(
                <View>
                <Text style={styles.titleText}>Challenge 1</Text>
                </View>
            )
        }

        const C06 = () => {
            return(
                <View>
                <Text style={styles.titleText}>Challenge 1</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Challenge />
            </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      margin: 50,
  },
  modal: {
      backgroundColor: 'blue',
      borderRadius: 15,
      alignItems: 'center',
  },
  titleText: {
      color: 'white',
      fontSize: 35,
      fontWeight: 'bold',
      paddingTop: 15,
  },
  descText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 20,
      maxWidth: '90%',
  },
  pointsText: {
      paddingTop: 30,
      color: 'white',
      fontSize: 20,
  },
  line: {
      borderBottomColor: 'white',
      borderWidth: 1,
      width: 300,
      margin: 10,
  },
  image: {
      height: 60,
      resizeMode: "contain",
  }
})

export default Challenges;
