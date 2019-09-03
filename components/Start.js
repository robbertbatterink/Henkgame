import React , { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal, Alert, ScrollView, TextInput } from 'react-native';
import update from 'immutability-helper';
import { StackNavigator } from 'react-navigation';
import * as Expo from 'expo';

export default class TeamScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams:[
            ],
            players: [],
            teamName: null,
            teamId: null,
            modalVisible: false,
            teamModal: null,
            counter: 0,
        }
        this.addTeam = this.addTeam.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.setId = this.setId.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.changeTeam = this.changeTeam.bind(this);
        this.deleteTeam = this.deleteTeam.bind(this);
        this.startFunctions = this.startFunctions.bind(this);
    }

    setModalVisible(value) {
        this.setId(value);
        this.setState({modalVisible: !this.state.modalVisible, counter: 0});
    }

    setId(value){
        const id = value;
        this.setState({teamModal: id });
    }

    addTeam(){
        const teamsSize = this.state.teams.length;
        const teamId = teamsSize + 1;
        const newTeamName = "Team " + teamId;
        this.setState(state => {
            const teams = [...state.teams, {players: ['Player 1',], teamName: newTeamName, id:teamId, position: 0, playerTurn: null}];

          return {
                teams
              };
            });
    }

    deleteTeam(id){
        this.setState(state => {
            const teams = this.state.teams.filter(item => item.id !== id);
            return{
                teams,
            }
        })
        this.setModalVisible();
    }

    handleEdit(player1, player2, player3, player4, teamName){
        const id = this.state.teamModal * 1;
        if(player1 != null){
            setTimeout(
                function() {this.changePlayer(id, 0, player1);}.bind(this),500
            );
        }
        if(player2 != null){
            setTimeout(
                function() {this.changePlayer(id, 1, player2);}.bind(this),500
            );
        }
        if(player3 != null){
            setTimeout(
                function() {this.changePlayer(id, 2, player3);}.bind(this),300
            );
        }
        if(player4 != null){
            setTimeout(
                function() {this.changePlayer(id, 3, player4);}.bind(this),300
            );
        }
        if(teamName != null){
            setTimeout(
                function() {this.changeTeam(id, teamName);}.bind(this),300
            );
        }
        this.setModalVisible();
    }

    changeTeam(id, name){
        var data = this.state.teams;
        var teamNameIndex = data.findIndex(function(c) {
            return c.id == id;
        });

        var updatedName = update(data[teamNameIndex], {teamName: {$set: name}});

        var newData = update(data, {
            $splice: [[teamNameIndex, 1, updatedName]]
        });
        this.setState({teams: newData});
    }

    changePlayer(id, playerId, player){
        var data = this.state.teams;
        var playersIndex = data.findIndex(function(c) {
            return c.id == id;
        });
        if(playerId + 1 > this.state.players.length){
            var updatedPlayer = [...this.state.players, player];
        } else{
            var updatedPlayer = this.state.players.map((item, j) => {
                  if (j === playerId) {
                    return player;
                  } else {
                    return item;
                  }
            });
        }
        var updatedPlayers = update(data[playersIndex], {players: {$set: updatedPlayer}});
        this.setState({players: updatedPlayer});
        var newData = update(data, {
            $splice: [[playersIndex, 1, updatedPlayers]]
        });
        this.setState({teams: newData});
    }

    startFunctions(){
        this.props.screenProps.setTeams(this.state.teams);
        this.props.navigation.navigate('Board');
    }

    static navigationOptions = {
        title: "Make Teams",
    }

    render(){
        const { navigate } = this.props.navigation

        const TeamModal = () => {
            const team = this.state.teams[this.state.teamModal-1]
            if(this.state.counter <= 2){
                for(const result in team){
                    switch(this.state.counter){
                        case 0:
                            this.setState({players: team[result]});
                            break;
                        case 1:
                            this.setState({teamName: team[result]});
                            break;
                        case 2:
                            this.setState({id: team[result]});
                            break;
                    }
                    this.setState({counter: this.state.counter += 1})
                }
            }

         let teamname = null;
         let player1 = null;
         let player2 = null;
         let player3 = null;
         let player4 = null;

            return(
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    this.setModalVisible();
                  }}>
                  <View style={{marginTop: 22}}>
                    <View>
                      <Text>This is the select screen for team {this.state.teamModal}</Text>
                      <TextInput
                          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                          onChangeText={(text) => {teamname = text.toString()}}
                          placeholder={this.state.teamName}
                        />
                        <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => {player1 = text.toString()}}
                        placeholder={this.state.players[0]}
                      />
                      <TextInput
                      style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                      onChangeText={(text) => {player2 = text.toString()}}
                      placeholder={this.state.players[1]}
                      />
                      <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => {player3 = text.toString()}}
                        placeholder={this.state.players[2]}
                      />
                      <TextInput
                          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                          onChangeText={(text) => {player4 = text.toString()}}
                          placeholder={this.state.players[3]}
                      />
                      <View>
                        <View style={styles.buttons}>
                          <Button
                            title="Save"
                            onPress={() => this.handleEdit(player1, player2, player3, player4, teamname)}
                           />
                           </View>
                           <View style={styles.buttons}>
                             <Button
                               title="Delete Team"
                               onPress={() => this.deleteTeam(this.state.teamModal)}
                              />
                              </View>
                       </View>
                    </View>
                  </View>
                </Modal>
            )
        }

        const Teams = () => {

            const stateTeams = this.state.teams;
            const list = stateTeams.map( (team) => {
                return <View key={team.id} players={team.players} style={{color:'white'}}>
                <View style={styles.teamButtons}>
                    <Button title={team.teamName} onPress={() => this.setModalVisible(team.id)}/>
                </View>
                </View>
            } )

            return(
                <ScrollView style={styles.teamDisplay}>
                    {list}
                </ScrollView>

            )
            }

        const StartGame = () => {
            if(this.state.teams.length >= 1){
                return <Button
                    onPress={ () => this.startFunctions()}
                    title="Start Game"
                 />
            } else {
                return null;
            }
        }

        const AddTeam = () => {
            if(this.state.teams.length < 8) {
                return (
                    <View style={styles.buttons}>
                      <Button
                        onPress={this.addTeam}
                        title="Add Team"
                      />
                  </View>
                )
            } else {
                return null
            }
        }

      return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Choose Teams</Text>
                    <Text style={{color: 'white'}}>all teams display</Text>
                <Teams modal={this.setModalVisible} teams={this.state.teams}/>
                <TeamModal visibleModal={this.state.modalVisible} modal={this.setModalVisible} teams={this.state.teams} team={this.state.teamModal}/>

            <View style={styles.buttonContainer}>
            <AddTeam />
              <View style={styles.buttons}>
                <StartGame />
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
  teamButtons: {
    paddingTop: 5,
  },
  buttonContainer: {
    flex: 2,
  },
  titleText: {
      flex: 1,
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 15,
  },
  teamDisplay: {
      padding: 10,
      margin: 10,
      flex: 1,
      minWidth: 200,
      minHeight: 200,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: 'white',
      overflow: 'hidden'
  },
});
