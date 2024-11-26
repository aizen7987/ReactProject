// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/Login';
import Register from './src/components/Register';
import Menu from './src/components/Menu';
import SearchTutors from './src/components/SearchTutors';
import SearchStudents from './src/components/SearchStudents';
import Chat from './src/components/Chat';
import { SocketProvider } from './src/contexts/SocketContext'; // Importa el SocketProvider

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <SocketProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="SearchTutors" component={SearchTutors} />
          <Stack.Screen name="SearchStudents" component={SearchStudents} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </SocketProvider>
  );
};

export default App;