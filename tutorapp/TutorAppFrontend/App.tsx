  // App.js
  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import Login from './src/components/Login';
  import Register from './src/components/Register';

  const Stack = createNativeStackNavigator();

  function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  export default App;