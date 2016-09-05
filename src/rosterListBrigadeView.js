'use strict';

var React = require('react');
import { View, Text, Image } from 'react-native';
var icons = require('./widgets/icons');
var RosterBoxes = require('./rosterBoxes');
var Roster = require('./services/roster');
var Current = require('./services/current');

var RosterListBrigadeView = React.createClass({
    getInitialState() {
        return {
            losses: this.props.brigade.losses,
            stragglers: this.props.brigade.stragglers
        };
    },
    componentDidMount() {
        this.props.events.addListener('reset', this.onReset);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    onReset() {
        // are there any scenario pre-defined losses?
        this.setState({losses: 0,stragglers: 0});
    },
    onChanged(status) {
        if (status == 'unchecked') {
            this.props.brigade.stragglers++;
        } else if (status == 'straggler') {
            this.props.brigade.losses++;
            this.props.brigade.stragglers--;
        } else if (status == 'casualty') {
            this.props.brigade.losses--;
        }

        Current.save()
        //new Promise((a,r)=> a())
        .then(() => {
            this.setState({losses: this.props.brigade.losses,stragglers: this.props.brigade.stragglers});
            this.props.events.emit('rosterchange');
        })
        .catch((err) => {

        });
    },
    render() {
        return (
            <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-start',
                            margin: 5,padding: 5,//backgroundColor: this.getBackground(),//backgroundColor: '#eaeaea',//backgroundColor: 'gray',
                            borderColor: 'gray',borderStyle: 'solid',borderWidth: 1,borderRadius: 10}}>

                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}}>
                    <Image style={{width: 32, height: 32, resizeMode: 'contain'}} source={icons[this.getImage()]} />
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Text style={{flex: 1, fontSize: 20,textAlign: 'center',margin: 10}}>{this.props.brigade.name}</Text>
                        <Text style={{flex: 1, fontSize: 15,textAlign: 'center',margin: 10}}>{this.props.brigade.commander}</Text>
                        <Text style={{flex: 1, fontSize: 15,textAlign: 'center',margin: 10}}>{this.props.brigade.moraleLevel}</Text>
                        {/*<Text style={{flex: 1, fontSize: 15,textAlign: 'center',margin: 10}}>{Roster.getFireLevel(this.props.brigade.totalStrength-this.props.brigade.losses-this.props.brigade.stragglers).level}</Text>*/}
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <RosterBoxes country={this.props.country}
                        total={this.props.brigade.totalStrength}
                        casualties={this.state.losses}
                        stragglers={this.state.stragglers}
                        wreckLosses={this.props.brigade.wreckLosses}
                        displayLevel={true}
                        onChange={this.onChanged}
                    />
                </View>
            </View>
        );
    },
    getBackground() {
        return this.props.country.toLowerCase() == 'usa' ? 'darkslateblue' : 'darkgray';
    },
    getImage() {
        let image = this.props.country.toLowerCase()+'-brigade';
        if (Roster.isDestroyed(this.props.brigade)) {
            image += '-destroyed';
        }
        else if (Roster.isWrecked(this.props.brigade)) {
            image += '-wrecked';
        }
        return image;
    }
});

module.exports = RosterListBrigadeView;
