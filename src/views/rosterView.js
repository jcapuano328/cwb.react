import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import RosterArmyView from './rosterArmyView';
//import RosterBrigadeView from './rosterBrigadeView';

var RosterView = React.createClass({
    render() {
        let armies = this.armies();
        return (
            <View style={{flex: 1,justifyContent: 'flex-start'}}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                    {(armies||[]).map((army, i) => {
                        return (
                            <RosterArmyView key={i} army={army} />
                        );
                    })}
                    {/*<RosterBrigadeView country={'USA'} army={'APot'} brigade={{
                        id: 570,
                        name: '2-3-9',
                        commander: 'Humphrey',
                        moraleLevel: 'C',
                        totalStrength: 23,
                        losses: 0,
                        stragglers: 0,
                        wreckLosses: 10
                    }} events={this.props.events} />*/}
                    {/*<RosterBrigadeView country={'USA'} army={'APot'} brigade={{
                        id: 512,
                        name: '1-1-2',
                        commander: 'Miles',
                        moraleLevel: 'B',
                        totalStrength: 11,
                        losses: 0,
                        stragglers: 0,
                        wreckLosses: 5
                    }} events={this.props.events} />*/}
                </ScrollView>
            </View>
        );
    },
    armies() {
        let l = [];
        [this.props.usa,this.props.csa].forEach((c) => {
            Object.keys(c).forEach((k) => {
                l.push(c[k]);
            });
        })
        return l;
    }
});


const mapStateToProps = (state) => ({
    usa: state.usa.roster,
    csa: state.csa.roster
});

module.exports = connect(
  mapStateToProps
)(RosterView);

