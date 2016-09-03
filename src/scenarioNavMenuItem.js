var React = require('react');
import { View, TouchableOpacity, Text } from 'react-native';
var moment = require('moment');

var ScenarioNavMenuItem = React.createClass({
    onPress() {
        this.props.onSelected && this.props.onSelected('battle', this.props.scenario.id);
    },
    render() {
        let startdt = moment(new Date(this.props.scenario.startDateTime));
        let enddt = moment(new Date(this.props.scenario.endDateTime));
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    flex: 1,
                    flexDirection: 'column',
                    margin: 5,
                    //padding: 1,
                    backgroundColor: '#eaeaea',
                    borderRadius: 3,
                }}>
                    <Text style={{fontSize: 16,textAlign: 'left',marginLeft: 10,marginTop: 2}}>{this.props.scenario.name}</Text>
                    <Text style={{fontSize: 12,textAlign: 'left',marginLeft: 10,marginTop: 2}}>
                        {startdt.format("MMM DD, YYYY HH:mm")}{' - '}{enddt.format("MMM DD, YYYY HH:mm")}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
});

module.exports = ScenarioNavMenuItem;
