import React, {Component} from 'react';
import {StyleSheet, View, Animated, Image, TextInput, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { ThemeProvider, Icon, Text, Input, Button, ListItem } from 'react-native-elements';
import MapView, {Callout, Marker} from 'react-native-maps';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 3.9;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class Help extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(0),
            index: 0,
            loading: true,
            dataSource:[],
            region:{
              latitude: 14.558290,
              longitude: 121.026330,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            },
            markers: [
              {
                coordinate: {
                  latitude: 14.558290,
                  longitude: 121.026330,
                },
                title: 'BDO Makati Zuellig Branch',
                description: 'Unit 2, Ground Floor, Zuellig Building, Makati Avenue corner Paseo de Roxas, Makati, Metro Manila',
                image: require('./assets/atm-icon.png'),
                isFocus: false,
                grade: 'A'
              },
              {
                coordinate: {
                  latitude: 14.5556,
                  longitude: 121.0251,
                },
                title: 'BDO Makati Peninsula Hotel',
                description: 'Corner of Ayala and Makati Avenues, 1226, Makati, Metro Manila',
                image: require('./assets/atm-icon.png'),
                isFocus: false,
                grade: 'B'
              },
              {
                coordinate: {
                  latitude: 14.5571,
                  longitude: 121.0230,
                },
                title: 'BDO Makati Ayala Triangle',
                description: 'Makati Avenue, corner Ayala Ave, Makati, Metro Manila' ,
                image: require('./assets/atm-icon.png'),
                isFocus: false,
                grade: 'C'
              },
              {
                coordinate: {
                  latitude: 14.5517,
                  longitude: 121.0273,
                },
                title: 'BDO Makati Glorietta 5',
                description: 'The Landmark Makati, Makati Ave, Makati, 1223 Metro Manila' ,
                image: require('./assets/atm-icon.png'),
                isFocus: false,
                grade: 'D'
              }
            ],
            mapStyle: [
              {
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#242f3e"
                  }
                ]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#746855"
                  }
                ]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#242f3e"
                  }
                ]
              },
              {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#d59563"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#d59563"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#263c3f"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#6b9a76"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#38414e"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#212a37"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#9ca5b3"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#746855"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#1f2835"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#f3d19c"
                  }
                ]
              },
              {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#2f3948"
                  }
                ]
              },
              {
                "featureType": "transit.station",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#d59563"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#17263c"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#515c6d"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#17263c"
                  }
                ]
              }
            ]
        };
    }

    componentDidMount() {
      this.state.animation.addListener(({ value }) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= this.state.markers.length) {
          index = this.state.markers.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }

        clearTimeout(this.regionTimeout);
        this.regionTimeout = setTimeout(() => {
          let previousIndex = this.state.index;

          if (this.state.index !== index) {
            let markers = [...this.state.markers];
            this.state.index = index;
            const { coordinate } = this.state.markers[index];
            this.map.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta,
              },
              350
            );
            markers[previousIndex] = {...markers[previousIndex], isFocus: false};  
            markers[index] = {...markers[index], isFocus: true};
            this.setState({ markers });
          }
        }, 10);
      })
    }

    render() { 
        return (
            <ThemeProvider>
                <View style={styles.container}>
                    <MapView
                        ref={map => this.map = map}
                        style={styles.map}
                        initialRegion={this.state.region}
                        customMapStyle={this.state.mapStyle}
                    >
                      {this.state.markers.map((marker, index) => {
                          return ( 
                            <Marker 
                              key={index} 
                              coordinate={marker.coordinate}
                              title={marker.title}
                              description={marker.description}
                            >
                              <View style={styles.marker}>
                                <Image
                                  style={[
                                    styles.markerContent,
                                    {width: marker.isFocus ? 65 : 50 },
                                    {height: marker.isFocus ? 65 : 50 }
                                  ]}
                                  source={require('./assets/custom-marker.png')}
                                />
                              </View>
                            </Marker>
                          );
                        })
                      }
                    </MapView>
                    <Animated.ScrollView
                      horizontal
                      scrollEventThrottle={1}
                      showsHorizontalScrollIndicator={true}
                      snapToInterval={CARD_WIDTH}
                      disableScrollViewPanResponder={true}
                      onScroll={Animated.event(
                        [
                          {
                            nativeEvent: {
                              contentOffset: {
                                x: this.state.animation,
                              },
                            },
                          },
                        ],
                        { useNativeDriver: true }
                      )}
                      style={styles.scrollView}
                      contentContainerStyle={styles.endPadding}
                    >
                       {this.state.markers.map((marker, index) => (
                        <TouchableOpacity 
                          style={styles.card} 
                          key={index}
                          activeOpacity={0.5}
                          onPress={() => this.props.navigation.navigate('Description',{
                            marker: this.state.markers[index],
                          })}
                        >
                          <Image
                            source={marker.image}
                            style={styles.cardImage}
                          />
                          <View style={styles.textContent}>
                            <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                            <Text numberOfLines={1} style={styles.cardDescription}>
                              {marker.description}
                            </Text>
                          </View>

                        </TouchableOpacity>

                      ))}
                    </Animated.ScrollView>
                     <Callout>
                        <View style={styles.calloutView} >
                            <Input style={styles.calloutSearch}
                                placeholder={ "Find Your Bank" }
                                leftIcon={{ 
                                    type: 'font-awesome', 
                                    name: 'search',
                                    iconStyle: {
                                        color: 'gray',
                                        fontSize: 20,
                                        marginRight: 10
                                    }
                                }}
                            />
                        </View>
                    </Callout>
                </View>
            </ThemeProvider>
        );
    }
  }

  
const styles = StyleSheet.create({
  container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      alignItems: 'stretch',
      padding: 5
    },
    map:{
      ...StyleSheet.absoluteFillObject,
    },
    calloutView: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: 10,
      width: "80%",
      marginLeft: "5%",
      marginRight: "30%",
      marginTop: 20
    },
    calloutSearch: {
      borderColor: "transparent",
      marginLeft: 10,
      width: "100%",
      marginRight: 10,
      height: 50,
      borderWidth: 0.0  
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'red'
    },
    scrollView: {
      position: "absolute",
      bottom: 10,
      left: 0,
      right: 0,
      paddingVertical: 25,
      backgroundColor: 'transparent',
    },
    endPadding: {
      paddingRight: width - CARD_WIDTH,
    },
    card: {
      padding: 10,
      elevation: 2,
      backgroundColor: "#FFF",
      marginHorizontal: 10,
      shadowColor: "#000",
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: { x: 2, y: -2 },
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      overflow: "hidden",
    },
    cardImage: {
      flex: 3,
      width: "100%",
      height: "100%",
      alignSelf: "center",
      resizeMode: 'contain'
    },
    textContent: {
      flex: 1,
    },
    cardtitle: {
      fontSize: 12,
      marginTop: 5,
      fontWeight: "bold",
    },
    cardDescription: {
      fontSize: 12,
      color: "#444",
    },
    markerContainer:{
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 0,
      height: 25,
      width: 150,
      overflow: "hidden",
    },
    marker: {
      borderRadius: 5,
      padding: 25
    },
    markerContent: {
      width: 50,
      height: 50,
      resizeMode: 'contain'
    }
});