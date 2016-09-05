'use strict';

var React = require('react');
import { View, Text, TouchableOpacity, Image } from 'react-native';
var Icons = require('./widgets/icons');
var range = require('./services/range');
var Roster = require('./services/roster');

var RosterBoxes = React.createClass({
    onSelected(status) {
        return () => {
            this.props.onChange && this.props.onChange(status);
        }
    },
    render() {
        let casualties = this.props.casualties || 0;
        let stragglers = this.props.stragglers || 0;
        let wreckLosses = this.props.wreckLosses || 0;
        let levels = this.props.displayLevel ? Roster.getFireLevels(this.props.total) : [];
        let extras = (wreckLosses?1:0) + (levels.length);
        let total = (this.props.total || 0) + extras;

        let status = {
            strength: this.props.total,
            casualties: casualties,
            stragglers: stragglers
        };
        let sidx = 0;
        //console.log('>>>>> ' + status.strength + '/' + status.casualties + '/' + status.stragglers + '/' + wreckLosses);
        return (
            <View>
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}} >
                    {range(0,total).map((i) => {
                        if (wreckLosses > 0 && status.strength == (this.props.total-wreckLosses)) {
                            //console.log('WRECK ' + i + '/' + status.strength + '/' + status.casualties + '/' + status.stragglers + '/' + wreckLosses);
                            wreckLosses = 0;    // trick it into not displaying the wreck divider more than once...
                            return (
                                <Image key={i}
                                    style={{marginLeft: i>0?2:0, marginBottom:2,width: 22, height: 22, resizeMode: 'contain'}}
                                    source={Icons['checkmark']} />
                            );
                        }

                        if (this.props.displayLevel) {
                            let fl = sidx < levels.length ? levels[sidx] : {};
                            if (i == 0 || status.strength == (fl.strength+fl.range)) {
                                //console.log('LEVEL ' + i + '/' + status.strength + '/' + status.casualties + '/' + status.stragglers + '/' + wreckLosses);
                                sidx++;
                                return (
                                    <Text key={i} style={{marginLeft: i>0?2:0, marginBottom:2, fontWeight: 'bold'}}>{fl.level}</Text>
                                );
                            }
                        }

                        //console.log('BOX   ' + i + '/' + status.strength + '/' + status.casualties + '/' + status.stragglers + '/' + wreckLosses);
                        let image = this.getImage(status);
                        if (this.props.onChange) {
                            return (
                                <TouchableOpacity key={i} onPress={this.onSelected(image)}>
                                    <Image
                                        style={{marginLeft: i>0?2:0, marginBottom:2,width: 22, height: 22, resizeMode: 'contain'}}
                                        source={Icons[image]} />
                                </TouchableOpacity>
                            );
                        }
                        return (
                            <Image key={i}
                                style={{marginLeft: i>0?2:0, marginBottom:2,width: 22, height: 22, resizeMode: 'contain'}}
                                source={Icons[image]} />
                        );
                    })}
                </View>
            </View>
        );
    },
    getImage(status) {
        status.strength--;
        if (status.casualties > 0) {
            status.casualties--;
            return 'casualty';
        }
        if (status.stragglers > 0) {
            status.stragglers--;
            return 'straggler';
        }

        return 'unchecked';
    }
});

module.exports = RosterBoxes;
