import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, TextInput, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import { ThemeProvider, Text, Image, Input, Button, ListItem } from 'react-native-elements';
import Title  from './components/Title.js'

export default class Help extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource:[]
        };
    }

    componentDidMount(){
        const { navigation } = this.props;
        let url = navigation.getParam('baseUrl', 'NO-URL') + 'customers/0001000002001/accounts';
        let h = new Headers();
        h.append('Authorization', navigation.getParam('token', 'NO-TOKEN'));
        let req = new Request(url, {
            headers: h,
            method: 'GET'
        });
    
        fetch(req)
        .then(response => response.json())
        .then((responseJson)=> {
            this.setState({
            loading: false,
            dataSource: responseJson
            })
        })
        .catch(error=>console.log("BUSY")) //to catch the errors if any
    }

    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: .5,
                width:"100%",
                backgroundColor:"rgba(0,0,0,0.5)",
            }} />
        );
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem
            title={item.accountName}
            subtitle={item.accountId}
            leftAvatar={{ source: require('./assets/mobile-icon-resized.jpg') }}
            // onPress={() => this.props.navigation.navigate('List', {
            //     accountNo: item.accountId,
            //     baseUrl: this.props.navigation.getParam('baseUrl', 'NO-URL'),
            //     token: this.props.navigation.getParam('token', 'NO-TOKEN')
            // })
            onPress={() => this.props.navigation.navigate('Map')
            }
        />
    )

    render() {
        if(this.state.loading){
            return( 
                <View style={styles.loader}> 
                    <ActivityIndicator size="large" color="#0c9"/>
                </View>
        )}
           
        return (
            <ImageBackground source={require('./assets/background-dark.png')} 
            style={styles.container}
            >
                <ThemeProvider>
                    <View style={styles.container}>
                        <Title text="Select Your Account"/>
                        <FlatList
                            ItemSeparatorComponent = {this.FlatListItemSeparator}
                            keyExtractor={this.keyExtractor}
                            data={this.state.dataSource.items}
                            renderItem={this.renderItem}
                        />
                    </View>
                </ThemeProvider>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 5
    },
loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
    },
list:{
    flex: 1,
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff"
    },
});