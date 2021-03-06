import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    BackAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import ViewPagerComp from '../components/ViewPagerComp';
import ListComp from '../components/ListComp';
import { switchTitleBarTab } from '../actions/titleBarTab';
import { COMMON_BACKGROUND_COLOR } from '../Constants';
import CustomTitleBarComp from '../components/CustomTitleBarComp';

class HomePage extends Component {
    constructor(props){
        super(props);
        this.onViewPageScroll = this._onViewPageScroll.bind(this);
    }
    render(){
        // console.log("HomePage", this.props);
        return (
            <View style={styles.container}>
                <CustomTitleBarComp ref='titleBar'>
                    <CustomTitleBarComp.HeaderTabItem
                        tabText={'Android'}
                        selected={this.props.selectedTabIndex == 0}
                        onTabClick={this._switchTitleBarTab.bind(this, 0)}
                    />
                    <CustomTitleBarComp.HeaderTabItem
                        tabText={'iOS'}
                        selected={this.props.selectedTabIndex == 1}
                        onTabClick={this._switchTitleBarTab.bind(this, 1)}
                    />
                    <CustomTitleBarComp.HeaderTabItem
                        tabText={'前端'}
                        selected={this.props.selectedTabIndex == 2}
                        onTabClick={this._switchTitleBarTab.bind(this, 2)}
                    />
                </CustomTitleBarComp>
                <ViewPagerComp
                    selectedIndex={this.props.selectedTabIndex}
                    onViewPageScroll={this.onViewPageScroll}
                    onSelectedIndexChange={(curSelIndex) => this._switchTitleBarTab(curSelIndex)}>
                    <ListComp
                        tagName="tag_1"
                        category="Android"
                        navigator={this.props.navigator}
                    />
                    <ListComp
                        tagName="tag_2"
                        category="iOS"
                        navigator={this.props.navigator}
                    />
                    <ListComp
                        tagName="tag_3"
                        category="前端"
                        navigator={this.props.navigator}
                    />
                </ViewPagerComp>

            </View>
        );
    }

    _switchTitleBarTab(selIndex) {
        if (this.props.selectedTabIndex !== selIndex) {
            console.log('startTime', new Date().getTime());
            this.props.dispatch(switchTitleBarTab(selIndex));
        }
    }

    _onViewPageScroll(offset) {
        // console.log('_onViewPageScroll',offset);
        this.refs.titleBar.onPageScroll(offset);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COMMON_BACKGROUND_COLOR,
    },
});
// export default connect(({routes})=>({routes}))(HomePage);
function select(store) {
    return {
        selectedTabIndex: store.homePage.selectedTabIndex,
    }
}

export default connect(select)(HomePage);