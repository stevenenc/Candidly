import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens';
import AuthContext, {AuthProvider} from './frontend/src/contexts/AuthContext';
import Login from './frontend/src/components/Login';
import Dashboard from './frontend/src/components/Dashboard';
import Register from './frontend/src/components/Register';

const Stack = createStackNavigator();
enableScreens();

const App = () => {
  const {user} = useContext(AuthContext);
  console.log('Current user:', user);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Register" component={Register} />
        {user ? (
          <Stack.Screen name="Dashboard" component={Dashboard} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Main = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

AppRegistry.registerComponent(appName, () => Main);

export default Main;
