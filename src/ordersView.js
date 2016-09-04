'use strict'

var React = require('react');
import { View, Navigator, Alert } from 'react-native';
var OrderListView = require('./orderListView');
var OrderDetailView = require('./orderDetailView');
var Current = require('./services/current');
var log = require('./services/log');

var OrdersView = React.createClass({
    getInitialState() {
        console.log('intitial orders view');
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
        console.log('reset orders view');
        this.setState({armies: Current.armies()});
    },
    onSelect(country,army,order) {
        this.refs.navigator.push({name: 'order', index: 1, country: country, army: army, order: order});
    },
    onAdd(country,army) {
        this.refs.navigator.push({name: 'order', index: 1, country: country, army: army, order: null});
    },
    onRemove(country,army,order) {
        Alert.alert('Remove order from ' + order.sender + ' to ' + order.receiver + '?', 'The order will be permanently removed', [
            {text: 'No', style: 'cancel'},
            {text: 'Yes', onPress: () => {
                Current.order(order,'remove');
                Current.save()
                .then(() => {
                    this.props.events.emit('orderupdated',order);
                    this.refs.navigator.pop();
                })
                .catch((err) => {
                    log.error(err);
                    this.refs.navigator.pop();
                });
            }}
        ]);
    },
    onAccept(o) {
        //console.log(o);
        Current.order(o);
        Current.save()
        .then(() => {
            this.props.events.emit('orderupdated',o);
            this.refs.navigator.pop();
        })
        .catch((err) => {
            log.error(err);
            this.refs.navigator.pop();
        });
    },
    render() {
        return (
            <Navigator
              ref="navigator"
              initialRoute={{name: 'list', index: 0}}
              renderScene={(route, navigator) => {
                  if (route.name == 'order') {
                      console.log('orders view render detail');
                      return (
                          <OrderDetailView country={route.country} army={route.army} order={route.order} events={this.props.events}
                            onAccept={this.onAccept}
                            onDiscard={() => navigator.pop()}
                          />
                      );
                  }
                  console.log('orders view render list');
                  return (
                      <OrderListView armies={this.state.armies} events={this.props.events}
                        onSelect={this.onSelect}
                        onAdd={this.onAdd}
                        onRemove={this.onRemove}
                      />
                  );
              }}
            />
        );
    }
});

module.exports = OrdersView;
