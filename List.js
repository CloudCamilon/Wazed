import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, TextInput, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import { ThemeProvider, Text, Image, Input, Button, ListItem  } from 'react-native-elements';

export default class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigation: {},
            loading: true,
            dataSource:[]
        };
    }

    componentDidMount() {

        const { navigation } = this.props;
        const itemId = navigation.getParam('accountNo', 'NO-ID');
        let url = navigation.getParam('baseUrl', 'NO-URL') + 'accounts/' +  itemId + '/transactions';
        let h = new Headers();
        h.append('Authorization', navigation.getParam('token', 'NO-TOKEN')); 
        
        let req = new Request(url, {
            headers: h,
            method: 'GET'
        });

        console.log('MATAYA TAYA' + url);

    
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

    renderItem = ({ item }) => (
        <View>
            <ListItem
                title={item.creditDebitIndicator}
                subtitle={item.valueDate}
                leftAvatar={{ source: { uri: item.avatar_url } }}
            />
        </View>
      )
    render() {
        if(this.state.loading){
            return( 
                <View style={styles.loader}> 
                    <ActivityIndicator size="large" color="#0c9"/>
                </View>
        )}

        return (
            <View style={styles.container}>
                <FlatList
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    keyExtractor={this.keyExtractor}
                    data={this.state.dataSource.items}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: 'center',
    
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
     }
  });