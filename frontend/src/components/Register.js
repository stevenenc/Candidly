/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../contexts/AuthContext';

const RegisterComponent = () => {
  const {register} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleRegister = () => {
    register(username, email, password)
      .then(() => navigation.navigate('Dashboard'))
      .catch(error => console.error('Registration error:', error));
  };

  return (
    <View style={{padding: 20}}>
      <Text>Register</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          marginVertical: 10,
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
        }}
      />
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterComponent;
