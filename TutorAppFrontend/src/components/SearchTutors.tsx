// src/components/SearchTutors.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

export interface SearchTutorsProps {
  navigation: any;
  route: {
    params: {
      userId: number; 
    };
  };
}

const SearchTutors: React.FC<SearchTutorsProps> = ({ navigation, route }) => {
  const { userId } = route.params;
  const [tutors, setTutors] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  
  const fetchTutors = async () => {
    try {
      const response = await axios.get('http://192.168.5.41:3001/api/tutors'); 
      setTutors(response.data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);


  const filteredTutors = tutors.filter(tutor =>
    tutor.username.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleSelectTutor = (tutorId: number) => {
    navigation.navigate('Chat', { userId, otherUserId: tutorId, userRole: 'student' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Tutores</Text>
      <TextInput
        placeholder="Buscar por nombre de usuario"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />
      <FlatList
        data={filteredTutors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.tutorItem} onPress={() => handleSelectTutor(item.id)}>
            <Text style={styles.tutorName}>{item.username}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron tutores.</Text>}
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
  tutorItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tutorName: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default SearchTutors;