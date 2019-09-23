import React , { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal, Alert, ScrollView, TextInput, Image } from 'react-native';
import update from 'immutability-helper';

class ScoreBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            challengeNumber: null,
            numberOfChallenges: 20,
            teams: null,
            curTeam: null,
            points: null,
        }
        this.setTeams = this.setTeams.bind(this);
        this.sendTeams = this.sendTeams.bind(this);
        this.handler = this.handler.bind(this);
    }

    static navigationOptions = {
        header: null,
    }

    componentDidMount(){
        var teams = this.props.teams;
        this.setTeams(teams);
    }

    setTeams(teams) {
        this.setState({teams: teams})
    }

    handler(){
        this.props.close.close();
    }

    sendTeams(){

    }

    renderRow() {
        return (
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View style={{ flex: 1, alignSelf: 'stretch' }} /> { /* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
                <View style={{ flex: 1, alignSelf: 'stretch' }} />
                <View style={{ flex: 1, alignSelf: 'stretch' }} />
                <View style={{ flex: 1, alignSelf: 'stretch' }} />
                <View style={{ flex: 1, alignSelf: 'stretch' }} />
            </View>
        );
    }

    render(){

        const ScoreTable = () => {

            const data = this.props.teams;
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                    data.map((team) => { // This will render a row for each data element.
                        return <Text>{team['teamName']} with {team['points']} points</Text>
                    })
                }
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.buttons}>
                <ScoreTable />
                <Button
                    title="Close"
                    onPress={() => this.handler()}
                 />
                 </View>
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
  quoteText: {
      textAlign: 'center',
      fontStyle: 'italic',
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
  },
  buttons: {
    paddingTop: 15,
    minWidth: 200,
  },
})

export default ScoreBoard;
