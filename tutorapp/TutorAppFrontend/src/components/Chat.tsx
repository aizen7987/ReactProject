import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://192.168.5.41:3001'); // Cambia la URL según tu servidor

const Chat: React.FC<{ route: any }> = ({ route }) => {
  const { userId, otherUserId, userRole } = route.params; // Obtener IDs y rol desde los parámetros de la ruta
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    console.log('Conectando al socket...');
    socket.on('connect', () => {
      console.log('Conectado al socket:', socket.id);
      socket.emit('registerUser', userId); // Registra el ID del usuario
    });

    // Obtener mensajes al cargar el componente
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://192.168.5.41:3001/api/messages/${userId}/${otherUserId}`);
        console.log('Mensajes recuperados:', response.data);
        setMessages(response.data);
      } catch (error) {
        console.error('Error al obtener mensajes:', error);
      } finally {
        setLoading(false); // Cambiar el estado de carga a false después de la recuperación
      }
    };

    fetchMessages();

    // Escuchar mensajes recibidos
    socket.on('receiveMessage', (data) => {
      console.log('Mensaje recibido a través del socket:', data); 
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    
    socket.on('testEvent', (data) => {
      console.log('Evento de prueba recibido:', data);
    });

    return () => {
      socket.off('testEvent');
      socket.off('receiveMessage'); // Asegúrate de limpiar el listener
    };
  }, [userId]);

  const sendMessage = async () => {
    if (message.trim() === '') return; // Evitar enviar mensajes vacíos
    const data = {
      sender_id: userId, // Usar el ID del usuario actual
      receiver_id: otherUserId, // Usar el ID del otro usuario (tutor o estudiante)
      message,
    };
    console.log('Enviando mensaje:', data);
    
    try {
      socket.emit('sendMessage', data); // Emitir el mensaje
      setMessage(''); // Limpiar el campo de entrada
    } catch (error) {
      console.error('Error al enviar el mensaje:', error); // Manejo de errores al enviar
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat con {userRole === 'student' ? 'Tutor' : 'Estudiante'}</Text>
      {loading ? ( // Mostrar indicador de carga si está cargando
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()} // Asegúrate de que el ID del mensaje se use como clave
          renderItem={({ item }) => (
            <Text style={styles.message}>
              {item.sender_id === userId ? 'Tú: ' : userRole === 'student' ? 'Tutor: ' : 'Estudiante: '}{item.message}
            </Text>
          )}
        />
      )}
      <TextInput
        placeholder="Escribe un mensaje"
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <Button title="Enviar" onPress={sendMessage} />
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
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#e1ffc7', // Color de fondo para los mensajes
  },
});

export default Chat;