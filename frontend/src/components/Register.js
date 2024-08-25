/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../contexts/AuthContext';

const RegisterComponent = () => {
  const {register} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      await register(username, email, password).then(() =>
        navigation.navigate('Dashboard'),
      );
    } catch (error) {
      Alert.alert('Registration Error', error.message, [{text: 'OK'}]); // Display the error message to the user
    }
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
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      <Text> </Text>
      {/* Display error message */}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterComponent;
