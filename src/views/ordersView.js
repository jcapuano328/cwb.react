import React from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import OrderListView from './orderListView';
//import OrderDetailView from './orderDetailView';
import getGame from '../selectors/game';

var OrdersView = React.createClass({
    onSelect(country,army,order) {
        //this.refs.navigator.push({name: 'order', index: 1, country: country, army: army, order: order});
    },
    onAdd(country,army) {
        //this.refs.navigator.push({name: 'order', index: 1, country: country, army: army, order: null});
    },
    onRemove(country,army,order) {
        /*
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
        */
    },
    onAccept(o) {
        /*
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
        */
    },
    render() {
        return (
            <OrderListView armies={this.props.armies} onSelect={this.onSelect} onAdd={this.onAdd} onRemove={this.onRemove} />
        );        
        /*
        return (
            <Navigator
              ref="navigator"
              initialRoute={{name: 'list', index: 0}}
              renderScene={(route, navigator) => {
                  if (route.name == 'order') {
                      return (
                          <OrderDetailView country={route.country} army={route.army} order={route.order} events={this.props.events}
                            onAccept={this.onAccept}
                            onDiscard={() => navigator.pop()}
                          />
                      );
                  }
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
        */
    }
});

const mapStateToProps = (state) => ({
    armies: getGame(state).armies
});

module.exports = connect(
  mapStateToProps
)(OrdersView);