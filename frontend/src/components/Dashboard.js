import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import AuthContext from '../contexts/AuthContext';

const Dashboard = () => {
  const {user, logout} = useContext(AuthContext);

  if (!user) {
    return <Text>You need to log in to access this page.</Text>;
  }

  return (
    <View>
      <Text>Welcome, {user.username}!</Text>
      <Button title="Log Out" onPress={logout} />
    </View>
  );
};

export default Dashboard;
