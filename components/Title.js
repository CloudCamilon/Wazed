import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

export default class Title extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            style: {}
        };
    }

    componentDidMount(){
        const { text, style } = this.props;
        this.setState({
            text: text != null ? this.props.text : 'Input Title Here',
            style: style != null ? this.props.style : {
                color: 'white',
                marginBottom: 15 
            }
        })
    }

    render() {
        return(
          <View>
              <Text h3 style={this.state.style}> {this.state.text} </Text>
          </View>  
        );
    }
}


