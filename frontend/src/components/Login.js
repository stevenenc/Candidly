import React, {useState, useContext} from 'react';
import {View, TextInput, Button} from 'react-native';
import AuthContext from '../contexts/AuthContext';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginComponent;
