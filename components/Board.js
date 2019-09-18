import React , { Component } from 'react';
import { StyleSheet, Text, View, Button, Spacer, List, ListItem, Modal } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as Expo from 'expo';
import update from 'immutability-helper';
import Dice from './Dice.js';
import Challenges from './Challenges.js';

export default class BoardScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            teamTurn: null,
            curTeamName: null,
            curTurnPlayer: null,
            curTeamPosition: null,
            moveAmount: null,
            faceValue: null,
            showDice: false,
            finishedTurn: false,
            showChallengeModal: false,
            teams: [
                {
                    id: 1,
                    players: [
                      "Player 1",
                      "Player 2",
                      "Player 3",
                    ],
                    position: 0,
                    playerTurn: null,
                    teamName: "Team 1",
                  },
                 	{
                    id: 2,
                    players: [
                      "Player 1",
                      "Player 2",
                    ],
                    position: 0,
                    playerTurn: null,
                    teamName: "Team 2",
                  },
                  {
                    id: 3,
                    players: [
                      "Player 1",
                    ],
                    position: 0,
                    playerTurn: null,
                    teamName: "Team 3",
                  },
              ],
            gameState: [
                [],[],[],[],[],[],
                [],[],[],[],
                [],[],[],[],[],[],
                [],[],[],[],
            ],
        }
        this.updateGameState = this.updateGameState.bind(this);
        this.addPiece = this.addPiece.bind(this);
        this.removePiece = this.removePiece.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
        this.handleNextPlayer = this.handleNextPlayer.bind(this);
        this.moveAmount = this.moveAmount.bind(this);
        this.updateTeamPosition = this.updateTeamPosition.bind(this);
        this.movePiece = this.movePiece.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.updateTeams = this.updateTeams.bind(this);
    }
    static navigationOptions = {
        header: null,
        title: "Het Bord",
    }

    componentDidMount(){
        setTimeout(
            function() {this.setState({teams: this.props.screenProps.teams})}.bind(this),200
        )

        var teams =  this.props.screenProps.teams;
        //var teams =  this.state.teams;

        teams.map((team) => (
            setTimeout(
                function() {this.addPiece(team['id'], team['position']);}.bind(this),200
            )
        ))
        setTimeout(
            function() {this.nextTurn();}.bind(this),200
        )
        this.setState({showDice: true});
    }

    nextTurn(){
        if(this.state.teamTurn === null){
            this.setState({teamTurn: 0})
        }else if(this.state.teamTurn < this.state.teams.length-1){
            this.setState({teamTurn: this.state.teamTurn + 1})
        } else {
            this.setState({teamTurn: 0})
        }
        this.handleNextPlayer( this.state.teamTurn + 1);
        const team = this.state.teams[this.state.teamTurn];
        if(team !== undefined){
            this.setState({
                curTeamName: team['teamName'],
                curTurnPlayer: team['players'][team['playerTurn']],
                curTeamPosition: team['position'],
                finishedTurn: false,
                showDice: true,
                faceValue: null,
            })
        }
    }

    updateTeamPosition(id, newPos){
        var data=this.state.teams

        var teamIndex = data.findIndex(function(c) {
            return c.id === id;
        })

        if(newPos > 19){
            var pos = newPos - 20;
        } else {
            var pos = newPos;
        }

        var updatedPosistion = pos;

        var updated = update(data[teamIndex], {position: {$set: updatedPosistion}});

        var newData = update(data, {
            $splice: [[teamIndex, 1, updated]]
        });
        this.setState({teams: newData});
    }

    handleNextPlayer(id){
        var data=this.state.teams
        //kijk naar wie het huidige team inspect
        var teamIndex = data.findIndex(function(c) {
            return c.id === id;
        })
        //kijk of er meerdere spelers in dat team zitten
        if(data[teamIndex].players.lenght === 1){
            var updatedPlayer = 0;
        } else if(data[teamIndex].playerTurn === null){
            var updatedNextPlayer = 0;
        } else if (data[teamIndex].playerTurn < data[teamIndex].players.length - 1){
            var updatedNextPlayer = data[teamIndex].playerTurn + 1;
        } else {
            var updatedNextPlayer = 0;
        }
        //update de nieuwe speler
        var updated = update(data[teamIndex], {playerTurn: {$set: updatedNextPlayer}});
        var newData = update(data, {
            $splice: [[teamIndex, 1, updated]]
        });
        this.setState({teams: newData})
    }

    updateGameState(teamId, curPos, newPos){
        this.addPiece(teamId, newPos);
        this.removePiece(teamId, curPos);
        //setTimeout(
            //function() {
                this.updateTeamPosition(teamId, newPos);
            //}.bind(this),200
        //)
    }

    movePiece(teamId, curPos, newPos, moves) {
        if(newPos > 19){
            var endPos = newPos - 20;
        } else {
            var endPos = newPos;
        }
        var id = teamId;
        var startPos = curPos;
        var moveAmount = moves;
        var sleepAmount = 0;
        const sleep = (milliseconds) => {
                return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        for(let i = 0; i < moveAmount; i++){
            sleep(sleepAmount).then(() => {
                this.updateGameState(id, startPos, startPos + 1);
                if(startPos >= 19){
                    startPos  = startPos  - 19;
                } else {
                    startPos  = startPos + 1;
                }
                console.log(startPos, endPos);
                if(startPos === endPos) {
                    sleep(1500).then(() => {
                        this.setModalVisible();
                        this.setState({moveAmount: null, finishedTurn: true});
                    });
                }
            });
            sleepAmount = sleepAmount + 1000;
        }
    }

    addPiece(teamId, newPos){
        if(newPos > 19){
            var pos = newPos - 20;
        } else {
            var pos = newPos;
        }
        //setTimeout( function(){
        this.setState(state => {
            const gameState = this.state.gameState.map((item, j) =>{
                if(j === pos){
                    return [...this.state.gameState[pos], teamId];
                } else {
                    return item;
                }
            });
            return{
                gameState,
            }
        })//}.bind(this),200)
    }

    removePiece(teamId, curPos){
        this.setState(state => {
          const gameState = this.state.gameState;
          var index = gameState[curPos].indexOf(teamId);
         gameState[curPos].splice(index, 1);
         return gameState;
        });
    }

    moveAmount(data){
        this.setState({moveAmount: data[0],faceValue: data[1], showDice: false});
    }

    setModalVisible() {
        this.setState({showChallengeModal: !this.state.showChallengeModal});
    }

    updateTeams(newTeams){
        this.setState({teams: newTeams});
    }

    renderPieces = (pos) => {
        var values = this.state.gameState[pos];


            var piecesList = values.map(function(value){
                if(value === 1){
                    return <View key={value} style={styles.piece}/>;
                }else if(value === 2){
                    return <View key={value} style={[styles.piece, {backgroundColor: 'blue'}]}/>;
                }else if(value === 3){
                    return <View key={value} style={[styles.piece, {backgroundColor: 'green'}]}/>;
                }else if(value === 4){
                    return <View key={value} style={[styles.piece, {backgroundColor: 'yellow'}]}/>;
                }else if(value === 5){
                    return <View key={value} style={[styles.piece, {backgroundColor: 'purple'}]}/>;
                }else if(value === 6){
                    return <View key={value} style={[styles.piece, {backgroundColor: 'orange'}]}/>;
                }else if(value === 7){
                    return <View key={value} style={[styles.piece, {backgroundColor: 'black'}]}/>;
                }else if(value === 8){
                    return <View key={value} style={[styles.piece, {backgroundColor: 'pink'}]}/>;
                }else {
                    return null;
                }
            })

        return <View style={styles.pieceList} >{piecesList}</View>;
    }
    render(){
        const { navigate } = this.props.navigation
        const Board = () => {
            return(
                <View style={{maxHeight: 216}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.tile}>
                            {this.renderPieces(5)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(6)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(7)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(8)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(9)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(10)}
                        </View>
                    </View>
                    <View style={{alignContent: 'space-between', flexWrap:'wrap'}}>
                        <View style={styles.tile}>
                            {this.renderPieces(4)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(3)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(2)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(1)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(11)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(12)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(13)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(14)}
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.tile}>
                            {this.renderPieces(0)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(19)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(18)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(17)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(16)}
                        </View>
                        <View style={styles.tile}>
                            {this.renderPieces(15)}
                        </View>
                    </View>
                    <Text style={{color: 'white'}}>Start</Text>
                </View>
            )
        }

        const DiceSection = () => {
            if(this.state.showDice === true){
                return <Dice throwDice={{moveAmount: (amount) => this.moveAmount(amount)}} />
            } else {
                return null
            }
        }

        const NextTurn = () => {
            if(this.state.finishedTurn === true){
                return(
                    <View style={styles.buttons}>
                    <Button
                        title="next turn"
                        onPress={() =>         setTimeout(
                                    function() {this.nextTurn();}.bind(this),200
                                )}
                     />
                     </View>
                )
            }else {
                return null
            }
        }

        const MovePlayer = () => {
            if(this.state.moveAmount !== null){
                return(
                    <View style={styles.buttons}>
                    <Button
                        title="Move"
                        onPress={() => this.movePiece(this.state.teamTurn +1, this.state.curTeamPosition, this.state.curTeamPosition + this.state.moveAmount, this.state.moveAmount)}
                     />
                     </View>
                )
            } else {
                return null
            }
        }

        const ChallengeModel = () => {
            return(
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={this.state.showChallengeModal}
                  onRequestClose={() => {
                    this.setModalVisible();
                  }}>
                  <View style={styles.modal}>
                    <Challenges curTeam={this.state.teamTurn} teams={this.state.teams} handlePoints={{newTeams: (data) => this.updateTeams(data)}} />
                  </View>
                </Modal>
            )
        }

      return (
          <View style={styles.container}>
            <View style={styles.board}>
                <Board />
            </View>
            <View>
                <Text style={{color: "white"}}>Current Team: {this.state.curTeamName} with player: {this.state.curTurnPlayer}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <DiceSection />
                <Text style={{color: "white", fontSize: 52}}>{String.fromCharCode(this.state.faceValue)}</Text>
                <NextTurn />
                <MovePlayer />
            </View>
                <ChallengeModel />
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
  board: {
      flex: 4,
      paddingTop: 15,
  },
  buttons: {
    paddingTop: 15,
    minWidth: 200,
  },
  buttonContainer: {
    flex: 2,
    alignItems: 'center',
  },
  titleText: {
      flex: 4,
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 15,
  },
  tile: {
      margin: 2,
      padding: 5,
      backgroundColor: 'white',
      height: 50,
      width: 50,
      borderRadius: 15,
      overflow: 'hidden',
  },
  pieceList: {
      margin: 2,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
  },
  piece: {
      width: 15,
      margin: 1,
      height: 15,
      borderRadius: 15/2,
      backgroundColor: 'red',
  },
  modal: {
      backgroundColor: 'blue',
      borderRadius: 15,
      alignItems: 'center',
  },
});
