import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, TextInput} from 'react-native';
import { ThemeProvider, Text, Image, Input, Button } from 'react-native-elements';


type Props = {};
export default class Home extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
      isSignUp: false,
      baseUrl: 'https://api.lobdev.fusionfabric.cloud/retail-banking/accounts/v1/',
      token: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYTEJpUk5ZMkRvWS0wREVkQVBsMmJxUGpJWXZRUjVqalhBMmczZzczQzYwIn0.eyJqdGkiOiIzNTFiMzc5ZS1hZDcwLTQ4ODAtOTgzMi02NDdhMTc1YTk2OTYiLCJleHAiOjE1NTcyODU0MjUsIm5iZiI6MCwiaWF0IjoxNTU3MjgxODI1LCJpc3MiOiJodHRwczovL2FwaS5sb2JkZXYuZnVzaW9uZmFicmljLmNsb3VkL2xvZ2luL3YxIiwic3ViIjoiY2FmYzIzMDItYjM2My00ZmY2LTk0NGEtMjRmYTVkYjZlYzg2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiNTlmYjcxOWYtMThhNy00MDJhLWFlMGYtYWZhZjJjYjdkZTMxIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiZTg5NTMwYmQtYjAwYS00NjJiLTgxNjAtMGE4NTNkNDJkZGIyIiwiYWNyIjoiMSIsInNjb3BlIjoiIiwiYXBwIjoiNTlmYjcxOWYtMThhNy00MDJhLWFlMGYtYWZhZjJjYjdkZTMxIiwidGVuYW50Ijoic2FuZGJveCIsInVzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTU5ZmI3MTlmLTE4YTctNDAyYS1hZTBmLWFmYWYyY2I3ZGUzMSJ9.YggI86k7iMeYjGtV56IgNmiDbveS2XbbwmDVJqN2x8ZcVtCbRnh8QW3RrtHWyv5577weg1YMA2ulfP3IryKfaimJP1SOdvEK5PwfT9zziyPfi-RjvRHE6x2RhYviJulwVLRtf6URGqIK3oxxOy_dCmHDLO7ay2dpZiWWNqIvpHxe5llCyMJcmgSUyxIaHo1eTdYA75Z-Tu0VtIUCu_-0zVO0YixrbbqkMIriwDxBYiXgFAp11HXg8Q98MxepODZ2qa9B1kuc6S4ILB61Cdtu7gdeJAIXA8kRprYsBUV4O0thRCt6w4yQtaklrAqsR5ruepXHf6XAAo_zuGk2puJvoA'
    };
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  login() {
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
      });
    }, 1500);
  }

  signUp() {
    this.setState({isSignUp: true});
  }

  render() {
    const {
      isEmailValid,
      isPasswordValid,
      email,
      password,
    } = this.state;
    return (
      <ImageBackground source={require('./assets/background-dark.png')} 
          style={styles.container}
      >
      
        <ThemeProvider>
          <View style={styles.container}>
              <View style={styles.title} >
                <Text h1 style={styles.appTitle}>
                  FINANDCER 
                </Text>
                <Image
                  source={require('./assets/compass.png')}
                  style={{ width: 75, height: 75, }}
                />
              </View>
              <View style={!this.state.isSignUp ? styles.loginBody : [styles.loginBody, {flex: 5}]} >
                <Input
                  placeholder='E-mail'
                  leftIcon={{ 
                    type: 'font-awesome', 
                    name: 'envelope',
                  }}
                  autoFocus={false}
                  keyboardType="email-address"
                  ref={input => (this.emailInput = input)}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={email => this.setState({ email })}
                  errorMessage={
                    isEmailValid ? null : 'Please enter a valid email address'
                  }
                  inputStyle={{ marginLeft: 10,}}
                  containerStyle={{flex: 2, width: 300, justifyContent: 'center', }}
                /> 
                <Input
                  placeholder='Password'
                  leftIcon={{ 
                    type: 'font-awesome', 
                    name: 'lock',
                  }}
                  blurOnSubmit={true}
                  ref={input => (this.passwordInput = input)}
                    onSubmitEditing={() =>
                        this.login()
                  }
                  secureTextEntry={true}
                  inputStyle={{ marginLeft: 10, }}
                  onChangeText={password => this.setState({ password })}
                  errorMessage={
                    isPasswordValid
                      ? null
                      : 'Please enter at least 8 characters'
                  }
                  containerStyle={{flex: 2, width: 300, justifyContent: 'center', marginVertical: '5%'}}
                /> 
                {this.state.isSignUp && (
                   <Input
                   placeholder='Confirm Password'
                   leftIcon={{ 
                     type: 'font-awesome', 
                     name: 'lock',
                   }}
                   blurOnSubmit={true}
                   ref={input => (this.passwordInput = input)}
                     onSubmitEditing={() =>
                         this.login()
                   }
                   secureTextEntry={true}
                   inputStyle={{ marginLeft: 10, }}
                   onChangeText={password => this.setState({ password })}
                   errorMessage={
                     isPasswordValid
                       ? null
                       : 'Please enter at least 8 characters'
                   }
                   containerStyle={{flex: 2, width: 300, justifyContent: 'center', marginBottom: '5%'}}
                    /> 
                )}
                <Button
                  title={this.state.isSignUp ? "Sign Up" : "Log in"}
                  loading={false}
                  loadingProps={{ size: 'small', color: 'white' }}
                  buttonStyle={{
                    backgroundColor: '#0E69CC',
                    borderRadius: 5,
                  }}
                  titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                  containerStyle={{ flex: 1 ,marginVertical: 10, height: 50, width: 200, marginBottom: '10%' }}
                  underlayColor="transparent"
                  onPress={this.login}
                />
                 <Button
                  title={!this.state.isSignUp ? "Create an account" : "Log In" }
                  loading={false}
                  loadingProps={{ size: 'small', color: 'white' }}
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    borderRadius: 5,
                  }}
                  titleStyle={{ fontSize: 14, fontWeight: '100' , color: '#3E3EC9'}}
                  underlayColor="transparent"
                  onPress={!this.state.isSignUp ? this.signUp : password => this.setState({ isSignUp: false })}
                />
              </View>
              <View style={styles.help} >
                  <Button
                  title="Need help?"
                  loading={false}
                  loadingProps={{ size: 'small', color: 'white' }}
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    borderRadius: 5,
                  }}
                  titleStyle={{ fontSize: 22, fontWeight: '100' }}
                  underlayColor="transparent"
                  onPress={() => this.props.navigation.navigate('Map',{
                    baseUrl: this.state.baseUrl,
                    token: this.state.token
                })}
                />
              </View>
              <View style={{flex: 1}}></View>
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
    opacity: 100,
    alignItems: 'center',
  },
  title: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginBottom: '5%'
  },
  appTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginBody: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    elevation: 30
  },
  
  help: {
    paddingTop: '2%',
    flex: 1,
    color: 'white'
  }

});
