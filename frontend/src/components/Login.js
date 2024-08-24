/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {View, TextInput, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../contexts/AuthContext';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          marginVertical: 10,
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          marginVertical: 10,
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
        }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={{marginVertical: 20, textAlign: 'center'}}>OR</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginComponent;
