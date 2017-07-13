import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SelectableHeader from '../components/selectableHeader';
import RosterArmyView from './rosterArmyView';
//import RosterBrigadeView from './rosterBrigadeView';

var RosterView = React.createClass({
    getInitialState() {
        return {
            selected: null
        };
    },
    onSelectArmy(a) {
        var army = (this.armies()||[]).find((ia) => ia.name == a.name);
        this.setState({selected:army});
    },        
    render() {
        let armies = this.armies() || [];
        return (
            <View style={{flex: 1,justifyContent: 'flex-start'}}>
                <SelectableHeader items={armies.map((army) => ({name:army.name,image:army.country}))} 
                    selected={this.state.selected} onSelected={this.onSelectArmy} />
                <View style={{flex:6}}>
                    {this.renderRoster()}
                </View>
            </View>
        );
    },
    renderRoster() {
        if (this.state.selected) {
            return (                
                <RosterArmyView army={this.state.selected} />
            );
        }
        return null;
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

