import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {Arrow,Style} from 'react-native-nub';
import Icons from '../res';

var CollapsibleHeader = React.createClass({
    render() {
        return (
            <View style={{flex:1}}>
                <TouchableOpacity onPress={this.props.onPress}>    
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flex: 1,
                        flexDirection: 'row',
                        margin: 5,
                        padding: 5,
                        //backgroundColor: '#eaeaea',
                        borderRadius: 3
                    }}>
                        <View style={{marginTop: 0, marginRight: 5}}>
                            <Arrow size={18} direction={this.props.expanded ? 'down' : 'right'} />
                        </View>                        
                        <Image style={{
                            //flex: 1,
                            //width: null,
                            //height: null,
                            width: this.props.imagesize||96,
                            height: this.props.imagesize||96,
                            resizeMode: 'contain',
                            //backgroundColor: 'transparent',
                        }} source={Icons[this.props.image]} />
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Text style={{flex: 1, fontSize: Style.Font.large(),textAlign: 'center',margin: 10}}>{this.props.title}</Text>
                            <Text style={{flex: 1, fontSize: Style.Font.medium(),textAlign: 'center',margin: 10}}>{this.props.subtitle}</Text>
                        </View>
                        {this.props.children}
                    </View>                    
                </TouchableOpacity>
            </View>
        );
    }
});

module.exports = CollapsibleHeader;