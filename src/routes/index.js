import React from 'react';
import { connect } from 'react-redux';
import { Actions, Scene } from 'react-native-router-flux';
import {NavBar} from 'react-native-nub';
import {HomeView,AboutView,BattleView,OrderDetailView,OrderInitiativeView,OrderStoppageView} from '../views';
import {reset as refresh} from '../actions/current';
import {accept} from '../actions/order';
import Icons from '../res';

const rightButtons = [
    {image:'refresh', onPress: (props) => props.refresh()},
    {image:'info', onPress: () => Actions.about() }
];

const navBarOpts = {
    icons: Icons,
    style: {
        backgroundColor: 'gray'
    },    
    textcolor: 'white',
    menu: 'menu',
    //left: 'back',
    //onBack: Actions.pop,
    rightButtons: rightButtons
};


const navBarOrderDetailOpts = {
    ...navBarOpts,
    //menu: null,
    left: 'back',
    onBack: Actions.pop,    
    rightButtons: [
        {image:'accept', onPress: (props) => {
            props.accept();
            Actions.pop();
        }},
        {image:'discard', onPress: () => Actions.pop()}
    ]
};


const navBarOptsAbout = {
    ...navBarOpts,
    left: 'back',
    onBack: Actions.pop,
    rightButtons: []
};

const NavBarMain = connect(null, {refresh})(NavBar(navBarOpts));
const NavBarOrder = connect(null, {accept})(NavBar(navBarOrderDetailOpts));
const NavBarAbout = NavBar(navBarOptsAbout);

export default Actions.create(
    <Scene key="root" navBar={NavBarMain}>
        <Scene key="home" type="reset" component={HomeView} title="CWB Assistant" initial={true}/>
        <Scene key="battle" component={BattleView} title="" />
        <Scene key="order" navBar={NavBarOrder} component={OrderDetailView} title="" />
        <Scene key="orderinitiative" navBar={NavBarAbout} component={OrderInitiativeView} title="" />
        <Scene key="orderstop" navBar={NavBarAbout} component={OrderStoppageView} title="" />        
        <Scene key="about" navBar={NavBarAbout} component={AboutView} title="About" />
    </Scene>
);