// src/components/Register.tsx
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

interface RegisterProps {
  navigation: any; // Puedes definir un tipo más específico si lo deseas
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('student'); // Valor predeterminado

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.5.41:3001/api/auth/register', {
        username,
        password,
        role
      });
      Alert.alert('Registro exitoso', `Usuario ${response.data.username} registrado`);
      navigation.navigate('Login'); // Redirigir a la pantalla de inicio de sesión
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
    }
  };

  return (
    <View style={styles.container}>
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
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Estudiante" value="student" />
        <Picker.Item label="Tutor" value="tutor" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff', // Color de fondo del input
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
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

export default Register;