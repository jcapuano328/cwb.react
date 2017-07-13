import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Style} from 'react-native-nub';
import CollapsibleHeader from '../components/collapsibleHeader';
//import RosterBoxes from './rosterBoxes';
import RosterStrengthView from './rosterStrengthView';
import Icons from '../res';
import Roster from '../services/roster';
import {updateBrigade} from '../actions/roster';

var RosterBrigadeView = React.createClass({
    onChanged(status, value) {
        /*
        if (status == 'unchecked') {
            this.props.brigade.stragglers++;
        } else if (status == 'straggler') {
            this.props.brigade.losses++;
            this.props.brigade.stragglers--;
        } else if (status == 'casualty') {
            this.props.brigade.losses--;
        }
        */
        switch(status)
        {
            case 'kia':
            this.props.brigade.losses = value;
            break;
            case 'wia':
            this.props.brigade.stragglers = value;
            break;
        }
        this.props.updateBrigade(this.props.country, this.props.army, this.props.brigade);
    },
    render() {
        return (
            <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-start',
                            //backgroundColor: this.getBackground(),//backgroundColor: '#eaeaea',//backgroundColor: 'gray',
                            /*borderColor: 'gray',borderStyle: 'solid',borderWidth: 1,borderRadius: 10*/}}>

                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}}>
                    <Image style={{width: 32, height: 32, resizeMode: 'contain'}} source={Icons[this.getImage()]} />
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Text style={{flex: 2, fontSize: Style.Font.medium(),textAlign: 'center'}}>{this.props.brigade.name}</Text>
                        <Text style={{flex: 5, fontSize: Style.Font.medium(),textAlign: 'center'}}>{this.props.brigade.commander.name}</Text>
                        <Text style={{flex: 2, fontSize: Style.Font.medium(),textAlign: 'center'}}>{this.props.brigade.moraleLevel}</Text>
                        {/*<Text style={{flex: 1, fontSize: Style.Font.medium(),textAlign: 'center',margin: 10}}>{Roster.getFireLevel(this.props.brigade.totalStrength-this.props.brigade.losses-this.props.brigade.stragglers).level}</Text>*/}
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <RosterStrengthView country={this.props.country}
                            total={this.props.brigade.totalStrength}
                            casualties={this.props.brigade.losses}
                            stragglers={this.props.brigade.stragglers}
                            wreckLosses={this.props.brigade.wreckLosses}
                            displayLevel={true}
                            onChange={this.onChanged}
                        />
                    </View>                    
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

const mapStateToProps = (state) => ({
    sbrigade: state.brigade
});

module.exports = connect(
  mapStateToProps,
  {updateBrigade}
)(RosterBrigadeView);
