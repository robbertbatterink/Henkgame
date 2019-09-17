import React , { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal, Alert, ScrollView, TextInput } from 'react-native';
import update from 'immutability-helper';

class Challenges extends Component {
    constructor(props){
        super(props);
        this.state = {
            challengeNumber: null,
            numberOfChallenges: 6,
            teams: null,
        }
        this.setTeams = this.setTeams.bind(this);
    }

    componentDidMount(){
        var randomInt = Math.floor(Math.random() * this.state.numberOfChallenges) + 1;
        this.setState({challengeNumber: randomInt});
        var teams = this.props.teams
        this.setTeams(teams);
    }

    setTeams(teams) {
        this.setState({teams: teams})
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
                    console.log(this.state)
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
            return(
                <Text>Challenge 1</Text>
            )
        }

        const C02 = () => {
            return(
                <Text>Challenge 2</Text>
            )
        }

        const C03 = () => {
            return(
                <Text>Challenge 3</Text>
            )
        }

        const C04 = () => {
            return(
                <Text>Challenge 4</Text>
            )
        }

        const C05 = () => {
            return(
                <Text>Challenge 5</Text>
            )
        }

        const C06 = () => {
            return(
                <Text>Challenge 6</Text>
            )
        }

        return (
            <View>
                <Challenge />
            </View>
        );
    }
}

export default Challenges;
