import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, TextInput} from 'react-native';
import { ThemeProvider, Text, Image, Input, Button, Icon } from 'react-native-elements';
import Title  from './components/Title.js'

type Props = {};
export default class Description extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
        coordinate: {
            latitude: '',
            longitude: '',
        },
        title: '',
        description: '',
        image: require('./assets/atm-icon.png'),
        grade: ''
    };
 
  }

  componentDidMount(){
    const { navigation } = this.props;
    let payload = navigation.getParam('marker','NO-DATA');
    this.setState({
        ...payload
    });
  }

  render() {
    let uri = `./assets/grades/${this.state.grade}.png`
    return (
        <ThemeProvider>
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <Text h3 style={styles.bankTitle}>
                        {this.state.title}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginHorizontal: 25
                        }}
                    >
                        <Icon
                            name='map-marker'
                            type='font-awesome'
                        />
                        <Text   
                            style={{
                                marginTop: 5,
                                textAlign: 'center'
                            }}
                        >
                            {this.state.description}
                        </Text>
                    </View>
                </View>
                <View style={{
                    flex: 6,
                }}>
                <Image 
                
                    source={varGrades(this.state.grade)}
                    style={{
                        height: '100%',
                        width: '100%',
                        alignSelf: 'center',
                        resizeMode: 'contain',
                    }}
                />

                </View>
                   
                <View
                    style={{
                      padding: 10  
                    }}
                >

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon
                            name='check'
                            type='font-awesome'
                            iconStyle={{ marginRight: 10}}
                        />
                        <Text   
                            style={{
                                margin: 0,
                                backgroundColor: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            5 Minutes to Finish Your Transaction
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginVertical: 5
                        }}
                    >
                        <Icon
                            name='clock-o'
                            type='font-awesome'
                            iconStyle={{ marginRight: 10}}
                        />
                        <Text   
                            style={{
                                margin: 0,
                                backgroundColor: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginRight: 5
                            }}
                        >
                            Closing Soon: 
                        </Text>
                        <Text>
                             9am-5pm
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon
                            name='ticket'
                            type='font-awesome'
                            iconStyle={{ marginRight: 10}}
                        />
                        <Text   
                            style={{
                                margin: 0,
                                backgroundColor: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginRight: 5
                            }}
                        >
                            Currently Serving: 
                        </Text>
                        <Text>
                            B244
                        </Text>
                    </View>
                </View>

                
                <View style={{
                    flexGrow: 3,
                    justifyContent: 'center',
                    alignContent: 'center',
                    padding: 20
                }}>
                    <Button
                        title='Reserve a Ticket'
                        buttonStyle={{
                            backgroundColor: '#0E69CC',
                            borderRadius: 5,
                        }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                        containerStyle={{ flex: 1 , marginVertical: 5,  
                        }}
                        underlayColor="transparent"
                    />

                    <Button
                        title='View'
                        buttonStyle={{
                            backgroundColor: '#0E69CC',
                            borderRadius: 5,
                        }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                        containerStyle={{ flex: 1 , marginVertical: 5,
                        }}
                        underlayColor="transparent"
                    />
                  
                </View>
            </View>
        </ThemeProvider>
    );
  }
}


const varGrades = grade => {

    let grades = {
        A:  require('./assets/grades/A.png'),
        B:  require('./assets/grades/B.png'),
        C:  require('./assets/grades/C.png'),
        D:  require('./assets/grades/D.png'),
    }
    return (grades[grade]);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 30,
    backgroundColor:'#FAFAFE'
  },
  headContainer: {
    flexGrow: 0.5,
    alignItems: 'center',
    textAlign: 'center',
  },
  bankTitle: {
      color: '#51585D',
      textAlign: 'center'
  }
});
