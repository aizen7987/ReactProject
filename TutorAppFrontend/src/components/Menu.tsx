import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface MenuProps {
  navigation: any; 
  route: any; 
}

const Menu: React.FC<MenuProps> = ({ navigation, route }) => {
  const { userRole, userId } = route.params; 
  console.log('User Role in Menu:', userRole);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>
      <View style={styles.footer}>
        {userRole === 'student' && ( 
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchTutors', { userId })}>
            <Text style={styles.buttonText}>Buscar Tutores</Text>
          </TouchableOpacity>
        )}
        {userRole === 'tutor' && ( 
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchStudents', { userId })}>
            <Text style={styles.buttonText}>Buscar Estudiantes</Text>
          </TouchableOpacity> 
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    padding: 16,
    backgroundColor: '#f5f5f5', 
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff', 
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Menu;