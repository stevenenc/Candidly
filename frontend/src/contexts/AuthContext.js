/* eslint-disable no-alert */
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://10.0.2.2:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (response.ok) {
        const result = await response.json();
        setUser(result.user);
        await AsyncStorage.setItem('user', JSON.stringify(result.user));
      } else {
        // Handle the error response
        const errorResponse = await response.json();
        console.error('Login failed:', errorResponse.message);
        //You can use the message to display it to the user in your UI
        alert(errorResponse.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const register = async (username, email, password) => {
    const userData = {username, email, password};

    try {
      const response = await fetch('http://10.0.2.2:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Response status:', response.status); // Log the status code

      if (response.ok) {
        const result = await response.json();
        setUser(result.user);
        await AsyncStorage.setItem('user', JSON.stringify(result.user));
      } else {
        const errorResponse = await response.json(); // Fetch the error message from the server
        console.error('Registration failed:', errorResponse.message); // Log the server error message
        throw new Error(errorResponse.message);
      }
    } catch (error) {
      throw error;
      // console.error('Error during registration:', error);
    }
  };

  return (
    <AuthContext.Provider value={{user, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
