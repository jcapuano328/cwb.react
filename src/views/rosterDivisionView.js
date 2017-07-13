import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import CollapsibleHeader from '../components/collapsibleHeader';
import RosterBrigadeView from './rosterBrigadeView';
import RosterBoxes from './rosterBoxes';
import Icons from '../res';
import Roster from '../services/roster';

var RosterDivisionView = React.createClass({
    getInitialState() {
        return {
            expanded: false
        };
    },
    onToggle() {
        this.setState({expanded: !this.state.expanded});
    },
    render() {
        return (
            <View style={{flex: 1,marginRight: 5, paddingRight: 5, borderColor: 'gray',borderStyle: 'solid',borderWidth: 1,borderRadius: 10}}>
                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}}>                
                    <View style={{flex: 1}}>
                        <CollapsibleHeader image={this.getImage()} imagesize={32}
                            title={this.props.division.name} subtitle={this.props.division.commander.name} 
                            expanded={this.state.expanded} onPress={this.onToggle} />
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <RosterBoxes total={this.props.division.brigades.length}
                            casualties={Roster.wreckedBrigades(this.props.division)}
                            wreckLosses={this.props.division.wreckLosses}
                        />
                    </View>
                </View>                        
                {this.renderSubordinates()}
            </View>            
        );
    },
    getImage() {
        let image = this.props.country.toLowerCase()+'-division';
        if (Roster.destroyedBrigades(this.props.division) >= this.props.division.brigades.length) {
            image += '-destroyed';
        }
        else if (Roster.wreckedBrigades(this.props.division) >= this.props.division.wreckLosses) {
            image += '-wrecked';
        }
        return image;
    },
    renderSubordinates() {
        if (!this.state.expanded) {
            return null;
        }

        return (
            <View style={{marginLeft: 20}}>
                {this.props.division.brigades.map((b,i) => {
                    return (                        
                        <RosterBrigadeView key={i} country={this.props.country} army={this.props.army} brigade={b} />                        
                    );
                })}
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    sbrigade: state.brigade
});

module.exports = connect(
  mapStateToProps  
)(RosterDivisionView);