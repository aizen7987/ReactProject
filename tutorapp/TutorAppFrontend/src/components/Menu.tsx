// src/components/Menu.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface MenuProps {
  navigation: any; // Puedes definir un tipo más específico si lo deseas
  route: any; // Asegúrate de que el componente reciba los parámetros de la ruta
}

const Menu: React.FC<MenuProps> = ({ navigation, route }) => {
  const { userRole, userId } = route.params; // Obtener el rol y el ID del usuario desde los parámetros de la ruta
  console.log('User Role in Menu:', userRole); // Verifica que el rol se esté recibiendo correctamente

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>
      <View style={styles.footer}>
        {userRole === 'student' && ( // Mostrar solo para estudiantes
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchTutors', { userId })}>
            <Text style={styles.buttonText}>Buscar Tutores</Text>
          </TouchableOpacity>
        )}
        {userRole === 'tutor' && ( // Mostrar solo para tutores
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
    justifyContent: 'space-between', // Espacio entre el contenido y el pie
    padding: 16,
    backgroundColor: '#f5f5f5', // Color de fondo
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center', // Centrar el título
  },
  footer: {
    flexDirection: 'row', // Disposición horizontal
    justifyContent: 'space-around', // Espacio entre los botones
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Línea superior
    backgroundColor: '#fff', // Color de fondo del pie
  },
  button: {
    backgroundColor: '#007BFF', // Color de fondo del botón
    padding: 15,
    borderRadius: 5,
    width: '40%', // Ancho del botón
    alignItems: 'center', // Centrar el texto
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Menu;