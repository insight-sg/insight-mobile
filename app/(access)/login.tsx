import { StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Text, View } from '../../components/Themed';
import { SIZES } from '../../constants/Theme';
import { Button } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { loginUser } from '../../services/user';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const resetFormFields = () => {
    setUsername("");
    setPassword("");
  };

  const loginFailed = (errorMessage: any) =>
  Alert.alert(
    'Error',
    errorMessage || 'An error occurred while trying to login!',
    [
      {
        text: 'Try again',
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
    },
  );

  return (
    <View style={[styles.container]}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      <Text style={[styles.welcomeText]} weight="bold">
        Welcome back!
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button
        style={[styles.loginbutton]}
        mode="contained"
        onPress={async() => {
          try {
            const result = await loginUser(username, password);
            if (result && result.message) {
              console.log('User Screen: Login error:', result.message);
              loginFailed('Invalid Username or Password!');
            } else if (result && result.user.user_id) {
              console.log('User Screen: Successful login. User ID:', result.user.user_id);
              resetFormFields();
            } else {
              console.log('User Screen: Unexpected result:', result);
            }
          } catch(error) {
            console.log('User Screen: Registration error:', error);
          }
        }}
      >
        Login
      </Button>
      <Text>
        Don't have an account?{' '}
        <TouchableOpacity
          onPress={() => {
            router.push({pathname: '/register'})
          }}
        >
          <Text style={styles.signUpLink}>Sign up</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 35,
  },
  welcomeText: {
    fontSize: 25,
    lineHeight: 26,
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  loginbutton: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: Colors.default.primary,
    borderRadius: 10
  },
  signUpLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10
  },
});
