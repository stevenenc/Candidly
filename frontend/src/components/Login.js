/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../contexts/AuthContext';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {login} = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (e) {
      // If an error occurs, update the error state
      setError(e.message);
    }
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
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      <Text> </Text>
      {/* Display error message */}
      <Button title="Login" onPress={handleLogin} />
      <Text style={{marginVertical: 20, textAlign: 'center'}}>OR</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginComponent;
