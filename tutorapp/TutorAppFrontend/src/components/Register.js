import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Valor predeterminado

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        password,
        role
      });
      Alert.alert('Registro exitoso', `Usuario ${response.data.username} registrado`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Student" value="student" />
        <Picker.Item label="Tutor" value="tutor" />
      </Picker>
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

export default Register;