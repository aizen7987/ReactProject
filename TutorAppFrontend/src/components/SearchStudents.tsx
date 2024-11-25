// src/components/SearchStudents.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

interface SearchStudentsProps {
  navigation: any; // Puedes definir un tipo más específico si lo deseas
  route: {
    params: {
      userId: number; // Asegúrate de que userId esté definido aquí
    };
  };
}

const SearchStudents: React.FC<SearchStudentsProps> = ({ navigation, route }) => {
  const { userId } = route.params; // Obtener userId de los parámetros
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Función para obtener estudiantes desde el backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://192.168.5.41:3001/api/students'); // Cambia la URL según tu API
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents(); // Llamar a la función al montar el componente
  }, []);

  // Filtrar estudiantes según la búsqueda
  const filteredStudents = students.filter(student =>
    student.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Manejar la selección de un estudiante
  const handleSelectStudent = (studentId: number) => {
    navigation.navigate('Chat', { userId, otherUserId: studentId, userRole: 'tutor' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Estudiantes</Text>
      <TextInput
        placeholder="Buscar por nombre de usuario"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.studentItem} onPress={() => handleSelectStudent(item.id)}>
            <Text style={styles.studentName}>{item.username}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron estudiantes.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  studentItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  studentName: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default SearchStudents;