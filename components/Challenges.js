import React , { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal, Alert, ScrollView, TextInput, Image } from 'react-native';
import update from 'immutability-helper';

class Challenges extends Component {
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
        var randomInt = Math.floor(Math.random() * this.state.numberOfChallenges) + 1;
        this.setState({challengeNumber: randomInt});
        var teams = this.props.teams;
        var team = this.props.curTeam;
        this.setTeams(teams, team + 1);
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

    handler(){
        this.updateTeamPoints(this.state.curTeam, this.state.points);
        setTimeout(
            function() { this.sendTeams()}.bind(this),200
        )
    }

    sendTeams(){
        console.log('check data');
        console.log(this.state.teams);
        this.props.handlePoints.updateTeams(this.state.teams);
        this.props.close.close();
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

                case 7:
                return <C07 />
                break;

                case 8:
                return <C08 />
                break;

                case 9:
                return <C09 />
                break;

                case 10:
                return <C10 />
                break;

                case 11:
                return <C11 />
                break;

                case 12:
                return <C12 />
                break;

                case 13:
                return <C13 />
                break;

                case 14:
                return <C14 />
                break;

                case 15:
                return <C15 />
                break;

                case 16:
                return <C16 />
                break;

                case 17:
                return <C17 />
                break;

                case 18:
                return <C18 />
                break;

                case 19:
                return <C19 />
                break;

                case 20:
                return <C20 />
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
            if(this.state.points === null){
                this.setState({points: -2});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Goksnorren</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Je vergokt al je geld. Niet de eerste keer dat dit gebeurd...</Text>
                    <Text style={styles.pointsText}> je verliest 2 Henk-punten</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C03 = () => {
            if(this.state.points === null){
                this.setState({points: 2});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Goksnorren</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>BIG WIN op de TOTO</Text>
                    <Text style={styles.pointsText}>je ontvangt 2 Henk-punten</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C04 = () => {
            if(this.state.points === null){
                this.setState({points: 1});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>ATJE VOOR DE SFEER</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>At dat bierje maar</Text>
                    <Text style={styles.pointsText}> 1 puntje voor de sfeer</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C05 = () => {
            if(this.state.points === null){
                this.setState({points: 1});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>At koning Gido</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Je waagt een poging om het record van Gido te verbreken.</Text>
                    <Text style={styles.quoteText}>'Een nobele poging, al zeg ik het zelf'</Text>
                    <Text style={styles.pointsText}> wel 1 punt</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C06 = () => {
            if(this.state.points === null){
                this.setState({points: 1});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>At koning Gido</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Je waagt een poging om het record van Gido te verbreken.</Text>
                    <Text style={styles.quoteText}>'Wat niet ken, kan, kan, ken gebeurt niet'</Text>
                    <Text style={styles.pointsText}>1 punt</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C07 = () => {
            if(this.state.points === null){
                this.setState({points: 2});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Goed begin is 't halve werk</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>At een glas bier leeg</Text>
                    <Text style={styles.pointsText}>Ontvang 2 Henk-punten</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C08 = () => {
            if(this.state.points === null){
                this.setState({points: 0});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Even rustig nou</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Gewoon effe lekker onderuit</Text>
                    <Text style={styles.pointsText}>0 Henk-punten</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C09 = () => {
            if(this.state.points === null){
                this.setState({points: 0});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Verzaker</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Je besluit een avond rustig aan te doen. Zo werkt het helaas niet</Text>
                    <Text style={styles.pointsText}>At een glas bier</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C10 = () => {
            if(this.state.points === null){
                this.setState({points: 0});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Bier Streak</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Drink een gehele ronde lang bij elke beurt een slokkie bier</Text>
                    <Text style={styles.pointsText}></Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C11 = () => {
            if(this.state.points === null){
                this.setState({points: 2});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Gekukje</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}></Text>
                    <Text style={styles.pointsText}>Ontvang 2 Henk-punten</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C12 = () => {
            if(this.state.points === null){
                this.setState({points: 1});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Ah je lult man</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>1 minuut lullen buurman bedenkt het onderwerp</Text>
                    <Text style={styles.pointsText}>Ontvang 1 Henk-punt</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C13 = () => {
            if(this.state.points === null){
                this.setState({points: 0});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Shotje</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Neem (indien mogelijke) een shotje</Text>
                    <Text style={styles.pointsText}></Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C14 = () => {
            if(this.state.points === null){
                this.setState({points: 2});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>ATJE VOOR DE SFEER</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>At dat bierje maar</Text>
                    <Text style={styles.pointsText}> 1 puntje voor de sfeer</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C15 = () => {
            if(this.state.points === null){
                this.setState({points: 1});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Lijn 22</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Lijn 22 komt niet opdagen dus de Henker zorgt voor zijn eigen Bus..</Text>
                    <Text style={styles.pointsText}> Stap in de BUS Ontvang 1 punt</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C16 = () => {
            if(this.state.points === null){
                this.setState({points: 1});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Jumbo</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Je gaat naar de Jumbo en neemt natuurlijk wat voor de andere mee</Text>
                    <Text style={styles.pointsText}>Je krijgt 1 Henk-punt</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C17 = () => {
            if(this.state.points === null){
                this.setState({points: 1});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Mijn in het veldje</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Volg de route door de mijnen.</Text>
                    <Text style={styles.pointsText}>Je ontvangt 1 Henk-punt</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C18 = () => {
            if(this.state.points === null){
                this.setState({points: 0});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Nou, voor de dag er mee!</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Speel een ronde waarheid</Text>
                    <Text style={styles.pointsText}></Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C19 = () => {
            if(this.state.points === null){
                this.setState({points: 1});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Opruimen</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Toon effe wat respect. Ruim de tafel op(lege blikjes/flesjes etc.).</Text>
                    <Text style={styles.pointsText}>Voor de moeite 1 Henk-punt</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const C20 = () => {
            if(this.state.points === null){
                this.setState({points: 1});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Shotje</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}>Neem (indien mogelijke) een shotje</Text>
                    <Text style={styles.pointsText}>Ontvang 1 Henk-punt</Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        const Template = () => {
            if(this.state.points === null){
                this.setState({points: 1});
            }
            return(
                <View style={styles.modal}>
                    <Text style={styles.titleText}>Challenge 1</Text>
                    <View style={styles.line} />
                    <Text style={styles.descText}></Text>
                    <Text style={styles.pointsText}></Text>
                    <View style={styles.line} />
                    <Image
                    style={styles.image}
                    source={require('./Henk.png')} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Challenge />
                <View style={styles.buttons}>
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

export default Challenges;
