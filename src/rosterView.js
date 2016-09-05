'use strict'

var React = require('react');
import { View } from 'react-native';
var RosterListView = require('./rosterListView');
var Current = require('./services/current');
var log = require('./services/log');

var RosterView = React.createClass({
    getInitialState() {
        return {
            armies: Current.armies()
        };
    },
    componentDidMount() {
        this.props.events.addListener('reset', this.onReset);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    onReset() {
        this.setState({armies: Current.armies()});
    },
    render() {
        return (
            <RosterListView armies={this.state.armies} events={this.props.events} />
        );
    }
});

module.exports = RosterView;
