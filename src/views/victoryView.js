import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import {SpinNumeric} from 'react-native-nub';
import Icons from '../res';
import Roster from '../services/roster';
import getGame from '../selectors/game';
import {setCsaVp,setUsaVp} from '../actions/current';

let ArmyVictoryView = React.createClass({
    render() {
        return (
            <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{height: 64, width: 96, resizeMode: 'stretch'}} source={Icons[this.props.army]} />
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <Text>Victory Points</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <SpinNumeric value={this.props.vp.toString()} min={0} max={100} onChanged={this.props.onChangeVP} />
                    </View>
                    <View style={{flex:1, marginLeft: 10}}><Text style={{color: 'transparent'}}>by Casualty</Text></View>
                </View>
                <View style={{flex: .5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <Text>Wrecked</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={{textAlign: 'center'}}>{this.props.wrecked.toString()}</Text>
                    </View>
                    <View style={{flex:1, marginLeft: 10}}><Text style={{color: 'transparent'}}>by Casualty</Text></View>
                </View>
                <View style={{flex: .5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex:1, marginLeft: 10}}><Text style={{color: 'transparent'}}>Wrecked</Text></View>
                    <View style={{flex: 2}}>
                        <Text style={{textAlign: 'center'}}>{this.props.wreckedbycasualty.toString()}</Text>
                    </View>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <Text>by Casualty</Text>
                    </View>
                </View>
                <View style={{flex:6}} />
            </View>
        );
    }
});

let VictoryView = React.createClass({
    onChangeUSAVP(v) {
        this.props.setUsaVp(v);
    },
    onChangeCSAVP(v) {
        this.props.setCsaVp(v);
    },
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <ArmyVictoryView army={'USA'} vp={this.props.usa.vp} wrecked={this.props.usa.wrecked} wreckedbycasualty={this.props.usa.wreckedByCasualty} onChangeVP={this.onChangeUSAVP}/>
                <ArmyVictoryView army={'CSA'} vp={this.props.csa.vp} wrecked={this.props.csa.wrecked} wreckedbycasualty={this.props.csa.wreckedByCasualty} onChangeVP={this.onChangeCSAVP}/>
            </View>
        );
    }
});

const mapStateToProps = (state) => {
    let battle = getGame(state);
    return {        
        usa: {
            vp: state.usa.vp,
            wrecked: Roster.totalWrecked(battle,'USA'),
            wreckedByCasualty: Roster.totalWrecked(battle,'USA',true),
        },
        csa: {
            vp: state.csa.vp,
            wrecked: Roster.totalWrecked(battle,'CSA'),
            wreckedByCasualty: Roster.totalWrecked(battle,'CSA',true),
        }    
    };
}

module.exports = connect(
  mapStateToProps,
  {setCsaVp,setUsaVp}
)(VictoryView);
