// src/components/Login.tsx
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface LoginProps {
  navigation: any; // Puedes definir un tipo más específico si lo deseas
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {  
    try {
      const response = await axios.post('http://192.168.5.41:3001/api/auth/login', {
        username,
        password
      });
      
      // Asegúrate de que el servidor devuelva el rol
      const userId = response.data.userId; // Obtener el ID del usuario
      const userRole = response.data.role; // Obtener el rol del usuario
  
      // Redirigir a la pantalla de menú y pasar el rol del usuario
      console.log('User ID:', userId); // Verifica que el ID se esté recibiendo correctamente
      console.log('User Role:', userRole); 
      navigation.navigate('Menu', { userId, userRole }); 
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5', // Color de fondo
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff', // Color de fondo del input
  },
  button: {
    backgroundColor: '#007BFF', // Color de fondo del botón
    padding: 15,
    borderRadius: 5,
    width: '100%', // Ancho completo
    alignItems: 'center', // Centrar el texto
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;