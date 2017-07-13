import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {Style,IconButton} from 'react-native-nub';
import Icons from '../res';

var BadgeView = React.createClass({
    getInitialState() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width /*||
            this.state.height != e.nativeEvent.layout.height*/) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },    
    render() {    
        let iconsize = 48;//(Math.min(this.state.height, this.state.width) * 0.75) || 16;    
        let backcolor = this.props.selected ? 'gainsboro' : 'transparent';
        return (
            <TouchableOpacity style={{marginTop:2, marginBottom:2,backgroundColor:backcolor}} onPress={() =>this.props.onPress && this.props.onPress(this.props.item)} >
                <Image style={{width: iconsize,height: iconsize,resizeMode: 'contain', alignSelf:'center'}} source={Icons[this.props.item.image]}/>
                <Text style={{fontSize: Style.Font.large(),textAlign: 'center'}}>{this.props.item.name}</Text>                
            </TouchableOpacity>            
        );
    }
});

var SelectableHeader = React.createClass({
    onSelect(i) {
        this.props.onSelected && this.props.onSelected(i);
    },        
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1,flexDirection:'row', justifyContent: 'center', alignItems: 'flex-start',
                    borderBottomWidth:1, borderBottomColor:'gray'}}>
                    {(this.props.items||[]).map((item, i) => {
                        return (
                            <View style={{flex:1}} key={i}>
                            <BadgeView key={i} item={item} selected={this.props.selected&&this.props.selected.name==item.name} onPress={this.onSelect} />
                            </View>
                        );
                    })}
                    {this.props.children}
                </View>    
            </View>
        );
    }
});

module.exports = SelectableHeader;