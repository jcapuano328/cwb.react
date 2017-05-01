import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {Style,Landing} from 'react-native-nub';
import {splash} from '../res';
import getGame from '../selectors/game';

var HomeView = React.createClass({    
    componentDidUpdate() {        
        if (this.props.battle && this.props.battle.name) {
            Actions.battle({title: this.props.battle.name, subtitle: this.props.battle.scenario.name});
        }
    },    
    render() {        
        return (
            <Landing splash={splash} top={Style.Scaling.scale(44)} />
        );
    }
});

const mapStateToProps = (state) => ({
    battle: getGame(state)
});

module.exports = connect(
  mapStateToProps
)(HomeView);